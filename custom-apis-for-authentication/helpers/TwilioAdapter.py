from twilio.rest import Client
import json
class MessageClient:
    def __init__(self):
        print('Initializing messaging client')
        
        with open('twiliocredentials.json') as creds:
            twiliocred = json.loads(creds.read())

        twilio_number = int(twiliocred.get('trial_number'))
        twilio_account_sid = twiliocred.get('account_sid')
        twilio_auth_token = twiliocred.get('auth_token')

        self.twilio_number = twilio_number
        self.twilio_client = Client(twilio_account_sid, twilio_auth_token)

        print('Twilio client initialized')

    def send_message(self, body, to):
        self.twilio_client.messages.create(
            body=body,
            to=to,
            from_=self.twilio_number,
            # media_url=['https://demo.twilio.com/owl.png']
        )