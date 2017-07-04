const Express = require("express");
const Session = require("express-session");
const Passport = require("passport");
const {Strategy} = require("passport-discord");

const SCOPES = [ "identify", "email", "guilds", "connections" ];
const WebApp = Express();

exports.init = () => {
	Passport.serializeUser((user, done) => done(null, user));
	Passport.deserializeUser((obj, done) => done(null, obj));

	Passport.use(new Strategy({
		clientID: "331474748917940235",
		clientSecret: "_NnzwvSd_9BcL7xt4l2OawwCq3g2_k65",
		callbackURL: "http://localhost:5000/callback",
		scope: SCOPES
	}, (accessToken, refreshToken, profile, done) => process.nextTick(() => { return done(null, profile); })));

	WebApp.use(Session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false
	}));

	WebApp.use(Passport.initialize());
	WebApp.use(Passport.session());

	WebApp.get("/", Passport.authenticate("discord", { scope: SCOPES }), (req, res) => {});
	WebApp.get("/callback", Passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => { res.redirect("/debug"); });

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
		if(err) return console.error(err);
		return console.log("Listening at http://localhost:5000/");
	});
};
