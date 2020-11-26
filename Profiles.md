# Cloud Conformity Profiles API

Below is a list of the available APIs:

- [List All Profiles](#list-all-profiles)
- [Get Profile and Rule Settings](#get-profile-and-rule-settings)
- [Save New Profile and Add Rule Settings to Profile](#save-new-profile-and-rule-settings)
- [Update Profile and Rule Settings](#update-profile-and-rule-settings)
- [Delete Profile and Rule Settings](#delete-profile-and-rule-settings)
- [Apply Profile to Accounts](#apply-profile-to-accounts)

## User Privileges

There are 4 possible Cloud Conformity roles. Each role grants different levels of access via the API. The roles are:

- **organisation admin**
- **organisation user with full access to account**
- **organisation user with read-only access to account**
- **organisation user with no access to account**

User access to each endpoint is listed below:

| Endpoint                                                           | admin | full access user | read-only user | no access user |
| ------------------------------------------------------------------ | :---: | :--------------: | :------------: | :------------: |
| GET /profiles _(get a list of profiles)_                           |   Y   |        N         |       N        |       N        |
| GET /profiles/id _(get details about a profile and rule settings)_ |   Y   |        N         |       N        |       N        |
| POST /profiles _(save a profile and rule settings)_                |   Y   |        N         |       N        |       N        |
| PATCH /profiles/id _(update a profile and rule settings)_          |   Y   |        N         |       N        |       N        |
| DELETE /profiles/id _(delete a profile and rule settings)_         |   Y   |        N         |       N        |       N        |
| POST /profiles/id/apply _(apply a profile to a set of accounts)_   |   Y   |        N         |       N        |       N        |

- The response will depend on the ProfileId's, Include Settings flag and Types condition added to the query parameter. For example, if a user has no access to a profile and they modify profile details, an error will be thrown. Alternatively, if a user has no access to a profile and they modify rule settings for that profile, an error will be thrown.

| Parameters | Details                                                                                                                          | Value        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| includes   | This parameter provides the option to include additional information to the profile. Currently, only Rule Settings is supported. | ruleSettings |

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
  "meta": {},
  "data": [
    {
      "type": "profiles",
      "id": {profile-id},
      "attributes": {
        "name": "Test-Profile-1",
        "description": "A test profile with rule settings"
      }
    },
    {
      "type": "profiles",
      "id": {profile-id},
      "attributes": {
          "name": "Test-Profile-2",
          "description": "A second test profile with rule settings"
      }
    }, ...more profiles
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

Example request for getting details of a profile:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/profiles/{profile-id}
```

Example Response:

```
{
  "meta": {},
  "data": {
    "type": "profiles",
    "id": {profile-id},
    "attributes": {
      "name": "Test-Profile-1",
      "description": "A test profile with rule settings."
    }
  }
}

```

##### Getting Profile Details with Included Rule Settings

Example request to get a profile and its rule settings.

Note: A deprecation warning will be included in the response for rules that are deprecated.

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/profiles/{profile-id}?includes=ruleSettings
```

Example Response:

```
{
  "meta": {
    "deprecation": {
      "warning": {
        "message": "1 manually configured rule in this profile is deprecated. Refer to our Help Pages for instructions.",
        "link": "https://www.cloudconformity.com/help/rules.html",
        "rules": [
            "EC2-XXX"
        ]
      }
    }
  },
  "included": [
    {
      "type": "rules",
      "id": "EC2-001",
      "attributes": {
        "enabled": false,
        "exceptions": {
          "tags": ["TestUpdateTags"],
          "resources": []
        },
        "extraSettings": [],
        "riskLevel": "LOW",
        "provider": "aws"
      }
    },
    {
      "type": "rules",
      "id": "RTM-002",
      "attributes": {
        "enabled": true,
        "exceptions": {
          "tags": [],
          "resources": []
        },
        "extraSettings": [
          {
            "name": "ttl",
            "type": "ttl",
            "value": 72,
            "ttl": true
          }
        ],
        "riskLevel": "MEDIUM",
        "provider": "aws"
      }
    }
  ],
  "data": {
    "type": "profiles",
    "id": {profile-id},
    "attributes": {
      "name": "Test-Profile-1",
      "description": "A test profile with rule settings."
    },
    "relationships": {
      "ruleSettings": {
        "data": [
          {
            "type": "rules",
            "id": "EC2-001"
          },
          {
            "type": "rules",
            "id": "RTM-002"
          }
        ]
      }
    }
  }
}
```

## Save New Profile and Rule Settings

This endpoint allows you to create a new profile and subsequently add rule settings to the new profile. Saving rule settings via this endpoint will overwrite existing settings with those passed in the request. This allows for the following requests to be made:

| Request                                                                                       | Details                                                                                                             | Parameters                                      |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| [Saving a new profile](#saving-a-new-profile)                                                 | Save a new profile with name and description                                                                        | Profile name and description                    |
| [Save new profile with rule settings included](#save-new-profile-with-rule-settings-included) | Save a new profile and a batch of configured rule settings upon profile creation                                    | Profile name and description, and rule settings |
| [Save rule settings to an existing Profile](#save-rule-settings-to-an-existing-profile)       | Add a batch of configured rule settings to an empty profile or overwrite existing rule settings and profile details | Profile details and Rule settings               |
| [Delete all settings](#delete-all-settings)                                                   | Retain the profile but clear all rule settings                                                                      | Profile ID                                      |

##### Endpoints:

`POST /profiles`

##### Headers

`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters

- `data`: An object containing JSONAPI compliant data objects with following properties
  - `type`: `"profiles"`,
  - `attributes`: Object containing profile attributes. For more details, consult the [profile-attributes-table](#profile-attributes) below.

##### Profile Attributes

There are some attributes you need to pass inside the attributes object. The table below provides more information about attributes options:

| Attribute   | Details                                                                  |
| ----------- | ------------------------------------------------------------------------ |
| name        | This attribute is the name of the profile, which must be a string        |
| description | This attribute is the description of the profile, which must be a string |

##### Saving a new Profile

The expected behaviour of this request to create a new profile.

Example request for saving a new profile:
```
curl -X POST -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
  "data": {
    "type": "profiles",
    "attributes": {
      "name": "New-Test-Profile",
      "description": "A test description for a new profile."
    }
  }
}' \
https://us-west-2-api.cloudconformity.com/v1/profiles/
```

Example Response:

```
{
  "meta": {},
  "data": {
    "type": "profiles",
    "id": {profile-id},
    "attributes": {
      "name": "New-Test-Profile",
      "description": "A test description for a new profile."
    }
  }
}

```

##### Saving Rule Settings to your Profile

This option allows you to add rule settings to your profile at creation or afterwards.

###### Parameters

- `id`: Profile ID.
- `data`: All of the below fields must be populated within the request body:
  - `data`: An array containing JSONAPI compliant data objects with the following properties:
    - `type`: `"profiles"`,
    - `attributes`: Object containing profile attributes. For more details consult the [profile-attributes-table](#profile-attributes).
    - `relationships`: Object containing rule settings that are associated to this profile:
      - `ruleSettings`:
        - `data`: An array of associated rule setting IDs. - `type`: `"rules"`, `id`: `"<RULE-ID>"`
  - `included`: An array containing JSONAPI compliant data objects with the following properties:
    - `type`: `"rules"`,
    - `id`: This attribute is the id of the rule type being updated e.g. S3-001 (refer to Cloud Conformity rules for the full list). If the id belongs to a deprecated rule, an error will be thrown.
    - `attributes`: Object containing profile attributes. For more details consult the [rule-settings-table](#rule-settings) below.

###### Rule Settings

There are some attributes you need to pass inside the rule settings attributes object. The table below provides more information about attributes options:

| Attribute             | Details                                                                  | Accepted Values                                  |
| --------------------- | ------------------------------------------------------------------------ | ------------------------------------------------ |
| enabled               | This attribute determines whether this setting is enabled                | true, false                                      |
| riskLevel             | This attribute configures the level of risk assigned to the rule         | "EXTREME", "VERY_HIGH", "HIGH", "MEDIUM", "LOW"  |
| extraSettings         | This array stores objects that configure the extra settings to this rule | {name: "ttl", type: "ttl", value: 72, ttl: true} |
| provider              | This attribute identifies the provider to this rule                      | "aws", "azure"                                   |
| exceptions            | This array stores objects that configure exceptions to this rule         |                                                  |
| exceptions: tags      | This attribute tags this exception                                       | "NewS3BucketTag" or "tagKey::tagValue"           |
| exceptions: resources | This attribute applies this exception to the following resources         | "i-xxxx"                                         |

###### Save new profile with rule settings included

The expected behaviour of this request to save a new profile and configure new rule settings associated with that profile.

Note: A deprecation warning will be included in the response for rules that are deprecated.
```json
{
  "meta": {
    "deprecation": {
      "warning": {
        "message": "1 manually configured rule in this profile is deprecated. Refer to our Help Pages for instructions.",
        "link": "https://www.cloudconformity.com/help/rules.html",
        "rules": [
            "EC2-XXX"
        ]
      }
    }
  }
}
```

Example request for new profile creation including rule settings:

```
curl -X POST -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
  "included": [
    {
      "type": "rules",
      "id": "EC2-001",
      "attributes": {
        "enabled": false,
        "exceptions": {
          "tags": ["TestUpdateTags"],
          "resources": []
        },
        "extraSettings": [],
        "riskLevel": "LOW",
        "provider": "aws"
      }
    },
    {
      "type": "rules",
      "id": "RTM-002",
      "attributes": {
        "enabled": true,
        "exceptions": {
          "tags": [],
          "resources": []
        },
        "extraSettings": [
          {
            "name": "ttl",
            "type": "ttl",
            "value": 72,
            "ttl": true
          }
        ],
        "riskLevel": "MEDIUM",
        "provider": "aws"
      }
    }
  ],
  "data": {
    "type": "profiles",
    "attributes": {
      "name": "New-Test-Profile",
      "description": "A test description for a new profile."
    },
    "relationships": {
      "ruleSettings": {
        "data": [
          {
            "type": "rules",
            "id": "EC2-001"
          },
          {
            "type": "rules",
            "id": "RTM-002"
          }
        ]
      }
    }
  }
}
'\
https://us-west-2-api.cloudconformity.com/v1/profiles/
```

Example Response:

```
{
  "meta": {},
  "included": [
    {
      "type": "rules",
      "id": "EC2-001",
      "attributes": {
        "enabled": false,
        "exceptions": {
          "tags": ["TestUpdateTags"],
          "resources": []
        },
        "extraSettings": [],
        "riskLevel": "LOW",
        "provider": "aws"
      }
    },
    {
      "type": "rules",
      "id": "RTM-002",
      "attributes": {
        "enabled": true,
        "exceptions": {
          "tags": [],
          "resources": []
        },
        "extraSettings": [
          {
            "name": "ttl",
            "type": "ttl",
            "value": 72,
            "ttl": true
          }
        ],
        "riskLevel": "MEDIUM",
        "provider": "aws"
      }
    }
  ],
  "data": {
    "type": "profiles",
    "id": {profile-id},
    "attributes": {
      "name": "Test-Profile-1",
      "description": "A test profile with rule settings."
    },
    "relationships": {
      "ruleSettings": {
        "data": [
          {
            "type": "rules",
            "id": "EC2-001"
          },
          {
            "type": "rules",
            "id": "RTM-002"
          }
        ]
      }
    }
  }
}

```

###### Save rule settings to an existing Profile

The expected behaviour of this request to overwrite all existing rule settings to a configured profile or write new rule settings to an existing empty profile.

You must indicate the profile id in the request body otherwise a new profile will be created with the indicated rule settings configured.

Example request for saving rule settings:
```
curl -X POST -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
  "meta": {},
  "included": [
    {
      "type": "rules",
      "id": "EC2-001",
      "attributes": {
        "enabled": false,
        "exceptions": {
          "tags": ["TestUpdateTags"],
          "resources": []
        },
        "extraSettings": [],
        "riskLevel": "LOW",
        "provider": "aws"
      }
    },
    {
      "type": "rules",
      "id": "RTM-002",
      "attributes": {
        "enabled": true,
        "exceptions": {
          "tags": [],
          "resources": []
        },
        "extraSettings": [
          {
            "name": "ttl",
            "type": "ttl",
            "value": 72,
            "ttl": true
          }
        ],
        "riskLevel": "MEDIUM",
        "provider": "aws"
      }
    }
  ],
  "data": {
    "type": "profiles",
    "id": {profile-id},
    "attributes": {
      "name": "Test-Profile-1",
      "description": "A test description for a profile."
    },
    "relationships": {
      "ruleSettings": {
        "data": [
          {
            "type": "rules",
            "id": "EC2-001"
          },
          {
            "type": "rules",
            "id": "RTM-002"
          }
        ]
      }
    }
  }
}' \
https://us-west-2-api.cloudconformity.com/v1/profiles/
```

Example Response:

```
{
  "meta": {},
  "included": [
    {
      "type": "rules",
      "id": "EC2-001",
      "attributes": {
        "enabled": false,
        "exceptions": {
          "tags": ["TestUpdateTags"],
          "resources": []
        },
        "extraSettings": [],
        "riskLevel": "LOW",
        "provider": "aws"
      }
    },
    {
      "type": "rules",
      "id": "RTM-002",
      "attributes": {
        "enabled": true,
        "exceptions": {
          "tags": [],
          "resources": []
        },
        "extraSettings": [
          {
            "name": "ttl",
            "type": "ttl",
            "value": 72,
            "ttl": true
          }
        ],
        "riskLevel": "MEDIUM",
        "provider": "aws"
      }
    }
  ],
  "data": {
    "type": "profiles",
    "id": {profile-id},
    "attributes": {
      "name": "Test-Profile-1",
      "description": "A test profile with rule settings."
    },
    "relationships": {
      "ruleSettings": {
        "data": [
          {
            "type": "rules",
            "id": "EC2-001"
          },
          {
            "type": "rules",
            "id": "RTM-002"
          }
        ]
      }
    }
  }
}
```

###### Delete all settings

The expected behaviour of this request to preserve an existing profile's attributes while deleting all existing rule settings. To do so, exclude the "includes" and "relationships" field from the request.

Example request for modifying an existing profile and deleting its settings:
```
curl -X POST -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
    "data": {
      "type": "profiles",
      "id": {profile-id},
      "attributes": {
        "name": "New-Test-Profile",
        "description": "A test description for a new profile."
      }
    }
  }' \
https://us-west-2-api.cloudconformity.com/v1/profiles/

```

Example Response:

```
{
  "meta": {},
  "data": {
    "type": "profiles",
    "id": {profile-id},
    "attributes": {
      "name": "New-Test-Profile",
      "description": "A test description for a new profile."
    }
  }
}
```

## Update Profile and Rule Settings

This endpoint allows you to update profile details and its associated rule settings. Only the settings passed in the request will be added/updated and no other existing rule settings will be affected.

##### Endpoints:

`PATCH /profiles/id`

##### Headers

`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters

- `data`: An array containing JSONAPI compliant data objects with following properties
  - `type`: `"profiles"`,
  - `attributes`: Object containing profile attributes. For more details consult the [profile-attributes-table](#profile-attributes)

Note: A deprecation warning will be included in the response for rules that are deprecated.
```json
{
  "meta": {
    "deprecation": {
      "warning": {
        "message": "1 manually configured rule in this profile is deprecated. Refer to our Help Pages for instructions.",
        "link": "https://www.cloudconformity.com/help/rules.html",
        "rules": [
            "EC2-XXX"
        ]
      }
    }
  }
}
```

Example request to only update profile details - name and description:

```
curl -X PATCH -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
  "data": {
    "type": "profiles",
    "id": {profile-id},
    "attributes": {
      "name": "New-Name-Test-Profile",
      "description": "Updated test description for a new profile."
    }
  }
}' \
https://us-west-2-api.cloudconformity.com/v1/profiles/{profile-id}
```

Example Response:

```
{
  "meta": {},
  "data": {
    "type": "profiles",
    "id": {profile-id},
    "attributes": {
      "name": "New-Name-Test-Profile",
      "description": "Updated test description for a new profile."
    }
  }
}
```

To update rule settings along with your profile, only the settings passed in the request will be added/updated and no other existing rule settings will be affected:

###### Parameters

- `id`: Profile ID.
- `data`: All of the below fields must be populated within the request body:
  - `data`: An array containing JSONAPI compliant data objects with the following properties:
    - `type`: `"profiles"`,
    - `attributes`: Object containing profile attributes. For more details consult the [profile-attributes-table](#profile-attributes).
    - `relationships`: Object containing rule settings that are associated to this profile:
      - `ruleSettings`:
      - `data`: An array of associated rule settings.
  - `included`: An array containing JSONAPI compliant data objects with the following properties:
    - `type`: `"rules"`,
    - `id`: This attribute is the id of the rule type being updated e.g. S3-001 (refer to Cloud Conformity rules for the full list). If the id belongs to a deprecated rule, an error will be thrown.
    - `attributes`: Object containing profile attributes. For more details consult the [rule-settings-table](#rule-settings).
			
Example request to update profile details and add one rule setting to existing settings:
```
curl -X PATCH -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
  "included": [
    {
      "type": "rules",
      "id": "EC2-006",
      "attributes": {
        "enabled": true,
        "exceptions": {
          "tags": ["TestUpdateTags"],
          "resources": []
        },
        "extraSettings": [],
        "riskLevel": "LOW",
        "provider": "aws"
      }
    }
  ],
  "data": {
    "type": "profiles",
    "id": {profile-id},
    "attributes": {
      "name": "Update-Test-Profile",
      "description": "Update test description"
    },
    "relationships": {
      "ruleSettings": {
        "data": [
          {
            "type": "rules",
            "id": "EC2-006"
          }
        ]
      }
    }
  }
}'\
https://us-west-2-api.cloudconformity.com/v1/profiles/{profile-id}
```

Example Response:

```
{
  "meta": {},
  "included": [
    {
      "type": "rules",
      "id": "EC2-001",
      "attributes": {
        "enabled": false,
        "exceptions": {
          "tags": ["TestUpdateTags"],
          "resources": []
        },
        "extraSettings": [],
        "riskLevel": "LOW",
        "provider": "aws"
      }
    },
    {
      "type": "rules",
      "id": "EC2-006",
      "attributes": {
        "enabled": true,
        "exceptions": {
          "tags": ["TestUpdateTags"],
          "resources": []
        },
        "extraSettings": [],
        "riskLevel": "LOW",
        "provider": "aws"
      }
    },
    {
      "type": "rules",
      "id": "RTM-002",
      "attributes": {
        "enabled": true,
        "exceptions": {
          "tags": [],
          "resources": []
        },
        "extraSettings": [
          {
            "name": "ttl",
            "type": "ttl",
            "value": 72,
            "ttl": true
          }
        ],
        "riskLevel": "MEDIUM",
        "provider": "aws"
      }
    }
  ],
  "data": {
    "type": "profiles",
    "id": {profile-id},
    "attributes": {
      "name": "Update-Test-Profile",
      "description": "Update test description"
    },
    "relationships": {
      "ruleSettings": {
        "data": [
          {
            "type": "rules",
            "id": "EC2-001"
          },
          {
            "type": "rules",
            "id": "EC2-006"
          },
          {
            "type": "rules",
            "id": "RTM-002"
          }
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

## Apply Profile to Accounts

This endpoint allows you to apply profile and rule settings to a set of accounts under your organisation.

##### Endpoints:

`POST /profiles/id/apply`

##### Headers

`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters

- `id`: The Cloud Conformity ID of the profile
- `meta`:
  - `accountIds`: An Array of account Id's that will be configured by the profile.
  - `types`: An Array of setting types to be applied to the accounts. NOTE: Only `rule` is supported in the current version.
  - `mode`: Mode of how the profile will be applied to the accounts, i.e. "fill-gaps", "overwrite" or "replace". For a description of these modes, see the [modes-table](#modes) below.
  - `notes`: Log notes. This field is expected to be filled out, ideally with a reason for the profile being applied.

#### Modes

| Mode      | Details                                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| fill-gaps | Merge existing settings with this Profile. If there is a conflict, the account's existing setting will be used. |
| overwrite | Merge existing settings with this Profile. If there is a conflict, the Profile's setting will be used.          |
| replace   | Clear all existing settings and apply settings from this Profile.                                               |

Example request for applying a profile to accounts:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
-d '
{
	"meta": {
		"accountIds": [{account-id-1}, {account-id-2}],
		"types": ["rule"],
		"mode": "overwrite",
		"notes": "Applying profile to accounts",
	}
}' https://us-west-2-api.cloudconformity.com/v1/profiles/{profile-id}/apply
```

Example Response:

```
{
  "meta": {
    "status": "sent",
    "message": "Profile will be applied to the accounts in background"
  }
}

```
