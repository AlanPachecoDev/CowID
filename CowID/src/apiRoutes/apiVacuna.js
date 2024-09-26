import uri from '../apiRoutes/uri';

const URI = uri();

//Devuelve un json con todas las vacunas
export const getVacunas = async () =>{
    //Realiza la petición
    const res = await fetch(URI+'vacunas');
    
    //Recibe los datos mandados por la API
    const data = await res.json();
    
    //Se imprime en consola
    console.log(data);

    //Se retorna
    return data;

};

//obtiene la última vacuna
export const getLastVacuna = async (id) =>{
    const res = await fetch(`${URI}vacunas/ultima`);
    var t = await res.text();
    return t;
};

//Devuelve una Vacuna
export const getVacuna = async (id) =>{
    const res = await fetch(`${URI}vacunas/${id}`);
    return await res.json();
};

//Guarda una vacuna
export const saveVacuna = async (newVacuna) =>{
    const res = await fetch(URI+'vacunas/create', 
    {
        method:'POST', 
        headers:{Accept: 'application/json', 'Content-Type':'application/json'},
        body: JSON.stringify(newVacuna)
    });

    return await res.json();
};

//Elimina una vacuna
export const deleteVacuna = async (id) =>{
    await fetch(`${URI}vacunas/${id}`,{
        method: 'DELETE',
    });
};

//Actuliza una Vacuna
export const updateVacuna = async (id, newVacuna) =>{
    const res = await fetch(`${URI}vacunas/${id}`,{
        method: 'PUT',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(newVacuna)
    });
    return res;
};