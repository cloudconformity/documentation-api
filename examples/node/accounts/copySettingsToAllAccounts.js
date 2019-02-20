require("dotenv").config();
const Promise = require("bluebird");

const utils = require("./utils");

const sourceAccountId = process.env.SOURCE_ACCOUNT_ID;

(async () => {

	const ruleSettings = await utils.getAllRuleSettingsFromAccount(sourceAccountId);

	const accounts = await utils.getAllAccounts();

	return Promise.mapSeries(
		accounts,
		(account) => utils.applyRuleSettingsToAccount(ruleSettings, account.id, `Copied from ${sourceAccountId}`)
	);

})();
