//Router me permite definir las rutas de la API para consultar los datos
import { Router } from 'express';

//Importa el método programado en vacas.js de controllers
import { createVaca, deleteVaca, getLastVaca, getVaca, getVacas, getVacasCount, updateVaca } from '../controllers/vaca';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Vacas
 *  description: Vacas endpoint
 */

//Las rutas se verifican en el orden que están programadas

//Obtiene todas las vacas
// El segundo argumento es una función que se ejecuta cuando se recibe una petición GET
/**
 * @swagger
 * /vacas:
 *  get:
 *    summary: Obtiene todas las vacas
 *    tags: [Vacas]
 */
router.get('/vacas', getVacas);

//Cuenta la cantidad de vacas
/**
 * @swagger
 * /vacas/count:
 *  get:
 *    summary: Devuelve el total de vacas
 *    tags: [Vacas]
 */
router.get('/vacas/count', getVacasCount);

//Devuelve la última vaca
/**
 * @swagger
 * /vacas/ultima:
 *  get:
 *    summary: Devuelve la última vaca ingresada
 *    tags: [Vacas]
 */
 router.get('/vacas/ultima', getLastVaca);

//Obtiene una vacas por id
/**
 * @swagger
 * /vacas/:id:
 *  get:
 *    summary: Obtiene una vaca por ID
 *    tags: [Vacas]
 */
router.get('/vacas/:id', getVaca);

//Esto es para crear una vacas, se usa post
/**
 * @swagger
 * /vacas/create:
 *  post: 
 *      summary: "Crea una vaca, para ello debes mandarle un Content-Type: 
 *              application/json y una cabecera con los datos correspondientes"
 *      tags: [Vacas]
 */
router.post('/vacas/create', createVaca);

//Para eliminar una vacas se usa delete
/**
 * @swagger
 * /vacas/delete/:id:
 *  get:
 *      summary: Elimina una vaca específica por ID
 *      tags: [Vacas]
 */
router.get('/vacas/delete/:id', deleteVaca);

//Para actualizar se usa put
/**
 * @swagger
 * /vacas/update/:id:
 *  put:
 *      summary: Actualiza una vaca, se le manda datos igual que en la creación
 *      tags: [Vacas]
 */
router.put('/vacas/update/:id', updateVaca);

export default router;