import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <Header />

      {/* Contact Banner */}
      <div className="banner-area" style={{ backgroundImage: "url('assets/img/bg/contact-banner.jpg')" }}>
        <div className="container">
          <div className="banner-content">
            <h2>Contact Us</h2>
            <p>Get in touch with us for any queries or support.</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-area s-py-100">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-form">
              <h3>Send Us a Message</h3>
              <form>
                <div className="single-input">
                  <label>Name</label>
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="single-input">
                  <label>Email</label>
                  <input type="email" placeholder="Your Email" required />
                </div>
                <div className="single-input">
                  <label>Message</label>
                  <textarea placeholder="Your Message" rows="4" required></textarea>
                </div>
                <button type="submit" className="btn btn-theme">Send Message</button>
              </form>
            </div>

            <div className="contact-info">
              <h3>Contact Information</h3>
              <ul>
                <li>
                  <span className="iconify" data-icon="mdi:map-marker"></span>
                  123 NFT Mart Street, Web3 City
                </li>
                <li>
                  <span className="iconify" data-icon="mdi:email"></span>
                  support@nftmart.com
                </li>
                <li>
                  <span className="iconify" data-icon="mdi:phone"></span>
                  +1 234 567 8900
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactPage;
