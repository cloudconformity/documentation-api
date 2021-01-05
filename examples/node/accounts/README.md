# Archived

Please access Trend Micro Cloud One - Conformity's public [API documentation here](https://cloudone.trendmicro.com/docs/conformity/api-reference/)
for the most updated version. This GitHub repository is no longer maintained and has been archived for historical purposes.

---

# Interacting with Accounts and rule settings

This examples illustrate the way one can add multiple accounts to Cloud Conformity

This example assumes that the AWS accounts have already been provisioned with the appropriate AWS IAM Role using StackSets for instance.

The name of the role should be consistent across all IAM Roles created for your provisioned accounts
The name of the role is defined in the CloudConformityRoleName variable.

## Prerequisite

- Node.js installed
- navigate into this directory and install the dependencies with
  `npm install`
- create a `.env` file containing the following environment variables
	```
		YOUR_API_KEY= // mandatory
		CLOUD_CONFORMITY_API_ENDPOINT= // mandatory
		SOURCE_ACCOUNT_ID= // optional
		TARGET_ACCOUNT_ID=// optional
		CLOUD_CONFORMITY_CONFIGURATION_BUCKET= // optional
	```
- edit the JavaScript files to your convenience


## The utils.js library

The file `utils.js` contains helper function to help you interact with the API

## Running a script

To execute a script run:
  `node createMultipleAccounts.js` or another file name

## The examples include:

### Copy one rule from one account to another

`copyOneRuleSetting.js`

### Copy settings from one ccount to all accounts

`copySettingsToAllAccounts.js`

### Bulk addition of AWS accounts to Cloud Conformity
This requires provision of the proper roles on all accounts beforehand

`createAccounts.js`

### Bulk linking of AWS accounts to Cloud Conformity with the upload of a CloudFormation template for each account

`createNewAccountsWithCloudForamtion.js`

### Load rule settings from an S3 bucket and apply them to all accounts

`loadSettingFromS3AndApplyToAllAccounts.js`

### Get rule settings from an account and save them into S3

`saveSettingsToAnS3Bucket.js`


