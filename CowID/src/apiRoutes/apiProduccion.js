import uri from '../apiRoutes/uri';

const URI = uri();

//Devuelve un json con todas las producciones
export const getProducciones = async () =>{
    //Realiza la petición
    const res = await fetch(URI+'producciones');
    
    //Recibe los datos mandados por la API
    const data = await res.json();
    
    //Se imprime en consola
    console.log(data);

    //Se retorna
    return data;

};

//obtiene la última producción
export const getLastProduccion = async (id) =>{
    const res = await fetch(`${URI}producciones/ultima`);
    var t = await res.text();
    return t;
};

//Devuelve una producción
export const getProduccion = async (id) =>{
    const res = await fetch(`${URI}producciones/${id}`);
    return await res.json();
};

//Guarda una produccion
export const saveProduccion = async (newProduccion) =>{
    const res = await fetch(URI+'producciones/create', 
    {
        method:'POST', 
        headers:{Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(newProduccion)
    });

    return await res.json();
};

//Elimina una producciones
export const deleteVaca = async (id) =>{
    await fetch(`${URI}producciones/${id}`,{
        method: 'DELETE',
    });
};

//Actuliza una produccion
export const updateProduccion = async (id, newProduccion) =>{
    const res = await fetch(`${URI}producciones/${id}`,{
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newProduccion)
    });
    return res;
};