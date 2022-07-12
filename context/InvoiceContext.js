import { createContext, useState } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [showAddInvoiceForm, setShowAddInvoiceForm] = useState(false);
  const [showEditInvoiceForm, setShowEditInvoiceForm] = useState(false);

  const clearAll = () => {
    setShowAddInvoiceForm(false);
    setShowEditInvoiceForm(false);
  };

  return (
    <InvoiceContext.Provider
      value={{
        clearAll,
        showAddInvoiceForm,
        setShowAddInvoiceForm,
        showEditInvoiceForm,
        setShowEditInvoiceForm,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
