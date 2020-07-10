# Cloud Conformity API Keys API

Below is a list of the available APIs:

- [Get The Current User](#get-the-current-user)
- [Get User Details](#get-user-details)
- [Get All Users](#get-all-users)
- [Invite User](#invite-a-user)
- [Add SSO user](#add-an-sso-user)
- [Update User Role and Account Access Level](#update-a-users-role-and-account-access-level)
- [Revoke User](#revoke-user)

## User Privileges

There are 4 possible Cloud Conformity roles. Each role grants different levels of access via the api. The roles are:

- **organisation admin**
- **organisation user with full access to account**
- **organisation user with read-only access to account**
- **organisation user with no access to account**

User access to each endpoint is listed below:

| Endpoint                                                    | admin | full access user | read-only user | no access user |
| ----------------------------------------------------------- | :---: | :--------------: | :------------: | :------------: |
| GET /api-keys _(get a list of your api keys)_               |   Y   |        Y         |       Y        |       Y        |
| GET /api-keys/id _(get details about an api key)_           |   Y   |        Y         |       Y        |       Y        |
| POST /accounts _(create a new account)_                     |   Y   |        N         |       N        |       N        |
| GET /accounts _(get a list of accounts you have access to)_ |   Y   |        Y         |       Y        |       Y        |
| GET /accounts/id                                            |   Y   |        Y         |       Y        |       N        |
| POST /accounts/id/scan _(run the conformity bot)_           |   Y   |        Y         |       N        |       N        |
| PATCH /accounts/id/subscription                             |   Y   |        N         |       N        |       N        |
| PATCH /accounts/id                                          |   Y   |        Y         |       N        |       N        |
| GET /accounts/id/settings/rules/ruleId                      |   Y   |        Y         |       Y        |       N        |
| PATCH /accounts/id/settings/rules/ruleId                    |   Y   |        Y         |       N        |       N        |
| GET /accounts/id/settings/rules                             |   Y   |        Y         |       Y        |       N        |
| PATCH /accounts/id/settings/rules                           |   Y   |        Y         |       N        |       N        |
| GET /checks \*                                              |   Y   |        Y         |       Y        |       N        |
| POST /checks                                                |   Y   |        Y         |       N        |       N        |
| DELETE /checks/id                                           |   Y   |        Y         |       N        |       N        |
| GET /events \*\*\*                                          |   Y   |        Y         |       Y        |       N        |
| POST /external-ids                                          |   Y   |        N         |       N        |       N        |
| GET /groups                                                 |   Y   |        Y         |       Y        |       N        |
| POST /groups                                                |   Y   |        N         |       N        |       N        |
| GET /resources                                              |   Y   |        Y         |       N        |       N        |
| GET /settings/communication/accountId \*\*                  |   Y   |        Y         |       Y        |       N        |
| POST /settings/communication \*\*                           |   Y   |        Y         |       N        |       N        |
| PATCH /settings/communication/settingId \*\*                |   Y   |        Y         |       N        |       N        |
| DELETE /settings/settingId \*\*                             |   Y   |        Y         |       N        |       N        |
| GET /users/whoami                                           |   Y   |        Y         |       Y        |       Y        |
| GET /users/id                                               |   Y   |        Y         |       Y        |       Y        |
| GET /users                                                  |   Y   |        N         |       N        |       N        |
| POST /users                                                 |   Y   |        N         |       N        |       N        |
| POST /users/sso                                             |   Y   |        N         |       N        |       N        |
| PATCH /users/id                                             |   Y   |        N         |       N        |       N        |
| DELETE /users/id                                            |   Y   |        N         |       N        |       N        |

- The response will depend on the AccountIds added to the query parameter. For example, if a user has no access to an account and they add that account to the AccountIds array, an error will be thrown.

\*\* User role will limit the amount of data they can GET or POST/PATCH. For more information, consult the [Settings ReadMe](./Settings.md#).

\*\*\* If user role is ADMIN, organisation-level events will also be returned.

## Get The Current User

This endpoint get the current user.

##### Endpoints:

`GET /users/whoami`

##### Parameters

This end point takes no parameters.

Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/users/whoami
```

Example Response:

```
{
    "data": {
        "type": "users",
        "id": "517uNyIvG",
        "attributes": {
            "first-name": "Scott",
            "last-name": "Tiger",
            "role": "ADMIN",
            "email": "******@cloudconformity.com",
            "status": "ACTIVE",
            "mfa": false,
            "last-login-date": 1503586843842,
            "created-date": 1485834564224
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "A9NDYY12z"
                }
            }
        }
    }
}
```

Example Request for a USER with custom permissions:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/users/whoami
```

Example Response:

```
{
    "data": {
        "type": "users",
        "id": "517uNyIvG",
        "attributes": {
            "first-name": "Scott",
            "last-name": "Tiger",
            "role": "USER",
            "email": "******@cloudconformity.com",
            "status": "ACTIVE",
            "mfa": false,
            "last-login-date": 1503586843842,
            "created-date": 1485834564224
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "A9NDYY12z"
                }
            },
            "accountAccessList": [
                {
                    "account": "acc1abc",
                    "level": "FULL"
                },
                {
                    "account": "acc2abc",
                    "level": "READONLY"
                },
                {
                    "account": "acc3abc",
                    "level": "FULL"
                }
        }
    }
}
```

## Get User Details

This endpoint allows you to get the details of the specified user.

##### Endpoints:

`GET /users/id`

##### Parameters

- `id`: The Cloud Conformity ID of the user

Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/users/CClqMqknVb
```

Example Response:

```
{
    "data": {
        "type": "users",
        "id": "CClqMqknVb",
        "attributes": {
            "first-name": "Cool",
            "last-name": "Claude",
            "role": "ADMIN",
            "email": "cc@coolclaude.com",
            "status": "ACTIVE",
            "last-login-date": 1523009079960,
            "created-date": 1499359762438,
            "summary-email-opt-out": true,
            "mobile": "15144008080",
            "mobile-country-code": "CA",
            "mobile-verified": true
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "A9NDYY12z"
                }
            }
        }
    }
}
```

Example request when an ADMIN queries a USER with custom permissions:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/users/517uNyIvG
```

Example Response:

```
{
    "data": {
        "type": "users",
        "id": "517uNyIvG",
        "attributes": {
            "first-name": "Scott",
            "last-name": "Tiger",
            "role": "USER",
            "email": "******@cloudconformity.com",
            "status": "ACTIVE",
            "mfa": false,
            "last-login-date": 1503586843842,
            "created-date": 1485834564224
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "A9NDYY12z"
                }
            },
            "accountAccessList": [
                {
                    "account": "account1",
                    "level": "FULL"
                },
                {
                    "account": "account2",
                    "level": "READONLY"
                },
                {
                    "account": "account3",
                    "level": "FULL"
                },
                {
                    "account": "account4",
                    "level": "NONE"
                },
                {
                    "account": "account5",
                    "level": "NONE"
                },
                {
                    "account": "account6",
                    "level": "NONE"
                }
        }
    }
}
```

## Get all users

This endpoint allows the current user to get the details of all users in the organisation.
Only ADMINS are able to view all users in the organisation.

#### Endpoints:

`GET /users`

#### Parameters

This endpoint takes no parameters.

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/users
```

Example Response:

```
{
    "data": [
        {
            "type": "users",
            "id": "WTLZTMW3R",
            "attributes": {
                "first-name": "user",
                "last-name": "user",
                "role": "USER",
                "email": "cc-user@cloudconformity.com",
                "status": "ACTIVE",
                "last-login-date": null,
                "created-date": 1578023268196,
                "has-credentials": false
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "R8CAIKU9A"
                    }
                }
            }
        },
        {
            "type": "users",
            "id": "RI9S7GQDP",
            "attributes": {
                "first-name": "user",
                "last-name": "user",
                "role": "ADMIN",
                "email": "cc-admin@cloudconformity.com",
                "status": "ACTIVE",
                "last-login-date": null,
                "created-date": 1575943767327,
                "has-credentials": false
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "R8CAIKU9A"
                    }
                }
            }
        },
        {
            "type": "users",
            "id": "FI0SQMYWC",
            "attributes": {
                "first-name": "user",
                "last-name": "user",
                "role": "USER",
                "email": "cc-user@cloudconformity.com",
                "status": "INVITED",
                "last-login-date": null,
                "created-date": 1576469346533,
                "has-credentials": false
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "R8CAIKU9A"
                    }
                }
            }
        }
    ]
}
```

## Invite a user

This endpoint allows you to invite a user to your organisation.

##### Endpoints:

`POST /users`

##### Parameters

- `data`: A JSON object containing the following properties
  - `attributes`: Object containing user attributes.
    - `firstName`: first name of the user, which must be a string
    - `lastName`: last name of the user, which must be a string
    - `email`: email of the user which must be a string
    - `role`: The role which the user is assigned to { ADMIN | USER }
    - `accessList`: **(optional field when for a USER role, not required for ADMIN role)** An array of objects containing access level for an account:
      - `account`: The account id within the organisation, which must be a string
      - `level`: The level of access the user has to the account { NONE | READONLY | FULL }, which must be a string

Please note only accounts (listed inside the `accessList`) in the request will get updated, existing account permissions are retained.
If a new user is invited with the role of `USER` and an `accessList` is not provided, the users level permission for all accounts will default to `NONE`
If a user is re-invited with the role of `USER`, the user will maintain the old account level permissions, unless an `accessList` is provided to update the permission.

Example Request for inviting a user as an ADMIN:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d
'{
    "data": {
        "attributes": {
            "firstName": "Cool",
            "lastName": "Claude",
            "role": "ADMIN",
            "email": "cc_user@cloudconformity.com"
        }
    }
}'
\
https://us-west-2-api.cloudconformity.com/v1/users
```

