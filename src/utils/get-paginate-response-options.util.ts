import { getSchemaPath } from '@nestjs/swagger';
import { PaginateResponse } from '../common/types/paginate-response.type';

// crutch. swagger api response options
export const getPaginateResponseOptions = (
  dataType: Function | string,
  description = 'Successful operation',
  status = 200,
) => ({
  status,
  schema: {
    allOf: [
      { $ref: getSchemaPath(PaginateResponse) },
      {
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(dataType) },
          },
        },
      },
    ],
  },
  description,
});
