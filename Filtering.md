# Filtering

Not complete set of options. (To be completed!)

| Name  | Values |
| ------------- | ------------- |
| `filter.services`  | An array of AWS service strings from the following: <br /> AutoScaling \| CloudConformity \| CloudFormation \| CloudFront \| CloudTrail \| CloudWatch \|<br />CloudWatchEvents \| CloudWatchLogs \| Config \| DynamoDB \| EBS \| EC2 \| ElastiCache \|<br />Elasticsearch \| ELB \| IAM \| KMS \| RDS \| Redshift \| ResourceGroup \| Route53 \| S3 \| SES \| SNS \| SQS \| VPC \| WAF \| ACM \| Inspector \| TrustedAdvisor \| Shield \| EMR \| Lambda \| Support \| Organizations \| Kinesis \| EFS<br /><br />For more information about services, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| `filter.resourceTypes`  | An array of resource types. e.g. ["kms-key", "ec2-instance"] <br /><br />For more information about services, please refer to [Cloud Conformity ResourceTypes Endpoint](https://us-west-2.cloudconformity.com/v1/resource-types) |
| `filter.regions`  | An array of valid AWS region strings. (e.g. ["us-west-1", "us-west-2"])<br /> For more information about regions, please refer to [Cloud Conformity Region Endpoint](https://us-west-2.cloudconformity.com/v1/regions) |
| `filter.ruleIds`  | An array of rule ids. e.g. ["EC2-001", "S3-001"]<br /><br />For more information about services, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| `filter.tags`  | An array of any assigned metadata tags to your AWS resources |
| `filter.text`  | Filter by resource Id, rule title or message. A string. e.g "john", "s3" or "write" |
| `filter.createdLessThanDays`  | Only show checks created less than X days ago. Number. e.g. 5. |
| `filter.categories`  | An array of category (AWS well-architected framework category) strings from the following:<br /> security \| cost-optimisation \| reliability \| performance-efficiency  \| operational-excellence <br />|
| `filter.riskLevels`  | Risk level. Possible values: ["EXTREME" \| "VERY_HIGH" \| "HIGH" \| "MEDIUM" \| "LOW"] |
| `filter.complianceStandards`  | An array of supported standard or framework ids. Possible values: ["AWAF" \| "CISAWSF" \| "CISAZUREF" \| "CISAWSTTW" \| "PCI" \| "HIPAA" \| "GDPR" \| "APRA" \| "NIST4" \| "SOC2" \| "NIST-CSF" \| "ISO27001" \| "AGISM"\| "ASAE-3150"] \| "MAS"]
| `filter.reportComplianceStandardId`  | A single standard or framework id string. Possible values: ["AWAF" \| "NIST4" \| "CISAWSF" \| "CISAZUREF" \| "SOC2" \| "NIST-CSF" \| "ISO27001" \| "AGISM"\| "HIPAA"\| "ASAE-3150" ] |
| `filter.statuses`  | The status of the check. Valid values: ["SUCCESS" \| "FAILURE"] |
| `filter.suppressedFilterMode`  | Whether to use the `"v1"` or `"v2"` suppressed functionality. `"v1"`: Using `suppressed=true` will return both suppressed and unsuppressed checks, `suppressed=false` will just return unsuppressed checks. `"v2"`: Using `suppressed=true` return will just return suppressed checks, `suppressed=false` will just return unsuppressed checks, and omitting the filter will return both. Defaults to `"v1"`. Valid values: [ "v1" \| "v2" ]
| `filter.suppressed`  | Show Suppressed rules. A boolean. Will default to `true` for "v1", and omitted for "v2". Valid values: [true \|false] |
| `filter.providers`  | Cloud providers. Possible values: ["aws" \| "azure"] |
