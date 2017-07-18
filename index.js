const Komada = require("komada");
const AthenaConfig = require("./athena_config.json");

const permStructure = [
	{
		// Level 0 - Always True (@everyone)
		check: () => true,
		break: true
	},
	{
		// Level 1 - Always False
		check: () => false,
		break: true
	},
	{
		// Level 2 -
		check: () => false,
		break: false
	},
	{
		// Level 3 - Private Messaging Channel Member
		check: (client, msg) => {
			return !msg.guild && msg.channel.owner;
		},
		break: false
	},
	{
		// Level 4 - Server Moderator
		check: (client, msg) => {
			if(!msg.guild) return false;
			for(var permission in AthenaConfig.permissions.Moderator) {
				if(!msg.author.permissions.has(permission)) return false;
			}
			return true;
		},
		break: false
	},
	{
		// Level 5 - Server Admins
		check: (client, msg) => {
			if(!msg.guild) return false;
			for(var permission in AthenaConfig.permissions.Admin) {
				if(!msg.author.permissions.has(permission)) return false;
			}
			return true;
		},
		break: false
	},
	{
		// Level 6 - Server Co-Owners
		check: (client, msg) => {
			if(!msg.guild) return false;
			return msg.author.permissions.has("ADMINISTRATOR");
		},
		break: false
	},
	{
		// Level 7 - Server/Group Owner
		check: (client, msg) => msg.author.id === !msg.guild ? !msg.channel.ownerID ? -1 : msg.channel.ownerID : msg.guild.ownerID,
		break: false
	},
	{
		// Level 8 - Bot Co-Owners
		check: (client, msg) => {
			const defaults = client.settingsGateway.get("default");
			if(!defaults || !defaults.BOT_CO_OWNERS) return false;
			return defaults.BOT_CO_OWNERS.includes(msg.author.id);
		},
		break: false
	},
	{
		// Level 9 - Bot Owner
		check: (client, msg) => msg.author.id === client.config.ownerID,
		break: true
	},
	{
		// Level 10 - Bot Owner (silent fail)
		check: (client, msg) => msg.author.id === client.config.ownerID,
		break: false
	}
];

const komada = new Komada.Client({
	ownerID : AthenaConfig.bot.owner,
	prefix: AthenaConfig.bot.prefix,
	permStructure: permStructure,
	clientOptions: AthenaConfig.startup,
});

/*

"input" -> "output"
"input regex" -> "output"
"input regex" & "variable" -> "output"
"input regex" -> "output" | "output"
"input" -> "variable" & "output"

*/

komada.login(AthenaConfig.discord.token);
// komada.login("MzE5MDcxMzEwMDI4NDcyMzIw.DDpj0g.ZfKuu-1n5iz0V9lWoqnhBPRwnTA");
