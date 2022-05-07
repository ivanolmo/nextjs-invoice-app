import Image from 'next/image';
import { Formik, Form, useField, FieldArray } from 'formik';
import { DatePicker, Select } from 'react-formik-ui';

import BackButton from '../ui/BackButton';

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className='mt-6'>
      <label
        htmlFor={props.id || props.name}
        className='text-seven text-xs tracking-tight'
      >
        {label}
      </label>
      <input
        className='text-xs text-black font-bold border border-five p-4 mt-2 w-full rounded-md'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div className=''>{meta.error}</div> : null}
    </div>
  );
};

export default function NewInvoice() {
  return (
    <section className='bg-white p-6'>
      <BackButton />
      <h1 className='text-xl font-bold mt-4'>New Invoice</h1>
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
          }, 400);
        }}
      >
        {({ values }) => (
          <Form>
            <div>
              <h3 className='text-one text-xs font-bold mt-4'>Bill From</h3>
            </div>

            {/* bill from stuff */}
            <div className=''>
              <Input
                label='Street Address'
                name='senderAddress.street'
                type='text'
              />

              <Input label='City' name='senderAddress.city' type='text' />

              <Input
                label='Post Code'
                name='senderAddress.postCode'
                type='text'
              />

              <Input label='Country' name='senderAddress.country' type='text' />
            </div>

            <div>
              <h3 className='text-one text-xs font-bold mt-10'>Bill To</h3>
            </div>

            {/* bill to / client stuff */}
            <div>
              <Input label="Client's Name" name='clientName' type='text' />

              <Input label="Client's Email" name='clientEmail' type='email' />

              <Input
                label='Street Address'
                name='clientAddress.street'
                type='text'
              />

              <Input label='City' name='clientAddress.city' type='text' />

              <Input
                label='Post Code'
                name='clientAddress.postCode'
                type='text'
              />

              <Input label='Country' name='clientAddress.country' type='text' />
            </div>

            {/* date / terms / description stuff */}
            <div className='text-seven text-xs tracking-tight mt-10 space-y-6'>
              <div>
                <DatePicker
                  label='Invoice Date'
                  name='createdAt'
                  dateFormat='dd MMM yyyy'
                  className='text-black font-bold mt-4 p-4 border border-five rounded-md h-12 w-full'
                />
              </div>
              <div className=''>
                <Select
                  label='Payment Terms'
                  name='paymentTerms'
                  className='bg-[url("/assets/icon-arrow-down.svg")] bg-no-repeat bg-[center_right_1rem] bg-white text-black font-bold mt-4 p-4 border border-five rounded-md h-12 w-full appearance-none'
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

            {/* item list */}
            <div className='mt-16'>
              <h3 className='text-[#777f98] text-lg font-bold'>Item List</h3>
            </div>

            <div>
              <FieldArray name='items'>
                {({ push, remove }) => (
                  <>
                    {values.items.map((item, index) => (
                      <div key={index}>
                        <Input
                          label='Item Name'
                          name={`items[${index}].name`}
                          type='text'
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
                        <span>Total {item.quantity * item.price}</span>
                        <button type='button' onClick={() => remove(index)}>
                          <Image
                            src='/assets/icon-delete.svg'
                            alt='delete icon'
                            width={12}
                            height={16}
                          />
                        </button>
                      </div>
                    ))}
                    {/* TODO remove this temp button */}
                    <button
                      type='button'
                      onClick={() =>
                        push({
                          name: '',
                          quantity: '',
                          price: '',
                        })
                      }
                    >
                      <Image
                        src='/assets/icon-plus.svg'
                        alt='add icon'
                        width={16}
                        height={16}
                      />
                    </button>
                  </>
                )}
              </FieldArray>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            {/* TODO button styling */}
            <button type='submit'>submit</button>
          </Form>
        )}
      </Formik>
      {/* Discard/Save as draft/save and send buttons */}
    </section>
  );
}
