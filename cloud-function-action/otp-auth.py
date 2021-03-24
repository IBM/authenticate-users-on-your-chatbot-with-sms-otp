#
#
# main() will be run when you invoke this action
#
# @param Cloud Functions actions accept a single parameter, which must be a JSON object.
#
# @return The output of this action, which must be a JSON object.
#
#
import sys
import requests

APIENDPOINT = "<your-API-endpoint-here>"
OTP = 0

def searchPhoneNo(policyNo):
    url = APIENDPOINT + "/api/v1.0/searchuserphone?policyNo={0}".format(policyNo)
    r = requests.get(url)
    try:
        response = r.json()
        return response
    except:
        return [{'err':''}]
 
def sendOTP(phoneNo):
    url = APIENDPOINT + "/api/v1.0/sendotp?phoneNo={0}".format(phoneNo)
    r = requests.get(url)
    response = r.json()
    return response

def validateOTP(phoneNo, otp):
    url = APIENDPOINT + "/api/v1.0/auth?phoneNo={0}&otp={1}".format(phoneNo, otp)
    r = requests.get(url)
    response = r.json()
    return response
    
def getPolicyInfo(enquiryType, policyNo):
    url = APIENDPOINT + "/api/v1.0/searchpolicy?enquiryType={0}&policyNo={1}".format(enquiryType, policyNo)
    r = requests.get(url)
    response = r.json()
    return response

def main(dict):
    
    if "enquiryType" in dict and "policyNumber" in dict:
        enquiryType = dict["enquiryType"]
        policyNo = dict["policyNumber"]
        results = getPolicyInfo(enquiryType, policyNo)
        return results
    
    if "otp" in dict and "phoneNo" in dict:
        phoneno = int(dict["phoneNo"])
        otp = int(dict["otp"])
        auth = validateOTP(phoneno, otp)
        return {
            'message': auth["validation_msg"],
            'authentication': auth["authentication"],
            'policyNo': auth["policy_no"]
        }
        
    if "phoneNo" in dict:
        temp = sendOTP(int(dict["phoneNo"]))
        try:
            print ("OTP {0} sent to phone no {1}".format(temp["otp"], dict["phoneNo"]))
            return {
                'message': "An OTP has been sent to your phone number {0}, please enter the OTP for Authentication.".format(dict["phoneNo"]),
                'phoneNo': temp["phone_no"],
                'validPhoneNo': True
            }
        except:
            return {
                'message': "invalid phone number",
                'validPhoneNo': False
                
            }
    
    if "policyNumber" in dict:
        tempPhoneNo = searchPhoneNo(dict["policyNumber"])
        if "phone_no" in tempPhoneNo:
            phoneNo = tempPhoneNo["phone_no"]
        else:
            return {
                'message': "You have entered a wrong Policy Number please try again",
                'validPolicyNo': False
            }
        global OTP
        tempOTP = sendOTP(phoneNo)
        
        if "otp" in tempOTP:
            OTP = tempOTP["otp"]
            print("OTP {0}, for Phone Number {1} stored in memory".format(OTP, phoneNo))
            return {
                'message': "Thank you {0}, an OTP has been sent on your phone number ending with XXX{1}, please enter the OTP for Authentication.".format(tempPhoneNo["name"], str(phoneNo)[-3:]),
                'phoneNo': phoneNo,
                'policyNo': tempPhoneNo["policyNo"],
                'validPolicyNo': True
            }
        else:
            ERR = tempOTP["err"]
            print("Phone Number {0} -> {1}".format(phoneNo, ERR))
            return {
                'message': "Message for Admin -> XXX{0}: ".format(str(phoneNo)[-3:])+ERR,
                'phoneNo': phoneNo,
                'policyNo': tempPhoneNo["policyNo"],
                'validPolicyNo': True
            }
        
        # return {'message': dict["policyNumber"]}
        
    
    
    return { 'message': 'Cloud Function working!' }
