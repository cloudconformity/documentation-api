# Cloud Conformity Infrastructure as Code (IaC) Scanning API

## Introduction
Cloud Conformity provides IaC Scanning capability as a preventative measure to 
ensure your AWS infrastructure remains compliant by detecting risks in IaC files
before they are launched into AWS.

This API endpoint is suitable for CI/CD pipelines and automation.

## Scan a CloudFormation template
This endpoint is used to scan an IaC file. Currently, CloudFormation template is
supported.

#### Endpoint: 
`POST /v1/iac-scanning/scan`

_Note:_ This API endpoint is subject to change in path, method, and format of input and output.

Request payload is a [JSON:API 1.0](https://jsonapi.org/format/1.0/) compatible
structure consisting of the following data attributes:
* **type:** Type of the IaC file.
  - Type: string
  - Values: `cloudformation-template`
* **contents:** Contents of the IaC file.
  - Type: string
  - Value: JSON or Yaml string
  
_Example:_
- Request:
	```json5
	{
	  "data": {
		"attributes": {
		  "type": "cloudformation-template",
		  "contents": "---\nAWSTemplateFormatVersion: '2010-09-09'\nResources:\n  S3Bucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      AccessControl: PublicRead"
		}
	  }
	}
	```
- Response:
	```json5
	{
      "data": [
        {
          "type": "checks",
          "id": "ccc:AccountId:S3-001:S3:us-east-1:S3Bucket",
          "attributes": {
            "region": "us-east-1",
            "status": "FAILURE",
            "risk-level": "VERY_HIGH",
            "pretty-risk-level": "Very High",
            "message": "Bucket S3Bucket allows public 'READ' access.",
            "resource": "S3Bucket",
            "descriptorType": "s3-bucket",
            "categories": [
              "security"
            ],
            "last-updated-date": null,
            "tags": [],
            "cost": 0,
            "waste": 0,
            "not-scored": false,
            "ignored": false,
            "rule-title": "S3 Bucket Public 'READ' Access"
          },
          "relationships": {
            //...
          }
        },
        //...
      ]
    }
	```

#### Supported resource types:
- APIGateway
  - RestApi
- CloudFormation
  - Stack
- CloudTrail
  - Trail
- DynamoDB
  - Table
- EC2
  - Instance
  - NetworkAcl
  - RouteTable
  - SecurityGroup
  - Subnet
- EFS
  - FileSystem
- ELB
  - LoadBalancer
- ELBv2
  - LoadBalancer
- IAM
  - Group
  - ManagedPolicy
  - Role
- Kinesis
  - Stream
- KMS
  - Key
- Lambda
  - Function
- RDS
  - DBCluster
  - DBInstance
- S3Bucket
  - S3Bucket
- SNS
  - Topic
- WorkSpaces
  - WorkSpace

#### Supported rules:
All resource level rules are supported.
Refer to [Cloud Conformity rule catalogue](https://us-west-2.cloudconformity.com/v1/services) 
for the list of rules.
