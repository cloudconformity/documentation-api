require("dotenv").config();
const Promise = require("bluebird");

const utils = require("./utils");

const sourceAccountId = process.env.SOURCE_ACCOUNT_ID;

(async () => {

	let ruleSettings = await utils.getRuleSettingsFromS3(sourceAccountId);

	console.log(ruleSettings);

	const accounts = await utils.getAllAccounts();

	return Promise.mapSeries(
		accounts,
		(account) => utils.applyRuleSettingsToAccount(ruleSettings, account.id, "Rule updated from S3")
	);

})();
