import { nanoid } from 'nanoid';

import { auth, db } from '../../../lib/firebaseAdmin';
import { addDays } from '../../../utils';

export default async function handler(req, res) {
  const {
    body,
    headers: { token },
    method,
    query: { id },
  } = req;

  switch (method) {
    // delete invoice with the specified id
    case 'DELETE':
      try {
        const { uid } = await auth.verifyIdToken(token);

        await db
          .collection('users')
          .doc(uid)
          .collection('invoices')
          .doc(id)
          .delete();
        res.status(200).json({ message: 'Success' });
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
      }
      break;

    // update the specified invoice 'status' field from pending to paid
    case 'PATCH':
      try {
        const { uid } = await auth.verifyIdToken(token);

        await db
          .collection('users')
          .doc(uid)
          .collection('invoices')
          .doc(id)
          .update({
            status: 'paid',
          });
        res.status(200).json({ message: 'Success' });
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
      }
      break;

    // update the entire invoice, all fields are required
    case 'PUT':
      try {
        const { uid } = await auth.verifyIdToken(token);

        const { createdAt, paymentTerms, items } = body;

        const formattedCreatedAt = new Date(createdAt).toISOString();

        const paymentDue = addDays(formattedCreatedAt, +paymentTerms);

        const total = items.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );

        for (let item of items) {
          item.total = item.quantity * item.price;
          item.id = nanoid(6);
        }

        const updatedInvoice = {
          ...body,
          status: 'pending',
          createdAt: formattedCreatedAt,
          paymentDue,
          paymentTerms: +paymentTerms,
          total,
        };

        await db
          .collection('users')
          .doc(uid)
          .collection('invoices')
          .doc(updatedInvoice.id)
          .set(updatedInvoice);

        res.status(200).json({ message: 'Success' });
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
      }
      break;

    default:
      res.setHeader('Allow', ['PATCH', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
