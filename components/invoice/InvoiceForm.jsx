import { FieldArray, Form, Formik } from 'formik';
import { DatePicker } from 'react-formik-ui';

import Button from '../ui/Button';
import DeleteIcon from '../ui/DeleteIcon';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { classNames } from '../../utils/utils';
import { formValidationSchema } from '../../utils/validationSchemas';

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
                <span className='text-violet-500 font-bold'>Bill From</span>
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
                <span className='text-violet-500 font-bold'>Bill To</span>
              </div>

              <div>
                <Input label="Client's Name" name='clientName' type='text' />

                <Input
                  label="Client's Email"
                  name='clientEmail'
                  type='email'
                  placeholder='e.g. email@example.com'
                />

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
                    ? 'text-indigo-400/50 dark:text-slate-400/50'
                    : 'text-indigo-400',
                  'tracking-tight mt-10 space-y-6'
                )}
              >
                <div className='grid md:grid-cols-2 gap-y-6 md:gap-x-6'>
                  <div
                    // reliably styles react-datepicker label
                    className={
                      hasErrors && errors.createdAt && touched.createdAt
                        ? 'date-error'
                        : undefined
                    }
                  >
                    {/* TODO possibly move to custom comp */}
                    <DatePicker
                      placeholder={new Date().toDateString()}
                      label='Invoice Date'
                      name='createdAt'
                      dateFormat='MMM dd yyyy'
                      onBlur={handleBlur}
                      disabled={datePickerDisabled}
                      showPopperArrow={false}
                      className={classNames(
                        hasErrors && errors.createdAt && touched.createdAt
                          ? 'border-red-500 dark:border-red-500 dark:bg-slate-900'
                          : datePickerDisabled
                          ? 'text-black/50 border-indigo-100/50 dark:text-white/50 dark:bg-slate-900/30 dark:border-slate-800/50 cursor-not-allowed'
                          : 'dark:bg-slate-900 text-black dark:text-white border-indigo-100 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-500',
                        'bg-[url("/assets/icon-calendar.svg")] bg-no-repeat bg-[center_right_1rem] font-bold mt-2.5 p-4 border rounded-md h-12 w-full cursor-pointer'
                      )}
                    />
                  </div>
                  <div>
                    <Select label='Payment Terms' name='paymentTerms' />
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

              <div className='mt-16 md:mt-6 lg:mt-8'>
                <span className='text-slate-500 text-lg font-bold'>
                  Item List
                </span>
              </div>

              <FieldArray name='items'>
                {({ push, remove }) => (
                  <div className='flex flex-col'>
                    {values.items.length === 0 && (
                      <div className='my-8 self-center'>
                        <span className='text-sm font-bold dark:text-white'>
                          No Items
                        </span>
                      </div>
                    )}
                    <div className='hidden mt-4 -mb-4 md:grid md:grid-cols-[214px_46px_100px_54px] md:gap-4 text-indigo-400 dark:text-indigo-100'>
                      <span>Item Name</span>
                      <span>Qty</span>
                      <span>Price</span>
                      <span>Total</span>
                    </div>
                    {values.items.map((item, index) => (
                      <div
                        key={index}
                        className='grid grid-cols-10 md:grid-cols-[210px_60px_90px_54px_24px] gap-x-4 items-end my-6 md:my-0 md:-mb-4'
                      >
                        <Input
                          label='Item Name'
                          name={`items[${index}].name`}
                          type='text'
                          classes='col-span-10 md:col-span-1 mt-0 hide-label'
                        />
                        <Input
                          label='Qty'
                          name={`items[${index}].quantity`}
                          type='number'
                          classes='col-span-2 md:col-span-1 hide-label'
                        />
                        <Input
                          label='Price'
                          name={`items[${index}].price`}
                          type='number'
                          classes='col-span-3 md:col-span-1 hide-label'
                        />

                        <div className='col-span-3 md:col-span-1 overflow-auto hide-label'>
                          <label
                            htmlFor='total'
                            className='text-xs text-indigo-400 dark:text-slate-400 tracking-tight'
                          >
                            Total
                          </label>
                          <div className='mt-3 py-4'>
                            <span className='text-xs text-slate-400 dark:text-indigo-100 font-bold'>
                              {(item.quantity * item.price).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div
                          onClick={() => remove(index)}
                          className='col-span-2 md:col-span-1 justify-self-end py-4 pr-2 md:pr-0 cursor-pointer'
                        >
                          <DeleteIcon className='fill-current text-slate-400 hover:text-red-500' />
                        </div>
                      </div>
                    ))}
                    <Button
                      containerClasses={classNames(
                        hasErrors &&
                          errors.items &&
                          submitCount > 0 &&
                          values.items.length === 0
                          ? 'border border-red-500 animate-pulse'
                          : undefined,
                        'bg-gray-200 dark:bg-slate-900 hover:bg-indigo-100 dark:hover:bg-slate-800 mt-10'
                      )}
                      textClasses='text-indigo-400 dark:text-slate-400'
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
                <div className='text-red-500 text-[0.625rem] font-bold mt-8 -mb-12 md:mb-0 space-y-2 overflow-hidden'>
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