Example Response:

```
{
    "data": {
        "type": "users",
        "id": "OhnzPVXY",
        "attributes": {
            "first-name": "Cool",
            "last-name": "Claude",
            "role": "ADMIN",
            "email": "cc_user@cloudconformity.com",
            "status": "INVITED",
            "last-login-date": null,
            "created-date": 1575943588002,
            "has-credentials": false
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "A9NDYY12z"
                }
            }
        }
    }
}
```

Example request for inviting a user with custom permissions:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d
'{
    "data": {
        "attributes": {
            "firstName": "Cool",
            "lastName": "Claude",
            "role": "USER",
            "email": "cc_user@cloudconformity.com",
            "accessList": [
                {
                    "account": "A9_DsY12z",
                    "level": "FULL"
                },
                {
                    "account": "BqdYgfas",
                    "level": "NONE"
                },
                {
                    "account": "kPiASD21",
                    "level": "READONLY"
                }
            ]
        }
    }
}'
\
https://us-west-2-api.cloudconformity.com/v1/users
```

## Add an SSO User

This endpoint is only available for organisations with an external identity provider setup.

Only ADMINS from an external identity provider can use this endpoint to add new sso users to their organisation.

##### Endpoints:

`POST /users/sso`

##### Parameters

- `data`: A JSON object containing the following properties
  - `attributes`: Object containing user attributes
    - `firstName`: first name of the user, which must be a string
    - `lastName`: last name of the user, which must be a string
    - `email`: email of the user which must be a string
    - `role`: The role which the user is assigned to { ADMIN | USER }
    - `accessList`: **(optional field for the USER role, not required for the ADMIN role)** An array of objects containing access level for an account:
      - `account`: The account id within the organisation, which must be a string
      - `level`: The level of access the user has to the account { NONE | READONLY | FULL }, which must be a string

Please note only accounts (listed inside the `accessList`) in the request will get updated, existing account permissions are retained.
If a new user is added with the role of `USER` and an `accessList` is not provided, the users level permission for all accounts will default to `NONE`.
If a user is added back into the organisation with the role of `USER`, the user will maintain the old account level permissions, unless an `accessList` is provided to update the permission.

Example request for a user with an ADMIN role:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d
'{
    "data": {
        "attributes": {
            "firstName": "sso",
            "lastName": "user",
            "role": "ADMIN",
            "email": "sso_user@cloudconformity.com"
        }
    }
}'
\
https://us-west-2-api.cloudconformity.com/v1/users/sso
```

