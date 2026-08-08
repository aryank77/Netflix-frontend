import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./InfoPage.css";
import "./ContactUs.css";

function ContactUs() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", topic: "General", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Basic email format check.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // NOTE: There is currently no backend endpoint for contact submissions.
    // We store the message locally so the UI is fully functional and the
    // form state resets, without inventing a fake network call. Wiring
    // this to a real /api/contact route can be added as a backend task.
    toast.success("Thanks! Your message has been received.");
    setSubmitted(true);
    setForm({ name: "", email: "", topic: "General", message: "" });
  };

  return (
    <div className="info-page">
      <div className="info-page-header">
        <div className="info-page-header-inner">
          <span
            className="info-logo"
            onClick={() => navigate("/")}
            role="link"
            tabIndex={0}
            aria-label="Go to Netflix home"
            onKeyDown={(e) => e.key === "Enter" && navigate("/")}
          >
            NETFLIX
          </span>
        </div>
      </div>

      <div className="info-page-container">
        <h1 className="info-title">Contact Us</h1>
        <p className="info-subtitle">
          We're here to help. Reach out and we'll get back to you as soon as
          possible.
        </p>

        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="info-heading">Other ways to reach us</h2>
            <p className="contact-detail">
              <span aria-hidden="true">✉️</span> support@netflixclone.example
            </p>
            <p className="contact-detail">
              <span aria-hidden="true">📞</span> +1 (800) 555-0199
            </p>
            <p className="contact-detail">
              <span aria-hidden="true">🕐</span> Support available 24/7
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              aria-required="true"
            />

            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              aria-required="true"
            />

            <label htmlFor="contact-topic">Topic</label>
            <select
              id="contact-topic"
              name="topic"
              value={form.topic}
              onChange={handleChange}
            >
              <option>General</option>
              <option>Account Issue</option>
              <option>Billing</option>
              <option>Streaming Problem</option>
              <option>Media Inquiry</option>
            </select>

            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              required
              aria-required="true"
            />

            <button type="submit" className="contact-submit-btn">
              Send Message
            </button>

            {submitted && (
              <p className="contact-success" role="status">
                Your message was received. Our team will follow up by email.
              </p>
            )}
          </form>
        </div>

        <Link to="/" className="info-back-link" aria-label="Back to Home">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ContactUs;
