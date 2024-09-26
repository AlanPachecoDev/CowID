import uri from '../apiRoutes/uri';

const URI = uri();

//Devuelve un json con todos los tratamientos
export const getTratamientos = async () =>{
    //Realiza la petición
    const res = await fetch(URI+'tratamientos');
    
    //Recibe los datos mandados por la API
    const data = await res.json();
    
    //Se imprime en consola
    console.log(data);

    //Se retorna
    return data;

};

//obtiene el último tratamiento
export const getLastTratamiento = async (id) =>{
    const res = await fetch(`${URI}tratamientos/ultimo`);
    var t = await res.text();
    return t;
};

//Devuelve un tratamiento
export const getTratamiento = async (id) =>{
    const res = await fetch(`${URI}tratamientos/${id}`);
    return await res.json();
};

//Guarda un tratamiento
export const saveTratamiento = async (newTratamiento) =>{
    const res = await fetch(URI+'tratamientos/create', 
    {
        method:'POST', 
        headers:{Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(newTratamiento)
    });

    return await res.json();
};

//Elimina un tratamiento
export const deleteTratamiento = async (id) =>{
    await fetch(`${URI}tratamientos/${id}`,{
        method: 'DELETE',
    });
};

//Actuliza una tratamiento
export const updateTratamiento = async (id, newTratamiento) =>{
    const res = await fetch(`${URI}tratamientos/${id}`,{
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newTratamiento)
    });
    return res;
};