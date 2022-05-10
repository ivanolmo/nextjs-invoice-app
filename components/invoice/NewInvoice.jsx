import Image from 'next/image';
import { Formik, Form, FieldArray } from 'formik';
import { DatePicker, Select } from 'react-formik-ui';

import Input from './new-invoice-comps/Input';
import BackButton from '../ui/BackButton';
import AddItemBtn from '../ui/AddItemBtn';
import NewInvoiceActions from './new-invoice-comps/NewInvoiceActions';
import { formatMoney } from '../../lib/formatUtils';

export default function NewInvoice() {
  return (
    <section className='bg-white pt-8 absolute inset-x-0 top-[75px] bottom-0 z-40'>
      <Formik
        initialValues={{
          clientAddress: { street: '', city: '', postCode: '', country: '' },
          senderAddress: { street: '', city: '', postCode: '', country: '' },
          createdAt: '',
          description: '',
          paymentTerms: '',
          clientName: '',
          clientEmail: '',
          items: [],
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            // TODO do stuff
            alert(JSON.stringify(values, null, 2));
            console.log(values);
            setSubmitting(false);
            resetForm();
          }, 1000);
        }}
      >
        {({ values }) => (
          <Form className='px-6'>
            <BackButton />

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
                  dateFormat='dd MMM yyyy'
                  className='text-black font-bold mt-4 p-4 border border-five hover:border-one rounded-md h-12 w-full'
                />
              </div>
              <div>
                <Select
                  label='Payment Terms'
                  name='paymentTerms'
                  className='bg-[url("/assets/icon-arrow-down.svg")] bg-no-repeat bg-[center_right_1rem] bg-white text-black font-bold mt-4 p-4 border border-five hover:border-one rounded-md h-12 w-full appearance-none'
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
                          type='text'
                        />
                        <Input
                          label='Price'
                          name={`items[${index}].price`}
                          type='text'
                        />
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
                    <AddItemBtn
                      onClick={() =>
                        push({
                          name: '',
                          quantity: '',
                          price: '',
                        })
                      }
                    />
                  </div>
                )}
              </FieldArray>
            </div>

            <NewInvoiceActions />
          </Form>
        )}
      </Formik>
    </section>
  );
}
