# Archived

Please access Trend Micro Cloud One - Conformity's public [API documentation here](https://cloudone.trendmicro.com/docs/conformity/api-reference/)
for the most updated version. This GitHub repository is no longer maintained and has been archived for historical purposes.

---

# Cloud Conformity API rule settings guide

Every rule in Cloud Conformity can be configured via API. These rule settings can disable or enable rules, change
default risk level, setup exceptions and configure rule-specific settings.

Below is a list of the available API calls

- [Get Rule Settings](#get-rule-settings)
- [Get Rule Settings By Id](#get-rule-settings-by-Id)
- [Update Rule Settings](#update-rule-settings)
- [Update Rule Settings By Id](#update-rule-settings-by-Id)

## Get Rule Settings

A GET request to this endpoint allows you to get rule settings.

##### Endpoints:

`GET /v1/accounts/{accountId}/settings/rules?includeDefaults=true`

##### Paramters

- `accountId`: Cloud Conformity ID of the account. Provide to get only settings set for the specified account.
- `includeDefaults`: _optional_ (true|false) Specify `true` if you want to see default rule settings which have not been configured.

##### Examples:
```json
{
  "id": "EC2-012",
  "enabled": true,
  "riskLevel": "MEDIUM",
  "exceptions": {
    "tags": [
      "Role::Temporary",
      "TagKey::TagValue",
      "TagKeyOrValue"
    ],
    "resources": [
      "i-98f25d31",
      "another EC2 instance ID"
    ]
  },
  "extraSettings": [
    {
      "name": "threshold",
      "type": "single-number-value",
      "value": 100
    }
  ],
  "configured": false
}
```

* **id:** Identifier of the rule.
  - Type: string
  - Values: Visit https://us-west-2.cloudconformity.com/v1/services for all available rule IDs.
* **enabled:** Whether or not this rule is enabled
  - Type: boolean
  - Values: true, false
* **riskLevel:** Risk level associated with this rule. This property is not returned for rules where the `riskLevel` is not configurable.
  - Type: string
  - Values: "LOW", "MEDIUM", "HIGH", "VERY_HIGH", "EXTREME  ""
* **exceptions:** If a resource matches these exceptions this rule will not be checked against it.
  - Type: Object {resources, tags}
    * **resources:** Array of AWS resources IDs to be exempted from this rule
      - Type: [string]
      - Values: AWS Resource IDs
    * **tags** Array of tags based on which exempted resources are identified.
      - Type: [string]
      - Values: Tag key or tag value or TagKey::TagValue
* **extraSettings** Rule-specific settings. Not all rules have extra settings.
  - Type: Array of Objects (Refer to the next section for detailed guide)
* **configured:** Whether or not this rule has been configured for the specified account
  - Read-only
  - Type: boolean
  - Values: true, false


###### Extra setting types
These formats are are found in `type` field of rule extra settings:

###### multiple-string-values
* **Usage:** Used when one or more strings are required.
* **UI:** List of text fields

_Example:_
```json5
{
  "id": "EC2-017",
  //...
  "extraSettings": [
    {
      "name": "desiredInstanceTypes",
      "type": "multiple-string-values",
      "values": [
        {
          "value": "t2.micro"
        },
        {
          "value": "m3.medium"
        },
        {
          "value": "m3.large"
        }
      ]
    }
  ],
  //...
}
```

###### multiple-object-values
* **Usage:** Used when one or more sets of values are required.
* **UI:** Table of text fields

_Example:_
```json5
{
  "id": "RTM-01a",
  //...
  "extraSettings": [
    {
      "name": "desiredInstanceTypes",
      "type": "multiple-object-values",
      "valueKeys": [
        "eventName",
        "eventSource",
        "userIdentityType"
      ],
      "values": [
        {
          "value": {
            "eventName": "^(iam.amazonaws.com)",
            "eventSource": "^(IAM).*",
            "userIdentityType": "^(Delete).*"
          }
        }
      ]
    }
  ],
  //...
}
```

###### choice-multiple-value
* **Usage:** Used when one or more selections from a predefined set of values are required.
* **UI:** List of checkboxes

Note that all allowed values are returned from `GET /v1/accounts/{accountId}/settings/rules?includeDefaults=true` endpoint

_Example:_
```json5
{
  "id": "RTM-009",
  //...
  "extraSettings": [
    {
      "name": "ConfigurationChanges",
      "values": [
        {
          "value": "internetGateway",
          "enabled": true
        },
        {
          "value": "securityGroup",
          "enabled": false
        },
        {
          "value": "elasticNetworkInterface",
          "enabled": true
        },
        {
          "value": "virtualPrivateCloud",
          "enabled": false
        }
      ]
    }
  ],
  //...
}
```

###### choice-single-value
* **Usage:** Used when a single value should be selected from multiple choices.
* **UI:** List of radio buttons

Note that the allowed values differ for each rule:

* Support-001 (Support Plan)
  - "Basic"
  - "Developer"
  - "Business"
  - "Enterprise"
* EC2-025 (EC2 Instance Tenancy)
  - "default"
  - "dedicated"
  - "host"
* ELB-008 (ELB Listener Security)
  - "1" (Yes)
  - "0" (No)
* ELB-010, ELBv2-004 (ELB/ELBv2 Minimum Number Of EC2 Instances)
  - Minimum Number Of EC2 Instances
    - 1 (One instance)
    - 2 (Two instances)
* ELBv2-005 (ELBv2 ALB Listener Security)
  - Include Internal Load Balancers
    - "1" (Yes)
    - "0" (No)

_Example:_
```json5
{
  "id": "Support-001",
  //...
  "extraSettings": [
    {
      "name": "level",
      "type": "choice-single-value",
      "value": "Developer"
    }
  ],
  //...
}
```

###### countries
* **Usage:** Used when one or more countries should be selected.
* **UI:** Multi-select list of countries

Value of each item is a country code. List of countries and their respective codes is available [here](./RuleSettingsCountryList.md).

_Example:_
```json5
{
  "id": "RTM-005",
  //...
  "extraSettings": [
    {
      "name": "authorisedCountries",
      "type": "countries",
      "values": [
        {
          "value": "CA"
        },
        {
          "value": "AU"
        },
        {
          "value": "US"
        },
        {
          "value": "UM"
        }
      ],
      "countries": true
    },
    //..
  ],
  //...
}
```

###### multiple-aws-account-values
* **Usage:** Used when one or more AWS Account IDs are required.
* **UI:** List of text fields accepting AWS Account IDs (12 digits)

_Example:_
```json5
{
  "id": "S3-015",
  //...
  "extraSettings": [
    {
      "type": "multiple-aws-account-values",
      "name": "friendlyAccounts",
      "values": [
        {
          "value": "123456789012"
        },
        {
          "value": "111111111111"
        }
      ]
    }
  ],
  //...
}
```

###### multiple-ip-values
* **Usage:** Used when one or more IP addresses or CIDRs are required.
* **UI:** List of text fields accepting IP address or CIDRs.

_Example:_
```json5
{
  "id": "RTM-007",
  //...
  "extraSettings": [
    {
      "type": "multiple-ip-values",
      "name": "authorisedIps",
      "values": [
        {
          "value": "1.2.3.4"
        },
        {
          "value": "195.200.0.0/24"
        }
      ]
    },
    //...
  ],
  //...
}
```

###### multiple-number-values
* **Usage:** Used when a one or more numbers are required.
* **UI:** List of text fields accepting numbers

_Example:_
```json5
{
  "id": "EC2-034",
  //...
  "extraSettings": [
    {
      "name": "commonlyUsedPorts",
      "type": "multiple-number-values",
      "values": [
        {
          "value": 80
        },
        {
          "value": 443
        },
        //...
      ]
    }
  ],
  //...
}
```

###### regions
* **Usage:** Used when one or more AWS region should be selected.
* **UI:** List of on/off sliders for every supported AWS region

Note that setting values only include selected region identifiers.

_Example:_
```json5
{
  "id": "RTM-008",
  //...
  "extraSettings": [
    {
      "type": "regions",
      "name": "authorisedRegions",
      "values": [
        "us-east-1",
        "us-west-2",
        "ap-southeast-2",
        "eu-west-1"
      ],
      "regions": true
    },
    //...
  ],
  //...
}
```

###### single-number-value
* **Usage:** Used when a single numeric value is required.
* **UI:** Text field accepting numbers

_Example:_
```json5
{
  "id": "SQS-003",
  //...
  "extraSettings": [
    {
      "name": "threshold",
      "type": "single-number-value",
      "value": 100
    }
  ],
  //...
}
```

###### single-string-value
* **Usage:** Used when a single string value is required.
* **UI:** Text field

_Example:_
```json5
{
  "id": "IAM-047",
  //...
  "extraSettings": [
    {
      "name": "iam_master_role_name",
      "type": "single-string-value",
      "value": "MasterIAMRole"
    },
    //...
  ],
  //...
}
```

###### single-value-regex
* **Usage:** Used when a regular expression is required.
* **UI:** Text field accepting regular expressions

_Example:_
```json5
{
  "id": "VPC-004",
  //...
  "extraSettings": [
    {
      "name": "pattern",
      "type": "single-value-regex",
      "value": "^vpc-(ue1|uw1|uw2|ew1|ec1|an1|an2|as1|as2|se1)-(d|t|s|p)-([a-z0-9\\-]+)$"
    }
  ],
  //...
}
```

###### ttl
* **Usage:** Real-time monitoring (RTM) rules have _Time To Live_. This is the
number of hours that an RTM check remains valid after which time it is expired
and may get triggered again.
* **UI:** Text field accepting numbers

_Example:_
```json5
{
  "id": "RTM-001",
  //...
  "extraSettings": [
    {
      "name": "ttl",
      "type": "ttl",
      "value": 2
    }
  ],
  //...
}
```

###### multiple-vpc-gateway-mappings
* **Usage:** Used when one or more VPC gateway mappings are required.
* **UI:** List of VPC Id and Gateway Id mapping

_Example:_
```json5
{
  "id": "VPC-013",
  //...
  "extraSettings": [
    {
      "type": "multiple-vpc-gateway-mappings",
      "name": "SpecificVPCToSpecificGatewayMapping",
      "mappings": [
        {
          "values": [
            {
              "type": "single-string-value",
              "name": "vpcId",
              "value": "vpc-001"
            },
            {
              "type": "multiple-string-values",
              "name": "gatewayIds",
              "values": [
                {
                  "value": "nat-001"
                },
                {
                  "value": "nat-002"
                 }
              ]
            }
          ]
        }
            //...
      ]
    }
  ],
  //...
}
```

## Get Rule Settings By Id

A GET request to this endpoint allows you to get rule settings based on the rule Id.

##### Endpoints:

`GET /v1/accounts/{accountId}/settings/rules/{ruleId}`

##### Parameters

- `accountId`: Cloud Conformity account ID. Provide to get only rule settings for the specified account.
- `ruleId`: Cloud Conformity Rule ID. Provide to get only rule settings for the specified rule.

Example Request:

```
curl --location --request GET 'https://us-west-2-api-development.cloudconformity.com/v1/accounts/accountId/settings/rules/VPC-013' \
--H 'Authorization: ApiKey apikeyId' \
--H 'Content-Type: application/vnd.api+json'
```

Example Response:
```
{
  "data": {
    "type": "accounts",
    "id": "accountId",
    "attributes": {
      "settings": {
        "rules": [
          {
            "ruleExists": true,
            "riskLevel": "LOW",
            "extraSettings": [
              {
                "type": "multiple-vpc-gateway-mappings",
                "name": "SpecificVPCToSpecificGatewayMapping",
                "mappings": [
                  {
                    "values": [
                      {
                        "type": "single-string-value",
                        "name": "vpcId",
                        "value": "vpc-001"
                      },
                      {
                        "type": "multiple-string-values",
                        "name": "gatewayIds",
                        "values": [
                          {
                            "value": "nat-0011"
                          },
                          {
                            "value": "nat-0022"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "values": [
                      {
                        "type": "single-string-value",
                        "name": "vpcId",
                        "value": "vpc-002"
                      },
                      {
                        "type": "multiple-string-values",
                        "name": "gatewayIds",
                        "values": [
                          {
                            "value": "nat-002"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ],
            "provider": "aws",
            "id": "VPC-013",
            "enabled": true,
            "exceptions": {
              "resources": null,
              "tags": null
            }
          }
        ],
        "access": {}
      },
      "access": null,
      "cloud-type": "aws"
    },
    "relationships": {
      "organisation": {
        "data": {
          "type": "organisations",
          "id": "organisationId"
        }
      }
    }
  }
}

```

## Update Rule Settings

A PATCH request to this endpoint allows you to update rule settings.

##### Endpoints:

`PATCH accounts/{accountId}/settings/rules`

##### Parameters
- `accountId`: String, the Conformity account Id
- `data`: A JSON object containing JSONAPI compliant data object with following properties
  - `attributes`: Object containing
    - `ruleSettings`: Array of rule settings containing
      - `id`: String, the Conformity RuleId
      - `enabled`: Boolean, true for enabling, false for disabling the rule.
      - `riskLevel`: String, the risk level of the rule. Must be from the following: LOW\| MEDIUM \| HIGH \| VERY_HIGH \| EXTREME
      - `ruleExists`: Boolean, true for existing, false for not existing rule.
      - `provider`: String, the cloud provider which Conformity currently supports: aws \| azure
      - `extraSettings`: Object containing parameters that are extra setting of the rule

Example Request:
```
curl --location --request PATCH 'https://us-west-2-api-development.cloudconformity.com/v1/accounts/accountId/settings/rules' \
--header 'Authorization: ApiKey apiKey' \
--header 'Content-Type: application/vnd.api+json' \
--data-raw '
{
  "data":{
    "attributes":{
      "ruleSettings": [
        {
          "riskLevel": "MEDIUM",
          "id": "S3-019",
          "extraSettings": [
            {
              "name": "s3_buckets",
              "label": "S3 Buckets",
              "type": "multiple-string-values",
              "values": [
                {
                  "value": "test-bucket"
                },
                {
                  "value": "test-bucket-2"
                }
              ]
            }
          ],
          "provider": "aws",
          "enabled": true,
          "exceptions": {
            "resources": null,
            "tags": null
          }
        }
      ],
      "note":"test"
    }
  }
}
'
```

Example Response:

```
{
  "data": {
    "type": "accounts",
    "id": "accountId",
    "attributes": {
      "settings": {
        "rules": [
          {
            "riskLevel": "MEDIUM",
            "id": "S3-019",
            "extraSettings": [
              {
                "name": "s3_buckets",
                "label": "S3 Buckets",
                "type": "multiple-string-values",
                "values": [
                  {
                    "value": "test-bucket"
                  },
                  {
                    "value": "test-bucket-2"
                  }
                ]
              }
            ],
            "provider": "aws",
            "enabled": true,
            "exceptions": {
              "resources": null,
              "tags": null
            }
          }
        ],
        "access": {}
      },
      "access": null,
      "cloud-type": "aws"
    },
    "relationships": {
      "organisation": {
        "data": {
          "type": "organisations",
          "id": "organisationId"
        }
      }
    }
  }
}
```


## Update Rule Settings By Id

A PATCH request to this endpoint allows you to update a specific rule's settings.

##### Endpoints:

`PATCH accounts/{accountId}/settings/rules/{ruleId}`

##### Parameters
- `accountId`: String, the Conformity account Id
- `ruleId`: String, the Conformity ruleId
- `data`: A JSON object containing JSONAPI compliant data object with following properties
  - `attributes`: Object containing
    - `ruleSetting`: Object containing
      - `id`: String, the Conformity ruleId
      - `enabled`: Boolean, true for enabling, false for disabling the rule.
      - `riskLevel`: String, the risk level of the rule. Must be from the following: LOW\| MEDIUM \| HIGH \| VERY_HIGH \| EXTREME
      - `ruleExists`: Boolean, true for existing, false for not existing rule.
      - `provider`: String, the cloud provider which Conformity currently supports: aws \| azure
      - `extraSettings`: Object containing parameters that are extra setting of the rule

Example Request:

```
curl --location --request PATCH 'https://us-west-2-api-development.cloudconformity.com/v1/accounts/accountId/settings/rules/VPC-013' \
--header 'Authorization: ApiKey apiKey' \
--header 'Content-Type: application/vnd.api+json' \
--data-raw
{
  "data":{
    "attributes":{
      "ruleSetting": {
        "id": "VPC-013",
        "enabled": true,
        "riskLevel": "LOW",
        "ruleExists":true,
        "extraSettings": [
          {
            "type": "multiple-vpc-gateway-mappings",
            "name": "SpecificVPCToSpecificGatewayMapping",
            "mappings": [
              {
                "values": [
                  {
                    "type": "single-string-value",
                    "name": "vpcId",
                    "value": "vpc-001"
                  },
                  {
                    "type": "multiple-string-values",
                    "name": "gatewayIds",
                    "values": [
                      {
                        "value": "nat-0011"
                      },
                      {
                        "value": "nat-0022"
                      }
                    ]
                  }
                ]
              },
              {
                "values": [
                  {
                    "type": "single-string-value",
                    "name": "vpcId",
                    "value": "vpc-002"
                  },
                  {
                    "type": "multiple-string-values",
                    "name": "gatewayIds",
                    "values": [
                      {
                        "value": "nat-002"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        "provider": "aws",
        "exceptions": {
          "resources": null,
          "tags": null
        }
      },
      "note":"note for updating the rule setting"
    }
  }
}
'
```

Example Response:

```
{
  "data": {
    "type": "accounts",
    "id": "accountId",
    "attributes": {
      "settings": {
        "rules": [
          {
            "enabled": false,
            "id": "S3-021",
            "riskLevel": "HIGH"
          },
          {
            "ruleExists": true,
            "riskLevel": "LOW",
            "extraSettings": [
              {
                "type": "multiple-vpc-gateway-mappings",
                "name": "SpecificVPCToSpecificGatewayMapping",
                "mappings": [
                  {
                    "values": [
                      {
                        "type": "single-string-value",
                        "name": "vpcId",
                        "value": "vpc-001"
                      },
                      {
                        "type": "multiple-string-values",
                        "name": "gatewayIds",
                        "values": [
                          {
                            "value": "nat-0011"
                          },
                          {
                            "value": "nat-0022"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "values": [
                      {
                        "type": "single-string-value",
                        "name": "vpcId",
                        "value": "vpc-002"
                      },
                      {
                        "type": "multiple-string-values",
                        "name": "gatewayIds",
                        "values": [
                          {
                            "value": "nat-002"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ],
            "provider": "aws",
            "id": "VPC-013",
            "enabled": true,
            "exceptions": {
              "resources": null,
              "tags": null
            }
          }
        ],
        "access": {}
      },
      "access": null,
      "cloud-type": "aws"
    },
    "relationships": {
      "organisation": {
        "data": {
          "type": "organisations",
          "id": "organisationId"
        }
      }
    }
  }
}
```
