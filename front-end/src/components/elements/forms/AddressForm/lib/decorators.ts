import cep, { CEP } from 'cep-promise';
import createDecorator from 'final-form-calculate';

export const addressDecorator = createDecorator({
  field: 'zipCode',
  updates: async (value) => {
    if (!value || value.length !== 9) return {};

    /**
     * 'cep-promise' has wrong declarations,
     *  it seems that they are using a work-around that breaks things
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const zipCodeData: CEP | void = await cep(value, {}).catch((error: unknown) => {
      if (process.env.NODE_ENV === 'development') console.error(error);
    });

    if (!zipCodeData) return {};

    const { state, city, street, neighborhood } = zipCodeData;

    return {
      state,
      city,
      street,
      neighborhood,
    };
  },
});
