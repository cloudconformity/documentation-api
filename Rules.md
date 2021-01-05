# Archived

Please access Trend Micro Cloud One - Conformity's public [API documentation here](https://cloudone.trendmicro.com/docs/conformity/api-reference/)
for the most updated version. This GitHub repository is no longer maintained and has been archived for historical purposes.

---

# Cloud Conformity Rules API

Below is a list of the available API calls:

- [Get Rules](#get-rules)

## Get Rules
A GET request to this endpoint allows you to retrieve a list of rules mapped to each service and their underlying attributes.

##### Endpoints:

`GET /services/`

##### Parameters
This endpoint takes no parameters.

##### Rule Attributes
This endpoint returns information about the available services and mapped rules in Cloud Conformity. The table below provides more information about each rule attribute and their default values:

| Property | Description | Default |
| ------------- | ------------- | ------------- |
| name | Unique rule name |   |
| description | Rule description |   |
| title | Rule title |   |
| categories | An array indicating the category/categories that the rule belongs to | "security", "cost-optimisation", "reliability", "performance-efficiency", "operational-excellence" |
| risk-level | Configures the level of risk assigned to the rule  | "EXTREME", "VERY_HIGH", "HIGH", "MEDIUM", "LOW" |
| multi-risk-level | Determines whether a rule has multiple risk levels for each setting | true, false |
| knowledge-base-html | Name of the resolution page on the Knowledge Base |   |
| must-be-configured | Determines whether a rule requires configuration before it can generate checks | true, false |
| package | Flag indicating if the rule belongs to an add-on or base package | "base", "cost", "rtm" |
| is-organisational | Flag indicating if the rule runs on an organisational level | true, false |
| not-scored | Flag indicating if checks against the rule is scored | true, false |
| level | Level at which the rule runs | "resource", "service", "cross-account", "account", "provider, "event" |
| release-date | Date the rule was released |   |
| update-date | Date the rule has been updated |   |
| is-deprecated | Flag indicating whether the rule is marked as deprecated | true, false |
| provider | Cloud provider that the rule applies to | "aws", "azure" |

### Examples
Example request to download a JSON of rules:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/services
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
    ...
  ],
  "included": [
    {
      "type":"rules",
      "id":"EC2-001",
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
    },
    {
    "type": "rules",
    "id": "EC2-002",
    "name": "SecurityGroupUnrestrictedPortAccess",
    "title": "Unrestricted SSH Access",
    "description": "Ensure no security groups allow ingress from 0.0.0/0 to port 22",
    "categories": ["security"],
    "level": "service",
    "settings": [
        {
            "type": "single-string-value",
            "name": "access",
            "label": "Access",
            "read-only": true,
            "hidden": true,
            "value": "SSH"
        }
      ],
      "risk-level": "MEDIUM",
      "knowledge-base-html": "unrestricted-ssh-access",
      "enabled": true,
      "package": "base",
      "update-date": "2018-11-19"
    },
    ...
  ]
}
```
