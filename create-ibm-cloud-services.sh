servicename="cp-wa"
service="conversation"
region="eu-gb"
ibmcloud resource service-instance-create $servicename $service free $region
ibmcloud resource service-key-create "$servicename-creds" Manager --instance-name $servicename > "$servicename.txt"  2>&1
apikey=$(cat $servicename.txt | awk '$1 == "apikey:" {print $2}')
url=$(cat $servicename.txt | awk '$1 == "url:" {print $2}')
JSON_STRING='{"apikey":"'"$apikey"'","url":"'"$url"'"}'
echo $JSON_STRING > watsonassistant.json
