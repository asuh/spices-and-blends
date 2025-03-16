import { Response } from 'miragejs';

const blendRoutes = {
  getBlends: (schema, request) => {
    const blends = schema.db.blends;
    return blends;
  },
  getBlend: (schema, request) => {
    const { id } = request.params;
    const blend = schema.db.blends.find(id);
    return blend;
  },
  addBlend: (schema, request) => {
    const body = JSON.parse(request.requestBody);
    // add new blend
    const blendRes = schema.db.blends.create(body);
    return blendRes;
  },
};

export default blendRoutes;
