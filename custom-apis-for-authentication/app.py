from flask import Flask, render_template, request, jsonify
import logging as logger
import os
from flask_cors import CORS
import json

logger.basicConfig(level="DEBUG")

flaskAppInstance = Flask(__name__)
CORS(flaskAppInstance)

@flaskAppInstance.route('/')
def index():
    return render_template('index.html')

@flaskAppInstance.route('/storeTwilioCredentials', methods=['POST'])
def storeTwilioCredentials():
    receivedPayload = json.loads(request.get_data())

    data = {
        "trial_number": receivedPayload.get('trial_number'),
        "account_sid": receivedPayload.get('account_sid'),
        "auth_token": receivedPayload.get('auth_token')
    }
    
    with open('twiliocredentials.json', 'w') as fs:
        json.dump(data, fs, indent=2)

    return jsonify({"status": "Configured"})

@flaskAppInstance.route('/getTwilioCredentials', methods=['GET'])
def getTwilioCredentials():
    try:
        with open('twiliocredentials.json') as creds:
            twiliocred = json.loads(creds.read())
        return jsonify({"status": "Configured"})
    except:
        return jsonify({"status": "Not Configured"})
    

port = os.getenv('VCAP_APP_PORT', '8080')
if __name__ == "__main__":
    logger.debug("Starting the Application")
    from apis import *
    flaskAppInstance.run(host='0.0.0.0', port=port, debug=True, use_reloader=True)