import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Card.css";

export default function Card(props) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(props.vdata.name);
    const [email, setEmail] = useState(props.vdata.email);
    const [phone, setPhone] = useState(props.vdata.phone);
    const [deleted, setDeleted] = useState(false);
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [emailContent, setEmailContent] = useState("");

    const handleEdit = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        // Reset the form values to the original contact data
        setName(props.vdata.name);
        setEmail(props.vdata.email);
        setPhone(props.vdata.phone);
        setEditing(false);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(
                // "http://localhost:8000/api/updateData",
                "https://easy-reach-2-0-three.vercel.app/api/updateData",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: props.id,
                        email: props.vdata.email,
                        name: props.vdata.name,
                        phone: props.vdata.phone,
                        newemail: email,
                        newname: name,
                        newphone: phone,
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setEditing(false);
                } else {
                    console.error(data.error);
                }
            } else {
                console.log("Error:", response.status);
            }
        } catch (error) {
            console.error(
                "An error occurred while updating the contact:",
                error
            );
        }

        setEditing(false);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this contact?"
        );

        if (confirmDelete) {
            try {
                const response = await fetch(
                    // "http://localhost:8000/api/deleteData",
                    "https://easy-reach-2-0-three.vercel.app/api/deleteData",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: props.id,
                            email: props.vdata.email,
                            name: props.vdata.name,
                            phone: props.vdata.phone,
                        }),
                    }
                );
                const data = await response.json();

                if (data.success) {
                    console.log("deleted");
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error(
                    "An error occurred while deleting the contact:",
                    error
                );
            }
        }

        if (confirmDelete) {
            setDeleted(true);
        }
    };

    const handleSendEmail = () => {
        setShowEmailInput(true);
    };

    const handleEmailInputChange = (e) => {
        setEmailContent(e.target.value);
    };

    const handleEmailSend = () => {
        // Log the recipient's email address to verify its value
        console.log("Recipient's email:", email);
    
        // Use EmailJS to send email
        emailjs
            .send("service_hlkt8g2", "template_gitw6er", {
                to_email: email, // Ensure that the correct recipient's email is used here
                from_name: "Easy Reach",
                message: emailContent,
            }, "JX7KYDyIlNQQnj4Vj")
            .then(
                (result) => {
                    console.log("Email sent successfully!", result.text);
                },
                (error) => {
                    console.error("Failed to send email:", error.text);
                }
            );
    
        // Reset email content and hide the input box
        setEmailContent("");
        setShowEmailInput(false);
    };
    

    if (deleted) {
        return null; // Hide the card if deleted
    }

    return (
        <div
            className="card mt-3"
            style={{ width: "18rem", maxHeight: "380px" }}
        >
            <div style={{ display: "flex", height: "150px", width: "18rem" }}>
                <img
                    className="card-img-top"
                    src="https://www.vippng.com/png/detail/356-3563531_transparent-human-icon-png.png"
                    alt="Card image cap"
                />
            </div>

            <div className="card-body">
                {editing ? (
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                ) : (
                    <div>
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">Email: {email}</p>
                        <p className="card-text">Phone: {phone}</p>
                    </div>
                )}

                {showEmailInput && (
                    <div>
                        <input
                            type="text"
                            placeholder="Type your email content here"
                            value={emailContent}
                            onChange={handleEmailInputChange}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={handleEmailSend}
                        >
                            Send
                        </button>
                    </div>
                )}
            </div>

            <div className="card-footer btn-group-sm">
                {editing ? (
                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <div>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={handleEdit}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger btn-lg ml-2"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-success btn-lg ml-2"
                            onClick={handleSendEmail}
                        >
                            Send Email
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
