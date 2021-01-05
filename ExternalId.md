# Archived

Please access Trend Micro Cloud One - Conformity's public [API documentation here](https://cloudone.trendmicro.com/docs/conformity/api-reference/)
for the most updated version. This GitHub repository is no longer maintained and has been archived for historical purposes.

---

# Cloud Conformity External IDs API

Below is a list of the available APIs:

- [Get Organisation External ID](#get-organisation-external-id)
- [Create an External ID](#create-an-external-id)


## Get Organisation External ID

This endpoint allows you to get your organisation's external ID. *note: The endpoint will return an error if no accounts have previously been added to the organisation.*

##### Endpoints:

`GET /organisation/external-id`. *note: singleton resource*

##### Parameters
This end point takes no parameters.

Example Request:

```

curl -X GET \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/organisation/external-id
```
Example Response:

```
{
 "data": {
   "type": "external-ids",
   "id": "aaaaaaaa-bbbb-cccc-dddd-eeeeeeffffff",
   "attributes": {
     "valid-until": 1526662959632
   },
   "relationships": {}
 }
}
```
You need data.id (`aaaaaaaa-bbbb-cccc-dddd-eeeeeeffffff`) for registering a new account.

IMPORTANT:
> This external ID is not to be cached


## Create an External ID

This endpoint allows you to create a new temporary external ID. We recommend using your organisation's external ID for new account creation, however we still support individual external IDs

##### Endpoints:

`POST /external-ids`

##### Parameters
This end point takes no parameters.

Example Request:

```
curl -X POST \
-H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/external-ids
```
Example Response:

```
{
    "data": {
        "type": "external-ids",
        "id": "aaaaaaaa-bbbb-zzzz-dddd-eeeeeeffffff",
        "attributes": {
            "valid-until": 1505550866404
        },
        "relationships": {}
    }
}
```
You need data.id (`aaaaaaaa-bbbb-zzzz-dddd-eeeeeeffffff`) for registering a new account.

IMPORTANT:
> For security reasons, External IDs created via the API are only valid for one hour. If you do not use it to create an account within the hour, you must generate a new external ID and start over.
