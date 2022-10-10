export async function getAllFournisseur(token){
    console.log("inside methode", token)
    const response = await fetch(
        '/pharm/api/get_all_fournisseurs/',
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

export async function getSelectedFournisseeur(token, id){

    const response = await fetch(
      '/pharm/api/get_selected_fournisseur/'+id,
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


export async function addNewFournisseur(token, data){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/add_fournisseurs/',
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


export async function updateFournisseur(token, data, id){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/update_fournisseurs/'+id,
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


export async function deleteFournisseur(token, id){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/delete_fournisseurs/'+id,
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



export async function getAllDestinataire(token){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/get_all_sources/',
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

export async function getSelectedDestinataire(token, id){

  const response = await fetch(
    '/pharm/api/get_selected_sources/'+id,
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


export async function addNewDestinataire(token, data){
console.log("inside methode", token)
const response = await fetch(
    '/pharm/api/create_new_source/',
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


export async function updateDestinataire(token, data, id){
console.log("inside methode", token)
const response = await fetch(
    '/pharm/api/update_source/'+id,
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


export async function deleteDestinataire(token, id){
console.log("inside methode", token)
const response = await fetch(
    '/pharm/api/delete_source/'+id,
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



export async function getAllDestinataireForSelect(token){
  console.log("inside methode", token)
  const response = await fetch(
      '/pharm/api/get_destinations/',
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