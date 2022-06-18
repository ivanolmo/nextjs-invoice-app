import { createContext, useState } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [showAddInvoiceForm, setShowAddInvoiceForm] = useState(false);
  const [showEditInvoiceForm, setShowEditInvoiceForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const clearAll = () => {
    setShowAddInvoiceForm(false);
    setShowEditInvoiceForm(false);
    setShowDeleteModal(false);
    setCurrentInvoice(null);
  };

  return (
    <InvoiceContext.Provider
      value={{
        showAddInvoiceForm,
        setShowAddInvoiceForm,
        showEditInvoiceForm,
        setShowEditInvoiceForm,
        showDeleteModal,
        setShowDeleteModal,
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
