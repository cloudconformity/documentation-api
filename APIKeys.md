# Archived

Please access Trend Micro Cloud One - Conformity's public [API documentation here](https://cloudone.trendmicro.com/docs/conformity/api-reference/)
for the most updated version. This GitHub repository is no longer maintained and has been archived for historical purposes.

---

# Cloud Conformity API Keys API

Below is a list of the available APIs:

- [List All API Keys](#list-all-api-keys)
- [Get API Key Details](#get-api-key-details)


## List All API Keys

This endpoint allows you to query your API Keys.

##### Endpoints:

`GET /api-keys`

##### Parameters
This end point takes no parameters.

Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/api-keys
```
Example Response:

```
{
    "data": [
        {
            "type": "api-keys",
            "id": "S1YnrbQuWagQ",
            "attributes": {
                "created-date": 1502971314320,
                "status": "ENABLED",
                "last-used-date": null
            },
            "relationships": {}
        }
    ]
}
```


## Get API Key Details

This endpoint allows you to query your API Keys.

##### Endpoints:

`GET /api-keys/id`

##### Parameters
- `id`: The ID of the API Key


Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/api-keys/S1YnrbQuWagQ
```
Example Response:

```
{
    "data": {
        "type": "api-keys",
        "id": "S1YnrbQuWagQ",
        "attributes": {
            "created-date": 1504064573955,
            "status": "ENABLED",
            "last-used-date": 1511140966607
        },
        "relationships": {}
    }
}
```
