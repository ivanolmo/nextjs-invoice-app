import Image from 'next/image';
import { Formik, Form, FieldArray } from 'formik';
import { DatePicker, Select } from 'react-formik-ui';

import Input from '../ui/Input';
import Button from '../ui/Button';
import { classNames } from '../../lib/formatUtils';
import { validationSchema } from '../../lib/validationSchema';

export default function InvoiceForm(props) {
  const initialValues = {
    clientAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
    senderAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
    createdAt: '',
    description: '',
    paymentTerms: '',
    clientName: '',
    clientEmail: '',
    items: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      innerRef={props.formRef}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async () => {
        props.onSubmit();
      }}
    >
      {({ values, errors, touched, isValid, submitCount, handleBlur }) => {
        const hasErrors = errors && Object.keys(errors).length > 0;

        return (
          <Form>
            <div>
              <span className='text-one text-xs font-bold'>Bill From</span>
            </div>

            <Input
              label='Street Address'
              name='senderAddress.street'
              type='text'
            />

            <div className='grid grid-cols-2 gap-x-6'>
              <Input label='City' name='senderAddress.city' type='text' />

              <Input
                label='Post Code'
                name='senderAddress.postCode'
                type='text'
              />

              <Input
                label='Country'
                name='senderAddress.country'
                type='text'
                classes='col-span-2'
              />
            </div>

            <div className='mt-10'>
              <span className='text-one text-xs font-bold'>Bill To</span>
            </div>

            <div>
              <Input label="Client's Name" name='clientName' type='text' />

              <Input label="Client's Email" name='clientEmail' type='email' />

              <Input
                label='Street Address'
                name='clientAddress.street'
                type='text'
              />
              <div className='grid grid-cols-2 gap-x-6'>
                <Input label='City' name='clientAddress.city' type='text' />

                <Input
                  label='Post Code'
                  name='clientAddress.postCode'
                  type='text'
                />

                <Input
                  label='Country'
                  name='clientAddress.country'
                  type='text'
                  classes='col-span-2'
                />
              </div>
            </div>

            <div className='text-seven text-xs tracking-tight mt-10 space-y-6'>
              <div>
                <DatePicker
                  label='Invoice Date'
                  name='createdAt'
                  dateFormat='MMM dd yyyy'
                  onBlur={handleBlur}
                  className={classNames(
                    hasErrors && errors.createdAt && touched.createdAt
                      ? 'border-nine'
                      : 'border-five hover:border-one',
                    'bg-[url("/assets/icon-calendar.svg")] bg-no-repeat bg-[center_right_1rem] text-black font-bold mt-4 p-4 border rounded-md h-12 w-full cursor-pointer'
                  )}
                />
              </div>
              <div>
                <Select
                  label='Payment Terms'
                  name='paymentTerms'
                  onBlur={handleBlur}
                  className={classNames(
                    hasErrors && errors.paymentTerms && touched.paymentTerms
                      ? 'border-nine'
                      : 'border-five hover:border-one',
                    'bg-[url("/assets/icon-arrow-down.svg")] bg-no-repeat bg-[center_right_1rem] bg-white text-black font-bold mt-4 p-4 border rounded-md h-12 w-full appearance-none cursor-pointer'
                  )}
                  options={[
                    { label: '', value: null },
                    { label: 'Net 1 Day', value: 1 },
                    { label: 'Net 7 Days', value: 7 },
                    { label: 'Net 14 Days', value: 14 },
                    { label: 'Net 30 Days', value: 30 },
                  ]}
                />
              </div>
              <div>
                <Input
                  label='Project Description'
                  name='description'
                  type='text'
                />
              </div>
            </div>

            <div className='mt-16'>
              <span className='text-[#777f98] text-lg font-bold'>
                Item List
              </span>
            </div>

            <div>
              <FieldArray name='items'>
                {({ push, remove }) => (
                  <div className='flex flex-col gap-6'>
                    {values.items.map((item, index) => (
                      <div
                        key={index}
                        className='grid grid-cols-4 gap-x-4 items-end'
                      >
                        <Input
                          label='Item Name'
                          name={`items[${index}].name`}
                          type='text'
                          classes='col-span-4'
                        />
                        <Input
                          label='Qty'
                          name={`items[${index}].quantity`}
                          type='number'
                        />
                        <Input
                          label='Price'
                          name={`items[${index}].price`}
                          type='number'
                        />
                        <div
                          className='hidden'
                          name={`items[${index}].total`}
                          type='number'
                        ></div>
                        <div className='flex flex-col justify-between h-[82px]'>
                          <div>
                            <span className='text-seven text-xs tracking-tight'>
                              Total
                            </span>
                          </div>
                          <div className='pb-3'>
                            <span className='text-six font-bold'>
                              {(item.quantity * item.price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <button
                          type='button'
                          onClick={() => remove(index)}
                          className='justify-self-end pb-3 pr-2'
                        >
                          {/* TODO hover color */}
                          <Image
                            src='/assets/icon-delete.svg'
                            alt='delete icon'
                            width={12}
                            height={16}
                          />
                        </button>
                      </div>
                    ))}
                    <Button
                      containerClasses='bg-buttonLight hover:bg-five mt-12'
                      textClasses='text-seven'
                      buttonText='+ Add New Item'
                      onClick={() =>
                        push({
                          name: '',
                          quantity: '',
                          price: '',
                          total: function () {
                            return +this.quantity * +this.price;
                          },
                        })
                      }
                    />
                  </div>
                )}
              </FieldArray>
            </div>

            {!isValid && submitCount > 0 && (
              <div className='text-nine text-[0.625rem] mt-8 -mb-12 space-y-2 overflow-hidden'>
                <div>- All fields must be added</div>
                {values.items.length === 0 && (
                  <div>- An item must be added</div>
                )}
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
