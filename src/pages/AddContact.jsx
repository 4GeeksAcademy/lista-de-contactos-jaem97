import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AddContact = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id && store.contacts) {
            const contactToEdit = store.contacts.find(c => c.id === parseInt(id));
            if (contactToEdit) {
                setFormData({
                    name: contactToEdit.name,
                    email: contactToEdit.email,
                    phone: contactToEdit.phone,
                    address: contactToEdit.address
                });
            }
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = id
            ? `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts/${id}` // Update
            : `https://playground.4geeks.com/contact/agendas/${store.agendaSlug}/contacts`;      // Create

        const method = id ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate("/");
            }
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{id ? "Edit contact" : "Add a new contact"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Save</button>
            </form>
            <div className="mt-2">
                <Link to="/">or get back to contacts</Link>
            </div>
        </div>
    );
};