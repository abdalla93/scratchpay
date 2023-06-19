import asyncHandler from 'express-async-handler';
import { Service } from 'typedi';

import { ClinicService } from './clinic.service';
import { Clinic } from './clinic.model';
import { clinicGetQuery } from './clinic.dto';

@Service()
export class ClinicController {
  constructor (private readonly clinicService: ClinicService) {}

  public getAllClinics = asyncHandler(async (req, res) => {
    const query = req.query as clinicGetQuery;

    const clinics = this.clinicService.getAll(query);
    if (!clinics) res.status(204);
    res.json(clinics);
  });
}
