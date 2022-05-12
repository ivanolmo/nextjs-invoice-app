import { useFormikContext } from 'formik';
import Button from '../../ui/Button';

export default function NewInvoiceActions() {
  const { submitForm } = useFormikContext();

  return (
    <div className='flex justify-center items-center gap-2 bg-white py-5 -mx-6 mt-20 shadow-[0_-30px_30px_12px_rgba(0,0,0,0.1)]'>
      <Button
        containerClasses='bg-buttonLight hover:bg-five px-4'
        textClasses='text-seven'
        buttonText='Discard'
        onClick={() => {}}
      />
      <Button
        containerClasses='bg-[#373b53] hover:bg-eight px-4'
        textClasses='text-six'
        buttonText='Save as Draft'
        onClick={() => {}}
      />
      <Button
        containerClasses='bg-one hover:bg-two px-4'
        textClasses='text-white'
        buttonText='Save & Send'
        onClick={submitForm}
      />
    </div>
  );
}
