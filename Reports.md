# Cloud Conformity Reports API


Below is a list of the available APIs:

- [List All Reports](#list-all-reports)
- [Download report](#download-report)

## User Privileges
There are 4 possible Cloud Conformity roles. Each role grants different levels of access via the api. The roles are:

- __organisation admin__
- __organisation user with full access to account__
- __organisation user with read-only access to account__
- __organisation user with no access to account__

User access to each endpoint is listed below:

| Endpoint | admin | full access user| read-only user | no access user |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| GET /reports  *(get a list reports)* | Y | Y | Y | Y |
| GET /reports/reportId/entityId/type  *(downloads a report)* | Y | Y | Y | Y |

## List all Reports
This end point allows you to query all reports that you have access to, based on the query parameters provided.

Admins, Power users, and Read-Only users have access to all reports. Includes account, group and organisation reports.

Users only have access to account reports that they have been granted access to.

Please note only up to one year's worth of reports will be returned.

Reports will be ordered based on the report's creation date.

##### Endpoints:
`GET /reports`

##### Headers
`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters: 
- `accountId`: account ID (optional)
- `groupId`: group ID (optional)
- `reportConfigId`: Configured Report Ids (optional)
    - Cloud Conformity Pre-configured Report ID's
        - For Conformity Reports `{ accountId }:CONFORMITY_BOT`
        - CIS AWS Foundations Reports `{ accountId }:CIS_AWS_FOUNDATIONS_1_0_1`
        - Other reports `{accountId | groupId | organisationId}:CUSTOM`
    - User Configured report IDs
        - `{ accountId | groupId | organisationId }:report-config:{ reportConfigId }`
        - For a list of user created report Configuration Ids, please see [Report Configs Section](ReportConfigs.md)


If no parameters are provided, the end point will retrieve reports associated with the organisation, i.e. reports that have been generated for all accounts within your organisation.

If both accountId and groupId are present in the query string, only account reports will be returned.

##### Response Explanation: 
- `status`: status types of a report
    - `CREATED` : Report data has been created and ready to load for report generating.
    - `READY`   : Report is ready to download, report download end points provided
    - `PENDING` : Report creation pending.
    - `ERROR`   : Something went wrong with the report creation process.
- `included`: If a report status is READY, an endpoint will be provided for a user to download a report
    - `report-download-endpoint`: end point which redirects you to download a report, requires an api key. 
    - `type`: type of report { CSV | PDF | XLSX }

##### Getting Reports

Example Request for getting organisation reports
 ```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/reports
```

```
{
    "data": [
        {
            "type": "reports",
            "id": "abc123",
            "attributes": {
                "title": "Organisation Report",
                "created-date": 1581378332097,
                "entity-id": "qwerty",
                "report-config-id": "qwerty:CUSTOM",
                "status": "READY",
                "formats": [
                    "CSV",
                    "PDF"
                ],
                "included": [
                    {
                        "report-download-endpoint": "https://us-west-2-api.cloudconformity.com/v1/reports/abc123/qwerty/csv",
                        "type": "CSV"
                    },
                    {
                        "report-download-endpoint": "https://us-west-2-api.cloudconformity.com/v1/reports/abc123/qwerty/pdf",
                        "type": "PDF"
                    }
                ]
            }
        },
        {
            "type": "reports",
            "id": "123abc",
            "attributes": {
                "title": "Organisation Report 2",
                "created-date": 1581378287110,
                "entity-id": "qwerty",
                "report-config-id": "qwerty:report-config:repConId123",
                "status": "READY",
                "formats": [
                    "CSV",
                    "PDF"
                ],
                "included": [
                    {
                        "report-download-endpoint": "https://us-west-2-api.cloudconformity.com/v1/reports/123abc/qwerty/csv",
                        "type": "CSV"
                    },
                    {
                        "report-download-endpoint": "https://us-west-2-api.cloudconformity.com/v1/reports/123abc/qwerty/pdf",
                        "type": "PDF"
                    }
                ]
            }
        }
    ]
}
```

Example Request for getting account reports with reportConfigId 
 ```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/reports?accountId=accId123&reportConfigId=accId123:report-config:repConId123
```

```
{
    "data": [
        {
            "type": "reports",
            "id": "reportId01",
            "attributes": {
                "title": "test",
                "created-date": 1581771616410,
                "entity-id": "accId123",
                "report-config-id": "accId123:report-config:repConId123",
                "status": "READY",
                "formats": [
                    "CSV",
                    "PDF"
                ],
                "included": [
                    {
                        "report-download-endpoint": "https://us-west-2-api-development.cloudconformity.com/v1/reports/reportId01/accId123/csv",
                        "type": "CSV"
                    },
                    {
                        "report-download-endpoint": "https://us-west-2-api-development.cloudconformity.com/v1/reports/reportId01/accId123/pdf",
                        "type": "PDF"
                    }
                ]
            }
        },
        {
            "type": "reports",
            "id": "reportId02",
            "attributes": {
                "title": "test",
                "created-date": 1580697614701,
                "entity-id": "accId123",
                "report-config-id": "accId123:report-config:repConId123",
                "status": "READY",
                "formats": [
                    "CSV",
                    "PDF"
                ],
                "included": [
                    {
                        "report-download-endpoint": "https://us-west-2-api-development.cloudconformity.com/v1/reports/reportId02/accId123/csv",
                        "type": "CSV"
                    },
                    {
                        "report-download-endpoint": "https://us-west-2-api-development.cloudconformity.com/v1/reports/reportId02/accId123/pdf",
                        "type": "PDF"
                    }
                ]
            }
        }
    ]
}
```

Example Request for getting group reports
 ```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api.cloudconformity.com/v1/reports?groupId=grpId123
```

```
{
    "data": [
        {
            "type": "reports",
            "id": "reportId03",
            "attributes": {
                "title": "Group Report",
                "created-date": 1581042349497,
                "entity-id": "grpId123",
                "report-config-id": "grp123:CUSTOM",
                "status": "READY",
                "formats": [
                    "CSV",
                    "PDF"
                ],
                "included": [
                    {
                        "report-download-endpoint": "https://us-west-2-api-development.cloudconformity.com/v1/reports/reportId03/grp123/csv",
                        "type": "CSV"
                    },
                    {
                        "report-download-endpoint": "https://us-west-2-api-development.cloudconformity.com/v1/reports/reportId03/grp123/pdf",
                        "type": "PDF"
                    }
                ]
            }
        }
    ]
}
```

## Download Report

This end point allows you to download the report using the report-download-endpoint link created in the response body as part of the [list all reports](#list-all-reports) section. The end point will generate a redirection link to download the report.

Admins, power users, and read only users have access to all reports. Includes account, group and organisation reports.

Users only have access to account reports that they have been granted access to.

##### Endpoints:
`GET /reports/{reportId}/{entityId}/{type}`

##### Headers
`Content-Type`: application/vnd.api+json
`Authorization`: ApiKey

##### Parameters
- `reportId`: The report Id
- `entityId`: The entity Id, where entityId could be either an accountId, groupId or organisationId
- `type` The report type { pdf | csv | xlsx }

Example Request for retrieving the report URL from a report-download-endpoint
 ```
curl -H "Content-Type: application/vnd.api+json" \
-H "Authorization: ApiKey YOUR-API-KEY" \
https://us-west-2-api-development.cloudconformity.com/v1/reports/reportId01/accId123/pdf
```

Example Response
```
{"url":"redirectionUrlToDownloadReport"}
```