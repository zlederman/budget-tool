import requests
import unittest
import json

URL = 'http://localhost:80/api/auth'
PAYLOAD_PATH = "./payloads/auth.json"


class AuthEndPointTest(unittest.TestCase):
    def test_signup(self):
        '''
            it should respond with 200 and a token for valid sign up
        '''
        fp = open(PAYLOAD_PATH,'r')
        raw_auth = json.load(fp)

        sign_up = raw_auth['sign-up']
        res = requests.post(URL+'/signup',json=sign_up)
        self.assertEqual(list(res.json().keys()).pop(),'token')
        fp.close()
    def test_dup_user_sign_up(self):
        '''
            it should send back a 403 and tell you to f off
        '''
        fp = open(PAYLOAD_PATH,'r')
        raw_auth = json.load(fp)

    def test_login(self):
        '''
            it should take in a pass and phone number and
            send back 200 with a token for valid login
        '''
        fp = open(PAYLOAD_PATH,'r')
        raw_auth = json.load(fp)
        sign_in = raw_auth['sign-in']

        res = requests.post(URL+'/login',json=sign_in)
        self.assertEqual(list(res.json().keys()).pop(),'token')
        fp.close()


if __name__ == "__main__":
    unittest.main()