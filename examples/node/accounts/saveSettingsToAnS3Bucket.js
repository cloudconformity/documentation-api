require("dotenv").config();

const utils = require("./utils");

const sourceAccountId = process.env.SOURCE_ACCOUNT_ID;

(async () => {

	const ruleSettings = await utils.getAllRuleSettingsFromAccount(sourceAccountId);

	return utils.saveRuleSettingsToS3(sourceAccountId, ruleSettings);

})();
