import { db } from '../../../lib/firebaseAdmin';
import { addDays, generateId } from '../../../lib/formatUtils';

export default async function handler(req, res) {
  const { body, method } = req;

  switch (method) {
    // get all invoices
    case 'GET':
      try {
        const snapshot = await db
          .collection('invoices')
          .orderBy('paymentDue', 'asc')
          .get();

        const invoices = [];
        const undatedInvoices = [];

        // check for invoices with no date and move them to end
        // firebase treats null as first as far as ordering
        snapshot.forEach((doc) => {
          if (!doc.data().paymentDue) {
            undatedInvoices.push({
              id: doc.id,
              ...doc.data(),
            });
          } else {
            invoices.push({
              id: doc.id,
              ...doc.data(),
            });
          }
        });

        const allInvoicesData = invoices.concat(undatedInvoices);

        res.status(200).json({ allInvoicesData });
      } catch (error) {
        res.status(500).json({ message: 'Invoices lookup failure' });
      }
      break;

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
        }

        const newInvoice = {
          ...body,
          id: generateId(),
          createdAt: formattedCreatedAt,
          paymentDue,
          paymentTerms: +paymentTerms,
          total,
        };

        await db.collection('invoices').doc(newInvoice.id).set(newInvoice);

        res.status(201).json({ message: 'Invoice creation success' });
      } catch (error) {
        res.status(500).json({ message: 'Invoice creation failure' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
