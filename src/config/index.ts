import dotenv from 'dotenv';
import { z } from 'zod';

const isEnv = dotenv.config();
if (!isEnv) throw new Error('Could not find .env file!');

export function getEnv () {
  const envVariables = z.object({
    PORT: z.string(),
    SERVER: z.string(),
    LOG_LEVEL: z.string().optional()
  });
  envVariables.parse(process.env);

  return envVariables;
}
// validation for the ENV and add them to the global process.emv
const envVariables = getEnv();
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

export default {
  port: parseInt(process.env.PORT, 10),
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  api: {
    prefix: '/api'
  }
};
