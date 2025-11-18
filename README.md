# gitEnglish™ Collaborative Tutoring Dashboard

## 1. Vision & Goal
To create a private, focused, and highly usable dashboard for a gitEnglish™ tutor to manage class content and review it collaboratively with their student. The primary goal is to provide a straightforward, shared space for preparing, approving, and archiving class materials. The application features a global header for navigation and a distinct, encapsulated main content area for focused interaction.

## 2. Core User Features
- **Access Code Login:** A simple, full-screen login page that grants access to the shared dashboard. *(Note: This is currently bypassed for development.)*
- **Header Navigation:** A persistent header provides access to all main sections: Inbox, Accomplishments, Playground, and Statistics.
- **Inbox:** The default view, serving as the user's action area. It displays a queue of classes awaiting review and approval.
- **Accomplishments:** The main library, containing a complete, shared archive of all approved classes, organized by week. This section uses a vibrant color system where "Core Skill" modules are highlighted in amber and standard modules in indigo.
- **Class Approval Workflow:** Users can review and approve classes from the "Inbox," which then moves them into the "Accomplishments" library.
- **Fully Responsive Design:** The application is optimized for all screen sizes, ensuring a consistent and usable experience whether on a desktop during a lesson or on a mobile device for review.

## 3. Tech Stack & Setup
- **Framework:** React
- **Rendering:** React DOM
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS

## 4. Current Status & Roadmap
- **Current Status:** The application features a functional multi-view layout managed by a global header. The "Inbox" acts as a working queue, and the "Accomplishments" section serves as a color-coded, vibrant archive. User approval actions are fully implemented.
- **Roadmap:**
  - Connect components to a backend or persistent data source.
  - Integrate Gemini API for data-driven, intelligent features.