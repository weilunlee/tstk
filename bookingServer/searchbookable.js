// https://www.feastogether.com.tw/api/booking/searchBookingAble

let payload = {storeId: "S2212290042", adult: 2, child: 0, mealPeriod: "tea", mealDate: "2023-12-20"}
// {storeId: "S2212290042", mealPeriod: "lunch", peopleCount: 2}
postData("https://www.feastogether.com.tw/api/booking/searchBookingAble", payload)
  .then((data) => {
    proccessData(data.result.recommendation)
  }) // JSON from `response.json()` call
  .catch((error) => console.error(error));

function proccessData(data){
  console.log(data)
  let date = data.filter(res=>!res.isFull)
  console.log(date)
}

function postData(url, data) {
  // Default options are marked with *
  return fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "user-agent": "Mozilla/4.0 MDN Example",
      "content-type": "application/json",
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // *client, no-referrer
  }).then((response) => response.json()); // 輸出成 json
}