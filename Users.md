# Cloud Conformity API Keys API


Below is a list of the available APIs:

- [Get The Current User](#get-the-current-user)
- [Get User Details](#get-user-details)
- [Update User Role and Account Access Level](#update-a-users-role-and-account-access-level)
- [Revoke User](#revoke-user)

## User Privileges
There are 4 possible Cloud Conformity roles. Each role grants different levels of access via the api. The roles are:

- __organisation admin__
- __organisation user with full access to account__
- __organisation user with read-only access to account__
- __organisation user with no access to account__

User access to each endpoint is listed below:

| Endpoint | admin | full access user| read-only user | no access user |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET /api-keys  *(get a list of your api keys)* | Y | Y | Y | Y |
| GET /api-keys/id  *(get details about an api key)* | Y | Y | Y | Y |
| POST /accounts  *(create a new account)* | Y | N | N | N |
| GET /accounts  *(get a list of accounts you have access to)* | Y | Y | Y | Y |
| GET /accounts/id | Y | Y | Y | N |
| POST /accounts/id/scan  *(run the conformity bot)* | Y | Y | N | N |
| PATCH /accounts/id/subscription | Y | N | N | N |
| PATCH /accounts/id | Y | Y | N | N |
| GET /accounts/id/settings/rules/ruleId | Y | Y | Y | N |
| PATCH /accounts/id/settings/rules/ruleId | Y | Y | N | N |
| GET /accounts/id/settings/rules | Y | Y | Y | N |
| PATCH /accounts/id/settings/rules | Y | Y | N | N |
| GET /checks * | Y | Y | Y | N |
| POST /checks | Y | Y | N | N |
| DELETE /checks/id | Y | Y | N | N |
| GET /events *** | Y | Y | Y | N |
| GET /settings/communication/accountId ** | Y | Y | Y | N |
| POST /settings/communication ** | Y | Y | N | N |
| PATCH /settings/communication/settingId ** | Y | Y | N | N |
| DELETE /settings/settingId ** | Y | Y | N | N |
| POST /external-ids | Y | N | N | N |
| GET /users/whoami | Y | Y | Y | Y |
| GET /users/id | Y | Y | Y | Y |
| PATCH /users/id | Y | N | N | N |
| DELETE /users/id | Y | N | N | N |


* Response will depend on the AccountIds added to the query parameter. For example, if a user has no access to an account and they add that account to the AccountIds array, an error will be thrown.

** User role will limit the amount of data they can GET or POST/PATCH. For more information, consult the [Settings ReadMe](./Settings.md#).

*** If user role is ADMIN, organisation-level events will also be returned.


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
        role: "ADMIN"
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
		role: "USER",
        accessList: [
            {
                account: "ad03IHuI_",
                level: "FULL"
            },
            {
                account: "Oa1j-gGTX",
                level: "READONLY"
            },
            {
                account: "Pa_dgRTA",
                level: "NONE"
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
        role: "USER",
        accessList: [
            {
                account: "ad03IHuI_",
                level: "READONLY"
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
