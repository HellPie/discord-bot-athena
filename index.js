const Komada = require("komada");
const AthenaConfig = require("./athena_config.json");

// const permissions = [
// 	{
// 		check: () => true, break: false
// 	},
// 	{
// 		check: () => false, break: false
// 	},
// 	{
// 		check: () => {
//
// 		}
// 	}
//
// ]

const komada = new Komada.Client({
	ownerID : AthenaConfig.bot.owner,
	prefix: AthenaConfig.bot.prefix,
	// permStructure: permissions,
	clientOptions: AthenaConfig.startup,
});

/*

"input" -> "output"
"input regex" -> "output"
"input regex" & "variable" -> "output"
"input regex" -> "output" | "output"
"input" -> "variable" & "output"

*/

// komada.perm

// komada.login(AthenaConfig.discord.token);
komada.login("MzE5MDcxMzEwMDI4NDcyMzIw.DDpj0g.ZfKuu-1n5iz0V9lWoqnhBPRwnTA");
