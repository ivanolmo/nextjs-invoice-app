import { db } from '../../../lib/firebaseAdmin';
import { addDays } from '../../../utils';

export default async function handler(req, res) {
  const {
    query: { id },
    body,
    method,
  } = req;

  switch (method) {
    // get invoice by id
    case 'GET':
      try {
        const doc = await db.collection('invoices').doc(id).get();

        const invoice = doc.data();

        if (invoice) {
          res.status(200).json({ invoice });
        } else {
          res.status(404).json({ message: 'Invoice not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Invoice lookup failure' });
      }

      break;

    // delete invoice with the specified id
    case 'DELETE':
      try {
        await db.collection('invoices').doc(id).delete();
        res.status(200).json({ message: 'Invoice delete successful' });
      } catch (error) {
        res.status(500).json({ message: 'Invoice delete failure' });
      }
      break;

    // update the specified invoice 'status' field from pending to paid
    case 'PATCH':
      try {
        await db.collection('invoices').doc(id).update({
          status: 'paid',
        });
        res.status(200).json({ message: 'Status update success' });
      } catch (error) {
        res.status(500).json({ message: 'Status update failure' });
      }
      break;

    // update the entire invoice, all fields are required
    case 'PUT':
      try {
        const { createdAt, paymentTerms, items } = body;

        const formattedCreatedAt = new Date(createdAt).toISOString();

        const paymentDue = addDays(formattedCreatedAt, +paymentTerms);

        const total = items.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );

        for (let item of items) {
          item.total = item.quantity * item.price;
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
          .collection('invoices')
          .doc(updatedInvoice.id)
          .set(updatedInvoice);

        res.status(200).json({ updatedInvoice });
      } catch (error) {
        res.status(500).json({ message: 'Invoice update failure' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
