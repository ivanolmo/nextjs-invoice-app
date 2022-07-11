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
        showAddInvoiceForm,
        setShowAddInvoiceForm,
        showEditInvoiceForm,
        setShowEditInvoiceForm,
        clearAll,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceContext;
