import requests
class APIs(object):
    def __init__(self, _url):
        self.url=_url

    def fetchAPI(self):
        _res = requests.get(self.url)
        return _res.json()

if __name__ == '__main__':
    a = APIs("https://openapi.twse.com.tw/v1/company/newlisting").fetchAPI()
    print(a)
                    