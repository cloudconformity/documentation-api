This attribute is optional. Valid values are `COMPLIANCE-STANDARD` and `GENERIC`. By default, `GENERIC` type reports are produced. If `COMPLIANCE-STANDARD` is specified, `filter.reportComplianceStandardId` has to be: <br><ul><li>a valid standard or framework id string (the report is generated with this compliance standard's)</li><li>one of the following supported standards: ["AWAF" \| "NIST4" \| "CISAWSF" \| "CISAZUREF" \| "SOC2" \| "NIST-CSF" \| "ISO27001" \| "AGISM" \| "HIPAA" \| "HITRUST" \| " "PCI" \| "ASAE-3150" \| "APRA" ]</li></ul>