# Cloud Conformity Profiles API


Below is a list of the available APIs:

- [List All Profiles](#list-all-profiles)
- [Get Profile Details](#get-profile-details)
- [Create New Profile](#create-new-profile)
- [Update A Profile](#update-a-profile)
- [Delete A Profile](#delete-a-profile)

## User Privileges
There are 4 possible Cloud Conformity roles. Each role grants different levels of access via the api. The roles are:

- __organisation admin__
- __organisation user with full access to account__
- __organisation user with read-only access to account__
- __organisation user with no access to account__

User access to each endpoint is listed below:

| Endpoint | admin | full access user| read-only user | no access user |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET /profiles  *(get a list of profiles)* | Y | N | N | N |
| GET /profiles/id  *(get details about a profile)* | Y | N | N | N |
| POST /profiles  *(create a new profile)* | Y | N | N | N |
| PATCH /profiles/id  *(update a profile)* | Y | N | N | N |
| DELETE /profiles/id  *(delete a profile)* | Y | N | N | N |
| GET /profiles/id/rules *(get a list of rules associated to the profile)* | Y | N | N | N |
| GET /profiles/id/rules/rule-id *(get details about a rule)* | Y | N | N | N |
| PUT /profiles/id/rules *(update rule settings)* | Y | N | N | N |
| DELETE /profiles/id/rules/rule-id *(delete a rule)* | Y | N | N | N |
| DELETE /profiles/id/rules *(delete all rules)* | Y | N | N | N |

* Response will depend on the ProfileId's and RuleId's added to the query parameter. For example, if a user has no access to a profile and they modify profile details, an error will be thrown. Alternatively, if a user has no access to a profile and they modify rule settings for that profile, an error will be thrown.

* User role will limit the amount of data they can GET or POST/PATCH. For more information, consult the [Settings ReadMe](./Settings.md#).

## List All Profiles

This endpoint displays a list of profiles associated to an organisation.

##### Endpoints:

`GET /profiles`

##### Headers
`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters
This endpoint takes no parameters.

Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/profiles/
```
Example Response:

```
{
	"data": [
		{
			"type": "profile",
			"id": "profile: {profile-id}",
			"attributes": {
				"type": "profile",
				"configuration": {
					"name": "Test-001",
					"description": "This is the initial description for test profile"
				},
				"created-by": "{user-id}",
				"created-date": {created-date},
				"is-account-level": false,
				"is-group-level": false,
				"is-organisation-level": true
			},
			"relationships": {
				"organisation": {
					"data": {
						"type": "organisations",
						"id": "{organisation-id}"
					}
				},
				"account": {
					"data": null
				},
				"group": {
					"data": null
				},
				"profile": {
					"data": null
				}
			}
		},{
			"type": "profile",
			"id": "profile: {profile-id-2}",
			"attributes": {
				"type": "profile",
				"configuration": {
					"name": "Test-002",
					"description": "This is the initial description for test profile 2"
				},
				"created-by": "{user-id}",
				"created-date": {created-date},
				"is-account-level": false,
				"is-group-level": false,
				"is-organisation-level": true
			},
			"relationships": {
				"organisation": {
					"data": {
						"type": "organisations",
						"id": "{organisation-id}"
					}
				},
				"account": {
					"data": null
				},
				"group": {
					"data": null
				},
				"profile": {
					"data": null
				}
			}
		}
	]
}

```


## Get Profile Details

This endpoint allows you to get the details of the specified profile.

##### Endpoints:

`GET /profiles/id`

##### Headers
`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters
- `id`: The Cloud Conformity ID of the profile


Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/profiles/{profile-id}/
```
Example Response:
```
{
	"data": [
		{
			"type": "profile",
			"id": "profile: {profile-id}",
			"attributes": {
				"type": "profile",
				"configuration": {
					"name": "Test-001",
					"description": "This is the initial description for test profile"
				},
				"created-by": "{user-id}",
				"created-date": {created-date},
				"is-account-level": false,
				"is-group-level": false,
				"is-organisation-level": true
			},
			"relationships": {
				"organisation": {
					"data": {
						"type": "organisations",
						"id": "{organisation-id}"
					}
				},
				"account": {
					"data": null
				},
				"group": {
					"data": null
				},
				"profile": {
					"data": null
				}
			}
		}
	]
}

```


## Create New Profile

This endpoint allows you to create a new profile.

##### Endpoints:

`POST /profiles`

##### Headers
`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters
- `data`: An array containing JSONAPI compliant data objects with following properties
  - `type`: `"profile"`,
  - `attributes`: Object containing:
    - `configuration`: Object containing profile parameters. For more details consult the [configurations-table](#configuration)


##### Configuration
There are some attributes you need to pass inside the configuration object. The table below provides more information about configuration options:

| Attribute | Details |
| ------------- | ------------- |
| name | This attribute is the name of the profile, which must be a string |
| description |  This attribute is the description of the profile, which must be a string |

Example Request:

```
curl -X POST -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{ "data": {
	"attributes": {
		"configuration": {
			"name": "SecurityProfile",
			"description": "This profile is for the Security Team to configure their alerts."
			}
		}
	}
}' \
https://us-west-2-api.cloudconformity.com/v1/profiles/
```
Example Response:

```
{
	"data": [
		{
			"type": "profile",
			"id": "profile: {profile-id}",
			"attributes": {
				"type": "profile",
				"configuration": {
					"name": "SecurityProfile",
					"description": "This profile is for the Security Team to configure their alerts."
				},
				"created-by": "{user-id}",
				"created-date": {created-date},
				"is-account-level": false,
				"is-group-level": false,
				"is-organisation-level": true
			},
			"relationships": {
				"organisation": {
					"data": {
						"type": "organisations",
						"id": "{organisation-id}"
					}
				},
				"account": {
					"data": null
				},
				"group": {
					"data": null
				},
				"profile": {
					"data": null
				}
			}
		}
	]
}
```


## Update A Profile

This endpoint allows you to update a profile.

##### Endpoints:

`PATCH /profiles/id`

##### Headers
`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters
- `data`: An array containing JSONAPI compliant data objects with following properties
  - `type`: `"profile"`,
  - `attributes`: Object containing:
    - `configuration`: Object containing profile parameters. For more details consult the [configurations-table](#configuration)

Example Request:

```
curl -X PATCH -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
	"data": {
		"attributes": {
			"configuration": {
				"name": "NewSecurityProfile",
				"description": "New description for the security profile."
			}
		}
	}
}' \
https://us-west-2-api.cloudconformity.com/v1/profiles/{profile-id}/
```
Example Response:

```
{
	"data": [
		{
			"type": "profile",
			"id": "profile: {profile-id}",
			"attributes": {
				"type": "profile",
				"configuration": {
					"name": "NewSecurityProfile",
					"description": "New description for the security profile."
				},
				"created-by": "{user-id}",
				"created-date": {created-date},
				"is-account-level": false,
				"is-group-level": false,
				"is-organisation-level": true
			},
			"relationships": {
				"organisation": {
					"data": {
						"type": "organisations",
						"id": "{organisation-id}"
					}
				},
				"account": {
					"data": null
				},
				"group": {
					"data": null
				},
				"profile": {
					"data": null
				}
			}
		}
	]
}
```


## Delete A Profile

This endpoint allows you to delete a specified profile.

##### Endpoints:

`DELETE /profiles/id`

##### Headers
`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters
- `id`: The Cloud Conformity ID of the profile

Example Request:

```
curl -X DELETE -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/profiles/{profile-id}/
```
Example Response:
```
{ "meta": { "status": "deleted" } }
```
