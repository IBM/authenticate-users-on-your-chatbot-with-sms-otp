from flask_restful import Resource
import logging as logger
import json
from flask import request

class SearchPolicy(Resource):
    
    def get(self):
        
        policyNo = request.args['policyNo']
        enquiryType = request.args['enquiryType']
        from database.UserTable import UserTable
        dbObject = UserTable()
        sql = """policy_no='{}'""".format(policyNo)
        response = dbObject.read_UserTable(sql)

        if enquiryType == "premium_date":
            return {"message": response[0]["premium_date"]}
        elif enquiryType == "premium_amount":
            return {"message": response[0]["premium_amount"]}
        else:
            return response, 200
