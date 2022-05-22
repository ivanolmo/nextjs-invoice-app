import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { Formik, Form, FieldArray } from 'formik';
import { DatePicker, Select } from 'react-formik-ui';

import InvoiceContext from '../../store/context';
import Input from './new-invoice-comps/Input';
import NewInvoiceActions from './new-invoice-comps/NewInvoiceActions';
import Button from '../ui/Button';
import { classNames, formatMoney } from '../../lib/formatUtils';
import { validationSchema } from '../../lib/validationSchema';

export default function InvoiceForm(props) {
  const { setShowInvoiceForm } = useContext(InvoiceContext);
  const [formValues, setFormValues] = useState({
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
  });

  const onSubmitInvoice = async (values) => {
    const res = await fetch('/api/invoice/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'pending', ...values }),
    });

    const data = await res.json();
    // do something
    console.log(data);
  };

  const onSubmitDraftInvoice = async (values) => {
    const res = await fetch('/api/invoice/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'draft', ...values }),
    });

    const data = await res.json();
    // do something
    console.log(data);
  };

  useEffect(() => {
    if (props.invoice) {
      setFormValues(props.invoice);
    }
  }, [props.invoice]);

  return (
    <section className='bg-white pt-8 absolute inset-x-0 top-[75px] bottom-0'>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          onSubmitInvoice(values);
          setSubmitting(false);
          setShowInvoiceForm(false);
          window.scrollTo(0, 0);
        }}
      >
        {({ values, errors, touched, isValid, submitCount, handleBlur }) => {
          const hasErrors = errors && Object.keys(errors).length > 0;

          return (
            <Form className='px-6'>
              <div
                className='cursor-pointer'
                onClick={() => setShowInvoiceForm(false)}
              >
                <Image
                  src='/assets/icon-arrow-left.svg'
                  alt='left arrow'
                  width={6}
                  height={8}
                />
                <span className='text-xs tracking-tight font-bold ml-6'>
                  Go Back
                </span>
              </div>

              <h1 className='text-xl font-bold mt-6'>New Invoice</h1>

              <div className='mt-6'>
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
                      'text-black font-bold mt-4 p-4 border rounded-md h-12 w-full'
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
                      'bg-[url("/assets/icon-arrow-down.svg")] bg-no-repeat bg-[center_right_1rem] bg-white text-black font-bold mt-4 p-4 border  rounded-md h-12 w-full appearance-none'
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
                    <div className=' space-y-6'>
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
                                {formatMoney(
                                  item.quantity * item.price
                                ).substring(1)}
                              </span>
                            </div>
                          </div>
                          <button
                            type='button'
                            onClick={() => remove(index)}
                            className='justify-self-end pb-3 pr-2'
                          >
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
                <div className='text-nine text-sm font-bold mt-8 -mb-12 space-y-2 overflow-hidden'>
                  <div>Please check all fields and try again</div>
                  {values.items.length === 0 && (
                    <div>At least 1 item is required</div>
                  )}
                </div>
              )}
              <NewInvoiceActions onSubmitDraftInvoice={onSubmitDraftInvoice} />
            </Form>
          );
        }}
      </Formik>
    </section>
  );
}
