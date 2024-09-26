import express from 'express'; //Habilita el uso de rutas

import cors from 'cors'; //Habilita para que cualquier backend se pueda conectar, otra forma es usar https

import morgan from 'morgan';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI, { setup } from 'swagger-ui-express';

import  { options } from './swaggerOption';

const specs = swaggerJSDoc(options);

import vacaRoutes from './routes/vaca'; //Importa las rutas creadas en este backend (Vacas)
import vacunaRoutes from './routes/vacuna';
import tratamientoRoutes from './routes/tratamiento';
import enfermedadRoutes from './routes/enfermedad';
import embarazoRoutes from './routes/embarazo';
import produccionRoutes from './routes/produccion';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(vacaRoutes);
app.use(vacunaRoutes);
app.use(tratamientoRoutes);
app.use(enfermedadRoutes);
app.use(embarazoRoutes);
app.use(produccionRoutes);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs)); //Define documentación y muestra una interfaz de navegador
export default app;