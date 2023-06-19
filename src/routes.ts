import { Router } from 'express';
import { clinicRouter } from './modules/clinic';
import { swaggerDocs } from './config/swagger';
const swaggerUi = require('swagger-ui-express');

export const router = Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocs));

router.use('/clinic', clinicRouter);
