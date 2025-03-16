import { Response } from 'miragejs';

const spiceRoutes = {
  getSpices: (schema, request) => {
    const spices = schema.db.spices;
    return spices;
  },
  getSpice: (schema, request) => {
    const { id } = request.params;
    const spice = schema.db.spices.find(id);
    return spice;
  },
  errorSpice: (schema, request) => {
    return new Response(500, {}, { errors: [ 'this spice is too secret'] });
  },
  updateSpice: (schema, request) => {
    const body = JSON.parse(request.requestBody);
    const spiceRes = schema.db.spices.update(
      {
        id: body.id,
      },
      body
    );
    return spiceRes;
  },
};

export default spiceRoutes;
