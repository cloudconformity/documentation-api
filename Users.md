# Cloud Conformity API Keys API


Below is a list of the available APIs:

- [Get The Current User](#get-the-current-user)

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
| PATCH /accounts/accountId/subscription | Y | N | N | N |
| PATCH /accounts/accountId | Y | Y | N | N |
| GET /accounts/accountId/settings/rules/ruleId | Y | Y | Y | N |
| PATCH /accounts/accountId/settings/rules/ruleId | Y | Y | N | N |
| GET /accounts/accountId/settings/rules | Y | Y | Y | N |
| PATCH /accounts/accountId/settings/rules | Y | Y | N | N |
| GET /checks * | Y | Y | Y | N |
| GET /events *** | Y | Y | Y | N |
| GET /settings/communication/accountId ** | Y | Y | Y | N |
| POST /settings/communication ** | Y | Y | N | N |
| PATCH /settings/communication/settingId ** | Y | Y | N | N |
| POST /external-ids | Y | N | N | N |
| GET /users/whoami | Y | Y | Y | Y |

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

