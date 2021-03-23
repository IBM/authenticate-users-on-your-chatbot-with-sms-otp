from flask_restful import Resource
import logging as logger
import json
from flask import request

class SearchUserPhone(Resource):
    
    def get(self):
        
        policyNo = request.args['policyNo']
        from database.UserTable import UserTable
        sql = """policy_no='{}'""".format(policyNo)
        dbObject = UserTable()
        response = dbObject.read_UserTable(sql)
        return {
            "id": response[0]["id"],
            "phone_no": response[0]["phone_no"],
            "name": response[0]["name"],
            "policyNo": response[0]["policy_no"],
         }, 200
