# Cloud Conformity Report Configs API

Below is a list of the available API calls:

- [Create Report Config](#create-report-config)
- [List Report Configs](#list-report-configs)
- [Get Report Config Details](#get-report-config-details)
- [Update Report Config](#update-report-config)
- [Delete Report Config](#delete-report-config)

## Create Report Config
This endpoint is used to create a new report config.
This feature can be used in conjunction with a GET request to copy report configs from one account to others.

**IMPORTANT:**
&nbsp;&nbsp;&nbsp;Some guidelines about using this endpoint:
- Report configs are created as long as your inputs are valid. The onus is on you to ensure you don't create report configs that are duplicate or too similar in nature.
- Each report config can be **account-level**, **group-level**, or **organisation-level**.
    - If creating account-level report config, you must have a valid `accountId`.
    - If creating group-level report config, you must have a valid `groupId`. If you provided `accountId` and `groupId` at the same time, `groupId` would be ignored.
    - If creating organisation-level report config you don't provide any `accountId` or `groupId`.
    - Only ADMIN/POWER users can create organisation-level and group-level report-configs.

##### Endpoints:

`POST /report-configs`

##### Headers
`Content-Type`: application/vnd.api+json

##### Request Body Parameters
- `data`: An array containing JSONAPI compliant data objects with following properties
  - `type`: `"report-config"`,
  - `attributes`: Object containing
    - `accountId`: Optional account ID that user could access to
    - `groupId`: Optional group ID that user could access to
    - `configuration`: Object containing parameters that are different for each channel. For more details consult the [configurations-table](#configuration)


##### Configuration
There are some attributes you need to pass inside configuration object. The table below give more information about configuration options:

| Attribute | Details |
| ------------- | ------------- |
| title | This attribute is report title, which must be a string |
| sendEmail | This attribute is optional. When report was scheduled, aka the attribute `scheduled` is true, this is a toggle to send report to specific email addresses. It should be boolean when provided |
| emails | This attribute is optional, represents email addresses that report would be sent to. It must be a array contains valid email addresses. |
| filter | This attribute is optional, contains how to filter checks to generate the report. When it was not provided, it means everything by default. When it was provided, follow [Filtering](#filtering) |
| scheduled | This attribute is optional, means whether the report is scheduled. It must be a boolean value when it was provided. |
| frequency | This attribute is optional, but when the attribute `scheduled` is true, it must be a [cron expression](https://en.wikipedia.org/wiki/Cron#CRON_expression) string that starts with day of month field. For example, daily cron expression would be `* * *` |
| tz | This attribute is optional. It's used as which timezone the report schedule is based on, when the attribute `scheduled` is true. If this attribute was provided, it must be string that is a valid value of [timezone database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) name such as `Australia/Sydney`. |


##### Filtering
Refer to [Filtering options](./Filtering.md)


Example request:

```
curl -X POST \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR_API_KEY" \
-d '
{
	"data": {
		"attributes": {
			"accountId": "HksLj2_",
			"configuration": {
				"title": "Daily report of IAM",
				"scheduled": true,
				"frequency": "* * *",
				"tz": "Australia/Sydney",
				"sendEmail": true,
				"emails": [
					"youremail@somecompany.com"
				],
				"filter": {
					"services": [
						"IAM"
					],
					"suppressed": true
				}
			}
		}
	}
}' \
https://us-west-2-api.cloudconformity.com/v1/report-configs
```
Example Response:

```
{ "data": {
	"type": "report-config",
	"id": "vO4SPFxrcC",
	"attributes": {
		"type": "report-config",
		"configuration": {
			"title": "Daily Report of IAM",
			"scheduled": true,
			"frequency": "* * *",
			"tz": "Australia/Sydney",
			"sendEmail": true,
			"emails": [
				"youremail@somecompany.com"
			],
			"filter": {
				"services": [
					"IAM"
				],
				"suppressed": true
			}
		},
		"is-account-level": true,
		"is-group-level": false,
		"is-organisation-level": false
	},
	"relationships": {
		"organisation": {
			"data": {
				"type": "organisations",
				"id": "2kj0JksM"
			}
		},
		"account": {
			"data": {
				"type": "accounts",
				"id": "HksLj2_"
			}
		},
		"group": {
			"data": null
		}
	}
} }
```


## List Report Configs 

A GET request to this endpoint allows you to list report configs filter by `accountId` or `groupId` or under the organisation if you have enough privileges.


##### Endpoints:

`GET /report-configs`

##### Headers
`Content-Type`: application/vnd.api+json

##### Query Parameters
- `accountId`: *optional* Cloud Conformity ID of the account. Provide to get only report configs for the specified account.
- `groupId`: *optional* Cloud conformity ID of the group. Provide to get only report configs for the specified group. *Notice*: if you provided `accountId` at the same time, `groupId` would be ignored.

*Query Organisation Level Report Configs*: querying without any query parameters.


Example request:

```

curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR_API_KEY" \
https://us-west-2-api.cloudconformity.com/v1/report-configs?accountId=ryi6NPivW
```

Example Response for an ADMIN user:
```
{ "data": [
	{
		"type": "report-config",
		"id": "ryi6NPivW:report-config:3zOFWeqVnp",
		"attributes": {
			"type": "report-config",
			"configuration": {
				"title": "Report Title #1",
				"scheduled": true,
				"frequency": "1 * *",
				"tz": "Australia/Sydney",
				"sendEmail": true,
				"emails": [
					"john@somecompany.com"
				],
				"filter": {
					"services": [
						"Kinesis"
					],
					"suppressed": true
				}
			},
			"is-account-level": true,
			"is-group-level": false,
			"is-organisation-level": false
		},
		"relationships": {
			"organisation": {
				"data": {
					"type": "organisations",
					"id": "B1nHYYpwx"
				}
			},
			"account": {
				"data": {
					"type": "accounts",
					"id": "ryi6NPivW"
				}
			},
			"group": {
				"data": null
			},
			"profile": {
				"data": null
			}
		}
	},
	{
		"type": "report-config",
		"id": "ryi6NPivW:report-config:4AYIaOZ_5f",
		"attributes": {
			"type": "report-config",
			"configuration": {
				"title": "Report title #2",
				"scheduled": true,
				"frequency": "* * *",
				"tz": "Australia/Sydney",
				"sendEmail": true,
				"emails": [
					"john@somecompany.com"
				],
				"filter": {
					"services": [
						"IAM"
					],
					"suppressed": true
				}
			},
			"is-account-level": true,
			"is-group-level": false,
			"is-organisation-level": false
		},
		"relationships": {
			"organisation": {
				"data": {
					"type": "organisations",
					"id": "B1nHYYpwx"
				}
			},
			"account": {
				"data": {
					"type": "accounts",
					"id": "ryi6NPivW"
				}
			},
			"group": {
				"data": null
			},
			"profile": {
				"data": null
			}
		}
	}
]}
```

## Get Report Config Details
This endpoint allows you to get the details of the specified report config.

##### Endpoints:

`GET /report-configs/id`

##### Headers
`Content-Type`: application/vnd.api+json

##### Path Parameters
- `id`: The Cloud Conformity ID of the report config


Example request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR_API_KEY" \
https://us-west-2-api.cloudconformity.com/v1/report-configs/ryi6NPivW:report-config:7BTWU6tSvd
```
Example Response:
```
{
	"data": {
		"type": "report-config",
		"id": "ryi6NPivW:report-config:7BTWU6tSvd",
		"attributes": {
			"type": "report-config",
			"manual": false,
			"enabled": true,
			"configuration": {
				"title": "Daily report",
				"scheduled": true,
				"frequency": "* * *",
				"tz": "Australia/Sydney",
				"sendEmail": true,
				"emails": [
					"doe@somecompany.com"
				],
				"filter": {
					"services": [
						"IAM"
					],
					"suppressed": true
				}
			},
			"is-account-level": true,
			"is-group-level": false,
			"is-organisation-level": false
		},
		"relationships": {
			"organisation": {
				"data": {
					"type": "organisations",
					"id": "B1nHYYpwx"
				}
			},
			"account": {
				"data": {
					"type": "accounts",
					"id": "ryi6NPivW"
				}
			},
			"group": {
				"data": null
			},
			"profile": {
				"data": null
			}
		}
	}
}
```




## Update Report Config
A PATCH request to this endpoint allows you to update a specific report config.

##### Endpoints:

`PATCH /report-configs/id`

##### Headers
`Content-Type`: application/vnd.api+json

##### Path Parameters
`id` is the Cloud Conformity report config id

##### Request Body Parameters
- `data`: An array containing JSONAPI compliant data objects with following properties
  - `type`: `"report-config"`,
  - `attributes`: Object containing
    - `configuration`: Object containing parameters that are different for each channel. For more details consult the [configurations-table](#configuration)

**Note:** accountId or groupId could not be changed after report-config was created.


Example request:

```
curl -X PATCH \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR_API_KEY" \
-d '
{
	"data": {
		"attributes": {
			"configuration": {
				"title": "Disabed Report",
				"scheduled": false,
				"frequency": "* * *",
				"tz": "Australia/Sydney",
				"sendEmail": false,
				"filter": {
					"services": [
						"Kinesis"
					],
					"suppressed": true
				}
			}
		}
	}
}' \
https://us-west-2-api.cloudconformity.com/v1/report-configs/ryi6NPivW:report-config:7BTWU6tSvd
```
Example Response:

```
{
	"type": "report-config",
	"id": "ryi6NPivW:report-config:7BTWU6tSvd",
	"attributes": {
		"type": "report-config",
		"configuration": {
			"title": "Disabed Report",
			"scheduled": false,
			"frequency": "* * *",
			"tz": "Australia/Sydney",
			"sendEmail": false,
			"filter": {
				"services": [
					"Kinesis"
				],
				"suppressed": true
			}
		}
		"is-account-level": true,
		"is-group-level": false,
		"is-organisation-level": false
	},
	"relationships": {
		"organisation": {
			"data": {
				"type": "organisations",
				"id": "B1nHYYpwx"
			}
		},
		"account": {
			"data": {
				"type": "accounts",
				"id": "ryi6NPivW"
			}
		},
		"group": {
			"data": null
		}
	}
}
```


## Delete report config

A DELETE request to this endpoint allows a user to delete a report config.


##### Endpoints:
`DELETE /report-configs/id`

##### Path Parameters
`id` is the Cloud Conformity report config id

##### Headers
`Content-Type`: application/vnd.api+json

Example request:
```
curl -X DELETE \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR_API_KEY" \
https://us-west-2-api.cloudconformity.com/v1/report-configs/ryi6NPivW:report-config:4AYIaOZ_5f
```

Example Response:

```
{
	"meta": {
		"status": "deleted"
	}
}
```
