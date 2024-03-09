import React, { useState } from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faFacebook,
    faTwitter,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container-footer">
                <div className="email-section">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="email-input"
                    />
                    <button className="subscribe-button">Subscribe</button>
                </div>
                <div className="social-icons">
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="#" className="social-icon">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
                <div className="about-section">
                    <h3>About Us</h3>
                    <p>
                        You Can Trust Us. Your Data is Safe With Us .
                        We only provide the best for you. 
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
