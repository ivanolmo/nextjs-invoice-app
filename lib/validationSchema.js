import * as Yup from 'yup';

export const validationSchema = Yup.object({
  senderAddress: Yup.object().shape({
    street: Yup.string()
      .min(10, 'Min 10 characters')
      .max(30, 'Max 30 characters')
      .required(),
    city: Yup.string()
      .min(3, 'Min 3 characters')
      .max(15, 'Max 15 characters')
      .required(),
    postCode: Yup.string().min(3).max(8).required(),
    country: Yup.string().min(2).max(15).required(),
  }),
  clientAddress: Yup.object().shape({
    street: Yup.string()
      .min(10, 'Min 10 characters')
      .max(30, 'Max 30 characters')
      .required(),
    city: Yup.string()
      .min(3, 'Min 3 characters')
      .max(15, 'Max 15 characters')
      .required(),
    postCode: Yup.string()
      .min(2, 'Min 2 characters')
      .max(10, 'Max 10 characters')
      .required(),
    country: Yup.string()
      .min(2, 'Min 2 characters')
      .max(15, 'Max 15 characters')
      .required(),
  }),
  clientEmail: Yup.string().email('Invalid email address').required(),
  clientName: Yup.string()
    .min(5, 'Min 5 characters')
    .max(30, 'Max 30 characters')
    .required(),
  createdAt: Yup.date().required(),
  description: Yup.string()
    .min(3, 'Min 3 characters')
    .max(30, 'Max 30 characters')
    .required(),
  paymentTerms: Yup.number().required(),
  items: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .min(3, 'Min 3 characters')
          .max(15, 'Max 15 characters')
          .required(),
        price: Yup.number().required(),
        quantity: Yup.number().required(),
        total: Yup.number(),
      })
    )
    .min(1, 'At least one item is required'),
});
