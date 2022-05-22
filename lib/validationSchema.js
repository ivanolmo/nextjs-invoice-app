import * as Yup from 'yup';

export const validationSchema = Yup.object({
  senderAddress: Yup.object().shape({
    street: Yup.string().required(),
    city: Yup.string().required(),
    postCode: Yup.string().required(),
    country: Yup.string().required(),
  }),
  clientAddress: Yup.object().shape({
    street: Yup.string().required(),
    city: Yup.string().required(),
    postCode: Yup.string().required(),
    country: Yup.string().required(),
  }),
  clientEmail: Yup.string().email().required(),
  clientName: Yup.string().required(),
  createdAt: Yup.date().required(),
  description: Yup.string().required(),
  paymentTerms: Yup.number().required(),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.number().required(),
        quantity: Yup.number().required(),
        total: Yup.string(),
      })
    )
    .min(1, 'At least one item is required'),
});
