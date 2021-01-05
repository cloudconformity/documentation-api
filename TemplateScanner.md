# Archived

Please access Trend Micro Cloud One - Conformity's public [API documentation here](https://cloudone.trendmicro.com/docs/conformity/api-reference/)
for the most updated version. This GitHub repository is no longer maintained and has been archived for historical purposes.

---

# Cloud Conformity Template Scanner API

## Introduction
Cloud Conformity provides Template Scanner capability as a preventative measure to
ensure your AWS infrastructure remains compliant by detecting risks in template
files before they are launched into AWS.

This API endpoint is suitable for CI/CD pipelines and automation.

## Scan a CloudFormation template
This endpoint is used to scan a template file. Currently, CloudFormation template is
supported.

#### Endpoint:
`POST /v1/template-scanner/scan`

Request payload is a [JSON:API 1.0](https://jsonapi.org/format/1.0/) compatible
structure consisting of the following data attributes:
* **type:** Type of the infrastructure template file.
  - Type: string
  - Values: `cloudformation-template`
* **accountId:** The ID of the account you want to use for rule configurations. If you specify the value for this attribute you must not send `profileId` as template scanner can work with one set of rule configurations. (optional)
  - Type: string
* **profileId:** The ID of the profile you want to use for rule configurations. If you specify the value for this attribute you must not send `accountId` as template scanner can work with one set of rule configurations. (optional)
  - Type: string
* **contents:** Contents of the infrastructure template file.
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
- Request with profile ID:
    ```json5
    {
      "data": {
        "attributes": {
          "type": "cloudformation-template",
          "profileId": "your-profile-id",
          "contents": "---\nAWSTemplateFormatVersion: '2010-09-09'\nResources:\n  S3Bucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      AccessControl: PublicRead"
        }
      }
    }
    ```
- Request with account ID:
    ```json5
    {
      "data": {
        "attributes": {
          "type": "cloudformation-template",
          "accountId": "your-account-id",
          "contents": "---\nAWSTemplateFormatVersion: '2010-09-09'\nResources:\n  S3Bucket:\n    Type: AWS::S3::Bucket\n    Properties:\n      AccessControl: PublicRead"
        }
      }
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
  - NatGateway
  - NetworkAcl
  - RouteTable
  - SecurityGroup
  - Subnet
  - VPCEndpoint
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

#### Examples:
* [Scan a CloudFormation template using Bash](examples/bash/template-scanner/scan.sh)
* [Scan a CloudFormation template using Python](examples/python/template-scanner/scan.py)
