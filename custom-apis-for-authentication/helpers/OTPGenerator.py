import random as r

class Generate:
    def __init__(self):
        print('OTP Generator initialized')

    def OTP(self):
        otp=""
        for i in range(4):
            otp+=str(r.randint(1,9))
        print ("Your One Time Password is:", otp)
        return otp

