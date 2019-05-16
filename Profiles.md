# Cloud Conformity Profiles API


Below is a list of the available APIs:

- [List All Profiles](#list-all-profiles)
- [Get Profile and Rule Settings](#get-profile-and-rule-settings)
- [Save New Profile and Add Rule Settings to Profile](#save-new-profile-and-rule-settings)
- [Update Profile and Rule Settings](#update-profile-and-rule-settings)
- [Delete Profile and Rule Settings](#delete-profile-and-rule-settings)

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
| GET /profiles/id  *(get details about a profile and rule settings)* | Y | N | N | N |
| POST /profiles  *(save a profile and rule settings)* | Y | N | N | N |
| PATCH /profiles/id  *(update a profile and rule settings)* | Y | N | N | N |
| DELETE /profiles/id  *(delete a profile and rule settings)* | Y | N | N | N |

* Response will depend on the ProfileId's, Include Settings flag and Types condition added to the query parameter. For example, if a user has no access to a profile and they modify profile details, an error will be thrown. Alternatively, if a user has no access to a profile and they modify rule settings for that profile, an error will be thrown.

| Parameters | Details | Value |
| ------------- | ------------- | ------------- |
| includes | This parameter provides the option to include additional information to the profile. Currently, only Rule Settings is supported. | ruleSettings |


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
      "type": "profiles",
      "id": "1",
      "attributes": {
        "configuration": {
          "name": "Profile1",
          "description": "Description2"
        }
      }
    },
    {
      "type": "profiles",
      "id": "2",
      "attributes": {
        "configuration": {
            "name": "Profile2",
            "description": "Description2"
        }
      }
    } ...
  ]
}
```


## Get Profile and Rule Settings

This endpoint allows you to get the details of the specified profile.

##### Endpoints:

`GET /profiles/id`

##### Headers
`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters
- `id`: The Cloud Conformity ID of the profile

##### Getting Profile Details

Example Request for getting details of a profile:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/profiles/{profile-id}
```
Example Response:
```
{
  "data": {
    "type": "profiles",
    "id": "{profile-id}",
    "attributes": {
      "configuration": {
        "name": "Test-Profile",
        "description": "Testing Save API"
      }
    }
  }
}

```

##### Getting Profile Details with Included Rule Settings

Example request to get a profile and its rule settings.
```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/profiles/{profile-id}?includes=ruleSettings
```

Example Response:
```
{
  "included": [
    {
      "type": "rules",
      "id": "{profile-id}:rule:S3-003",
      "attributes": {
        "configuration": {
          "enabled": true,
          "riskLevel": "EXTREME",
          "extraSettings": [],
          "exceptions": { "tags": ["SaveTestTag"], "resources": [] },
          "ruleId": "S3-003"
        }
      }
    },
    {
      "type": "rules",
      "id": "{profile-id}:rule:S3-002",
      "attributes": {
        "configuration": {
          "enabled": true,
          "riskLevel": "LOW",
          "extraSettings": [],
          "exceptions": { "tags": ["SaveTestTag2"], "resources": [] },
          "ruleId": "S3-002"
        }
      }
    }
  ],
  "data": {
    "type": "profiles",
    "id": "{profile-id}",
    "attributes": {
      "configuration": {
        "name": "Test-Profile",
        "description": "Testing Save API"
      }
    },
    "relationships": {
      "ruleSettings": {
        "data": [
          { "type": "rules", "id": "{profile-id}:rule:S3-003" },
          { "type": "rules", "id": "{profile-id}:rule:S3-002" }
        ]
      }
    }
  }
}
```

## Save New Profile and Rule Settings

This endpoint allows you to create a new profile and subsequently add rule settings to the new profile.

##### Endpoints:

`POST /profiles`

##### Headers
`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters
- `requestBody`:
  - `data`: An object containing JSONAPI compliant data objects with following properties
    - `type`: `"profile"`,
    - `attributes`: Object containing:
      - `configuration`: Object containing profile parameters. For more details, consult the [profile-configuration-table](#profile-configuration) below.


##### Profile Configuration
There are some attributes you need to pass inside the configuration object. The table below provides more information about configuration options:

| Attribute | Details |
| ------------- | ------------- |
| name | This attribute is the name of the profile, which must be a string |
| description |  This attribute is the description of the profile, which must be a string |

##### Saving a new Profile
The expected behavior of this request to create a new profile.

Example Request for saving a new profile:
```
curl -X POST -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
  requestBody: {
    data: {
      type: "profile",
      attributes: {
        configuration: {
          name: "Test-New-Profile",
          description: "Testing Save New API"
        }
      }
    }
  }
}' \
https://us-west-2-api.cloudconformity.com/v1/profiles
```

Example Response:
```
{
  "data": {
    "type": "profiles",
    "id": "{profile-id}",
    "attributes": {
      "configuration": {
        "name": "Test-New-Profile",
        "description": "Testing Save New API"
      }
    }
  }
}

```

##### Saving Rule Settings to your Profile
This option allows you to add rule settings to your profile at creation or afterwards.

###### Parameters
- `id`: Profile ID.
- `requestBody`: All of the below fields must be populated within request body:
  - `data`: An array containing JSONAPI compliant data objects with following properties:
    - `type`: `"profile"`,
    - `attributes`: Object containing:
      - `configuration`: Object containing profile parameters. For more details consult the [profile-configuration-table](#profile-configuration).
    - `relationships`: Object containing rule settings that are associated to this profile:
      - `ruleSettings`:
      - `data`:  An array of associated rule settings.
  - `included`: An array containing JSONAPI compliant data objects with following properties:
    - `type`: `"rule"`,
    - `attributes`: Object containing attributes of this type:
      - `configuration`: Object containing profile parameters. For more details consult the [rule-settings-configuration-table](#rule-settings-configuration) below.


###### Rule Settings Configuration
There are some attributes you need to pass inside the rule settings configuration object. The table below provides more information about configuration options:

| Attribute | Details | Accepted Values
| ------------- | ------------- | ------------- |
| enabled | This attribute determines whether this setting is enabled | true, false |
| riskLevel |  This attribute configures the level of risk assigned to the rule  | "EXTREME", "VERY_HIGH", "HIGH", "MEDIUM", "LOW" |
| extraSettings |  This array stores objects that configure the extra settings to this rule (NOTE: This applies to RTM rule settings) | {name: "ttl", type: "ttl", value: 72, ttl: true} |
| exceptions |  This array stores objects that configure exceptions to this rule | |
| exceptions: tags |  This attribute tags this exception | e.g. ApplyToNewS3Bucket |
| exceptions: resources |  This attribute applies this exception to the following resources | S3 |
| ruleId |  This attribute is id of the rule type being updated | e.g. S3-001 (refer to Cloud Conformity rules for the full list) |

###### Save new profile with rule settings included
The expected behavior of this request to save a new profile and configure new rule settings associated with that profile.

Example request for new profile creation including rule settings:
```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
  requestBody: {
    data: {
      type: profile,
      attributes: {
        configuration: {
          name: "Test-Profile",
          description: "Testing Save API"
        }
      },
      relationships: {
        ruleSettings: {
          data: [
            {
              type: "rule",
              id: "rule:S3-003"
            }
          ]
        }
      }
    },
    included: [
      {
        type: "rule",
        id: "rule:S3-003",
        attributes: {
          configuration: {
            enabled: true,
            riskLevel: "EXTREME",
            extraSettings: [],
            exceptions: {
              tags: ["SaveTestTag"],
              resources: []
            },
            ruleId: "S3-003"
          }
        }
      }
    ]
  }
}'\
https://us-west-2-api-development.cloudconformity.com/v1/profiles/
```
Example Response:
```
{
  "included": [
    {
      "type": "rules",
      "id": "gh-RwlRno:rule:S3-003",
      "attributes": {
        "configuration": {
          "enabled": true,
          "riskLevel": "EXTREME",
          "extraSettings": [],
          "exceptions": {
            "tags": ["SaveTestTag"],
            "resources": []
          },
          "ruleId": "S3-003"
        }
      }
    }
  ],
  "data": {
    "type": "profiles",
    "id": "gh-RwlRno",
    "attributes": {
      "configuration": {
        "name": "Test-Profile",
        "description": "Testing Save API"
      }
    },
    "relationships": {
      "ruleSettings": {
        "data": [
          {
            "type": "rules",
            "id": "gh-RwlRno:rule:S3-003"
          }
        ]
      }
    }
  }
}
```

###### Save rule settings in an existing Profile
The expected behavior of this request to overwrite all existing rule settings to a configured profile or write new rule settings to an existing empty profile.

You must indicate the profile id in the request url otherwise a new profile will be created with the indicated rule settings configured.

Example Request for saving rule settings:
```
curl -X POST -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
  requestBody: {
    data: {
      type: "profile",
      id: "{profile-id}",
      attributes: {
        configuration: {
          name: "Test-Profile",
          description: "Testing Save API"
        }
      },
      relationships: {
        ruleSettings: {
          data: [
            {
              type: "rule",
              id: "{profile-id}:rule:S3-003"
            },
            {
              ...: More Settings
            }
          ]
        }
      }
    },
    included: [
      {
        type: "rule",
        id: "{profile-id}:rule:S3-003",
        attributes: {
          configuration: {
            enabled: true,
            riskLevel: "EXTREME",
            extraSettings: [],
            exceptions: {
              tags: ["SaveTestTag"],
              resources: []
            },
            ruleId: "S3-003"
          }
        }
      },
      {
        ...: More Settings
      }
    ]
  }
}' \
https://us-west-2-api.cloudconformity.com/v1/profiles?id={profile-id}
```

Example Response:
```
{
  "included": [
    {
      "type": "rules",
      "id": "{profile-id}:rule:S3-003",
      "attributes": {
        "configuration": {
          "enabled": true,
          "riskLevel": "EXTREME",
          "extraSettings": [],
          "exceptions": { "tags": ["SaveTestTag"], "resources": [] },
          "ruleId": "S3-003"
        }
      }
    },
    {
      "type": "rules",
      "id": "{profile-id}:rule:S3-002",
      "attributes": {
        "configuration": {
          "enabled": true,
          "riskLevel": "LOW",
          "extraSettings": [],
          "exceptions": { "tags": ["SaveTestTag2"], "resources": [] },
          "ruleId": "S3-002"
        }
      }
    }
  ],
  "data": {
    "type": "profiles",
    "id": "{profile-id}",
    "attributes": {
      "configuration": {
        "name": "Test-Profile",
        "description": "Testing Save API"
      }
    },
    "relationships": {
      "ruleSettings": {
        "data": [
          { "type": "rules", "id": "{profile-id}:rule:S3-003" },
          { "type": "rules", "id": "{profile-id}:rule:S3-002" }
        ]
      }
    }
  }
}

```

###### Delete all settings in an existing Profile
The expected behavior of this request to preserve an existing profile's configuration while deleting all existing rule settings.

Example Request for modifying an existing profile and deleting its settings:
```
curl -X POST -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
  requestBody: {
    data: {
      type: "profile",
      id: "{profile-id}",
      attributes: {
        configuration: {
          name: "Test-Profile",
          description: "Testing Save API"
        }
      },
      relationships: {}
    }
  }
}' \
https://us-west-2-api.cloudconformity.com/v1/profiles?id={profile-id}

```
Example Response:
```
{
  "data": {
    "type": "profiles",
    "id": "{profile-id}",
    "attributes": {
      "configuration": {
        "name": "Test-Profile",
        "description": "Testing Save API"
      }
    }
  }
}
```

## Update Profile and Rule Settings

This endpoint allows you to update profile details and its associated rule settings.

##### Endpoints:

`PATCH /profiles/id`

##### Headers
`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters
- `data`: An array containing JSONAPI compliant data objects with following properties
  - `type`: `"profile"`,
  - `attributes`: Object containing:
    - `configuration`: Object containing profile parameters. For more details consult the [profile-configuration-table](#profile-configuration)

Example Request to only update profile details:

```
curl -X PATCH -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
    requestBody: {
      data: {
        type: "profile",
        id: "{profile-id}",
        attributes: {
          configuration: {
            name: "Old-Profile-Name",
            description: "New Description"
          }
        }
      }
    }
  }' \
https://us-west-2-api.cloudconformity.com/v1/profiles?id={profile-id}
```
Example Response:
```
{
  "data": {
    "type": "profiles",
    "id": "{profile-id}",
    "attributes": {
      "configuration": {
        "name": "Old-Profile-Name",
        "description": "New Description"
      }
    }
  }
}
```
To update rule settings along with your profile:

###### Parameters
- `id`: Profile ID.
- `requestBody`: All of the below fields must be populated within request body:
  - `data`: An array containing JSONAPI compliant data objects with following properties:
    - `type`: `"profile"`,
    - `attributes`: Object containing:
      - `configuration`: Object containing profile parameters. For more details consult the [profile-configuration-table](#profile-configuration).
    - `relationships`: Object containing rule settings that are associated to this profile:
      - `ruleSettings`:
      - `data`:  An array of associated rule settings.
  - `included`: An array containing JSONAPI compliant data objects with following properties:
    - `type`: `"rule"`,
    - `attributes`: Object containing attributes of this type:
      - `configuration`: Object containing profile parameters. For more details consult the [rule-settings-configuration-table](#rule-settings-configuration).
			
Example Request to update profile details and one rule setting:
```
curl -X PATCH -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
  requestBody: {
    data: {
      type: "profile",
      id: "{profile-id}",
      attributes: {
        configuration: {
          name: "Old-Profile-Name",
          description: "New Description"
        }
      },
      relationships: {
        ruleSettings: {
          data: [
            {
              type: "rule",
              id: "{profile-id}:rule:S3-003"
            }
          ]
        }
      }
    },
    included: [
      {
        type: "rule",
        id: "{profile-id}:rule:S3-003",
        attributes: {
          configuration: {
            enabled: true,
            riskLevel: "HIGH",
            extraSettings: [],
            exceptions: {
              tags: "[UpdateTestTag]",
              resources: []
            },
            ruleId: "S3-003"
          }
        }
      }
    ]
  }
}'\
https://us-west-2-api.cloudconformity.com/v1/profiles?id={profile-id}
```
Example Response:

```
{
  "included": [
    {
      "type": "rules",
      "id": "{profile-id}:rule:S3-002",
      "attributes": {
        "configuration": {
          "enabled": true,
          "riskLevel": "HIGH",
          "extraSettings": [],
          "exceptions": { "tags": ["UpdateTestTag"], "resources": [] },
          "ruleId": "S3-002"
        }
      }
    },
    {
      "type": "rules",
      "id": "{profile-id}:rule:S3-003",
      "attributes": {
        "configuration": {
          "enabled": true,
          "riskLevel": "EXTREME",
          "extraSettings": [],
          "exceptions": { "tags": ["OldTestTag"], "resources": [] },
          "ruleId": "S3-003"
        }
      }
    }
  ],
  "data": {
    "type": "profiles",
    "id": "{profile-id}",
    "attributes": {
      "configuration": {
        "name": "Old-Profile-Name",
        "description": "New Description"
      }
    },
    "relationships": {
      "ruleSettings": {
        "data": [
          { "type": "rules", "id": "{profile-id}:rule:S3-002" },
          { "type": "rules", "id": "{profile-id}:rule:S3-003" }
        ]
      }
    }
  }
}

```


## Delete Profile and Rule Settings

This endpoint allows you to delete a specified profile and all affiliated rule settings.

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
https://us-west-2-api.cloudconformity.com/v1/profiles/{profile-id}
```
Example Response:
```
{ "meta": { "status": "deleted" } }
```
