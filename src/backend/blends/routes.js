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
    try {
      const body = JSON.parse(request.requestBody);
  
      // Validate the payload
      if (!body.name || !Array.isArray(body.spices) || !Array.isArray(body.blends)) {
        console.error('Invalid payload:', body);
        return new Response(400, {}, { error: 'Invalid payload' });
      }
  
      // Add the new blend to the database
      const blendRes = schema.blends.create(body);
  
      return blendRes;
    } catch (error) {
      console.error('Error in addBlend handler:', error);
      return new Response(500, {}, { error: 'Internal Server Error' });
    }
  },  
};

export default blendRoutes;
