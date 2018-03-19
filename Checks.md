# Cloud Conformity Checks API

Below is a list of the available APIs:

- [List All Checks](#list-all-checks)


## List All Checks

This endpoint allows you to collect checks for a specified account.

##### Endpoints:

`GET /checks`

##### Parameters
- `accountIds`: A comma-separated list of Cloud Conformity accountIds.
- `page[size]`: Indicates the number of results that should be returned. Maximum value is 1000 and defaults to 100 if not specified
- `page[number]`: Indicates the page number, defaults to 0
- `filter`: Optional parameter including services, regions, categories, statuses, ruleIds, riskLevel, suppressed, and tags.


##### Filtering
The `filter` query parameter is reserved to be used as the basis for filtering.


For example, the following is a request for a page of checks filtered by service `EC2`:

```
GET /checks?accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[services]=EC2
```

Multiple filter values can be combined in a comma-separated list. For example the following is a request for a page of checks in `us-west-2` or `us-west-1` regions:
```
GET /checks?accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[regions]=us-west-1,us-west-2
```

Furthermore, multiple filters can be applied to a single request. For example, the following is a request to get checks for `us-west-2` region when the status of the check is `SUCCESS`, and it's for `EC2` or `IAM` service in `security` category with `HIGH` risk level
```
GET /checks?accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[regions]=us-west-2&filter[statuses]=SUCCESS&filter[categories]=security&filter[riskLevels]=HIGH&filter[services]=EC2,IAM
```


The table below give more information about filter options:

| Name  | Values |
| ------------- | ------------- |
| filter[regions]  | global \| us-east-2 \| us-east-1 \| us-west-1 \| us-west-2 \| ap-south-1 \| ap-northeast-2 \|<br />ap-southeast-1 \| ap-southeast-2 \| ap-northeast-1 \| ca-central-1 \| eu-central-1 \| eu-west-1 \|<br /> eu-west-2 \| sa-east-1 <br /><br />For more information about regions, please refer to [Cloud Conformity Region Endpoint](https://us-west-2.cloudconformity.com/v1/regions) |
| filter[services]  | AutoScaling \| CloudConformity \|CloudFormation \| CloudFront \| CloudTrail \| CloudWatch \|<br />CloudWatchEvents \| CloudWatchLogs \| Config \| DynamoDB \| EBS \| EC2 \| ElastiCache \| Elasticsearch \| ELB \| IAM \| KMS \| RDS \| Redshift \| ResourceGroup \| Route53 \| S3 \| SES \|<br />SNS \| SQS \| VPC \| WAF \| ACM \| Inspector \| TrustedAdvisor \| Shield \| EMR \| Lambda \|<br />Support \| Organizations \| Kinesis \| EFS<br /><br />For more information about services, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| filter[categories]  | security \| cost-optimisation \| reliability \| performance-efficiency  \| operational-excellence <br /><br />For more information about categories, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| filter[riskLevels]  | LOW\| MEDIUM \| HIGH \| VERY_HIGH \| EXTREME <br /><br />For more information about risk levels, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| filter[statuses]  | SUCCESS \| FAILURE |
| filter[ruleIds]  | EC2-001 \| EC2-002 \| etc <br /><br />For more information about rules, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| filter[suppressed]  | true \| false <br /><br /> Whether or not include suppressed checks. The default value is true |
| filter[createdDate]  | The date when the check was created<br /><br />The numeric value of the specified date as the number of milliseconds since January 1, 1970, 00:00:00 UTC |
| filter[tags]  | Any assigned metadata tags to your AWS resources |

<br />


Example Request:

```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/checks?accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[regions]=us-west-2&filter[ruleIds]=EC2-001,EC2-002&filter[statuses]=SUCCESS&filter[categories]=security&filter[riskLevels]=HIGH&filter[services]=EC2&filter[createdDate]=1502572157914
```
Example Response:
###### Note the size of this response can be quite large and the example below is purposefully truncated

```
{
    "data": [
        {
            "type": "checks",
            "id": "ccc:r2gyR4cqg:IAM-017:IAM:global:groups-test",
            "attributes": {
                "region": "global",
                "status": "FAILURE",
                "risk-level": "LOW",
                "message": "IAM Group test contains no user",
                "last-modified-date": 1500166639466,
                "last-updated-date": 1500166639466,
                "failure-discovery-date": 1498910777689,
                "last-updated-by": "SYSTEM",
                "ccrn": "ccrn:aws:r1gyR4cqg:IAM:global:groups-test",
                "tags": [],
                "cost": 0,
                "waste": 0
            },
            "relationships": {
                "rule": {
                    "data": {
                        "type": "rules",
                        "id": "IAM-017"
                    }
                },
                "account": {
                    "data": {
                        "type": "accounts",
                        "id": "r1gyR4cqg"
                    }
                },
                "event": {
                    "data": null
                }
            }
        }

    ],
    "meta": {
        "total-pages": 714
    }
}
```

