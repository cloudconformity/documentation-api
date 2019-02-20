# Filtering

Not complete set of options. (To be completed!)

| Name  | Values |
| ------------- | ------------- |
| `filter.services`  | An array of AWS service strings from the following: <br /> AutoScaling \| CloudConformity \| CloudFormation \| CloudFront \| CloudTrail \| CloudWatch \|<br />CloudWatchEvents \| CloudWatchLogs \| Config \| DynamoDB \| EBS \| EC2 \| ElastiCache \|<br />Elasticsearch \| ELB \| IAM \| KMS \| RDS \| Redshift \| ResourceGroup \| Route53 \| S3 \| SES \| SNS \| SQS \| VPC \| WAF \| ACM \| Inspector \| TrustedAdvisor \| Shield \| EMR \| Lambda \| Support \| Organizations \| Kinesis \| EFS<br /><br />For more information about services, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| `filter.descriptorTypes`  | An array of resource types. e.g. ["kms-key", "ec2-instance"] |
| `filter.regions`  | An array of valid AWS region strings. (e.g. ["us-west-1", "us-west-2"])<br /> For more information about regions, please refer to [Cloud Conformity Region Endpoint](https://us-west-2.cloudconformity.com/v1/regions) |
| `filter.ruleIds`  | An array of rule ids. e.g. ["EC2-001", "S3-001"]  |
| `filter.tags`  | An array of any assigned metadata tags to your AWS resources |
| `filter.text`  | Filter by resource Id, rule title or message. A string. e.g "john", "s3" or "write" |
| `filter.createdLessThanDays`  | Only show checks created less than X days ago. Number. e.g. 5. |
| `filter.categories`  | An array of category (AWS well-architected framework category) strings from the following:<br /> security \| cost-optimisation \| reliability \| performance-efficiency  \| operational-excellence <br />|
| `filter.riskLevels`  | Risk level. Possible values: ["EXTREME" \| "VERY_HIGH" \| "HIGH" \| "MEDIUM" \| "LOW"] |
| `filter.compliances`  | Compliance and standards. Possible values: ["AWAF" \| "CISAWSF" \| "PCI DSS" \| "HIPAA" \| "GDPR" \| "APRA"] |
| `filter.statuses`  | The status of the check. Valid values: ["SUCCESS" \| "FAILURE"] |
| `filter.suppressed`  | Show Suppressed rules. A boolean. Valid values: [true \|false] |
