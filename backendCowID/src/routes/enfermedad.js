//Router me permite definir las rutas de la API para consultar los datos
import { Router } from 'express';

//Importa el método programado en enfermedad.js de controllers
import { createEnfermedad, deleteEnfermedad, getEnfermedad, getEnfermedades, getEnfermedadesCount, getLastEnfermedad, updateEnfermedad } from '../controllers/Enfermedad';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Enfermedades
 *  description: Enfermedades endpoint
 */

//Las rutas se verifican en el orden que están programadas

//Obtiene todas las enfermedades
// El segundo argumento es una función que se ejecuta cuando se recibe una petición GET
/**
 * @swagger
 * /enfermedades:
 *  get:
 *    summary: Obtiene todas las enfermedades
 *    tags: [Enfermedades]
 */
router.get('/enfermedades', getEnfermedades);

//Cuenta la cantidad de enfermedades
/**
 * @swagger
 * /enfermedades/count:
 *  get:
 *    summary: Devuelve el total de enfermedades
 *    tags: [Enfermedades]
 */
router.get('/enfermedades/count', getEnfermedadesCount);


//Devuelve la última enfermedad
/**
 * @swagger
 * /enfermedades/ultima:
 *  get:
 *    summary: Devuelve la última vaca ingresada
 *    tags: [Enfermedades]
 */
 router.get('/enfermedades/ultima', getLastEnfermedad);

 
//Obtiene una enfermedades por id
/**
 * @swagger
 * /enfermedades/:id:
 *  get:
 *    summary: Obtiene una Enfermedad por ID
 *    tags: [Enfermedades]
 */
router.get('/enfermedades/:id', getEnfermedad);

//Esto es para crear una enfermedades, se usa post
/**
 * @swagger
 * /enfermedades/create:
 *  post: 
 *      summary: "Crea una enfermedad, para ello debes mandarle un Content-Type: 
 *              application/json y una cabecera con los datos correspondientes"
 *      tags: [Enfermedades]
 */
router.post('/enfermedades/create', createEnfermedad);

//Para eliminar una enfermedades se usa delete
/**
 * @swagger
 * /enfermedades/delete/:id:
 *  get:
 *      summary: Elimina una enfermedad específica por ID
 *      tags: [Enfermedades]
 */
router.get('/enfermedades/delete/:id', deleteEnfermedad);

//Para actualizar se usa put
/**
 * @swagger
 * /enfermedades/update/:id:
 *  put:
 *      summary: Actualiza una enfermedad, se le manda datos igual que en la creación
 *      tags: [Enfermedades]
 */
router.put('/enfermedades/update/:id', updateEnfermedad);

export default router;