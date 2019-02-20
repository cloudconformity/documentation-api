/*

This examples illustrate the way one can add multiple accounts to Cloud Conformity

This example assumes that the AWS accounts have already been provisioned with the appropriate AWS IAM Role.
The name of the role is defined in the CloudConformityRoleName variable.

Prerequisite:
- Node.js installed
- request, request-promise and bluebird packages globally installed.
  To install those packages, run:
  npm i -g request request-promise bluebird
- substitute values for the following variables, with your values:
  endpoint, APIKey and CloudConformityRoleName

To execute the script run:
  node createNewAccountsSimplified.js

*/

const request = require('request-promise');
const Promise = require("bluebird");
const AWS = require("aws-sdk");

// Substitute value below
// IMPORTANT : Contact us to acquire the Cloud Conformity AWS Account ID
const CloudConformityAWSAccountId = "12345678901234";
const endpoint = "CLOUD_CONFORMITY_API_ENDPOINT";
const APIKey = "YOUR_API_KEY";
const templateURL = "https://s3-us-west-2.amazonaws.com/cloudconformity/CloudConformity.template";

const accounts = [{
	accessKeyId: "AKIAI_MY_ACCESS_KEY",
	secretAccessKey: "YOUR_SECRET",
	name: "My account",
	environment: "My environment"
}, {
	accessKeyId: "AKIAI_MY_ACCESS_KEY_FOR_ANOTHER_ACCOUNT",
	secretAccessKey: "YOUR_SECRET_FOR_ANOTHER_ACCOUNT",
	name: "My other account",
	environment: "My other environment"
}];

const externalIdRequestOptions = {
	method: 'POST',
	uri: `${endpoint}/v1/external-ids`,
	headers: {
		"Content-Type": "application/vnd.api+json",
		'Authorization': `ApiKey ${APIKey}`
	},
	json: true
};

(async function() {

	const externalId = request(externalIdRequestOptions).then((xtl) => xtl.data.id);

	await Promise.mapSeries(accounts, function(account) {

		const params = {
			StackName: "CloudConformity",
			Capabilities: [
				"CAPABILITY_NAMED_IAM"
			],
			TemplateURL: templateURL,
			Parameters: [{
				ParameterKey: 'AccountId',
				ParameterValue: `${CloudConformityAWSAccountId}`
			}, {
				ParameterKey: 'ExternalId',
				ParameterValue: externalId
			}]
		};

		const config = new AWS.Config({
			accessKeyId: account.accessKeyId,
			secretAccessKey: account.secretAccessKey
		});

		console.log("Got an external id %s, crating CloudConformity stack", externalId);

		const CloudFormation = Promise.promisifyAll(new AWS.CloudFormation(config), {
			filter: function(name, func, target, passesDefaultFilter) {
				return passesDefaultFilter &&
					name !== "onAsync" &&
					name !== "on";
			}
		});

		console.log("Creating stack");

		return CloudFormation.createStackAsync(params).then(function(result) {

			const waitCompletion = function() {

				console.log("Waiting for stack creation...");

				var params = {
					StackName: result.StackId
				};

				return CloudFormation.describeStacksAsync(params).then((data) => data.Stacks).get(0).then(function(stack) {

					if (["CREATE_IN_PROGRESS", "UPDATE_IN_PROGRESS"].includes(stack.StackStatus)) {

						return Promise.delay(5000).then(waitCompletion);

					} else if (["CREATE_COMPLETE", "UPDATE_COMPLETE"].includes(stack.StackStatus)) {

						console.log("Stack creation complete");
						return stack.Outputs.find((output) => output.OutputKey === "CloudConformityRoleArn").OutputValue;

					} else {

						throw "Cloud Formation error";

					}

				});

			};

			return waitCompletion();

		}).then(function(roleArn) {

			console.log("Will create an account with role ARN %s, external Id %s", roleArn, externalId);

			const options = {
				method: 'POST',
				uri: `${endpoint}/v1/accounts`,
				body: {
					data: {
						attributes: {
							name: account.name,
							environment: account.environment,
							access: {
								keys: {
									externalId: externalId,
									roleArn: roleArn
								}
							}
						}
					}
				},
				headers: {
					"Content-Type": "application/vnd.api+json",
					'Authorization': `ApiKey ${APIKey}`
				},
				json: true
			};

			return request(options);

		}).then(function() {

			console.log(...arguments);

		});

	});

});
