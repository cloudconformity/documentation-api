# Cloud Conformity Settings API

Below is a list of the available API calls:

- [Create Communication Settings](#create-communication-settings)
- [Get Communication Settings](#get-communication-settings)
- [Get Communication Setting Details](#get-communication-setting-details)
- [Update Communication Setting](#update-communication-setting)
- [Delete Communication Setting](#delete-communication-setting)

## Create Communication Settings
This endpoint is used to create a new one-way communication channel setting.
This feature can be used in conjunction with a GET request to copy communication settings from one account to others. An example of this function is provided in the examples folder.

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;Some guidelines about using this endpoint:
1. Settings are created as long as your inputs are valid. The onus is on you to ensure you don't create settings that are duplicate or too similar in nature.
2. Each communication setting can be **account-level** OR **organisation-level**
    1. If creating account-level setting, you must have a valid `relationship.account` object.
    2. If creating organisation-level settings you must set `relationship.account.data: null`
    3. Only ADMIN users can create organisation-level settings.
    4. With organisation-level user-based (email & sms) settings, the onus is on you to ensure these users have at least read-only access to all accounts.

##### Endpoints:

`POST /settings/communication`

##### Parameters
- `data`: An array containing JSONAPI compliant data objects with following properties
  - `type`: `"settings"`,
  - `attributes`: Object containing
    - `type`: `"communication"`
    - `channel`: String, must be one of the following: email, sms, slack, pager-duty, sns
    - `enabled`: Boolean, true for turning on, false for turning off this channel.
    - `manual`: Boolean, *(only used for SNS channels)* true for allowing users to manually send individual checks, false for disabling this option.
    - `filter`: Optional object (defines which checks you want to be included) including services, regions, categories, statuses, ruleIds, riskLevel, suppressed, and tags.
    - `configuration`: Object containing parameters that are different for each channel. For more details consult the [configurations-table](#configuration)
  - `relationships`: Object containing
    - `account`: Object containing
      - `data`: *(`null` if only creating organisation-level setting)* Data object containing:
        - `type`: `"accounts"`,
        - `accountId`: String, Cloud Conformity accountId


##### Filtering
The table below give more information about filter options:

| Name  | Values |
| ------------- | ------------- |
| `filter.regions`  | An array of valid AWS region strings. (e.g. ["us-west-1", "us-west-2"])<br /> For more information about regions, please refer to [Cloud Conformity Region Endpoint](https://us-west-2.cloudconformity.com/v1/regions) |
| `filter.services`  | An array of AWS service strings from the following: <br /> AutoScaling \| CloudConformity \| CloudFormation \| CloudFront \| CloudTrail \| CloudWatch \|<br />CloudWatchEvents \| CloudWatchLogs \| Config \| DynamoDB \| EBS \| EC2 \| ElastiCache \|<br />Elasticsearch \| ELB \| IAM \| KMS \| RDS \| Redshift \| ResourceGroup \| Route53 \| S3 \| SES \| SNS \| SQS \| VPC \| WAF \| ACM \| Inspector \| TrustedAdvisor \| Shield \| EMR \| Lambda \| Support \| Organizations \| Kinesis \| EFS<br /><br />For more information about services, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| `filter.categories`  | An array of category (AWS well-architected framework category) strings from the following:<br /> security \| cost-optimisation \| reliability \| performance-efficiency  \| operational-excellence <br />|
| `filter.riskLevels`  | An array of risk-level strings from the following: <br /> LOW\| MEDIUM \| HIGH \| VERY_HIGH \| EXTREME |
| `filter.statuses`  | *(only used for SNS channels)* An array of statuses strings from the following: SUCCESS \| FAILURE |
| `filter.tags`  | An array of any assigned metadata tags to your AWS resources |



##### Configuration
The table below give more information about configuration options:

| Channel  | Configuration |
| ------------- | ------------- |
| email  | `configuration.key` is "users", `configuration.value` is an array of verified users that have at least readOnly access to the account|
| sms  | `configuration.key` is "users", `configuration.value` is an array of users with verified mobile numbers that have at least readOnly access to the account|
| slack  | `{ "url": "https://hooks.slack.com/services/your-slack-webhook",` <br>`"channel": "#your-channel",` <br>`"displayIntroducedBy": false,` Boolean, true for adding user to message<br>`"displayResource": false,` Boolean, true for adding resource to message<br>`"displayTags": false}` Boolean, true for adding associated tags to message   |
| pager-duty  |   `{ "serviceName": "yourServiceName", "serviceKey": "yourServiceKey" }` |
| sns  |  `{ "arn": "arn:aws:sns:REGION:ACCOUNT_ID:TOPIC_NAME"}`  |


Example request for creating an account level pager-duty setting:

```
curl -X POST \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
  "data": [{
    "type": "settings",
    "attributes": {
      "type": "communication",
      "enabled": true,
      "filter": {
        "riskLevels": ["EXTREME"]
      },
      "configuration": {
        "serviceName": "SomeName",
        "serviceKey": "apagerdutyservicekey"
      },
      "channel": "pager-duty"
    },
    "relationships": {
      "account": {
        "data": {
          "type": "accounts",
          "id": "H19NxM15-"
        }
      }
    }
  }]
}' \
https://us-west-2-api.cloudconformity.com/v1/settings/communication
```
Example Response:

```
  [
    {
        "data": {
            "type": "settings",
            "id": "H19NxM15-:communication:pager-duty-S1xvk1zGwM",
            "attributes": {
                "type": "communication",
                "manual": "",
                "enabled": true,
                "filter": {
                    "riskLevels": [
                        "EXTREME"
                    ]
                },
                "configuration": {
                    "serviceName": "SomeName",
                    "serviceKey": "apagerdutyservicekey"
                },
                "channel": "pager-duty"
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "ryqMcJn4b"
                    }
                },
                "account": {
                    "data": {
                        "type": "accounts",
                        "id": "H19NxM15-"
                    }
                }
            }
        }
    }
]
```





## Get Communication Settings

A GET request to this endpoint allows you to get communication settings.
This feature can be used in conjunction with a POST request to copy communication settings from one account to others. An example of this function is provided in the examples folder.


##### Endpoints:

`GET /settings/communication`

##### Parameters
- `channel`: *optional* Provide if you want to only get settings for one specific channel: email, sms, slack, pager-duty, or sns.
- `accountId`: *optional* Cloud Conformity ID of the account. Provide to get only settings set for the specified account.
- `includeParents`: *optional* (true|false) Can only be used in conjunction with the accountId parameter. Specify `true` if you want to see both account level settings and organisation level settings.

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;Users with different roles can get different results from this endpoint. The table below describes the relationship between user role and type of data you get get.

| Role | Organisation-Level Settings | Account-Level Settings |
| ---- | ---- | ---- |
| ADMIN | Full settings with configurations | Full settings with configurations |
| FULL access to the account | Settings without configurations | Full settings with configurations |
| READONLY access to the account |  No settings | Settings without configurations | 
| NO access to the account |  No settings  | No settings |




Example request for email-only settings:

```

curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/settings/communication?accountId=H19NxM15-&channel=email&includeParents=true
```

Example Response for an ADMIN user:
(**Note:** The first object is for an organisation-level setting: `setting.relationships.account.data` is NULL)
```
{
    "data": [
        {
            "type": "settings",
            "id": "communication:email-HJgeFWmpVf",
            "attributes": {
                "type": "communication",
                "manual": false,
                "enabled": true,
                "filter": {
                    "services": [
                        "Organizations"
                    ],
                    "suppressed": false
                },
                "configuration": {
                    "users": [
                        "BJlqMqknVb"
                    ]
                },
                "channel": "email"
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "ryqMcJn4b"
                    }
                },
                "account": {
                    "data": null
                }
            }
        },
        {
            "type": "settings",
            "id": "ryqs8LNKW:communication:email-Ske1cKKEvM",
            "attributes": {
                "type": "communication",
                "manual": false,
                "enabled": true,
                "filter": {
                    "categories": [
                        "security"
                    ],
                    "suppressed": false
                },
                "configuration": {
                    "users": [
                        "HyL7K6GrZ"
                    ]
                },
                "channel": "email"
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "ryqMcJn4b"
                    }
                },
                "account": {
                    "data": {
                        "type": "accounts",
                        "id": "H19NxM15-"
                    }
                }
            }
        }
    ]
}
```

Example response for a user with FULL access to the acount:
(**Note:** Organisation-level setting's configuration is not shown to this user)
```
{
    "data": [
        {
            "type": "settings",
            "id": "communication:email-HJgeFWmpVf",
            "attributes": {
                "type": "communication",
                "manual": false,
                "enabled": true,
                "filter": {
                    "services": [
                        "Organizations"
                    ],
                    "suppressed": false
                },
                "channel": "email"
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "ryqMcJn4b"
                    }
                },
                "account": {
                    "data": null
                }
            }
        },
        {
            "type": "settings",
            "id": "ryqs8LNKW:communication:email-Ske1cKKEvM",
            "attributes": {
                "type": "communication",
                "manual": false,
                "enabled": true,
                "filter": {
                    "categories": [
                        "security"
                    ],
                    "suppressed": false
                },
                "configuration": {
                    "users": [
                        "HyL7K6GrZ"
                    ]
                },
                "channel": "email"
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "ryqMcJn4b"
                    }
                },
                "account": {
                    "data": {
                        "type": "accounts",
                        "id": "H19NxM15-"
                    }
                }
            }
        }
    ]
}
```

Example request for **organisation-level** email-only settings:

```

curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/settings/communication?channel=email
```

Example Response for an ADMIN user:
```
{
    "data": [
        {
            "type": "settings",
            "id": "communication:email-HJgeFWmpVf",
            "attributes": {
                "type": "communication",
                "manual": false,
                "enabled": true,
                "filter": {
                    "services": [
                        "Organizations"
                    ],
                    "suppressed": false
                },
                "configuration": {
                    "users": [
                        "BJlqMqknVb"
                    ]
                },
                "channel": "email"
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "ryqMcJn4b"
                    }
                },
                "account": {
                    "data": null
                }
            }
        }
    ]
}
```


Example request for **account-level** email-only settings:

```

curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/settings/communication?accountId=H19NxM15-&channel=email
```

Example Response for an ADMIN user:
(**Note:** Without the `includeParents` parameter, no organisation-level settings are shown.)
```
{
    "data": [
        {
            "type": "settings",
            "id": "ryqs8LNKW:communication:email-Ske1cKKEvM",
            "attributes": {
                "type": "communication",
                "manual": false,
                "enabled": true,
                "filter": {
                    "categories": [
                        "security"
                    ],
                    "suppressed": false
                },
                "configuration": {
                    "users": [
                        "HyL7K6GrZ"
                    ]
                },
                "channel": "email"
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "ryqMcJn4b"
                    }
                },
                "account": {
                    "data": {
                        "type": "accounts",
                        "id": "H19NxM15-"
                    }
                }
            }
        }
    ]
}
```



## Get Communication Setting Details
This endpoint allows you to get the details of the specified communication setting.

##### Endpoints:

`GET /settings/id`

##### Parameters
- `id`: The Cloud Conformity ID of the communication setting

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;Users with different roles can get different results from this endpoint. The table below describes the relationship between user role and type of data you get get.

| Role | Organisation-Level Settings | Account-Level Settings |
| ---- | ---- | ---- |
| ADMIN | Full setting with configurations | Full settings with configuration |
| FULL access to the account | Setting without configurations | Full setting with configurations |
| READONLY access to the account |  No setting | Setting without configurations | 
| NO access to the account |  No setting  | No setting |




Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/settings/ryqs8LNKW:communication:email-Ske1cKKEvM
```
Example Response:
```
{
    "data": {
        "type": "settings",
        "id": "ryqs8LNKW:communication:email-Ske1cKKEvM",
        "attributes": {
            "type": "communication",
            "manual": false,
            "enabled": true,
            "filter": {
                "categories": [
                    "security"
                ],
                "suppressed": false
            },
            "configuration": {
                "users": [
                    "HyL7K6GrZ"
                ]
            },
            "channel": "email"
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "ryqMcJn4b"
                }
            },
            "account": {
                "data": {
                    "type": "accounts",
                    "id": "H19NxM15-"
                }
            }
        }
    }
}
```




## Update Communication Setting
A PATCH request to this endpoint allows you to update a specific communication setting.

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;User role defines how they may use this endpoint:
1. Only ADMIN users can update organisation-level settings.
2. For an account-level setting, both ADMINs and users with FULL access to the account can update it.

##### Endpoints:

`PATCH /settings/communication/settingId`

##### Parameters
- `data`: A JSON object containing JSONAPI compliant data object with following properties
  - `type`: `settings`,
  - `attributes`: Object containing
    - `type`: `"communication"`
    - `channel`: String, must be one of the following: email, sms, slack, pager-duty, sns
    - `enabled`: Boolean, true for turning on, false for turning off this channel.
    - `manual`: Boolean, *(only used for SNS channels)* true for allowing users to manually send individual checks, false for disabling this option.
    - `filter`: Optional object (defines which checks you want to be included) including services, regions, categories, statuses, ruleIds, riskLevel, suppressed, and tags.
    - `configuration`: Object containing parameters that are different for each channel. For more details consult the [configurations-table](#configuration)


##### Filtering
The table below give more information about filter options:

| Name  | Values |
| ------------- | ------------- |
| `filter.regions`  | An array of valid AWS region strings. (e.g. ["us-west-1", "us-west-2"])<br /> For more information about regions, please refer to [Cloud Conformity Region Endpoint](https://us-west-2.cloudconformity.com/v1/regions) |
| `filter.services`  | An array of AWS service strings from the following: <br />AutoScaling \| CloudConformity \| CloudFormation \| CloudFront \| CloudTrail \| CloudWatch \|<br />CloudWatchEvents \| CloudWatchLogs \| Config \| DynamoDB \| EBS \| EC2 \| ElastiCache \|<br />Elasticsearch \| ELB \| IAM \| KMS \| RDS \| Redshift \| ResourceGroup \| Route53 \| S3 \| SES \| SNS \| SQS \| VPC \| WAF \| ACM \| Inspector \| TrustedAdvisor \| Shield \| EMR \| Lambda \| Support \| Organizations \| Kinesis \| EFS<br /><br />For more information about services, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| `filter.categories`  | An array of category (AWS well-architected framework category) strings from the following:<br /> security \| cost-optimisation \| reliability \| performance-efficiency  \| operational-excellence <br />|
| `filter.riskLevels`  | An array of risk-level strings from the following: <br /> LOW\| MEDIUM \| HIGH \| VERY_HIGH \| EXTREME |
| `filter.statuses`  | *(only used for SNS channels)* An array of statuses strings from the following: SUCCESS \| FAILURE |
| `filter.tags`  | An array of any assigned metadata tags to your AWS resources |



##### Configuration
The table below give more information about configuration options:

| Channel  | Configuration |
| ------------- | ------------- |
| email  | `configuration.key` is "users", `configuration.value` is an array of verified users that have at least readOnly access to the account|
| sms  | `configuration.key` is "users", `configuration.value` is an array of users with verified mobile numbers that have at least readOnly access to the account|
| slack  | `{ "url": "https://hooks.slack.com/services/your-slack-webhook",` <br>`"channel": "#your-channel",` <br>`"displayIntroducedBy": false,` Boolean, true for adding user to message<br>`"displayResource": false,` Boolean, true for adding resource to message<br>`"displayTags": false}` Boolean, true for adding associated tags to message   |
| pager-duty  |   `{ "serviceName": "yourServiceName", "serviceKey": "yourServiceKey" }` |
| sns  |  `{ "arn": "arn:aws:sns:REGION:ACCOUNT_ID:TOPIC_NAME"}`  |


Example request to update an account level pager-duty setting:

```
curl -X PATCH \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
    "data": {
        "type": "settings",
        "attributes": {
            "type": "communication",
            "enabled": true,
            "configuration": {
                "serviceName": "SomeOtherName",
                "serviceKey": "anotherpagerdutyservicekey"
            },
            "channel": "pager-duty"
        }
    }
}' \
https://us-west-2-api.cloudconformity.com/v1/settings/communication/H19NxM15-:communication:pager-duty-S1xvk1zGwM
```
Example Response:

```
  [
    {
        "data": {
            "type": "settings",
            "id": "H19NxM15-:communication:pager-duty-S1xvk1zGwM",
            "attributes": {
                "type": "communication",
                "manual": "",
                "enabled": true,
                "configuration": {
                    "serviceName": "SomeOtherName",
                    "serviceKey": "anotherpagerdutyservicekey"
                },
                "channel": "pager-duty"
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "ryqMcJn4b"
                    }
                },
                "account": {
                    "data": {
                        "type": "accounts",
                        "id": "H19NxM15-"
                    }
                }
            }
        }
    }
]
```





## Delete communication setting

A DELETE request to this endpoint allows a user to delete a communication setting.

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;User role defines how they may use this endpoint:
1. Only ADMIN users can delete organisation-level settings.
2. For an account-level setting, both ADMINs and users with FULL access to the account can delete it.


##### Endpoints:

`DELETE /settings/settingId`

Example Request:
```
curl -X DELETE \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/settings/AgA12vIwb:communication:email-H1gwe8WwFM
```

Example Response:

```
{
    "meta": {
        "status": "deleted"
    }
}
```









