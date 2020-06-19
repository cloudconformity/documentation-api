# Cloud Conformity Groups API

Below is a list of the available API calls:

- [List All Groups](#list-all-groups)
- [Get Group Details](#get-group-details)
- [Delete Group](#delete-group)

## List All Groups

This endpoint allows you to query all groups with accounts that you have access to.

##### Endpoints:

`GET /groups`

##### Parameters

This end point takes no parameters.

Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/groups
```

Example Response:

```
{
  "data": [
    {
        "type": "groups",
        "id": "4T4lMb3lI",
        "attributes": {
            "name": "testGroup",
            "tags": [
                "test"
            ],
            "created-date": 1550456923658,
            "last-modified-date": 1590647034887
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "B1nHYYpwx"
                }
            },
            "accounts": {
                "data": [
                    {
                        "type": "accounts",
                        "id": "-SXbfXQM4"
                    }
                ]
            }
        }
    },
    {
        "type": "groups",
        "id": "DOL3pfdQF",
        "attributes": {
            "name": "My Azure Accounts",
            "tags": [
                "Azure"
            ],
            "created-date": 1568168878189,
            "last-modified-date": 1590647034889
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "B1nHYYpwx"
                }
            },
            "accounts": {
                "data": []
            }
        }
    }
  ]
}
```

## Get Group Details

This endpoint allows you to get the details of the specified group with accounts that you have access to.

##### Endpoints:

`GET /groups/{id}`

##### Parameters

- `id`: The Conformity ID of the group

Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/groups/uUmE2v0ns
```

Example Response:

```
{
    "data": [
        {
            "type": "groups",
            "id": "uUmE2v0ns",
            "attributes": {
                "name": "test-group",
                "tags": [
                    "dev-environment"
                ],
                "created-date": 1587441074460,
                "last-modified-date": 1590647034893
            },
            "relationships": {
                "organisation": {
                    "data": {
                        "type": "organisations",
                        "id": "B1nHYYpwx"
                    }
                },
                "accounts": {
                    "data": [
                        {
                            "type": "accounts",
                            "id": "16gZQXGZf"
                        },
                        {
                            "type": "accounts",
                            "id": "r1gyR4cqg"
                        }
                    ]
                }
            }
        }
    ]
}
```

## Delete group

A DELETE request to this endpoint allows an ADMIN to delete the specified group.

##### Endpoints:

`DELETE /groups/{id}`

##### Parameters

- `id`: The Conformity ID of the group

Example Request:

```
curl -X DELETE \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/groups/AgA12vIwb
```

Example Response:

```
{
    "meta": {
        "status": "deleted"
    }
}
```
