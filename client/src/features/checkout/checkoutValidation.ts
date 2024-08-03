import * as Yup from 'yup';

export const validationSchema = [
    Yup.object({
        fullName: Yup.string().required('Full name is required'),
        address1: Yup.string().required('Address line 1 is required'),
        address2: Yup.string().required('Address line 2 is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zip: Yup.string().required('Zip / Postal code is required'),
        country: Yup.string().required('Country is required'),
    }),
    Yup.object(),
    Yup.object({
        nameOnCard: Yup.string().required()
    })
]