import uri from '../apiRoutes/uri';

const URI = uri();

//Devuelve un json con todas las vacas
export const getVacas = async () =>{
    //Realiza la petición
    const res = await fetch(URI+'vacas');
    
    //Recibe los datos mandados por la API
    const data = await res.json();
    
    //Se imprime en consola
    //console.log(data);

    //Se retorna
    return data;

};

export const getVacasCount = async () => {
    const res = await fetch(`${URI}vacas/count`);
    return await res.json();
}

//Devuelve una Vaca
export const getVaca = async (id) =>{
    const res = await fetch(`${URI}vacas/${id}`);
    return await res.json();
};

//Guarda una vaca
export const saveVaca = async (newVaca) =>{
    const res = await fetch(URI+'vacas/create', 
    {
        method:'POST', 
        headers:{Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(newVaca)
    });

    return await res.json();
};

//obtiene la última vaca
export const getLastVaca = async (id) =>{
    const res = await fetch(`${URI}vacas/ultima`);
    var t = await res.text();
    return t;
};

//Elimina una vaca
export const deleteVaca = async (id) =>{
    await fetch(`${URI}vacas/${id}`,{
        method: 'DELETE',
    });
};

//Actuliza una Vaca
export const updateVaca = async (id, newVaca) =>{
    const res = await fetch(`${URI}vacas/${id}`,{
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newVaca)
    });
    return res;
};