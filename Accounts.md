# Cloud Conformity Accounts API

Below is a list of the available API calls:

- [Create An Account](#create-an-account)
- [List All Accounts](#list-all-accounts)
- [Get Account Details](#get-account-details)
- [Get Account Access Setting](#get-account-access-setting)
- [Update Account Bot Setting](#update-account-bot-setting)
- [Scan Account](#scan-account)
- [Update Account Subscription](#update-account-subscription)
- [Update Account](#update-account)
- [Get Rule Setting](#get-rule-setting)
- [Update Rule Setting](#update-rule-setting)
- [Get Rule Settings](#get-rule-settings)
- [Update Rule Settings](#update-rule-settings)
- [Delete Account](#delete-account)


## Create an Account
This endpoint is used to register a new AWS account with Cloud Conformity. \
**Note:** Cost package features will no longer be available for new customers, and existing customers who do not have cost package enabled in any of their AWS accounts (Please take note of the changes in the Parameters)

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;In order to register a new AWS account, you need to:
1. Obtain your External ID from [Get Organisation External ID](./ExternalId.md#get-organisation-external-id)
2. Configure your account using CloudFormation automation (**Note:** You need to specify **`ExternalID`** parameter for both options)
   1. Option 1 Launch stack via the console:

      [![API Keys](images/cloudformation-launch-stack.png)](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https:%2F%2Fs3-us-west-2.amazonaws.com%2Fcloudconformity%2FCloudConformity.template&stackName=CloudConformity&param_AccountId=717210094962&param_ExternalId=THE_EXTERNAL_ID)
   2. Option 2 via the AWS CLI:
      ```bash
      aws cloudformation create-stack --stack-name CloudConformity  --region us-east-1  --template-url https://s3-us-west-2.amazonaws.com/cloudconformity/CloudConformity.template --parameters ParameterKey=AccountId,ParameterValue=717210094962 ParameterKey=ExternalId,ParameterValue=THE_EXTERNAL_ID  --capabilities CAPABILITY_NAMED_IAM
      ```
3. Verify stack creation is completed, and then create a new account (see below) with Cloud Conformity using your roleArn and externalId.

##### Endpoints:

`POST /accounts`

##### Parameters
- `data`: an JSON object containing JSONAPI compliant data object with following properties
  - `type`: The type of the object (account)
  - `attributes`: An attribute object containing
    - `name`: The Name of the account
    - `environment`: The Name of the environment
    - `access`: An object containing
      - `keys`: An object containing
        - `roleArn`: The Role ARN of the role you have already created to grant access to Cloud Conformity
        - `externalId`: The External ID that you have requested on the previous step
    - `costPackage`: Boolean, true for enabling the cost package add-on for the account (AWS spend analysis, forecasting, monitoring) **Note:** The server will throw a 422 error if this field is set to true for customers who do not have cost package enabled in any of their AWS accounts
    - `hasRealTimeMonitoring`: Boolean, true for enabling the Real-Time Threat monitoring add-on

Example Request:

```
curl -X POST \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
  "data": {
    "type": "account",
    "attributes": {
      "name": "Myaccount",
      "environment": "MyEnv",
      "access": {
        "keys": {
          "roleArn": "YOUR_ROLE_ARN",
          "externalId": "THE_EXTERNAL_ID"
        }
      },
      "costPackage": true,
      "hasRealTimeMonitoring": true
    }
  }
}' \
https://us-west-2-api.cloudconformity.com/v1/accounts
```
Example Response:

```
{
  "data": {
    "type": "accounts",
    "id": "H19NxMi5-",
    "attributes": {
      "name": "Myaccount",
      "environment": "MyEnv",
      "awsaccount-id": "123456789012",
      "status": "ACTIVE",
      "has-real-time-monitoring": true,
      "cost-package": true,
      "created-date": 1505595441887,
      "settings": {
        "communication": {
          "channels": [
            {
              "name": "email",
              "users": [
                "H13rFYTvl"
              ],
              "enabled": true,
              "levels": [
                "EXTREME",
                "VERY_HIGH",
                "HIGH"
              ]
            }
          ]
        },
        "rules": {},
        "access": {
          "type": "CROSS_ACCOUNT",
          "stackId": "arn:aws:cloudformation:us-east-1:123456789012:stack/CloudConformity/56db5b90-7ebb-11e7-8a78-500c28902e99"
        }
      }
    },
    "relationships": {
      "organisation": {
        "data": {
          "type": "organisations",
          "id": "B1nHYYpwx"
        }
      }
    }
  }
}
```


## List All Accounts

This endpoint allows you to query all accounts that you have access to. \
**Note:** Cost package features will no longer be available for new customers, and existing customers who do not have cost package enabled in any of their AWS accounts (Please take note of the changes in the Example Responses)

##### Endpoints:

`GET /accounts`

##### Parameters
This end point takes no parameters.


Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/accounts
```
Example Response:

```
{
  "data": [
    {
      "type": "accounts",
      "id": "AgA12vIwb",
      "attributes": {
        "name": "Test",
        "environment": "Test",
        "awsaccount-id": "123456789013",
        "has-real-time-monitoring": true,
        "created-date": 1502472854056,
        "last-notified-date": 1503580590169,
        "last-checked-date": 1503584192576,
        "last-monitoring-event-date": 1502570799000,
        "billing-account-id": "r1gyR4cqg"
      },
      "relationships": {
        "organisation": {
          "data": {
            "type": "organisations",
            "id": "B2UhJY3W1"
          }
        }
      }
    },
    {
      "type": "accounts",
      "id": "55Yfrq_IT",
      "attributes": {
        "name": "Route53",
        "environment": "Route53",
        "awsaccount-id": "123456789012",
        "has-real-time-monitoring": true,
        "cost-package": true, **Note:** this field would not be displayed for customers who do not have cost package enabled in any of their AWS accounts
        "created-date": 1489703037251,
        "last-notified-date": 1503503192127,
        "last-checked-date": 1503503191166,
        "last-monitoring-event-date": 1502570252000,
        "billing-account-id": "r1gyR4cqg"
      },
      "relationships": {
        "organisation": {
          "data": {
            "type": "organisations",
            "id": "B2UhJY3W1"
          }
        }
      }
    }
  ]
}
```

## Get Account Details

This endpoint allows you to get the details of the specified account. \
**Note:** Cost package features will no longer be available for new customers, and existing customers who do not have cost package enabled in any of their AWS accounts (Please take note of the changes in the Example Responses)

##### Endpoints:

`GET /accounts/id`

##### Parameters
- `id`: The Cloud Conformity ID of the account


Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/accounts/ABA95vIw8
```
Example Response:
```
{
    "data": [
        {
            "type": "accounts",
            "id": "ABA95vIw8",
            "attributes": {
                "name": "Test Account",
                "environment": "Test",
                "awsaccount-id": "123456789012",
                "status": "ACTIVE",
                "has-real-time-monitoring": true,
                "created-date": 1502472854056,
                "settings": {
                    "communication": {
                        "channels": [
                            {
                                "name": "email",
                                "users": [
                                    "H22rMyTu5"
                                ],
                                "enabled": true,
                                "levels": [
                                    "HIGH",
                                    "LOW",
                                    "MEDIUM",
                                    "VERY_HIGH"
                                ]
                            }
                        ]
                    }
                },
                "last-notified-date": 1503285393239,
                "last-checked-date": 1503285392447,
                "last-monitoring-event-date": 1502570799000,
                "billing-account-id": "r1gyR4cqg",
                "cost": { **Note:** this field would not be displayed for customers who do not have cost package enabled in any of their AWS accounts
                    "billing-account-map": {
                        "payerAccount": {
                            "awsId": "123456789012",
                            "id": "r1gyR4cqg"
                        },
                        "linkedAccounts": [
                            {
                                "awsId": "123456789011",
                                "id": "BJ0Ox16Hb"
                            },
                            {
                                "awsId": "123456789012",
                                "id": "BJA95viwb"
                            },
                            {
                                "awsId": "123456789013",
                                "id": "SyZZUc_il"
                            },
                            {
                                "awsId": "123456789014",
                                "id": "S1SFeq_ig"
                            },
                            {
                                "awsId": "123456789015",
                                "id": "SJQINcOol"
                            },
                            {
                                "awsId": "123456789016",
                                "id": "ryi6NPivW"
                            }
                        ]
                    },
                    "last-updated-date": 1503283806380,
                    "bills": [
                        {
                            "current": true,
                            "accountCost": 319.55255299999976,
                            "id": "2017-08",
                            "status": "succeeded"
                        }
                    ],
                    "version": 1.07
                },
                "bot-status": null
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "A1iUY1pz3"
                    }
                }
            }
        }
    ]
}
```

## Get Account Access Setting

This endpoint allows ADMIN users to get the current setting Cloud Conformity uses to access the specified account

##### Endpoints:

`GET  /accounts/id/access`

##### Parameters
- `id`: The Cloud Conformity ID of the account


Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/accounts/BJ0Ox16Hb/access
```
Example Response:
```
{
    "id": "BJ0Ox16Hb:access",
    "type": "settings",
    "attributes": {
        "type": "access",
        "configuration": {
            "externalId": "XTLFTLAXVS7G",
            "roleArn": "arn:aws:iam::222274792222:role/myRole"
        }
    },
    "relationships": {
        "organisation": {
            "data": {
                "type": "organisations",
                "id": "A1iUY1pz3"
            }
        },
        "account": {
            "data": {
                "type": "accounts",
                "id": "BJ0Ox16Hb"
            }
        }
    }
}

```

## Update Account Bot Setting

This endpoint allows ADMIN users to get the current setting Cloud Conformity uses to determine when Conformity Bot is run and on which regions the Conformity Bot is disabled.

##### Endpoints:

`PATCH  /accounts/id/settings/bot`

##### Parameters
- `id`: The Cloud Conformity ID of the account
- `data`: a JSON object containing JSONAPI compliant data object with following properties
  - `attributes`: An attribute object containing
    - `settings`: An attribute object containing account settings. This contains the properties
      - `bot`: An attribute object containing
        - `disabled`: A boolean value to disable or enable the Conformity Bot | true, false
        - `delay`: An integer value that sets the number of hours delay between Conformity Bot runs.
        - `disabledUntil`: A date time in Unix Epoch timestamp format. Setting this value will disable the Conformity Bot until the date and time indicated. Setting this value to `null` will disable the Conformity Bot indefinitely. 
        - `disabledRegions`: This field can only be applied to AWS accounts. An attribute object containing a list of AWS regions for which Conformity Bot runs will be disabled.
- `meta`: a JSON object containing JSONAPI compliant data object with following properties
  - `otherAccounts`: (optional) An array of other account IDs to which the Conformity Bot settings will also be applied.


Example Request:

```
curl -X PATCH \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey eab0b7914c3ebv45bcK02cW33ff9564cec8" \
-d '
{
  "data": {
    "type": "accounts",
    "attributes": {
      "settings": {
        "bot": {
          "disabled": true,
          "delay": "5",
          "disabledUntil": 123456789090,
          "disabledRegions": {
            "us-east-1": true,
            "us-east-2": true,
            "us-west-2": true,
            "ap-southeast-2": true
          }
        }
      }
    }
  },
  "meta": {
    "otherAccounts": ["cfe80897"]
  }
};' \
https://us-west-2-api.cloudconformity.com/v1/accounts/2fwmithMj/settings/bot
```
Example Response:
```
{
  "data": [
    {
      "type": "accounts",
      "id": "2fwmithMj",
      "attributes": {
        "name": "Test AWS Account",
        ...
        "settings": {
          "rules": [
           ...
          ],
          "bot": {
            "lastModifiedFrom": "12.345.67.890",
            "disabledRegions": {
              "ap-southeast-2": true,
              "us-east-1": true,
              "us-east-2": true,
              "us-west-2": true
            },
            "disabled": true,
            "disabledUntil": null,
            "delay": 5,
            "lastModifiedBy": "3456d0"
          }
        },
        ...
        "cloud-type": "aws",
        "managed-group-id": "23784h"
      },
      "relationships": {
        "organisation": {
          "data": {
            "type": "organisations",
            "id": "moid324"
          }
        }
      }
    },
    {
      "type": "accounts",
      "id": "cfe80897",
      "attributes": {
        "name": "Test Azure Account",
        ...
        "settings": {
          "bot": {
            "lastModifiedFrom": "12.345.67.890",
            "disabled": true,
            "disabledUntil": null,
            "delay": 5,
            "lastModifiedBy": "3456d0"
          }
        },
        ...
        "cloud-type": "azure",
        ...
      },
      "relationships": {
        "organisation": {
          "data": {
            "type": "organisations",
            "id": "moid324"
          }
        }
      }
    }
  ]
}

```



## Scan Account

This endpoint allows you to run conformity bot for the specified account.

IMPORTANT:
> This operation makes API calls to AWS on your behalf.<br />
> Amazon throttles API requests for each AWS account on a per-region basis to help the performance of the service. <br />
> To avoid API throttling, it's important to  ensure that your application doesn't use this API at a high rate.<br />
> Refer to [AWS Service Limits](http://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html) to find out more about AWS throttle rate.


##### Endpoints:

`POST /accounts/id/scan`

##### Parameters
- `id`: The Cloud Conformity ID of the account

Example Request:

```
curl -X POST \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/accounts/BJ0Ox16Hb/scan

```
Example Response:
```
{
    "data": [
        {
            "status": "STARTED"
        }
    ]
}
```



## Update account subscription

A PATCH request to this endpoint allows you to change the add-on package subscription of the specified account.

We recommend you first [Get account details](#get-account-details) to verify that the subscription needs to be updated. \
**Note:** Cost package features will no longer be available for new customers, and existing customers who do not have cost package enabled in any of their AWS accounts (Please take note of the changes in the Parameters)

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;Only ADMIN users can use this endpoint.

##### Endpoints:

`PATCH /accounts/accountId/subscription`

##### Parameters
- `data`: an JSON object containing JSONAPI compliant data object with following properties
  - `attributes`: An attribute object containing
    - `costPackage`: Boolean, true for enabling the cost package add-on for the account (AWS spend analysis, forecasting, monitoring) **Note:** The server will throw a 422 error if this field is set to true for customers who do not have cost package enabled in any of their AWS accounts
    - `hasRealTimeMonitoring`: Boolean, true for enabling the Real-Time Threat Monitoriring package add-on for the account

Example Request:

```
curl -X PATCH \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
    "data": {
        "attributes": {
            "costPackage": true,
            "hasRealTimeMonitoring": true
        }
    }
}' \
https://us-west-2-api.cloudconformity.com/v1/accounts/AgA12vIwb/subscription
```

Example Response:

```
{
    "data": {
        "type": "accounts",
        "id": "AgA12vIwb",
        "attributes": {
            "name": "myCCaccount",
            "environment": "myAWSenv",
            "awsaccount-id": "123456789101",
            "status": "ACTIVE",
            "has-real-time-monitoring": true,
            "cost-package": true,
            "last-notified-date": 1504113512701,
            "last-checked-date": 1504113511956,
            "available-runs": 5,
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "B1nHYYpwx"
                }
            }
        }
    }
}
```




## Update account

A PATCH request to this endpoint allows changes to the account name, enviornment, and code.

We recommend you first [Get account details](#get-account-details) to check what existing value of these attributes are. \
**Note:** Cost package features will no longer be available for new customers, and existing customers who do not have cost package enabled in any of their AWS accounts (Please take note of the changes in the Example Responses)

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;Only ADMINs and users with FULL access to the specified account can use this endpoint.

##### Endpoints:

`PATCH /accounts/accountId`

##### Parameters
- `data`: an JSON object containing JSONAPI compliant data object with following properties
  - `attributes`: An attribute object containing
    - `name`: The name of the account.
    - `environment`: The environment of the account. (optional)
    - `code`: A 3-character code you can use to identify the account easily when using the CloudConformity web UI (optional).
    - `tags`: An array of strings to group accounts based on the tag associated with it. (optional)
      - There is a maximum of 50 tags per account and maximum of 80 characters per tag.
      - Tags should be alphanumeric, and may contain symbols  - _  and Space.

Example Request:

```
curl -X PATCH \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
    "data": {
        "attributes": {
            "name": "myProductionAccount",
            "environment": "myProductionEnvironment",
            "code": "PAE",
            "tags": ["staging", "development", "production"]
        }
    }
}' \
https://us-west-2-api.cloudconformity.com/v1/accounts/AgA12vIwb
```

Example Response:

```
{
    "data": {
        "type": "accounts",
        "id": "AgA12vIwb",
        "attributes": {
            "name": "myProductionAccount",
            "environment": "myProductionEnvironment",
            "code": "PAE",
            "awsaccount-id": "123456789101",
            "status": "ACTIVE",
            "has-real-time-monitoring": true,
            "cost-package": true, **Note:** this field would not be displayed for customers who do not have cost package enabled in any of their AWS accounts
            "last-notified-date": 1504113512701,
            "last-checked-date": 1504113511956,
            "available-runs": 5,
            "tags": ["staging", "development", "production"]
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "B1nHYYpwx"
                }
            }
        }
    }
}
```





## Get Rule Setting

A GET request to this endpoint allows you to get configured rule setting for the specified rule Id of the specified account.
If a specific rule has never been configured, the request will result in a 404 error.
For example, even if our bots run rule RDS-018 for your account hourly, if you have never configured it, trying to get rule settings for RDS-018 will result in a 404 error.

##### Endpoints:

`GET /accounts/accountId/settings/rules/ruleId`

##### Parameters
- `accountId`: The Cloud Conformity ID of the account
- `ruleId`: The ID of the rule
- `notes`: Optional parameter (boolean) to get notes for the specified rule setting




Example Request:

```

curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/accounts/H19NxMi5-/settings/rules/RDS-018?notes=true
```
Example Response:
```
{
	"data": {
		"type": "accounts",
		"id": "H19NxMi5-",
		"attributes": {
			"settings": {
				"rules": [
					{
						"ruleExists": false,
						"riskLevel": "MEDIUM",
						"id": "RDS-018",
						"extraSettings": [
							{
								"name": "threshold",
								"value": 90
							}
						],
						"enabled": false
					}
				],
				"access": {}
			},
			"available-runs": 5,
			"access": null
		},
		"relationships": {
			"organisation": {
				"data": {
					"type": "organisations",
					"id": "B1nHYYpwx"
				}
			}
		}
	},
	"meta": {
		"notes": [
			{
				"createdBy": "SYmS0YcL-",
				"createdDate": 1511456432526,
				"note": "hello world"
			}
		]
	}
}
```




## Update rule setting

A PATCH request to this endpoint allows you to customize rule setting for the specified rule Id of the specified account.
This feature is used in conjunction with the GET request to the same endpoint for copying rule setting from one account to another. An example of this function is provided in the examples folder.


**IMPORTANT:**
&nbsp;&nbsp;&nbsp;To copy rule setting from one account to another, you first need to:
1. Obtain rule setting from the desired account. [Get rule setting](#get-rule-setting)
1. Paste rule setting as is into the body of the PATCH request following the format below.

##### Endpoints:

`PATCH /accounts/accountId/settings/rules/ruleId`

##### Parameters
- `data`: an JSON object containing JSONAPI compliant data object with following properties
  - `attributes`: An attribute object containing
    - `ruleSetting`: An object containing
      - `id`: Rule Id, same as the one provided in the endpoint
      - `enabled`: Boolean, true for inclusion in bot detection, false for exclusion
      - `riskLevel`: riskLevel you desire for this rule. Must be one of the following: LOW, MEDIUM, HIGH, VERY_HIGH, EXTREME
      - `extraSettings`: An array of object(s) for customisable rules only, containing
        - `name`: Keyword
        - `type`: Rule specific property
        - `countries/regions/multiple/etc....`: Rule specific property (boolean)
        - `value`: Customisable value for rules that take on single name/value pairs
        - `values`: An array (sometimes of objects) rules that take on a set of of values
    - `note`: A detailed message regarding the reason for this rule configuration

Example Request:

```
curl -X PATCH \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
	"data": {
		"attributes": {
			"ruleSetting": {
				"ruleExists": false,
				"riskLevel": "MEDIUM",
				"id": "RDS-018",
				"extraSettings": [
					{
						"name": "threshold",
						"value": 90
					}
				],
				"enabled": false
			},
			"note": "copied from account H19NxMi5- via the api"
		}
	}
}' \
https://us-west-2-api.cloudconformity.com/v1/accounts/AgA12vIwb/settings/rules/RDS-018
```
Example Response:

```

{
	"data": {
		"type": "accounts",
		"id": "AgA12vIwb",
		"attributes": {
			"settings": {
				"rules": [
					{
						"riskLevel": "VERY_HIGH",
						"id": "CT-001",
						"extraSettings": null,
						"enabled": true
					},
					{
						"riskLevel": "MEDIUM",
						"id": "RTM-005",
						"extraSettings": [
							{
								"name": "authorisedCountries",
								"countries": true,
								"type": "countries",
								"value": null,
								"values": [
									{
										"value": "CA",
										"label": "Canada"
									},
									{
										"value": "US",
										"label": "United States"
									}
								]
							}
						],
						"enabled": false
					},
					{
						"ruleExists": false,
						"riskLevel": "MEDIUM",
						"id": "RTM-008",
						"extraSettings": [
							{
								"name": "authorisedRegions",
								"regions": true,
								"type": "regions",
								"value": null,
								"values": ["eu-west-1", "eu-west-2"]
							}
						],
						"enabled": false
					},
					{
						"ruleExists": false,
						"riskLevel": "MEDIUM",
						"id": "RDS-018",
						"extraSettings": [
							{
								"name": "threshold",
								"value": 90,
								"values": [],
								"type": []
							}
						],
						"enabled": false
					}
				],
				"access": {}
			},
			"available-runs": 5,
			"access": null
		},
		"relationships": {
			"organisation": {
				"data": {
					"type": "organisations",
					"id": "B1nHYYpwx"
				}
			}
		}
	}
}
```


#### Errors:

Some errors thrown from rule setting validation may need further clarification. Below is a list.
For more information about rule specifivities, consult [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services)

Error Details | Resolution
--- | ---
This Real-Time Threat Monitoring (or cost) package rule `ruleId` is not part of the account subscription | You cannot configure rule settings for this rule. Try another rule.
`ruleId` is not configurable from this endpoint. | This is either a cost-setting or organisation-setting which you cannot configure via this account rule settings endpoint.
Rule risk level missing for `ruleId` | `ruleSetting.riskLevel` is a required parameter
Rule risk level provided for `ruleId` is incorrect | only "LOW", "MEDIUM", "HIGH", "VERY_HIGH", and "EXTREME" are accepted risk levels
Rule enable status is not valid for `ruleId` | `ruleSetting.enabled` is a required boolean parameter
One or more rule setting property is invalid for `ruleId` | remove the `ruleSetting` property if it is not `id`, `enabled`, `riskLevel`, `extraSettings`, or `ruleExists`
**Extra settings**
Rule `ruleId` is not configurable | remove `ruleSetting.extraSettings`, you may only change risk level or enable/disable this rule. If you are directly copying this rule from another account and getting this message, this rule may have been previously configurable and is no longer.



## Get Rule Settings

A GET request to this endpoint allows you to get rule settings for all configured rules of the specified account.
If a rule has never been configured, it will not show up in the resulting data.
For example, even if our bots run rule RDS-018 for your account hourly, if you have never configured it, it will not be
part of the data body we send back.

This endpoint only returns configured rules. If you want to include default rule settings, set `includeDefaults=true` in
query parameters.

Details of rule setting types used by Cloud Conformity are available [here](./RuleSettings.md)

##### Endpoints:

`GET /accounts/accountId/settings/rules[?includeDefaults=true/false]`

##### Parameters
- `accountId`: The Cloud Conformity ID of the account
- `includeDefaults`: Optional, Whether or not to include default rule settings. Defaults to false.




Example Request:

```

curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/accounts/H19NxMi5-/settings/rules
```
Example Response:
```
{
	"data": {
		"type": "accounts",
		"id": "H19NxMi5-",
		"attributes": {
			"settings": {
				"rules": [
					{
						"ruleExists": false,
						"riskLevel": "MEDIUM",
						"id": "RDS-018",
						"extraSettings": [
							{
								"name": "threshold",
								"value": 90
							}
						],
						"enabled": false
					}, {
						"riskLevel": "LOW",
						"id": "Config-001",
						"extraSettings": null,
						"enabled": true
					}, {
						"riskLevel": "MEDIUM",
						"id": "RTM-005",
						"extraSettings": [
							{
								"name": "authorisedCountries",
								"countries": true,
								"type": "countries",
								"value": null,
								"values": [
									{
										"value": "CA",
										"label": "Canada"
									},
									{
										"value": "US",
										"label": "United States"
									}
								]
							}
						],
						"enabled": false
					}
				],
				"access": {}
			},
			"available-runs": 5,
			"access": null
		},
		"relationships": {
			"organisation": {
				"data": {
					"type": "organisations",
					"id": "B1nHYYpwx"
				}
			}
		}
	}
}
```

## Update rule settings

A PATCH request to this endpoint allows you to customize rule settings for the specified account.
This feature is used in conjunction with the GET request to the same endpoint for copying rule settings from one account to another. An example of this function is provided in the examples folder.


**IMPORTANT:**
&nbsp;&nbsp;&nbsp;To copy rule settings from one account to another, you first need to:
1. Obtain rule settings from the desired account. [Get rule settings](#get-rule-settings)
1. Paste rule settings as is into the body of the PATCH request following the format below.

##### Endpoints:

`PATCH /accounts/accountId/settings/rules`

##### Parameters
- `data`: an JSON object containing JSONAPI compliant data object with following properties
  - `attributes`: An attribute object containing
    - `note`: A detailed message regarding the reason for this batch of rule configurations
    - `ruleSettings`: An array of objects, each object contains
      - `id`: Rule Id, same as the one provided in the endpoint
      - `enabled`: Boolean, true for inclusion in bot detection, false for exclusion
      - `riskLevel`: riskLevel you desire for this rule. Must be one of the following: LOW, MEDIUM, HIGH, VERY_HIGH, EXTREME
      - `extraSettings`: An array of object(s) for customisable rules only, containing
        - `name`: Keyword
        - `type`: Rule specific property
        - `countries/regions/multiple/etc....`: Rule specific property (boolean)
        - `value`: Customisable value for rules that take on single name/value pairs
        - `values`: An array (sometimes of objects) rules that take on a set of of values


Example Request:

```
curl -X PATCH \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
	"data": {
		"attributes": {
			"note": "copied from account H19NxMi5- via the api",
			"ruleSettings": [
				{
					"ruleExists": false,
					"riskLevel": "MEDIUM",
					"id": "RDS-018",
					"extraSettings": [
						{
							"name": "threshold",
							"value": 90
						}
					],
					"enabled": false
				}, {
					"riskLevel": "LOW",
					"id": "Config-001",
					"extraSettings": null,
					"enabled": true
				}, {
					"riskLevel": "MEDIUM",
					"id": "RTM-005",
					"extraSettings": [
						{
							"name": "authorisedCountries",
							"countries": true,
							"type": "countries",
							"value": null,
							"values": [
								{
									"value": "CA",
									"label": "Canada"
								},
								{
									"value": "US",
									"label": "United States"
								}
							]
						}
					],
					"enabled": false
				}
			]
		}
	}
}' \
https://us-west-2-api.cloudconformity.com/v1/accounts/AgA12vIwb/settings/rules
```
Example Response:

```

{
	"data": {
		"type": "accounts",
		"id": "AgA12vIwb",
		"attributes": {
			"settings": {
				"rules": [
					{
						"ruleExists": false,
						"riskLevel": "MEDIUM",
						"id": "RDS-018",
						"extraSettings": [
							{
								"name": "threshold",
								"value": 90
							}
						],
						"enabled": false
					}, {
						"riskLevel": "LOW",
						"id": "Config-001",
						"extraSettings": null,
						"enabled": true
					}, {
						"riskLevel": "MEDIUM",
						"id": "RTM-005",
						"extraSettings": [
							{
								"name": "authorisedCountries",
								"countries": true,
								"type": "countries",
								"value": null,
								"values": [
									{
										"value": "CA",
										"label": "Canada"
									},
									{
										"value": "US",
										"label": "United States"
									}
								]
							}
						],
						"enabled": false
					}
				],
				"access": {}
			},
			"available-runs": 5,
			"access": null
		},
		"relationships": {
			"organisation": {
				"data": {
					"type": "organisations",
					"id": "B1nHYYpwx"
				}
			}
		}
	}
}
```

#### Errors:

Some errors thrown from rule settings validation may need further clarification. Below is a list.
For more information about rule specifivities, consult [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services)

Error Details | Resolution
--- | ---
This Real-Time Threat Monitoring (or cost) package rule `rule.id` is not part of the account subscription | Remove that rule setting from the array
`ruleId` is not configurable from this endpoint. | This is either a cost-setting or organisation-setting which you cannot configure via this account rule settings endpoint.
Rule risk level missing for `ruleId` | `ruleSetting.riskLevel` is a required parameter
Rule risk level provided for `ruleId` is incorrect | only "LOW", "MEDIUM", "HIGH", "VERY_HIGH", and "EXTREME" are accepted risk levels
Rule enable status is not valid for `ruleId` | `ruleSetting.enabled` is a required boolean parameter
One or more rule setting property is invalid for `ruleId` | remove the `ruleSetting` property if it is not `id`, `enabled`, `riskLevel`, `extraSettings`, or `ruleExists`
**Extra Settings**
Rule `ruleId` is not configurable | remove `ruleSetting.extraSettings`, you may only change risk level or enable/disable this rule. If you are directly copying this rule from another account and getting this message, this rule may have been previously configurable and is no longer.




## Delete account

A DELETE request to this endpoint allows an ADMIN to delete the specified account.

##### Endpoints:

`DELETE /accounts/accountId`

Example Request:
```
curl -X DELETE \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/accounts/AgA12vIwb
```

Example Response:

```
{
    "meta": {
        "status": "sent"
    }
}
```






