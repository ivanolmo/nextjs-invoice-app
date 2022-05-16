import { db } from '../../../lib/firebaseAdmin';
import { formatDate, addDays, generateId } from '../../../lib/formatUtils';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { createdAt, paymentTerms, items } = req.body;

    const formattedCreatedAt = formatDate(createdAt);
    const paymentDue = addDays(formattedCreatedAt, +paymentTerms);

    const total = items.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0
    );

    for (let item of items) {
      item.total = (item.quantity * item.price).toFixed(2);
    }

    const newInvoice = {
      ...req.body,
      id: generateId(),
      createdAt: formattedCreatedAt,
      paymentDue,
      status: 'pending',
      total,
    };

    const dbRes = await db.collection('invoices').add(newInvoice);

    res.status(201).json({ invoice: newInvoice });
  }
}
