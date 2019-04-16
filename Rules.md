# Cloud Conformity Rules API

Below is a list of the available API calls:

- [Get Rules](#get-rules)

## Get Rules
A GET request to this endpoint allows you to retrieve a list of rules mapped to each service and their underlying attributes.

##### Endpoints:

`GET /services/`

##### Parameters
This end point takes no parameters.

### Examples
Example request to download a JSON of rules:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/services/
```
Example Response:
```json
{
  "data": [
    {
      "type": "services",
      "id": "EC2",
      "attributes": {
        "name": "EC2"
      },
      "relationships": {
        "rules": {
            "data": [
              {
                "type": "rules",
                "id": "EC2-001"
              },
              {
                "type": "rules",
                "id": "EC2-002"
              }
            ]
        }
      }
    }
  ],    
  "included": [
    {
      "type":"rules",
      "id":"EC2-001",
      "attributes":{
        "name":"SecurityGroupPortRange",
        "description":"Ensure no security group opens range of ports",
        "title":"Security Group Port Range",
        "categories":[
           "security"
        ],
        "risk-level":"MEDIUM",
        "knowledge-base-html":"security-group-port-range",
        "package":"base",
        "level":"resource",
        "release-date":"2017-01-01",
        "update-date":"2017-01-01"
      }
    }
  ]
}
```
