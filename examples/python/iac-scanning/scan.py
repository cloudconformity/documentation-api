#!/usr/bin/env python
# Scans a CloudFormation template file
# Requires "requests" to be installed

import requests
import json

# Please substitute filePath, apiKey, and region
# Cloud Conformity API Key
apiKey="Your Cloud Conformity API Key"
# Path to CloudFormation template file Yaml or JSON file
filePath="Path to CloudFormation template"
# Region in which Cloud Conformity serves your organisation
region="us-west-2"

endpoint = 'https://' + region + '-api.cloudconformity.com'
url = endpoint + '/v1/iac-scanning/scan'

headers = {
	'Content-Type': 'application/vnd.api+json',
	'Authorization': 'ApiKey ' + apiKey
}

contents = open(filePath, 'r').read()

payload =  {
	'data': {
		'attributes': {
			'type': 'cloudformation-template',
			'contents': contents
		}
	}
}
print 'Request:\n' + json.dumps(payload, indent=2)

resp = requests.post(url, headers=headers, data=json.dumps(payload))
print 'Response:\n' + json.dumps(resp.json(), indent=2, sort_keys=True)
