##

Problems: Parsing 250,000 data point is a lot to render
small this like changing "Crash ID" -> CrashID makes a difference and will be benificail in the long run

Data Set clean up: 

Main key is lat , long 
removing non pedestrian crash data, removed pedertrian and bicycle only data


| ID | Description | API Field Name | Data Type |
|---|---|---|---|
| Crash ID | TxDOT C.R.I.S. system-generated unique identifying number for a crash | cris_crash_idNumber | Number |
| crash_speed_limit | Speed Limit | crash_speed_limitNumber | Number |
| crash_fatal_fl | Fatal Crash Identifier - Indicates that the crash involved one or more fatalities | crash_fatal_flCheckbox | Boolean |
| latitude | Derived Latitude map coordinate of the crash | latitudeNumber | Number |
| longitude | Derived Longitude map coordinate of the crash | longitudeNumber | Number |
| crash_sev_id | Crash Severity - Most severe injury suffered by any one person involved in the crash ( 0=UNKNOWN, 1=INCAPACITATING INJURY, 2=NON-INCAPACITATING INJURY, 3=POSSIBLE INJURY, 4=KILLED, 5=NOT INJURED)Read more | crash_sev_idNumber | Number |
| tot_injry_cnt | Total Injury Count | tot_injry_cntNumber | Number |
| death_cnt | Total Death Count | death_cntNumber | Number |
| units_involved | Mode of units involved in crash | units_involvedText | Text |
| onsys_fl | Flag indicates whether primary road of crash was on the TxDOT highway system. | onsys_flCheckbox | Boolean |
| Crash timestamp (US/Central) | The timestamp at which the crash occurred, in US/Central time. | crash_timestamp_ctFloating Timestamp | Floating Timestamp |
| Crash timestamp | The timestamp at which the crash occurred, in UTC time. | crash_timestampFloating Timestamp | Floating Timestamp |
| Estimated Maximum Comprehensive Cost | the economic and quality of life costs associated with the highest injury severity level sustained by a person in the crash. Learn more at https://www.austintexas.gov/crashcostsRead more | est_comp_cost_crash_basedNumber | Number |
| Estimated Total Comprehensive Cost | The economic and quality of life costs associated with all injuries sustained in the crash. Learn more at https://www.austintexas.gov/crashcosts | est_total_person_comp_costNumber | Number |