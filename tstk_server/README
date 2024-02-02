## 基本套件
py get-pip.py
pip install fastapi
pip install uvicorn
pip install pymysql
pip install sqlalchemy


## twstock 文件系統

```sh
pip install twstock       # for taiwan stock
pip install flit          # for taiwan stock
pip install lxml          # for taiwan stock
```

```python
twstock -U                #twstock update
```

* twstock 快速上手
https://twstock.readthedocs.io/zh_TW/latest/quickstart.html


## BestFourPoint
BestFourPoint 四大買賣點判斷來自 toomore/grs 之中的一個功能， 透過四大買賣點來判斷是否要買賣股票。四個買賣點分別為：

* 量大收紅 / 量大收黑
* 量縮價不跌 / 量縮價跌
* 三日均價由下往上 / 三日均價由上往下
* 三日均價大於六日均價 / 三日均價小於六日均價

```python
stock = twstock.Stock('2330')
bfp = twstock.BestFourPoint(stock)
bfp.best_four_point_to_buy()   # 判斷是否為四大買點
'量大收紅, 三日均價大於六日均價'
bfp.best_four_point_to_sell()  # 判斷是否為四大賣點
False
bfp.best_four_point()          # 綜合判斷
(True, '量大收紅, 三日均價大於六日均價')
```