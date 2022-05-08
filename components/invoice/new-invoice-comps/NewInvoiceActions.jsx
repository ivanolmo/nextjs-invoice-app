import { useFormikContext } from 'formik';

import DiscardBtn from '../../ui/DiscardBtn';
import DraftBtn from '../../ui/DraftBtn';
import SaveSendBtn from '../../ui/SaveSendBtn';

export default function NewInvoiceActions() {
  const { submitForm } = useFormikContext();

  return (
    <div className='flex justify-center items-center gap-2 bg-white py-5 -mx-6 mt-20 shadow-[0_-30px_30px_12px_rgba(0,0,0,0.1)]'>
      <DiscardBtn />
      <DraftBtn />
      <SaveSendBtn onSubmit={submitForm} />
    </div>
  );
}
