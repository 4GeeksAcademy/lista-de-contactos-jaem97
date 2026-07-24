import React from "react";
import { Link } from "react-router-dom";

export const ContactCard = ({ contact, onDelete }) => {
    return (
        <div className="card mb-3 w-100">
            <div className="row g-0">
                <div className="col-md-3 d-flex justify-content-center align-items-center p-3">
                    <img
                        src="https://picsum.photos/200"
                        className="img-fluid rounded-circle"
                        alt="profile"
                        style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    />
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">{contact.name}</h5>
                        <p className="card-text text-muted mb-1">
                            <i className="fas fa-map-marker-alt me-2"></i>{contact.address}
                        </p>
                        <p className="card-text text-muted mb-1">
                            <i className="fas fa-phone me-2"></i>{contact.phone}
                        </p>
                        <p className="card-text text-muted mb-1">
                            <i className="fas fa-envelope me-2"></i>{contact.email}
                        </p>
                    </div>
                </div>
                <div className="col-md-2 d-flex justify-content-end p-3">
                    <Link to={`/edit-contact/${contact.id}`} className="btn btn-link text-dark p-0 me-4">
                        <i className="fas fa-pencil-alt"></i>
                    </Link>
                    <button className="btn btn-link text-dark p-0" onClick={() => onDelete(contact.id)}>
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};