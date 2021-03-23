from flask_restful import Resource
from flask import request
import logging as logger
import datetime
import json

class RegisterUser(Resource):

    def post(self):
        logger.debug("RegisterUser -> inside POST Method")
        
        body = request.get_json()
        phoneNo = int(body.get('phone_no'))
        from database.UserTable import UserTable
        sql = """phone_no={}""".format(phoneNo)
        dbObject = UserTable()
        try:
            response = dbObject.read_UserTable(sql)
            print(response[0]["phone_no"], body.get('phone_no'))
            if body.get('phone_no') == response[0]["phone_no"]:
                return {"flag": False}, 200

        except:
            
            logger.debug(body)
            formattedSQL = """'{}',{},'{}','{}',{},'{}'""".format(
                body.get('name'),
                body.get('phone_no'),
                body.get('policy_no'),
                body.get('premium_date'),
                body.get('premium_amount'),
                body.get('address')
                )
            
            # response = self.create_Inwards(formattedSQL)

            from database.UserTable import UserTable

            dbObject = UserTable()
            response = dbObject.create_UserTable(formattedSQL)

            from helpers.TwilioAdapter import MessageClient
            message = "Successfully Registered. Your Policy Details are as follows:\nPolicy No: {0}\nName: {1}\nPremium Amount: {2}\nTo know more details about your policy, ask Watson Assistant.".format(body.get('policy_no'),body.get('name'), body.get('premium_amount'))
            
            from twilio.base.exceptions import TwilioRestException
            try:
                twilioObject = MessageClient()
                twilioObject.send_message(message, int(body.get('phone_no')))
            except TwilioRestException as e:
                return {"err": e.msg.split(": ")[1]}

            return {"flag": response}, 200