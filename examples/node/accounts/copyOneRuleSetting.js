require("dotenv").config();

const utils = require("./utils");

const sourceAccountId = process.env.SOURCE_ACCOUNT_ID;
const targetAccountId = process.env.TARGET_ACCOUNT_ID;

(async () => {

	const ruleSetting = await utils.getRuleSettingFromAccount(sourceAccountId, "EC2-002");

	return utils.applyRuleSettingToAccount(ruleSetting, targetAccountId, `Rule copied from ${sourceAccountId}`)

})();
