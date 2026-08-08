// Central content store for the static footer/info pages.
// Keeping the text data separate from the rendering component (InfoPage.jsx)
// means every new footer page is just a new entry here instead of a new file.
const infoPagesContent = {
  "media-center": {
    title: "Media Center",
    subtitle: "News, press kits and brand assets for journalists and partners.",
    sections: [
      {
        heading: "About Netflix",
        body: [
          "Netflix is a streaming entertainment service offering a wide variety of award-winning shows, films and mobile games across a range of genres and languages.",
          "Members can watch as much as they want, whenever they want, on any internet-connected screen, without a single ad — all for one monthly price.",
        ],
      },
      {
        heading: "Press Resources",
        list: [
          "Downloadable logos and brand guidelines",
          "High-resolution show and film artwork",
          "Press releases and announcements",
          "Executive bios and headshots",
        ],
      },
      {
        heading: "Media Inquiries",
        body: [
          "For press and media inquiries, please reach out through the Contact Us page and select \"Media Inquiry\" as your topic. Our communications team typically responds within two business days.",
        ],
      },
    ],
  },

  "investor-relations": {
    title: "Investor Relations",
    subtitle: "Financial results, filings and shareholder information.",
    sections: [
      {
        heading: "Company Overview",
        body: [
          "Netflix is the world's leading streaming entertainment service, reaching members in a large number of countries and territories worldwide.",
        ],
      },
      {
        heading: "Quarterly Reports",
        list: [
          "Q1 Shareholder Letter",
          "Q2 Shareholder Letter",
          "Q3 Shareholder Letter",
          "Q4 Shareholder Letter & Annual Report",
        ],
      },
      {
        heading: "Corporate Governance",
        body: [
          "Details on our board of directors, committee charters and governance guidelines are made available to shareholders on an ongoing basis in line with regulatory requirements.",
        ],
      },
    ],
  },

  jobs: {
    title: "Jobs",
    subtitle: "Help shape the future of entertainment.",
    sections: [
      {
        heading: "Life at Netflix",
        body: [
          "We are a diverse and inclusive team that values freedom and responsibility. We hire people who are self-motivated, communicate openly, and want to do the best work of their careers.",
        ],
      },
      {
        heading: "Open Departments",
        list: [
          "Engineering & Product",
          "Content & Creative",
          "Data Science & Analytics",
          "Marketing & Communications",
          "Customer Operations",
        ],
      },
      {
        heading: "How We Hire",
        body: [
          "Our interview process focuses on real-world problem solving rather than trick questions, and we aim to give every candidate clear, timely feedback.",
        ],
      },
    ],
  },

  "ways-to-watch": {
    title: "Ways to Watch",
    subtitle: "Stream Netflix on the devices you already own.",
    sections: [
      {
        heading: "Supported Devices",
        list: [
          "Smart TVs — Samsung, LG, Sony, and more",
          "Streaming devices — Chromecast, Fire TV, Apple TV, Roku",
          "Game consoles — PlayStation and Xbox",
          "Mobile & tablets — iOS and Android",
          "Web browsers — on any computer",
        ],
      },
      {
        heading: "Download & Watch Offline",
        body: [
          "Many titles can be downloaded on the mobile app so you can keep watching when you don't have a stable connection — perfect for commutes and flights.",
        ],
      },
      {
        heading: "One Account, Many Screens",
        body: [
          "Depending on your plan, you can watch on multiple screens at the same time and switch devices whenever you like, without losing your place.",
        ],
      },
    ],
  },

  "terms-of-use": {
    title: "Terms of Use",
    subtitle: "Last updated: January 2026",
    sections: [
      {
        heading: "1. Membership",
        body: [
          "Your Netflix membership continues until it is cancelled. To use the service, you must have internet access and a compatible device. Membership fees are billed in advance on a recurring basis.",
        ],
      },
      {
        heading: "2. Use of Service",
        body: [
          "The service and any content viewed through it are for your personal, non-commercial use only and may not be shared with individuals outside your household, except as permitted by your subscription plan.",
        ],
      },
      {
        heading: "3. Passwords and Account Access",
        body: [
          "You are responsible for keeping your password confidential and for all activities that occur under your account. Please notify us immediately of any unauthorized use.",
        ],
      },
      {
        heading: "4. Cancellation",
        body: [
          "You may cancel your membership at any time, and you will continue to have access to the service through the end of your billing period.",
        ],
      },
      {
        heading: "5. Changes to Terms",
        body: [
          "We may update these terms from time to time. We will notify members of significant changes by email or through an in-app notice before they take effect.",
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy Statement",
    subtitle: "Last updated: January 2026",
    sections: [
      {
        heading: "Information We Collect",
        list: [
          "Account information such as name, email and payment details",
          "Viewing activity, including titles watched and search history",
          "Device information such as device type and operating system",
          "Usage data such as app interactions and streaming quality",
        ],
      },
      {
        heading: "How We Use Information",
        body: [
          "We use the information we collect to provide, personalize and improve our service, including recommending titles you might enjoy and troubleshooting playback issues.",
        ],
      },
      {
        heading: "Your Choices",
        body: [
          "You can review and update your account information at any time, manage cookie preferences, and request a copy or deletion of your data by contacting us.",
        ],
      },
      {
        heading: "Data Security",
        body: [
          "We use administrative, technical and physical safeguards designed to protect your personal information from unauthorized access, alteration or disclosure.",
        ],
      },
    ],
  },

  "corporate-information": {
    title: "Corporate Information",
    subtitle: "Company details and registered offices.",
    sections: [
      {
        heading: "Company",
        body: [
          "This project is a non-commercial educational clone built to demonstrate full-stack development skills using the MERN stack. It is not affiliated with, endorsed by, or connected to Netflix, Inc.",
        ],
      },
      {
        heading: "Registered Trademarks",
        body: [
          "The Netflix name, logo, and related marks are trademarks of Netflix, Inc. and are used here purely for educational and demonstrative purposes.",
        ],
      },
    ],
  },

  "legal-notices": {
    title: "Legal Notices",
    subtitle: "Copyright, trademarks and third-party licenses.",
    sections: [
      {
        heading: "Copyright Notice",
        body: [
          "All original code, design and content in this project are provided for educational purposes. Movie and TV show data, artwork and metadata are supplied by The Movie Database (TMDB) and remain the property of their respective owners.",
        ],
      },
      {
        heading: "Third-Party Licenses",
        body: [
          "This application uses a number of open-source packages, each governed by their own license terms, including React, Express, MongoDB and related tooling.",
        ],
      },
      {
        heading: "Disclaimer",
        body: [
          "This is a portfolio/demo project. It is not a real commercial streaming service, and no real payments or subscriptions are processed.",
        ],
      },
    ],
  },

  "only-on-netflix": {
    title: "Only on Netflix",
    subtitle: "Originals you won't find anywhere else.",
    sections: [
      {
        heading: "Netflix Originals",
        body: [
          "From binge-worthy dramas to award-winning documentaries, our original titles are produced exclusively for our members.",
        ],
      },
    ],
  },
};

export default infoPagesContent;
