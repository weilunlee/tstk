import twstock

twstock.__update_codes()
stock = twstock.Stock('2330')
print(stock.price)