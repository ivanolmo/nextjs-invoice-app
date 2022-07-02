import { nanoid } from 'nanoid';

import { db } from '../../../lib/firebaseAdmin';
import { addDays, generateId } from '../../../utils/utils';

export default async function handler(req, res) {
  const { body, method } = req;

  switch (method) {
    // create new invoice and post to invoices list
    case 'POST':
      try {
        const { createdAt, paymentTerms, items } = body;

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
          item.id = nanoid(6);
        }

        const newInvoice = {
          ...body,
          invoiceId: generateId(),
          createdAt: formattedCreatedAt,
          paymentDue,
          paymentTerms: +paymentTerms,
          total,
        };

        await db.collection('invoices').add(newInvoice);

        res.status(201).json({ message: 'Invoice creation success' });
      } catch (error) {
        res.status(500).json({ message: 'Invoice creation failure' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
