import { timeRegex } from '../../utils/regex';
import { z } from 'zod';
const GetQuery = z
  .object({
    name: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
    availability: z
      .object({
        from: z.string().regex(timeRegex),
        to: z.string().regex(timeRegex)
      })
      .optional()
  })
  .strict()
  .refine(
    obj => {
      if (obj.availability) return obj.availability?.to > obj.availability?.from;
      return true;
    },
    { message: 'start time must be before end time!' }
  );
export type clinicGetQuery = z.infer<typeof GetQuery>;

export const clinicGetDto = z.object({
  body: z.object({}),
  query: GetQuery
});
