# Archived

Please access Trend Micro Cloud One - Conformity's public [API documentation here](https://cloudone.trendmicro.com/docs/conformity/api-reference/)
for the most updated version. This GitHub repository is no longer maintained and has been archived for historical purposes.

---

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
| `filter.resource`  | Filter by resource Id for an exact match, e.g "johnSmith", a wildcard, e.g "joh?Sm*h" or when used with filter[resourceSearchMode]=regex, a regular expression, e.g "joh.?Sm.*h". <br />For more information about filters, please refer to [Filter and Search](https://www.cloudconformity.com/help/rules/filter-and-search.html) |
| `filter.resourceSearchMode`  | Set the search mode for the resource filter. <br /><br /> Valid values are "text" or "regex". Text supports an exact match or the wildcard characters * and ?<br /> Defaults to "text" |
| `filter.message`  | Filter by message. Will find messages that contain all words regardless of the order. e.g "new message" will find "message new" and "new message" |
| `filter.createdLessThanDays`  | Deprecated. Use `filter[newerThanDays]` instead. |
| `filter.createdMoreThanDays`        | Deprecated. Use `filter[olderThanDays]` instead. |
| `filter.newerThanDays`  | The `filter.olderThanDays` and `filter.newerThanDays` range refers to days to go back from the report's generation date. It converts the number of days entered to the date when the check was created and assigned a status, or where the status changed from "Success" to "Failure" or from "Failure" to "Success". You can use this filter by entering values for the number of days you wish to view before `filter[olderThanDays]` and after `filter[newerThanDays]`. You must pass at least 2 days up to 1 day to see any checks for a specific time duration. To display checks from a particular day up to the report's generation date, pass the number of days in `filter.newerThanDays` and leave `filter.olderThanDays` blank. Number. e.g. 5. |
| `filter.olderThanDays`        | To display all checks for up to a particular day, pass a number of days to go back from the report's generation date in `filter.olderThanDays` and leave `filter.newerThanDays` blank. Number. e.g. 5.
| `filter.categories`  | An array of category (Conformity category) strings from the following:<br /> security \| cost-optimisation \| operational-excellence \| reliability  \| performance-efficiency <br />|
| `filter.riskLevels`  | Risk level. Possible values: ["EXTREME" \| "VERY_HIGH" \| "HIGH" \| "MEDIUM" \| "LOW"] |
| `filter.complianceStandards`  | An array of supported standard or framework ids. Possible values: ["AWAF" \| "CISAWSF" \| "CISAZUREF" \| "CISAWSTTW" \| "PCI" \| "HIPAA" \| "HITRUST" \| "GDPR" \| "APRA" \| "NIST4" \| "SOC2" \| "NIST-CSF" \| "ISO27001" \| "AGISM" \| "ASAE-3150"] \| "MAS"]
| `filter.reportComplianceStandardId`  | A single standard or framework id string. Possible values: ["AWAF" \| "NIST4" \| "CISAWSF" \| "CISAZUREF" \| "PCI" \| "SOC2" \| "NIST-CSF" \| "ISO27001" \| "AGISM" \| "HIPAA" \| "ASAE-3150" \| "APRA" ] |
| `filter.statuses`  | The status of the check. Valid values: ["SUCCESS" \| "FAILURE"] |
| `filter.suppressedFilterMode`  | Whether to use the `"v1"` or `"v2"` suppressed functionality. `"v1"`: Using `suppressed=true` will return both suppressed and unsuppressed checks, `suppressed=false` will just return unsuppressed checks. `"v2"`: Using `suppressed=true` return will just return suppressed checks, `suppressed=false` will just return unsuppressed checks, and omitting the filter will return both. Defaults to `"v1"`. Valid values: [ "v1" \| "v2" ]
| `filter.suppressed`  | Show Suppressed rules. A boolean. Will default to `true` for "v1", and omitted for "v2". Valid values: [true \|false] |
| `filter.providers`  | Cloud providers. Possible values: ["aws" \| "azure"] |
| `filter.withChecks`  | Displays only controls from PDF reports with one or more associated checks. If `withoutChecks` is also set to true, then filter has no effect and all checks will be displayed. The default value is `false`.  Valid values: [true \|false] |
| `filter.withoutChecks`  | Displays only controls from PDF reports with 0 associated checks. If `withChecks` is also set to true, then filter has no effect and all checks will be displayed. The default value is `false`.  Valid values: [true \|false] |
