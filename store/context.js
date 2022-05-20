import { createContext, useState } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  return (
    <InvoiceContext.Provider
      value={{
        showInvoiceForm,
        setShowInvoiceForm,
        currentInvoice,
        setCurrentInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
