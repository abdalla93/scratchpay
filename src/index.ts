import { app } from './app';
import { z } from 'zod';
import config from './config';

app.listen(config.port, () => console.log(`${process.env.SERVER}:${process.env.PORT}`));
