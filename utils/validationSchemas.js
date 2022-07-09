import * as Yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(Yup);

export const formValidationSchema = Yup.object({
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

export const registerValidationSchema = Yup.object({
  name: Yup.string().optional(),
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string()
    .password()
    .required('Required')
    .min(6, 'Minimum 6 characters')
    .max(20)
    .minNumbers(0)
    .minLowercase(0)
    .minUppercase(0)
    .minSymbols(0),
  confirmPassword: Yup.string()
    .password()
    .required('Required')
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .min(6, 'Minimum 6 characters')
    .max(20)
    .minNumbers(0)
    .minLowercase(0)
    .minUppercase(0)
    .minSymbols(0),
});

export const signInValidationSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Required'),
  password: Yup.string().required('Required'),
});
