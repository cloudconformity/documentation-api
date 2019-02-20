/*eslint no-process-env: "null"*/

const request = require("request-promise");
const AWS = require("aws-sdk");
const S3 = new AWS.S3();

const configuration = {
	APIKey: process.env.YOUR_API_KEY,
	configurationBucketName: process.env.CLOUD_CONFORMITY_CONFIGURATION_BUCKET,
	endpoint: process.env.CLOUD_CONFORMITY_API_ENDPOINT,
	referenceAccountId: process.env.REFERENCE_ACCOUNT_ID
};

const removeUnconfigurableSettings = (ruleSetting) => {

	// Removing non-configurable part
	let extraSettings = ruleSetting.extraSettings || [];

	extraSettings = extraSettings.filter((extraSetting) => !extraSetting.readOnly);

	if (extraSettings.length) {

		ruleSetting.extraSettings = extraSettings;

	} else {

		Reflect.deleteProperty(ruleSetting, "extraSettings");

	}

	return ruleSetting;

};

module.exports = {

	applyRuleSettingsToAccount: (ruleSettings, accountId, note) => {

		ruleSettings = ruleSettings.map(removeUnconfigurableSettings);

		const options = {
			body: {
				data: {
					attributes: {
						note,
						ruleSettings
					}
				}
			},
			headers: {
				Authorization: `ApiKey ${configuration.APIKey}`,
				"Content-Type": "application/vnd.api+json"
			},
			json: true,
			method: "PATCH",
			uri: `${configuration.endpoint}/accounts/${accountId}/settings/rules`
		};

		console.log("Applying rule settings to %s", accountId);

		return request(options);

	},

	applyRuleSettingToAccount: (ruleSetting, accountId, note) => {

		ruleSetting = removeUnconfigurableSettings(ruleSetting);

		const options = {
			body: {
				data: {
					attributes: {
						note,
						ruleSetting
					}
				}
			},
			headers: {
				Authorization: `ApiKey ${configuration.APIKey}`,
				"Content-Type": "application/vnd.api+json"
			},
			json: true,
			method: "PATCH",
			uri: `${configuration.endpoint}/accounts/${accountId}/settings/rules/${ruleSetting.id}`
		};

		console.log("Applying rule setting %s to %s", ruleSetting.id, accountId);

		return request(options);

	},

	createAccount: (account, externalId) => {

		const options = {
			body: {
				data: {
					attributes: {
						access: {
							keys: {
								externalId,
								roleArn: account.roleARN
							}
						},
						costPackage: true,
						environment: account.environment,
						hasRealTimeMonitoring: true,
						name: account.name
					}
				}
			},
			headers: {
				Authorization: `ApiKey ${configuration.APIKey}`,
				"Content-Type": "application/vnd.api+json"
			},
			json: true,
			method: "POST",
			uri: `${configuration.endpoint}/accounts`
		};

		console.log("Will create an account with role ARN %s, external Id %s", account.roleARN, externalId);

		return request(options);

	},

	getAllAccounts: async () => {

		const options = {
			headers: {
				Authorization: `ApiKey ${configuration.APIKey}`,
				"Content-Type": "application/vnd.api+json"
			},
			json: true,
			method: "GET",
			uri: `${configuration.endpoint}/accounts`
		};

		console.log("Getting all accounts");
		const response = await request(options);

		return response.data.map((accountRaw) => {

			let account = {
				id: accountRaw.id
			};

			return Object.assign(accountRaw.attributes, account);

		});

	},

	getAllRuleSettingsFromAccount: async (accountId) => {

		const options = {
			headers: {
				Authorization: `ApiKey ${configuration.APIKey}`,
				"Content-Type": "application/vnd.api+json"
			},
			json: true,
			method: "GET",
			uri: `${configuration.endpoint}/accounts/${accountId}/settings/rules`
		};

		console.log("Getting rule configurations from %s", accountId);
		const response = await request(options);

		return response.data.attributes.settings.rules;

	},

	getExternalId: () => {

		const externalIdRequestOptions = {
			headers: {
				"Authorization": `ApiKey ${configuration.APIKey}`,
				"Content-Type": "application/vnd.api+json"
			},
			json: true,
			method: "GET",
			uri: `${configuration.endpoint}/organisation/external-id`
		};

		return request(externalIdRequestOptions).then((xtl) => xtl.data.id);

	},

	getRuleSettingFromAccount: async (accountId, ruleId) => {

		const options = {
			headers: {
				Authorization: `ApiKey ${configuration.APIKey}`,
				"Content-Type": "application/vnd.api+json"
			},
			json: true,
			method: "GET",
			uri: `${configuration.endpoint}/accounts/${accountId}/settings/rules/${ruleId}`
		};

		console.log("Getting rule %s configurations from %s", ruleId, accountId);
		const response = await request(options);

		return response.data.attributes.settings.rules[0];

	},

	getRuleSettingsFromS3: (accountId) => {

		const params = {
			Bucket: configuration.configurationBucketName,
			Key: `${accountId}.json`
		};

		console.log("Getting configuration from S3");

		return S3.getObject(params).promise().then(function(data) {

			return JSON.parse(data.Body.toString());

		}).catch((err) => {

			if (err.code === "NoSuchKey") {

				console.log("No configuration found");

				return;

			}

			throw err;

		});

	},

	saveRuleSettingsToS3: (accountId, ruleSettings) => {

		const params = {
			Body: JSON.stringify(ruleSettings, null, 2),
			Bucket: configuration.configurationBucketName,
			ContentType: "application/json",
			Key: `${accountId}.json`
		};

		console.log("Saving configuration to S3");
		return S3.putObject(params).promise();

	},



};
