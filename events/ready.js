exports.run = (client) => {
	client.emit("log", `Logged in as ${client.user.tag}.`, "debug");
	client.emit("log", `Running in ${client.user.bot ? "" : "self"}bot mode.`, "debug");
};
