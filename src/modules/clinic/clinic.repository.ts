import { Service } from 'typedi';
import { Clinic, ClinicAvailability } from './clinic.model';
import dentalClinics from './providers/dental-clinic.json';
import vetClinics from './providers/vet-clinic.json';
import { clinicGetQuery } from './clinic.dto';
import { getObjectKeyFromValue } from '../../helper/object';
import { states } from '../../constants/stats';

@Service()
export class ClinicRepository {
  public getAll = (query: clinicGetQuery = {}): Clinic[] => {
    let returnClinics = [...dentalClinics, ...vetClinics] as Clinic[];
    if (query.name) returnClinics = this.filterName(returnClinics, query.name);
    if (query.state) returnClinics = this.filterstate(returnClinics, query.state);
    if (query.availability) returnClinics = this.filterAvailability(returnClinics, query.availability);

    return returnClinics;
  };

  private filterName (clinics: Clinic[], name: string): Clinic[] {
    return clinics.filter(clinic => {
      if (clinic.name) return clinic.name.toUpperCase().includes(name.toUpperCase());
      return clinic.clinicName?.toUpperCase().includes(name.toUpperCase());
    });
  }

  private filterstate (clinics: Clinic[], state: string): Clinic[] {
    return clinics.filter(clinic => {
      if (clinic?.stateName) {
        return (
          clinic.stateName.toUpperCase() === state.toUpperCase() ||
          getObjectKeyFromValue(states, clinic.stateName)?.toUpperCase() === state.toUpperCase()
        );
      }
      return (
        clinic.stateCode?.toUpperCase() === state.toUpperCase() ||
        states[clinic.stateCode || '']?.toUpperCase() === state.toUpperCase()
      );
    });
  }

  private filterAvailability (clinics: Clinic[], availability: ClinicAvailability): Clinic[] {
    return clinics.filter(clinic => {
      if (clinic.opening) return this.checkWithinTime(availability, clinic.opening);
      return this.checkWithinTime(availability, clinic.availability);
    });
  }

  private checkWithinTime (availabileTime, clinictime) {
    return clinictime.from <= availabileTime.from && clinictime.to >= availabileTime.to;
  }
}
