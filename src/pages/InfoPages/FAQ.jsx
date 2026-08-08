import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./InfoPage.css";
import "./FAQ.css";

// Real, meaningful FAQ content grouped so the accordion doesn't feel like a
// wall of text. Each item is collapsed by default, Netflix-style.
const faqData = [
  {
    question: "What is Netflix?",
    answer:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more on thousands of internet-connected devices.",
  },
  {
    question: "How much does Netflix cost?",
    answer:
      "Watch Netflix on your smartphone, tablet, smart TV, laptop or streaming device, all for one fixed monthly fee. Plans vary based on video quality and the number of devices you can watch on simultaneously.",
  },
  {
    question: "Where can I watch?",
    answer:
      "Watch anywhere, anytime, on an unlimited number of devices. Sign in with your account to watch instantly on the web from your personal computer, or on any internet-connected device.",
  },
  {
    question: "How do I cancel?",
    answer:
      "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks from your Account page at any time.",
  },
  {
    question: "What can I watch on Netflix?",
    answer:
      "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning originals and more. Watch as much as you want, anytime you want.",
  },
  {
    question: "Is Netflix good for kids?",
    answer:
      "The Netflix Kids experience is included in your membership and gives parents control while kids enjoy family-friendly TV shows and movies in their own space.",
  },
  {
    question: "I forgot my password. What do I do?",
    answer:
      "Visit the login page and click \"Forgot password\". We'll send instructions to the email address associated with your account so you can reset it securely.",
  },
  {
    question: "How do I change or update my payment method?",
    answer:
      "Go to Account, then select the payment method you'd like to update. Follow the on-screen instructions to add a new card or change your billing details.",
  },
];

function FAQ() {
  const navigate = useNavigate();
  // Track which question index is currently expanded; -1 means none open.
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleQuestion = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
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
        <h1 className="info-title">Frequently Asked Questions</h1>
        <p className="info-subtitle">
          Find answers to the most common questions about Netflix.
        </p>

        <div className="faq-list">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div className="faq-item" key={index}>
                <button
                  className="faq-question"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div
                    className="faq-answer"
                    id={`faq-answer-${index}`}
                    role="region"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="faq-contact-hint">
          Still need help?{" "}
          <Link to="/help-center" className="info-back-link">
            Visit the Help Center
          </Link>{" "}
          or{" "}
          <Link to="/contact-us" className="info-back-link">
            Contact Us
          </Link>
          .
        </p>

        <Link to="/" className="info-back-link" aria-label="Back to Home">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default FAQ;
