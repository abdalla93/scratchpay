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
    const returnClinics = [...dentalClinics, ...vetClinics] as Clinic[];
    return returnClinics.filter(returnClinic => {
      return this.isValidClinic(returnClinic, query);
    });
  };

  private isValidClinic (clinic: Clinic, query: clinicGetQuery = {}): boolean {
    let isValidName = true;
    let isValidState = true;
    let isValidAvailability = true;

    if (query.name) isValidName = this.isValidName(clinic, query.name);
    if (query.state) isValidState = this.isValidState(clinic, query.state);
    if (query.availability) isValidAvailability = this.isValidAvailability(clinic, query.availability);

    return isValidName && isValidState && isValidAvailability;
  }

  private isValidName (clinic: Clinic, name: string): boolean {
    let clinicName = clinic?.name;
    if (!clinic.name) clinicName = clinic.clinicName;

    return clinicName?.toUpperCase().includes(name.toUpperCase()) || false;
  }

  private isValidState (clinic: Clinic, state: string): boolean {
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
  }

  private isValidAvailability (clinic: Clinic, availability: ClinicAvailability): boolean {
    let clinicAvailability = clinic?.opening;
    if (!clinic.opening) clinicAvailability = clinic.availability;

    return this.checkWithinTime(availability, clinicAvailability);
  }

  private checkWithinTime (availabileTime, clinictime): boolean {
    return clinictime.from <= availabileTime.from && clinictime.to >= availabileTime.to;
  }
}
