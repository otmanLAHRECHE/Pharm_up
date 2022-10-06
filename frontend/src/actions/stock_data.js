
export async function getAllStocks(token){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/get_all_stocks/',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: JSON.stringify()
        }
    );
    const text = await response.text();
    if (response.status === 200) {
      console.log("get the data succesfully", JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value]) => {
        fail(`${key}: ${value}`);
      });
      return "no data";
    }
  
  };


  export async function addStock(token, data){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/add_stock/',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: data
        }
    );
    const text = await response.text();
    if (response.status === 201) {
      console.log("status 200, response: ", JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "error";
    }
  
  };

  export async function addStockToArrivage(token, data){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/add_stock_to_arrivage/',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: data
        }
    );
    const text = await response.text();
    if (response.status === 201) {
      console.log("status 200, response: ", JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "error";
    }
  
  };
  
