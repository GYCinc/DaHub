# gitEnglish™ Collaborative Tutoring Dashboard

## 1. Vision & Goal
To create a private, focused, and highly usable dashboard for a gitEnglish™ tutor to manage class content and review it collaboratively with their student. The primary goal is to provide a straightforward, shared space for preparing, approving, and archiving class materials. The UI uses a custom dark-toned palette for a professional and focused user experience, with access restricted by a simple, memorable access code.

## 2. Core User Features
- **Access Code Login:** A simple, full-screen login page that grants access to the shared dashboard. *(Note: This is currently bypassed for development.)*
- **Header Navigation:** A clean header bar containing primary navigation links for the 'Inbox' and 'Class History'. A notification badge on the 'Inbox' link shows the number of pending classes.
- **User Dropdown Menu:** A functional user menu, accessible via the student's avatar, providing access to a Settings page and a Log Out action.
- **Settings Page:** A simple, dedicated page for user settings.
- **Dynamic Summary Stats:** The dashboard features a set of summary cards that are dynamically calculated based on the application's state, providing a high-level overview of the curriculum's progress and content.
- **Class Approval Queue (Inbox):** The main inbox displays a queue of classes prepared by the tutor, awaiting final review ("approval") before being added to the permanent history. This serves as the main workspace for the tutor.
- **Class History:** This section provides a complete, shared archive of all approved classes. This allows both tutor and student to look back on previous lessons.
- **Fully Responsive Design:** The application is optimized for all screen sizes, ensuring a consistent and usable experience whether on a desktop during a lesson or on a mobile device for review.

## 3. Tech Stack & Setup
- **Framework:** React
- **Rendering:** React DOM
- **Styling:** CSS with modern layout techniques (Flexbox, Grid).
- **Dependencies:** No external UI libraries; components will be custom-built to maintain a lean footprint. Icons are inline SVGs.

## 4. Current Status & Roadmap
- **Current Status:** The application is feature-complete for its initial scope. The inbox is a functional class preparation queue, the history serves as an archive, and user actions are fully implemented.
- **Roadmap:**
  - Connect components to a backend or persistent data source.
  - Integrate Gemini API for data-driven, intelligent features.