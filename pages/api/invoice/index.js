import { db } from '../../../lib/firebaseAdmin';
import { formatDate, addDays, generateId } from '../../../lib/formatUtils';
import { getAllInvoices } from '../../../lib/dbAdmin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { createdAt, paymentTerms, items } = req.body;

    const formattedCreatedAt = formatDate(createdAt);
    const paymentDue = addDays(formattedCreatedAt, +paymentTerms);

    const total = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    for (let item of items) {
      item.total = +(item.quantity * item.price);
    }

    const newInvoice = {
      ...req.body,
      id: generateId(),
      createdAt: formattedCreatedAt,
      paymentDue,
      paymentTerms: +paymentTerms,
      status: 'pending',
      total,
    };

    const dbRes = await db.collection('invoices').add(newInvoice);

    res.status(201).json({ invoice: newInvoice });
  }

  if (req.method === 'GET') {
    const invoices = await getAllInvoices();

    res.status(200).json({ invoices });
  }
}
