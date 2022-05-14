import { db } from './firebaseAdmin';

export async function getAllInvoices() {
  const snapshot = await db.collection('invoices').get();

  const invoices = [];

  snapshot.forEach((doc) => {
    invoices.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return invoices;
}

export async function getInvoiceById(id) {
  let invoice;
  const snapshot = await db.collection('invoices').where('id', '==', id).get();

  snapshot.forEach((snap) => (invoice = snap.data()));

  return invoice;
}
