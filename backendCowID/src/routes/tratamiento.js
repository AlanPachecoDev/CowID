//Router me permite definir las rutas de la API para consultar los datos
import { Router } from 'express';

//Importa el método programado en tratamiento.js de controllers
import { createTratamiento, deleteTratamiento, getLastTratamiento, getTratamiento, getTratamientos, getTratamientosCount, updateTratamiento } from '../controllers/tratamiento';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Tratamientos
 *  description: Tratamientos endpoint
 */

//Las rutas se verifican en el orden que están programadas

//Obtiene todos los Tratamientos
// El segundo argumento es una función que se ejecuta cuando se recibe una petición GET
/**
 * @swagger
 * /tratamientos:
 *  get:
 *    summary: Obtiene todos los tratamientos
 *    tags: [Tratamientos]
 */
router.get('/tratamientos', getTratamientos);

//Devuelve la última vaca
/**
 * @swagger
 * //tratamientos/ultimo:
 *  get:
 *    summary: Devuelve el último tratamiento ingresada
 *    tags: [Tratamientos]
 */
 router.get('/tratamientos/ultimo', getLastTratamiento);

//Cuenta la cantidad de tratamientos
/**
 * @swagger
 * /tratamientos/count:
 *  get:
 *    summary: Devuelve el total de tratamientos
 *    tags: [Tratamientos]
 */
router.get('/tratamientos/count', getTratamientosCount);

//Obtiene un tratamientos por id
/**
 * @swagger
 * /tratamientos/:id:
 *  get:
 *    summary: Obtiene un tratamiento por ID
 *    tags: [Tratamientos]
 */
router.get('/tratamientos/:id', getTratamiento);

//Esto es para crear un tratamientos, se usa post
/**
 * @swagger
 * /tratamientos/create:
 *  post: 
 *      summary: "Crea un tratamiento, para ello debes mandarle un Content-Type: 
 *              application/json y una cabecera con los datos correspondientes"
 *      tags: [Tratamientos]
 */
router.post('/tratamientos/create', createTratamiento);

//Para eliminar un tratamiento se usa delete
/**
 * @swagger
 * /tratamientos/delete/:id:
 *  get:
 *      summary: Elimina un tratamiento específica por ID
 *      tags: [Tratamientos]
 */
router.get('/tratamientos/delete/:id', deleteTratamiento);

//Para actualizar se usa put
/**
 * @swagger
 * /tratamientos/update/:id:
 *  put:
 *      summary: Actualiza un tratamiento, se le manda datos igual que en la creación
 *      tags: [Tratamientos]
 */
router.put('/tratamientos/update/:id', updateTratamiento);

export default router;