# Archived

Please access Trend Micro Cloud One - Conformity's public [API documentation here](https://cloudone.trendmicro.com/docs/conformity/api-reference/)
for the most updated version. This GitHub repository is no longer maintained and has been archived for historical purposes.

---

# Cloud Conformity Resources API

Below is a list of the available API calls:

- [Get Excluded Resources](#get-excluded-resources)

## Get Excluded Resources

This endpoint allows a user with FULL access to get the list of excluded resources due to exceptions been configured.

##### Endpoints

`GET /resources?excluded=true`

##### Parameters

- `excluded`: true for returning excluded resources (required). Currently only `true` is supported.
- `accountIds`: A comma-separated list of Cloud Conformity accountIds. If not specified, results will be returned for all accounts the user has access to.
- `page[size]`: Indicates the number of excluded resources that should be returned. The maximum value is 2000 and defaults to 100 if not specified
- `page[number]`: Indicates the page number, defaults to 0
- `filter`: Optional parameter(s).

###### There is a 10k limit to the maximum number of excluded resources that can be returned. Paging will not work for excluded resources higher than this limit. To fetch larger numbers, segment your requests using account and/or region filtering. On larger organisations, filter requests per account, per region or provider to avoid timeouts

##### Filtering

The `filter` query parameter is reserved to be used as the basis for filtering.

For example, the following is a request for a page of excluded resources filtered by cloud provider `AWS`:

```
GET /resources?excluded=true&accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[providers]=aws
```

Multiple filter values can be combined in a comma-separated list. For example the following is a request for a page of excluded resources in `us-west-2` or `us-west-1` regions:

```
GET /resources?excluded=true&accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[regions]=us-west-1,us-west-2
```

Furthermore, multiple filters can be applied to a single request. For example, the following is a request to get excluded resources for `us-west-2` region when the provider of the resource is `aws`

```
GET /resources?excluded=true&accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[regions]=us-west-2&filter[tags]=MyBucket
```

The table below give more information about filter options:

| Name              | Values                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter[regions]   | AWS:<br>global \| us-east-1 \| us-east-2 \| us-west-1 \| us-west-2 \| ap-south-1 \| ap-northeast-2 \|<br>ap-southeast-1 \| ap-southeast-2 \| ap-northeast-1 \| eu-central-1 \| eu-west-1 \| eu-west-2 \|<br> eu-west-3 \| eu-north-1 \| sa-east-1 \| ca-central-1 \| me-south-1 \| ap-east-1 <br><br>Azure:<br>global \| eastasia \| southeastasia \| centralus \| eastus \| eastus2 \| westus \| northcentralus \| southcentralus \| northeurope \| westeurope \| japanwest \| japaneast \| brazilsouth \| australiaeast \| australiasoutheast \| southindia \| centralindia \| westindia \| canadacentral \| canadaeast \| uksouth \| ukwest \| westcentralus \| westus2 \| koreacentral \| koreasouth \| francecentral \| francesouth \| australiacentral \| australiacentral2 \| southafricanorth \| southafricawest<br><br>For more information about regions, please refer to [Cloud Conformity Region Endpoint](https://us-west-2.cloudconformity.com/v1/regions) |
| filter[tags]      | Any assigned metadata tags to your resources                                                                                                                                                                                                                                                                                                                                    |
| filter[providers] | Cloud providers. Accepted values: ["aws" \| "azure"]                                                                                                                                                                                                                                                                                                                            |

<br>
Example Request:

```#!/bin/bash
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey S1YnrbQuWagQS0MvbSchNHDO73XHqdAqH52RxEPGAggOYiXTxrwPfmiTNqQkTq3p" \
https://us-west-2-api.cloudconformity.com/v1/resources?excluded=true&accountIds=r1gyR4cqg&page[size]=100&page[number]=0&filter[regions]=us-west-2&filter[tags]=Version::4
```

Example Response:

```JSON
{
    "data": [
        {
            "type": "resources",
            "id": "ccrn:aws:r1gyR4cqg:CloudFormation:us-west-2:CloudConformityMonitoring",
            "attributes": {
                "account-id": "r1gyR4cqg",
                "ccrn": "ccrn:aws:r1gyR4cqg:CloudFormation:us-west-2:CloudConformityMonitoring",
                "resource": "CloudConformityMonitoring",
                "region": "us-west-2",
                "descriptor-type": "cfm-stack",
                "link": "https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks?filter=active",
                "link-title": "CloudConformityMonitoring",
                "resource-name": "CloudFormation Stack",
                "tags": [
                    "Version::4",
                    "LastUpdatedTime::Sat  9 Feb 2019 19:11:06 AEDT"
                ],
                "provider": "aws",
                "excluded-rules": [
                    {
                        "rule-id": "CFM-001"
                    }
                ]
            }
        }
    ]
}
```
