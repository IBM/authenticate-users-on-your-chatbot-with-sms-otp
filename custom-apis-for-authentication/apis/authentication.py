from flask_restful import Resource
from flask import request
import logging as logger
import datetime
import json

class Auth(Resource):

    def get(self):
        logger.debug("Auth -> inside GET Method")
        phoneNo = request.args['phoneNo']
        otp = request.args['otp']

        with open('otpValidity.json','r') as fs:
            otpFile = json.loads(fs.read())
        
        otpGeneratedTime = datetime.datetime.strptime(otpFile.get('time'), '%H:%M')

        time = datetime.datetime.now()
        time = time.strftime("%H:%M")
        nowTime = datetime.datetime.strptime(time,'%H:%M')
 
        # print(otpGeneratedTime, nowTime, sep="\n")

        delta = nowTime-otpGeneratedTime
        timeDiff = int(delta.seconds/60)
        
        print(timeDiff)
        print(int(otpFile.get('otp')), otp)
        authenticated = False
        validationMsg = ""

        from database.UserTable import UserTable
        sql = """phone_no={}""".format(int(phoneNo))
        dbObject = UserTable()
        response = dbObject.read_UserTable(sql)

        if int(otpFile.get('otp')) != int(otp):
            validationMsg = "Invalid OTP"
            returnPolicyNo = response[0]["policy_no"]
        elif timeDiff > 5:
            validationMsg = "OTP Expired"
            returnPolicyNo = response[0]["policy_no"]
        else:
            authenticated = True
            validationMsg = "OTP Validated"
            returnPolicyNo = response[0]["policy_no"]

        return {
            "phone_no":int(phoneNo), 
            "authentication": authenticated, 
            "policy_no": returnPolicyNo,
            "validation_msg":validationMsg
            }, 200