Example Response:

```
{
    "data": {
        "type": "users",
        "id": "abcdefg",
        "attributes": {
            "first-name": "sso",
            "last-name": "user",
            "role": "ADMIN",
            "email": "sso_user@cloudconformity.com",
            "status": "ACTIVE",
            "last-login-date": null,
            "created-date": 1575943588002,
            "has-credentials": false
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "hijklmnop"
                }
            }
        }
    }
}
```

Example request for adding a user with custom permissions:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d
'{
    "data": {
        "attributes": {
            "firstName": "sso",
            "lastName": "user",
            "role": "USER",
            "email": "sso_user@cloudconformity.com",
            "accessList": [
                {
                    "account": "A9_DsY12z",
                    "level": "FULL"
                },
                {
                    "account": "BqdYgfas",
                    "level": "NONE"
                },
                {
                    "account": "kPiASD21",
                    "level": "READONLY"
                }
            ]
        }
    }
}'
\
https://us-west-2-api.cloudconformity.com/v1/users/sso
```

## Update a User's Role and Account Access Level

Update the role and permissions of the specified user.
Only ADMINs can perform the update to other users within the same organisation.

##### Endpoints:

`PATCH /users/id`

##### Parameters

- `id`: The Cloud Conformity ID of the user
- `data`: A JSON object with the following properties:
  - `role`: The role to update the user to { ADMIN | POWER_USER | READ_ONLY | USER }
  - `accessList`: **(this field is required for users with USER role)** An array of objects containing access level for an account:
    - `account`: The account Id within the organisation
    - `level`: The level of access the user has to the account { NONE | READONLY | FULL }

Please note only accounts (listed inside the `accessList`) in the request will get updated, existing account permissions are retained.

Example Request to set the user's role to ADMIN | POWER_USER | READ_ONLY:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
    "data": {
        "role": "ADMIN"
    }
}
' \
https://us-west-2-api.cloudconformity.com/v1/users/CClqMqknVb \

```

