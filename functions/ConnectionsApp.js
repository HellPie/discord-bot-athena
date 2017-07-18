const Express = require("express");
const Session = require("express-session");
const Passport = require("passport");
const {Strategy} = require("passport-discord");

const Config = require("../athena_config.json").webapp;

const SCOPES = ["identify", "email", "guilds", "connections"];
const WebApp = Express();

exports.init = (client) => {
	Passport.serializeUser((user, done) => done(null, user));
	Passport.deserializeUser((obj, done) => done(null, obj));

	Passport.use(new Strategy(Config, (accessToken, refreshToken, profile, done) => process.nextTick(() => { return done(null, profile); })));

	WebApp.use(Session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false
	}));

	WebApp.use(Passport.initialize());
	WebApp.use(Passport.session());

	WebApp.get("/", Passport.authenticate("discord", {scope: SCOPES}), (req, res) => {});
	WebApp.get("/callback", Passport.authenticate("discord", {failureRedirect: "/"}), (req, res) => {
		res.redirect("/debug");
	});

	WebApp.get("/logout", (req, res) => {
		req.logout();
		res.redirect("/");
	});

	WebApp.get("/debug", (req, res, next) => {
		if(req.isAuthenticated()) return next();
		res.send("Not logged in :(");
	}, (req, res) => {
		res.json(req.user);
	});

	WebApp.listen(5000, (err) => {
		if(err) return client.emit("log", err, "error");
		return client.emit("log", `Listening on ${Config.callbackURL}`);
	});
};
