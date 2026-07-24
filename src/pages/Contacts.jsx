import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "../components/ContactCard";

export const Contacts = () => {
    const { store, dispatch } = useGlobalReducer();
    const [showModal, setShowModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    const fetchContacts = async () => {
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`);
      
      if (response.status === 404) {
        console.log("La agenda no existe. Creándola automáticamente...");
        await fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}`, {
          method: "POST"
        });
        fetchContacts();
        return; 
      }

      const data = await response.json();
      dispatch({ type: "set_contacts", payload: data.contacts || data });
    } catch (error) {
      console.error("Error al obtener los contactos:", error);
    }
  };

    useEffect(() => {
        fetchContacts();
    }, []);

    const confirmDelete = async () => {
        try {
            await fetch(`https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${contactToDelete}`, {
                method: "DELETE"
            });
            dispatch({ type: "delete_contact", payload: contactToDelete });
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <Link to="/add-contact" className="btn btn-success">Add new contact</Link>
            </div>
            <div className="list-group">
                {store.contacts && store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <ContactCard
                            key={contact.id}
                            contact={contact}
                            onDelete={(id) => {
                                setContactToDelete(id);
                                setShowModal(true);
                            }}
                        />
                    ))
                ) : (
                    <p className="text-center">No contacts found.</p>
                )}
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure?</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>If you delete this thing the entire universe will go down and you are going to jail!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>No</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};