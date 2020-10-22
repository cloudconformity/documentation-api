# Filtering

Not complete set of options. (To be completed!)

| Name  | Values |
| ------------- | ------------- |
| `filter.services`  | An array of service strings. e.g. for AWS ["Auto-Scaling", "CloudFormation"], for Azure ["StorageAccounts", "SecurityCenter"]<br /> <br /> For more information about services, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| `filter.resourceTypes`  | An array of resource types. e.g. for AWS ["kms-key", "ec2-instance"], for Azure ["active-directory-users"] <br /><br />For more information about services, please refer to [Cloud Conformity ResourceTypes Endpoint](https://us-west-2.cloudconformity.com/v1/resource-types) |
| `filter.regions`  | An array of valid region strings. e.g. for AWS ["us-west-1", "us-west-2"], for Azure ["eastus", "westus"] <br /><br /> For more information about regions, please refer to [Cloud Conformity Region Endpoint](https://us-west-2.cloudconformity.com/v1/regions) |
| `filter.ruleIds`  | An array of rule ids. e.g. ["EC2-001", "S3-001"]<br /><br />For more information about services, please refer to [Cloud Conformity Services Endpoint](https://us-west-2.cloudconformity.com/v1/services) |
| `filter.tags`  | An array of any assigned metadata tags to your resources |
| `filter.text`  | Filter by resource Id, rule title or message. A string. e.g "john", "s3" or "write" |
| `filter.resource`  | Filter by resource Id for an exact match, e.g "johnSmith", a wildcard, e.g "joh?Sm*h" or when used with filter[resourceSearchMode]=regex, a regular expression, e.g "joh.?Sm.*h". Regular expressions should be URL encoded before sending. <br />For more information about filters, please refer to [Filter and Search](https://www.cloudconformity.com/help/rules/filter-and-search.html) |
| `filter.resourceSearchMode`  | Set the search mode for the resource filter. <br /><br /> Valid values are "text" or "regex". Text supports an exact match or the wildcard characters * and ?<br /> Defaults to "text" |
| `filter.message`  | Filter by message. Will find messages that contain all words regardless of the order. e.g "new message" will find "message new" and "new message" |
| `filter.createdLessThanDays`  | Only show checks created less than X days ago. When this field is populated, the checks created within the last X days will be returned. When both this field and `filter.createdMoreThanDays` are populated, it will display the checks created between `filter.createdLessThanDays` days ago and `filter.createdMoreThanDays` days ago. Number. e.g. 5. |
| `filter.createdMoreThanDays`        | Only show checks created more than X days ago. When this field is populated, the checks created up to X days ago will be returned. Number. e.g. 5.
| `filter.categories`  | An array of category (Conformity category) strings from the following:<br /> security \| cost-optimisation \| operational-excellence \| reliability  \| performance-efficiency <br />|
| `filter.riskLevels`  | Risk level. Possible values: ["EXTREME" \| "VERY_HIGH" \| "HIGH" \| "MEDIUM" \| "LOW"] |
| `filter.complianceStandards`  | An array of supported standard or framework ids. Possible values: ["AWAF" \| "CISAWSF" \| "CISAZUREF" \| "CISAWSTTW" \| "PCI" \| "HIPAA" \| "GDPR" \| "APRA" \| "NIST4" \| "SOC2" \| "NIST-CSF" \| "ISO27001" \| "AGISM" \| "ASAE-3150"] \| "MAS"]
| `filter.reportComplianceStandardId`  | A single standard or framework id string. Possible values: ["AWAF" \| "NIST4" \| "CISAWSF" \| "CISAZUREF" \| "PCI" \| "SOC2" \| "NIST-CSF" \| "ISO27001" \| "AGISM" \| "HIPAA" \| "ASAE-3150" \| "APRA" ] |
| `filter.statuses`  | The status of the check. Valid values: ["SUCCESS" \| "FAILURE"] |
| `filter.suppressedFilterMode`  | Whether to use the `"v1"` or `"v2"` suppressed functionality. `"v1"`: Using `suppressed=true` will return both suppressed and unsuppressed checks, `suppressed=false` will just return unsuppressed checks. `"v2"`: Using `suppressed=true` return will just return suppressed checks, `suppressed=false` will just return unsuppressed checks, and omitting the filter will return both. Defaults to `"v1"`. Valid values: [ "v1" \| "v2" ]
| `filter.suppressed`  | Show Suppressed rules. A boolean. Will default to `true` for "v1", and omitted for "v2". Valid values: [true \|false] |
| `filter.providers`  | Cloud providers. Possible values: ["aws" \| "azure"] |
