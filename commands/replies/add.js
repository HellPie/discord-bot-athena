exports.conf = {
	enabled: false,
	runIn: ["text", "group", "dm"],
	permLevel: 6, // Co-Owners
	botPerms: ["READ_MESSAGES", "SEND_MESSAGES"],
	requiredFuncs: [],
	cooldown: 0
};

exports.help = {
	name: "add",
	description: "Adds an automatic reply given a trigger message.",
	usage: "<input:str>",
	usageDelim: " ",
	extendedHelp: ""
};

exports.run = (client, msg, [...args]) => {
	//
};