Example Response

```
{
    "data": {
        "type": "users",
        "id": "CClqMqknVb",
        "attributes": {
            "first-name": "Cool",
            "last-name": "Claude",
            "role": "ADMIN",
            "email": "cc@coolclaude.com",
            "status": "ACTIVE",
            "last-login-date": 1523009079960,
            "created-date": 1499359762438,
            "summary-email-opt-out": true,
            "mobile": "15144008080",
            "mobile-country-code": "CA",
            "mobile-verified": true
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "A9NDYY12z"
                }
            }
        }
    }
}
```

Example request to set the user's role to USER and account level access:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
    "data": {
        "role": "USER",
        "accessList": [
            {
                "account": "ad03IHuI_",
                "level": "FULL"
            },
            {
                "account": "Oa1j-gGTX",
                "level": "READONLY"
            },
            {
                "account": "Pa_dgRTA",
                "level": "NONE"
            }
        ]
    }
}
' \
https://us-west-2-api.cloudconformity.com/v1/users/CClqMqknVb \

```

Example request to set the user's role to USER and updating a specific account level access:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
-d '
{
    "data": {
        "role": "USER",
        "accessList": [
            {
                "account": "ad03IHuI_",
                "level": "READONLY"
            }
        ]
    }
}
' \
https://us-west-2-api.cloudconformity.com/v1/users/CClqMqknVb \

```

Example Response

```
{
    "data": {
        "type": "users",
        "id": "CClqMqknVb",
        "attributes": {
            "first-name": "Cool",
            "last-name": "Claude",
            "role": "USER",
            "email": "cc@coolclaude.com",
            "status": "ACTIVE",
            "last-login-date": 1523009079960,
            "created-date": 1499359762438,
            "summary-email-opt-out": true,
            "mobile": "15144008080",
            "mobile-country-code": "CA",
            "mobile-verified": true
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "A9NDYY12z"
                }
            }
        }
    }
}
```

## Revoke User

Revokes a specified user from your organisation
Only ADMINs can revoke a user within the same organisation.

##### Endpoints:

`DELETE /users/id`

##### Parameters

- `id`: The Cloud Conformity ID of the user

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/users/{id}

```

Example Response

```
{ "meta": { "status": "revoked" } }

```
