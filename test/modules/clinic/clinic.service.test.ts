import 'reflect-metadata';
import { Container } from 'typedi';
import { ClinicService } from '../../../src/modules/clinic';
import dentalClinics from '../../../src/modules/clinic/providers/dental-clinic.json';
import vetClinics from '../../../src/modules/clinic/providers/vet-clinic.json';
import { mockAvailabilityClinic, mockNameClinic, mockStateClinic } from './clinic.mock';

const clinicService = Container.get(ClinicService);
const allClinics = [...dentalClinics, ...vetClinics];

describe('Clinic Service', () => {
  test('should successfully get all clinics', async () => {
    const clinics = clinicService.getAll();

    expect(clinics).toEqual(allClinics);
  });
  test('should successfully get all clinics with name equal `Mayo Clinic`', async () => {
    const clinics = clinicService.getAll({ name: 'Mayo Clinic' });

    expect(clinics).toEqual(mockNameClinic);
  });
  test('should successfully get all clinics with state name equal `Florida` or state code equal `FL`', async () => {
    const clinics = clinicService.getAll({ state: 'Florida' });

    expect(clinics).toEqual(mockStateClinic);
  });
  test('should successfully get all clinics with availability before`10:00` and after `24:00`', async () => {
    const clinics = clinicService.getAll({ availability: { from: '10:00', to: '24:00' } });

    expect(clinics).toEqual(mockAvailabilityClinic);
  });
});
