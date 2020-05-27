# Cloud Conformity API rule settings guide

## Rule settings
Every rule in Cloud Conformity can be configured via API. These rule settings can disable or enable rules, change 
default risk level, setup exceptions and configure rule-specific settings.

Rule settings returned from `GET /v1/accounts/{accountId}/settings/rules?includeDefaults=true` endpoint 
are formatted as the following example:
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

    
## Extra setting types
These formats are are found in `type` field of rule extra settings:

#### multiple-string-values
* **Usage:** Used when a one or more strings are required.
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

#### choice-multiple-value
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

#### choice-single-value
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

#### countries
* **Usage:** Used when one or more countries should be selected.
* **UI:** Multi-select list of countries

Value of each item is a country code. List of countries and their respective codes is available [here](https://gist.github.com/sam-negotiator/3682b4e74b1c4cf746690987a2b40c6d).

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

#### multiple-aws-account-values
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

#### multiple-ip-values
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

#### multiple-number-values
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

#### regions
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

#### single-number-value
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

#### single-string-value
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

#### single-value-regex
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

#### ttl
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
