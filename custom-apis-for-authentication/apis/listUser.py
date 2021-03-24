from flask_restful import Resource
import logging as logger
import json


class ListUser(Resource):
    
    def get(self):
        
        from database.UserTable import UserTable

        dbObject = UserTable()
        response = dbObject.read_UserTable()
        return response, 200