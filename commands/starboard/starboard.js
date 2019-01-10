exports.conf = {
	enabled: true,
	runIn: ["text", "group", "dm"],
	permLevel: 0, // Co-Owners
	botPerms: ["READ_MESSAGES", "SEND_MESSAGES"],
	requiredFuncs: [],
	cooldown: 0
};

exports.help = {
	name: "starboard",
	description: "Offers starboard channel configuration.",
	usage: "<channel:channel> [minStars:int] [timeoutMinutes:int]",
	usageDelim: " ",
	extendedHelp: ""
};

exports.run = async (client, msg, [channel, minStars, timeoutMinutes]) => {
	await msg.sendMessage("🔃 - Preparing settings...");

	if(!client.schemaManager.schema.starboardChannel) {
		client.schemaManager.add(
			"starboardChannel",
			{type: "Channel"},
			true
		);
	}

	if(!client.schemaManager.schema.starsThreshold) {
		client.schemaManager.add(
			"starsThreshold",
			{type: "Integer", default: 3, min: 1, max: 99},
			true
		);
	}

	if(!client.schemaManager.schema.timeoutMinutes) {
		client.schemaManager.add(
			"timeoutMinutes",
			{type: "Integer", default: 30, min: 5, max: 86400}, // 86400s => 24h
			true
		);
	}

	let result = "⚠ - Not all settings were saved correctly:";
	let mistakes = false;

	if(!client.settingGateway.get(msg.guild)) client.settingGateway.create(msg.guild);

	// await client.settingGateway.update(msg.guild, "starboardChannel", channel)
	await client.settingGateway.update(msg.guild, {starboardChannel: channel})
	.catch((err) => {
		client.emit("log", err, "error");
		return msg.sendMessage("❌ - Invalid `channel` specified. No starboard configured.");
	});

	await client.settingGateway.update(msg.guild, {starsThreshold: minStars})
	.catch((err) => {
		client.emit("log", err, "error");
		mistakes = true;
		result += "\n- Star number can only be between `1` and `100`. Value has been set to `3`.";
	});

	await client.settingGateway.update(msg.guild, {timeoutMinutes: timeoutMinutes})
	.catch((err) => {
		client.emit("log", err, "error");
		mistakes = true;
		result += "\n- Timeout can only be between `5` and `86400` (24 hours). Value has been set to `30`.";
	});

	client.emit("log", client.settingGateway.get(msg.guild), "debug");

	if(mistakes) return msg.sendMessage(result);
	return msg.sendMessage("✅ - Configured Starboard.");
};
