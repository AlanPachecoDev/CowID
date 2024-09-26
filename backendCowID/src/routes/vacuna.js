//Router me permite definir las rutas de la API para consultar los datos
import { Router } from 'express';

//Importa el método programado en vacunas.js de controllers
import { createVacuna, getLastVacuna, deleteVacuna, getVacuna, getVacunas, getVacunasCount, updateVacuna } from '../controllers/vacuna';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Vacunas
 *  description: Vacunas endpoint
 */

//Las rutas se verifican en el orden que están programadas

//Obtiene todas las vacunas
// El segundo argumento es una función que se ejecuta cuando se recibe una petición GET
/**
 * @swagger
 * /vacunas:
 *  get:
 *    summary: Obtiene todas las vacunas
 *    tags: [Vacunas]
 */
router.get('/vacunas', getVacunas);

//Cuenta la cantidad de vacunas
/**
 * @swagger
 * /vacunas/count:
 *  get:
 *    summary: Devuelve el total de vacunas
 *    tags: [Vacunas]
 */
router.get('/vacunas/count', getVacunasCount);

//Devuelve la última vacuna
/**
 * @swagger
 * /vacunas/ultima:
 *  get:
 *    summary: Devuelve la última vacuna ingresada
 *    tags: [Vacunas]
 */
 router.get('/vacunas/ultima', getLastVacuna);

//Obtiene una vacunas por id
/**
 * @swagger
 * /vacunas/:id:
 *  get:
 *    summary: Obtiene una vacuna por ID
 *    tags: [Vacunas]
 */
router.get('/vacunas/:id', getVacuna);

//Esto es para crear una vacuna, se usa post
/**
 * @swagger
 * /vacunas/create:
 *  post: 
 *      summary: "Crea una vacuna, para ello debes mandarle un Content-Type: 
 *              application/json y una cabecera con los datos correspondientes"
 *      tags: [Vacunas]
 */
router.post('/vacunas/create', createVacuna);

//Para eliminar una vacuna se usa delete
/**
 * @swagger
 * /vacunas/delete/:id:
 *  get:
 *      summary: Elimina una vacuna específica por ID
 *      tags: [Vacunas]
 */
router.get('/vacunas/delete/:id', deleteVacuna);

//Para actualizar se usa put
/**
 * @swagger
 * /vacunas/update/:id:
 *  put:
 *      summary: Actualiza una vacuna, se le manda datos igual que en la creación
 *      tags: [Vacunas]
 */
router.put('/vacunas/update/:id', updateVacuna);

export default router;