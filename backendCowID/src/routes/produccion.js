//Router me permite definir las rutas de la API para consultar los datos
import { Router } from 'express';

//Importa el método programado en produccion.js de controllers
import { createProduccion, deleteProduccion, getLastProduccion, getProduccion, getProducciones, getProduccionesCount, updateProduccion } from '../controllers/produccion';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Producciones
 *  description: Producciones endpoint
 */

//Las rutas se verifican en el orden que están programadas

//Obtiene todas las producciones
// El segundo argumento es una función que se ejecuta cuando se recibe una petición GET
/**
 * @swagger
 * /producciones:
 *  get:
 *    summary: Obtiene todas las producciones
 *    tags: [Producciones]
 */
router.get('/producciones', getProducciones);

//Cuenta la cantidad de producciones
/**
 * @swagger
 * /producciones/count:
 *  get:
 *    summary: Devuelve el total de producciones
 *    tags: [Producciones]
 */
router.get('/producciones/count', getProduccionesCount);

/**
 * @swagger
 * /producciones/ultima:
 *  get:
 *    summary: Devuelve la última producción diaria ingresada
 *    tags: [Producciones]
 */
 router.get('/producciones/ultima', getLastProduccion);

//Obtiene una produccion por id
/**
 * @swagger
 * /producciones/:id:
 *  get:
 *    summary: Obtiene una producciones por ID
 *    tags: [Producciones]
 */
router.get('/producciones/:id', getProduccion);

//Esto es para crear una producciones, se usa post
/**
 * @swagger
 * /producciones/create:
 *  post: 
 *      summary: "Crea una produccion, para ello debes mandarle un Content-Type: 
 *              application/json y una cabecera con los datos correspondientes"
 *      tags: [Producciones]
 */
router.post('/producciones/create', createProduccion);

//Para eliminar una produccion se usa delete
/**
 * @swagger
 * /producciones/delete/:id:
 *  get:
 *      summary: Elimina una produccion específica por ID
 *      tags: [Producciones]
 */
router.get('/producciones/delete/:id', deleteProduccion);

//Para actualizar se usa put
/**
 * @swagger
 * /producciones/update/:id:
 *  put:
 *      summary: Actualiza una produccion, se le manda datos igual que en la creación
 *      tags: [Producciones]
 */
router.put('/producciones/update/:id', updateProduccion);

export default router;