import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import "./HomePage.css";
import { getDocument } from 'pdfjs-dist/build/pdf';

import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function EasyReach() {
    const [contactData, setContactData] = useState([]);
    const [search, setSearch] = useState("");
    const [docid, setDocid] = useState("");
    const [newContact, setNewContact] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        fetchContactData();
    }, []);

    const fetchContactData = async () => {
        try {
            const userEmail = localStorage.getItem("userEmail");
            const response = await fetch(
                // "http://localhost:8000/api/mycurrentData",
                "https://easy-reach-2-0-three.vercel.app/api/mycurrentData",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: userEmail }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setDocid(data._id);

                if (data && data.contacts) {
                    setContactData(data.contacts);
                }
            } else {
                console.log("Error:", response.status);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleAddContact = async (e) => {
        e.preventDefault();
        let userEmail = localStorage.getItem("userEmail");

        try {
            const response = await fetch(
                // "https://mycontactbackend.onrender.com/api/addContact",
                // "http://localhost:8000/api/addContact",
                "https://easy-reach-2-0-three.vercel.app/api/addContact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...newContact,
                        useremail: userEmail,
                    }),
                }
            );

            if (response.ok) {
                fetchContactData();
                setNewContact({ name: "", email: "", phone: "" });
            } else {
                console.log("Error:", response.status);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleInputChange = (e) => {
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async (event) => {
            const pdfData = event.target.result;
            const uint8Array = new Uint8Array(pdfData);

            getDocument(uint8Array).promise.then(function(pdf) {
                let name = '';
                let email = '';
                let phone = '';

                for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                    pdf.getPage(pageNumber).then(function(page) {
                        page.getTextContent().then(function(textContent) {
                            const textItems = textContent.items.map(item => item.str).join('');

                            const nameRegex = /([A-Z][a-z]+ [A-Z][a-z]+)/;
                            const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
                            const phoneRegex = /(\+\d{2}\s\d{10})/;

                            const nameMatch = textItems.match(nameRegex);
                            const emailMatch = textItems.match(emailRegex);
                            const phoneMatch = textItems.match(phoneRegex);

                            if (nameMatch) {
                                name = nameMatch[0];
                            }
                            if (emailMatch) {
                                email = emailMatch[0];
                            }
                            if (phoneMatch) {
                                phone = phoneMatch[0];
                            }

                            // Update the state with the extracted information
                            setNewContact({
                                name: name,
                                email: email,
                                phone: phone
                            });
                        });
                    });
                }
            });
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div>
            <div id="carouselExampleFade" className="searchdiv" data-bs-ride="carousel">
                <h1>Your Contact List</h1>
                <div className="d-flex justify-content-center">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search your Contacts"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {contactData
                        .filter((contact) =>
                            contact.name.toLowerCase().startsWith(search.toLowerCase())
                        )
                        .map((x) => (
                            <div className="col-md-4" key={x.email}>
                                <Card vdata={x} id={docid} />
                            </div>
                        ))}
                </div>
            </div>

            <div style={{ paddingBottom: "20px" }}>
                <div className="container form-container card mt-3" style={{ width: "25rem", maxHeight: "380px" }}>
                    <form onSubmit={handleAddContact}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                required
                                value={newContact.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                required
                                value={newContact.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                required
                                value={newContact.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Add Contact
                        </button>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">
                                Upload PDF
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="file"
                                name="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
