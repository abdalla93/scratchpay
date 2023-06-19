import { z } from 'zod';
const clinicAvailabilityObject = z
  .object({
    from: z.string(),
    to: z.string()
  })
  .optional();
export const ClinicModel = z.object({
  name: z.string().optional(),
  clinicName: z.string().optional(),
  stateName: z.string().optional(),
  stateCode: z.string().optional(),
  availability: clinicAvailabilityObject,
  opening: clinicAvailabilityObject
});

export type Clinic = z.infer<typeof ClinicModel>;
export type ClinicAvailability = z.infer<typeof clinicAvailabilityObject>;
