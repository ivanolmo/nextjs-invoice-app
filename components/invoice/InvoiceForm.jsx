import { Formik, Form, FieldArray } from 'formik';
import { DatePicker, Select } from 'react-formik-ui';

import Input from '../ui/Input';
import Button from '../ui/Button';
import DeleteIcon from '../ui/DeleteIcon';
import { classNames } from '../../utils';
import { formValidationSchema } from '../../utils';

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
      validationSchema={formValidationSchema}
      enableReinitialize={true}
      onSubmit={async () => {
        props.onSubmit();
      }}
    >
      {({ values, errors, touched, isValid, submitCount, handleBlur }) => {
        const hasErrors = errors && Object.keys(errors).length > 0;

        const datePickerDisabled =
          values.status === 'pending' &&
          values.paymentDue &&
          values.paymentDue !== '';

        return (
          <div className='text-xs'>
            <Form>
              <div>
                <span className='text-one font-bold'>Bill From</span>
              </div>

              <Input
                label='Street Address'
                name='senderAddress.street'
                type='text'
              />

              <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6'>
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
                  classes='col-span-2 md:col-span-1'
                />
              </div>

              <div className='mt-10'>
                <span className='text-one font-bold'>Bill To</span>
              </div>

              <div>
                <Input label="Client's Name" name='clientName' type='text' />

                <Input label="Client's Email" name='clientEmail' type='email' />

                <Input
                  label='Street Address'
                  name='clientAddress.street'
                  type='text'
                />
                <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6'>
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
                    classes='col-span-2 md:col-span-1'
                  />
                </div>
              </div>

              <div
                className={classNames(
                  datePickerDisabled
                    ? 'text-seven/50 dark:text-six/50'
                    : 'text-seven',
                  'tracking-tight mt-10 space-y-6'
                )}
              >
                <div className='md:grid md:grid-cols-2 md:gap-x-6'>
                  <div>
                    <DatePicker
                      label='Invoice Date'
                      name='createdAt'
                      dateFormat='MMM dd yyyy'
                      onBlur={handleBlur}
                      disabled={datePickerDisabled}
                      className={classNames(
                        hasErrors &&
                          errors.createdAt &&
                          touched.createdAt &&
                          'border-nine',
                        datePickerDisabled
                          ? 'text-black/50 border-five/50 dark:text-white/50 dark:bg-three/30 dark:border-four/50 cursor-not-allowed'
                          : 'dark:bg-three text-black dark:text-white border-five dark:border-four hover:border-one dark:hover:border-one cursor-pointer',
                        'bg-[url("/assets/icon-calendar.svg")] bg-no-repeat bg-[center_right_1rem] font-bold mt-2.5 p-4 border rounded-md h-12 w-full'
                      )}
                    />
                  </div>
                  <div className='text-seven dark:text-six mt-6 md:mt-0'>
                    <Select
                      label='Payment Terms'
                      name='paymentTerms'
                      onBlur={handleBlur}
                      className={classNames(
                        hasErrors && errors.paymentTerms && touched.paymentTerms
                          ? 'border-nine'
                          : 'border-five hover:border-one dark:hover:border-one',
                        'bg-[url("/assets/icon-arrow-down.svg")] bg-no-repeat bg-[center_right_1rem] bg-white dark:bg-three text-black dark:text-white font-bold mt-2.5 p-4 border dark:border-four rounded-md h-12 w-full appearance-none cursor-pointer'
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
                </div>
                <div>
                  <Input
                    label='Project Description'
                    name='description'
                    type='text'
                    placeholder='e.g. Website Redesign Service'
                  />
                </div>
              </div>

              <div className='mt-16 md:mt-6'>
                <span className='text-[#777f98] text-lg font-bold'>
                  Item List
                </span>
              </div>

              <FieldArray name='items'>
                {({ push, remove }) => (
                  <div className='flex flex-col gap-6'>
                    {values.items.map((item, index) => (
                      <div
                        key={index}
                        className='grid grid-cols-10 md:grid-cols-[214px_46px_100px_54px_24px] gap-x-4 items-end'
                      >
                        <Input
                          label='Item Name'
                          name={`items[${index}].name`}
                          type='text'
                          classes='col-span-10 md:col-span-1'
                        />
                        <Input
                          label='Qty'
                          name={`items[${index}].quantity`}
                          type='number'
                          classes='col-span-2 md:col-span-1'
                        />
                        <Input
                          label='Price'
                          name={`items[${index}].price`}
                          type='number'
                          classes='col-span-3 md:col-span-1'
                        />

                        <div className='col-span-3 md:col-span-1 overflow-auto'>
                          <label
                            htmlFor='total'
                            className='text-xs text-seven dark:text-six tracking-tight'
                          >
                            Total
                          </label>
                          <div className='mt-2 py-4'>
                            <span className='text-xs text-six dark:text-five font-bold'>
                              {(item.quantity * item.price).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div
                          onClick={() => remove(index)}
                          className='col-span-2 md:col-span-1 justify-self-end py-4 pr-2 md:pr-0 cursor-pointer'
                        >
                          <DeleteIcon className='fill-current text-six hover:text-nine' />
                        </div>
                      </div>
                    ))}
                    <Button
                      containerClasses={classNames(
                        values.items.length === 0 ? 'md:mt-4' : 'md:mt-4',
                        'bg-buttonLight dark:bg-three hover:bg-five dark:hover:bg-four mt-6'
                      )}
                      textClasses='text-seven dark:text-six'
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

              {!isValid && submitCount > 0 && (
                <div className='text-nine text-[0.625rem] font-bold mt-8 -mb-12 space-y-2 overflow-hidden'>
                  <div>- All fields must be added</div>
                  {values.items.length === 0 && (
                    <div>- An item must be added</div>
                  )}
                </div>
              )}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
