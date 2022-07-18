import { v4 as uuidv4 } from 'uuid';

import { auth, db } from '../../../lib/firebaseAdmin';
import { addDays, generateId } from '../../../utils';

export default async function handler(req, res) {
  const {
    body,
    headers: { token },
    method,
  } = req;

  switch (method) {
    // create new invoice and post to invoices list
    case 'POST':
      try {
        const { uid } = await auth.verifyIdToken(token);

        const { createdAt, paymentTerms, items } = body;

        const formattedCreatedAt =
          createdAt === '' ? new Date() : new Date(createdAt);

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

        const id = uuidv4();

        const newInvoice = {
          ...body,
          id,
          invoiceId: generateId(),
          createdAt: formattedCreatedAt,
          paymentDue,
          paymentTerms: +paymentTerms,
          total,
        };

        await db
          .collection('users')
          .doc(uid)
          .collection('invoices')
          .doc(id)
          .set(newInvoice);

        res.status(201).json({ message: 'Success' });
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
