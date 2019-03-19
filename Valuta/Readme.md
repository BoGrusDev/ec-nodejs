# ReadMe.md

* https://github.com/exchangeratesapi/exchangeratesapi

* https://api.exchangeratesapi.io/latest?SEK
* https://api.exchangeratesapi.io/2019-01-10
/latest?symbols=USD,GBP
* https://api.exchangeratesapi.io/history?start_at=2018-12-25&end_at=2019-01-25
* GET /history?start_at=2018-12-25&end_at=2019-01-25&base=SEK

https://api.exchangeratesapi.io/latest?symbols=SEK,GBP

{
    "rates": {
        "MXN": 21.8555,
        "AUD": 1.6017,
        "HKD": 8.8929,
        "RON": 4.7489,
        "HRK": 7.4228,
        "CHF": 1.1341,
        "IDR": 16007.31,
        "CAD": 1.5116,
        "USD": 1.1329,
        "ZAR": 16.0513,
        "JPY": 126.8,
        "BRL": 4.2773,
        "HUF": 315.61,
        "CZK": 25.623,
        "NOK": 9.8023,
        "INR": 79.936,
        "PLN": 4.3016,
        "ISK": 137.1,
        "PHP": 59.325,
        "SEK": 10.5523,
        "ILS": 4.0991,
        "GBP": 0.86358,
        "SGD": 1.5358,
        "CNY": 7.5939,
        "TRY": 6.1029,
        "MYR": 4.6152,
        "RUB": 74.5028,
        "NZD": 1.6682,
        "KRW": 1276.61,
        "THB": 36.015,
        "BGN": 1.9558,
        "DKK": 7.4614
    },
    "base": "EUR",
    "date": "2019-03-05"
}


let demo = () => {
  let rate = fx(1).from("GBP").to("USD")
  alert("£1 = $" + rate.toFixed(4))
}

fetch('https://api.exchangeratesapi.io/latest')
  .then((resp) => resp.json())
  .then((data) => fx.rates = data.rates)
  .then(demo)

https://openexchangerates.github.io/money.js/



