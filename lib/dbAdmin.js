import { parseISO, compareAsc } from 'date-fns';

import { db } from './firebaseAdmin';

export async function getAllInvoices() {
  const snapshot = await db.collection('invoices').get();

  const invoices = [];

  snapshot.forEach((doc) => {
    invoices.push({
      id: doc.id,
      ...doc.data(),
    });

    invoices.sort((a, b) => {
      if (a.paymentDue && b.paymentDue)
        return compareAsc(parseISO(a.paymentDue), parseISO(b.paymentDue));

      return -1;
    });
  });

  return invoices;
}

export async function getInvoiceById(id) {
  const doc = await db.collection('invoices').doc(id).get();

  const invoice = doc.data();

  return invoice;
}
