import { createContext, useState } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [showAddInvoiceForm, setShowAddInvoiceForm] = useState(false);
  const [showEditInvoiceForm, setShowEditInvoiceForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const clearAll = () => {
    setShowAddInvoiceForm(false);
    setShowEditInvoiceForm(false);
    setShowDeletePopup(false);
    setCurrentInvoice(null);
  };

  return (
    <InvoiceContext.Provider
      value={{
        showAddInvoiceForm,
        setShowAddInvoiceForm,
        showEditInvoiceForm,
        setShowEditInvoiceForm,
        showDeletePopup,
        setShowDeletePopup,
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
