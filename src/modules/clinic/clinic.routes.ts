import { Router } from 'express';
import Container from 'typedi';

import { ClinicController } from './clinic.controller';
import { validate } from '../../middlewares/validate';
import { clinicGetDto } from './clinic.dto';

const clinicController = Container.get(ClinicController);

export const clinicRouter = Router();

/**
 * @swagger
 * /clinic:
 *   get:
 *       description: Get All clinics
 *       responses:
 *           200:
 *               description: Success
 */
clinicRouter.get('/', validate(clinicGetDto), clinicController.getAllClinics);
