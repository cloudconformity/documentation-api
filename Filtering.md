# Filtering

Not complete set of options. (To be completed!)

| Name  | Values |
| ------------- | ------------- |
| `filter.regions`  | An array of valid AWS region strings. (e.g. ["us-west-1", "us-west-2"])<br /> For more information about regions, please refer to [Cloud Conformity Region Endpoint](https://us-west-2.cloudconformity.com/v1/regions) |
| `filter.services`  | An array of AWS service strings from the following: <br /> AutoScaling \| CloudConformity \| CloudFormation \| CloudFront \| CloudTrail \| CloudWatch \|<br />CloudWatchEvents \| CloudWatchLogs \| Config \| DynamoDB \| EBS \| EC2 \| ElastiCache \|<br />Elasticsearch \| ELB \| IAM \| KMS \| RDS \| Redshift \| ResourceGroup \| Route53 \| S3 \| SES \| SNS \| SQS \| VPC \| WAF \| ACM \| Inspector \| TrustedAdvisor \| Shield \| EMR \| Lambda \| Support \| Organizations \| Kinesis \| EFS<br /><br />For more information about services, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| `filter.categories`  | An array of category (AWS well-architected framework category) strings from the following:<br /> security \| cost-optimisation \| reliability \| performance-efficiency  \| operational-excellence <br />|
| `filter.tags`  | An array of any assigned metadata tags to your AWS resources |