import InvoiceListItem from './InvoiceListItem';
import { DUMMY_DATA } from '../../data';

export default function InvoiceList() {
  return (
    <ul className='mx-6'>
      {DUMMY_DATA.map((item) => (
        <InvoiceListItem key={item.id} invoice={item} />
      ))}
    </ul>
  );
}
