import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Express starter',
      version: '1.0.0'
    }
  },
  apis: ['./src/modules/**/*.routes.ts']
};
export const swaggerDocs = swaggerJsDoc(swaggerOptions);
