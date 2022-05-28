import { createContext, useState } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [showAddInvoiceForm, setShowAddInvoiceForm] = useState(false);
  const [showEditInvoiceForm, setShowEditInvoiceForm] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const clearAll = () => {
    setShowAddInvoiceForm(false);
    setShowEditInvoiceForm(false);
    setCurrentInvoice(null);
  };

  return (
    <InvoiceContext.Provider
      value={{
        showAddInvoiceForm,
        setShowAddInvoiceForm,
        showEditInvoiceForm,
        setShowEditInvoiceForm,
        currentInvoice,
        setCurrentInvoice,
        clearAll,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
