import { Service } from 'typedi';

import { ClinicRepository } from './clinic.repository';
import Logger from '../../utils/logger';
import { Clinic } from './clinic.model';
import { clinicGetQuery } from './clinic.dto';

@Service()
export class ClinicService {
  constructor (private clinicRepository: ClinicRepository) {}

  public getAll = (query?: clinicGetQuery): Clinic[] => {
    let clinics: Clinic[] = [];
    try {
      Logger.info('ClinicService() => getAll() call');
      clinics = this.clinicRepository.getAll(query);
    } catch (error) {
      Logger.error(`ClinicService() => getAll() error : ${error}`);
      throw new Error();
    }
    Logger.info('ClinicService() => getAll() end');
    return clinics;
  };
}
