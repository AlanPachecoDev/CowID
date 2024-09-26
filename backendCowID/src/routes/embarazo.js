//Router me permite definir las rutas de la API para consultar los datos
import { Router } from 'express';

//Importa el método programado en embarazo.js de controllers
import { createEmbarazo, deleteEmbarazo, getEmbarazo, getEmbarazos, getEmbarazosCount, getLastEmbarazo, updateEmbarazo } from '../controllers/embarazo';

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Embarazos
 *  description: Embarazos endpoint
 */

//Las rutas se verifican en el orden que están programadas

//Obtiene todos los Embarazos
// El segundo argumento es una función que se ejecuta cuando se recibe una petición GET
/**
 * @swagger
 * /embarazos:
 *  get:
 *    summary: Obtiene todos los embarazos
 *    tags: [Embarazos]
 */
router.get('/embarazos', getEmbarazos);

//Cuenta la cantidad de embarazos
/**
 * @swagger
 * /embarazos/count:
 *  get:
 *    summary: Devuelve el total de embarazos
 *    tags: [Embarazos]
 */
router.get('/embarazos/count', getEmbarazosCount);


//Devuelve la última vaca
/**
 * @swagger
 * /embarazos/ultimo:
 *  get:
 *    summary: Devuelve el último embarazo ingresada
 *    tags: [Embarazos]
 */
 router.get('/embarazos/ultimo', getLastEmbarazo);


//Obtiene un embarazos por id
/**
 * @swagger
 * /embarazos/:id:
 *  get:
 *    summary: Obtiene un embarazo por ID
 *    tags: [Embarazos]
 */
router.get('/embarazos/:id', getEmbarazo);

//Esto es para crear un embarazos, se usa post
/**
 * @swagger
 * /embarazos/create:
 *  post: 
 *      summary: "Crea un embarazos, para ello debes mandarle un Content-Type: 
 *              application/json y una cabecera con los datos correspondientes"
 *      tags: [Embarazos]
 */
router.post('/embarazos/create', createEmbarazo);

//Para eliminar un embarazos se usa delete
/**
 * @swagger
 * /embarazos/delete/:id:
 *  get:
 *      summary: Elimina un embarazos específica por ID
 *      tags: [Embarazos]
 */
router.get('/embarazos/delete/:id', deleteEmbarazo);

//Para actualizar se usa put
/**
 * @swagger
 * /embarazos/update/:id:
 *  put:
 *      summary: Actualiza un embarazos, se le manda datos igual que en la creación
 *      tags: [Embarazos]
 */
router.put('/embarazos/update/:id', updateEmbarazo);

export default router;