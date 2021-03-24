from flask_restful import Api
from app import flaskAppInstance
from .sendOTP import GenerateAndSendOTP
from .authentication import Auth
from .registerUser import RegisterUser
from .listUser import ListUser
from .searchUserPhone import SearchUserPhone
from .searchPolicy import SearchPolicy
restServer = Api(flaskAppInstance)

# restServer.add_resource(Auth, "/api/v1.0/auth")
restServer.add_resource(GenerateAndSendOTP, "/api/v1.0/sendotp")
restServer.add_resource(Auth, "/api/v1.0/auth")
restServer.add_resource(RegisterUser, "/api/v1.0/registeruser")
restServer.add_resource(ListUser, "/api/v1.0/listusers")
restServer.add_resource(SearchUserPhone, "/api/v1.0/searchuserphone")
restServer.add_resource(SearchPolicy, "/api/v1.0/searchpolicy")