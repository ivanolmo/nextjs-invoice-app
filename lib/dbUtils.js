export async function getInvoices() {
  const res = await fetch(process.env.FIREBASE_URL);
  const invoices = res.json();

  return invoices;
}

export async function getInvoiceById(invoiceId) {
  const invoices = await getInvoices();
  const invoice = invoices.find((invoice) => invoice.id === invoiceId);

  return invoice;
}
