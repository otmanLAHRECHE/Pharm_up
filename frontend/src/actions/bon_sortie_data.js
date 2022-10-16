export async function getAllBonSortieOfMonth(token, month, year){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/get_all_bon_sortie/' +month+ '/'+ year,
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


  export async function addBonSortie(token, data){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/add_bon_sortie/',
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
      console.log(JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "error";
    }
  
  };


  export async function addBonSortieItem(token, data){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/add_bon_sortie_item/',
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
      console.log(JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "error";
    }
  
  };


  export async function getSelectedBonSortie(token, id){

    const response = await fetch(
      '/pharm/api/get_selected_bon_sortie/'+id,
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
    return "no data";
  }

  };

  export async function updateBonSortie(token, data, id){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/update_bon_sortie/'+id,
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
    if (response.status === 200) {
      console.log("status 200, response: ", JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "error";
    }
  
  };

  export async function deleteBonSortie(token, id){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/delete_bon_sortie/'+id,
        {
          method: 'DELETE',
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
      console.log("status 200, response: ", JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "error";
    }
  
  };


  export async function checkBonSortieId(token, id){

    const response = await fetch(
      '/pharm/api/check_bon_sortie_id/'+id,
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
    return "no data";
  }

  };



  export async function getAllBonSortieItems(token, month, year){

    const response = await fetch(
      '/pharm/api/get_all_bon_sortie_items/' +month+ '/'+ year,
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
    return "no data";
  }

  };


  export async function getSelectedBonSortieItem(token, id){

    const response = await fetch(
      '/pharm/api/get_selected_bon_sortie_item/'+id,
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
    return "no data";
  }

  };


  export async function updateBonSortieItem(token, data, id){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/update_bon_sortie_item/'+id,
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
    if (response.status === 200) {
      console.log("status 200, response: ", JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "error";
    }
  
  };


  export async function deleteBonSortieItem(token, id){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/delete_bon_sortie_item/'+id,
        {
          method: 'DELETE',
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
      console.log("status 200, response: ", JSON.parse(text));
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "error";
    }
  
  };

  
  export async function getFirstBonSortieItems(token){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/get_first_bon_sortie/',
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