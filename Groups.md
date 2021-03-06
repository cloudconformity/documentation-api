# Archived

Please access Trend Micro Cloud One - Conformity's public [API documentation here](https://cloudone.trendmicro.com/docs/conformity/api-reference/)
for the most updated version. This GitHub repository is no longer maintained and has been archived for historical purposes.

---

# Cloud Conformity Groups API

Below is a list of the available API calls:

- [List All Groups](#list-all-groups)
- [Get Group Details](#get-group-details)
- [Create Group](#create-group)
- [Update Group](#update-group)
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
-H "Authorization: ApiKey {YOUR-API-KEY}" \
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
-H "Authorization: ApiKey {YOUR-API-KEY}" \
https://us-west-2-api.cloudconformity.com/v1/groups/{group-id}
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

## Create group

This endpoint allows an ADMIN user to create a new group.

##### Endpoints:

`POST /groups/`

##### Parameters

- `name`: The name of the group to be created. (required)
  - Name should be between 3 to 100 characters.
  - Name should be alphanumeric, may contain symbols \" - \_ ' # & : , . / | \" and Space.
- `tags`: An array of strings to group accounts based on the tag associated with it. (optional)
  - There is a maximum of 50 tags per account and a maximum of 80 characters per tag.
  - Tags should be alphanumeric, and may contain symbols - \_ and Space.

Example Request:

```
curl -X POST -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey {YOUR-API-KEY}" \
-d '
{
    "data": {
        "attributes": {
            "name": "New-Test-group",
            "tags": ["dev", "test"]
        }
    }
}' \
https://us-west-2-api.cloudconformity.com/v1/groups/
```

Example Response:

```
{
    "data": {
        "type": "groups",
        "id": "DZ0LxGYeg",
        "attributes": {
            "name": "New-Test-group",
            "tags": [
                "dev",
                "test"
            ],
            "created-date": 1592817235502,
            "last-modified-date": 1592817235502
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "g-Xrmwie4"
                }
            },
            "accounts": {
                "data": [
                    {
                        "type": "accounts",
                        "id": "31SjrPO"
                    }
                ]
            }
        }
    }
}
```

## Update group

This endpoint allows an ADMIN user to update a new group.

##### Endpoints:

`PATCH /groups/{id}`

##### Parameters

- `id`: The Conformity ID of the group
- `name`: The name of the group to be updated.
  - Name should be between 3 to 100 characters.
  - Name should be alphanumeric, may contain symbols \" - \_ ' # & : , . / | \" and Space.
- `tags`: An array of strings to group accounts based on the tag associated with it.
  - There is a maximum of 50 tags per account and a maximum of 80 characters per tag.
  - Tags should be alphanumeric, and may contain symbols - \_ and Space.

Example Request (AWS group):

```
curl -X PATCH -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey {YOUR-API-KEY}" \
-d '
{
    "data": {
        "attributes": {
            "name": "New-Test-group",
            "tags": ["dev", "test"]
        }
    }
}' \
https://us-west-2-api.cloudconformity.com/v1/groups/
```

Example Response:

```
{
    "data": {
        "type": "groups",
        "id": {id},
        "attributes": {
            "name": "New-Test-group",
            "tags": [
                "dev",
                "test"
            ],
            "created-date": 1592817235502,
            "last-modified-date": 1592817235502
        },
        "relationships": {
            "organisation": {
                "data": {
                    "type": "organisations",
                    "id": "g-Xrmwie4"
                }
            },
            "accounts": {
                "data": [
                    {
                        "type": "accounts",
                        "id": "31SjrPO"
                    }
                ]
            }
        }
    }
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
-H "Authorization: ApiKey {YOUR-API-KEY}" \
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
