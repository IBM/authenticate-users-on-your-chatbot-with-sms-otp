from flask_restful import Resource
from flask import request
import logging as logger
import datetime
import json

class GenerateAndSendOTP(Resource):

    def get(self):
        logger.debug("GenerateAndSendOTP -> inside GET Method")
        phoneNo = request.args['phoneNo']
        from helpers.TwilioAdapter import MessageClient
        from helpers.OTPGenerator import Generate

        otpObject = Generate()
        otp = otpObject.OTP()

        time = datetime.datetime.now()
        logger.debug(type(time))

        message = "OTP for Authentication of Watson Chatbot is: "+otp
        number = int(phoneNo)

        metadata = {
            "phone_no":number, 
            "otp": int(otp), 
            "time":time.strftime("%H:%M")
        }
        
        with open('otpValidity.json', 'w') as fs:
            json.dump(metadata, fs, indent=2)
        
        from twilio.base.exceptions import TwilioRestException
        try:
            twilioObject = MessageClient()
            twilioObject.send_message(message, number)
        except TwilioRestException as e:
            return {"err": e.msg.split(": ")[1]}

        return metadata, 200