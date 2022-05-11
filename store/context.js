import { createContext, useState } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  return (
    <InvoiceContext.Provider value={{ showInvoiceForm, setShowInvoiceForm }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
