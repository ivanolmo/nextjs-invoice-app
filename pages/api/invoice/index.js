import { db } from '../../../lib/firebaseAdmin';
import { addDays, generateId } from '../../../lib/formatUtils';
import { getAllInvoices, getInvoiceById } from '../../../lib/dbAdmin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log(req.body);
      const { createdAt, paymentTerms, items } = req.body;

      //TODO add check for existing invoice (for updating existing invoices)
      // if (req.body.id) {
      //   const docRef = await getInvoiceById(req.body.id);
      //   console.log(docRef);
      // }

      const formattedCreatedAt =
        createdAt === ''
          ? new Date().toISOString()
          : new Date(createdAt).toISOString();

      const paymentDue = !paymentTerms
        ? ''
        : addDays(formattedCreatedAt, +paymentTerms);

      const total = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      for (let item of items) {
        item.total = item.quantity * item.price;
      }

      const newInvoice = {
        ...req.body,
        id: generateId(),
        createdAt: formattedCreatedAt,
        paymentDue,
        paymentTerms: +paymentTerms,
        total,
      };

      await db.collection('invoices').doc(newInvoice.id).set(newInvoice);

      res.status(201).json({ invoice: newInvoice, status: newInvoice.status });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  // TODO route for client side useSWR, might move this to a dbclient file
  if (req.method === 'GET') {
    const invoices = await getAllInvoices();

    res.status(200).json({ invoices });
  }
}
