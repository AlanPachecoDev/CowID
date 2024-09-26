import uri from '../apiRoutes/uri';

const URI = uri();

//Devuelve un json con todos los Embarazo
export const getEmbarazos = async () =>{
    //Realiza la petición
    const res = await fetch(URI+'embarazos');
    
    //Recibe los datos mandados por la API
    const data = await res.json();
    
    //Se imprime en consola
    console.log(data);

    //Se retorna
    return data;

};

//obtiene el último Embarazo
export const getLastEmbarazo = async (id) =>{
    const res = await fetch(`${URI}embarazos/ultimo`);
    var t = await res.text();
    return t;
};


//Devuelve un embarazo
export const getEmbarazo = async (id) =>{
    const res = await fetch(`${URI}embarazos/${id}`);
    return await res.json();
};

//Guarda un Embarazo
export const saveEmbarazo = async (newEmbarazo) =>{
    const res = await fetch(URI+'embarazos/create', 
    {
        method:'POST', 
        headers:{Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(newEmbarazo)
    });

    return await res.json();
};

//Elimina un embarazo
export const deleteEmbarazo = async (id) =>{
    await fetch(`${URI}embarazos/${id}`,{
        method: 'DELETE',
    });
};

//Actualiza un embarazo
export const updateEmbarazo = async (id, newEmbarazo) =>{
    const res = await fetch(`${URI}embarazos/${id}`,{
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newEmbarazo)
    });
    return res;
};