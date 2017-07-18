const {oneLine} = require("common-tags");
const {bot, webapp} = require("./../../athena_config.json");

exports.conf = {
	enabled: true,
	runIn: ["text", "group", "dm"],
	permLevel: 10,
	botPerms: [],
	requiredFuncs: [],
	cooldown: 0
};

exports.help = {
	name: "register",
	description: oneLine`Grant access to your BattleTag to seamlessly manage
	your role and tournament subscriptions.`,
	usage: "",
	usageDelim: "",
	extendedHelp: oneLine`Due to the way the Discord API works, we aren't able
	to identify BattleTag changes, so we require you to manually update your
	BattleTag by running this command again.
	If your account is linked to more than one BattleTag, only one of them will
	be used depending on the situation. Usually the BattleTag with a higher
	playtime will be preferred, but SR and prestige/level might be used too.
	Your BattleTag will only be visible to the Staff members of the Discord
	Server in which you also are a member and will never be used by this bot
	outside statistics tracking or matchmaking (currently unavailable), which
	will not be made public unless requested by you, the user itself.
	You can unregister using the '${bot.prefix}unregister' command, read its
	help section for further information.
	`
};

exports.run = (client, msg) => {
	const registrationURL = webapp.callbackURL.substring(0, webapp.callbackURL.lastIndexOf("/"));
	return msg.channel.send({embed: {
		color: client.funcs.getMaterialColor(),
		author: {name: "Register your BattleTag"},
		description: `Please allow the bot to access your connected BattleNet account:\n${registrationURL}`,
		timestamp: new Date(),
		footer: {text: "User not yet registered"}
	}});
};
