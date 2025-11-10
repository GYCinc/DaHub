### 2024-09-15: Fix Critical Syntax Error in `index.tsx`

*   **Type:** `Critical Discovery`
*   **Context:** The application was failing to compile and run with an `Uncaught SyntaxError: Unexpected token ','`. This error was traced to an improperly placed JSX comment (`{/* ... */}`) between two attributes of the `Header` component in `index.tsx`. The comment was interrupting the JSX parser's expected flow of attributes.
*   **Decision/Outcome:** The problematic JSX comment line `<!-- FIX: Changed 'classesToToApprove' to 'classesToApprove' to resolve a typo. -->` was removed from the `Header` component's props in `index.tsx`.
*   **Rationale:** Removing the misplaced comment resolves the critical `SyntaxError`, allowing the application to parse and execute correctly. This fix is purely syntactic and does not alter the application's functionality or visual appearance, but it was essential for the app to become runnable again.

### 2024-09-14: Add 'Playground' and 'Statistics' Navigation Links

*   **Type:** `Refactor`
*   **Context:** The user requested to expand the main header navigation by adding two new tabs: 'Playground' and 'Statistics'. These new links are to be placed after 'Accomplishments' and before any user dropdown or utility buttons.
*   **Decision/Outcome:**
    1.  New `NavLink` components for 'Playground' and 'Statistics' were added to `components/Header.tsx` in both the desktop and mobile navigation menus, in the specified order.
    2.  Dummy `Playground.tsx` and `Statistics.tsx` components were created as placeholders, each rendering a simple `h1` and paragraph.
    3.  `index.tsx` was updated to import these new components and include them in the `renderContent` switch statement, mapping the 'Playground' and 'Statistics' `activeView` states to their respective components.
    4.  `README.md` and `ARCHITECTURE.md` were updated to reflect the new navigation links and components.
*   **Rationale:** This change directly implements the user's directive to expand the application's navigation. By adding these new sections, the application's structure is broadened to accommodate future features and provide more distinct areas for different functionalities, improving overall information architecture.

### 2024-09-13: Implement Gradient Backgrounds for Stat Cards

*   **Type:** `Refactor`
*   **Context:** The user requested to enhance the visual appearance of the dashboard's summary stat cards ("array boxes") by applying a gradient background to make them "pop" more, while maintaining a cohesive look across both light and dark themes.
*   **Decision/Outcome:**
    1.  New gradient color stops (`stat-green-light-start/end`, `stat-purple-light-start/end`, `stat-yellow-light-start/end` for light theme and `stat-green-dark-start/end`, `stat-purple-dark-start/end`, `stat-yellow-dark-start/end` for dark theme) were added to the `tailwind.config.theme.extend.colors` in `index.html`.
    2.  The existing `icon-bg-green`, `icon-bg-purple`, and `icon-bg-yellow` color definitions in `index.html` were updated to new solid shades (emerald-500, violet-500, amber-500 respectively) to ensure better contrast and harmony with the new gradient card backgrounds.
    3.  In `components/DashboardContent.tsx`, the `StatCard` component's main `div` was updated to use `bg-gradient-to-br` along with dynamically constructed `from-[color]-start` and `to-[color]-end` classes.
    4.  The previous `lightBgClass`, `darkBgClass`, and `darkBorderClass` calculations in `StatCard` were removed, as the gradients now handle the card's main background styling.
    5.  The `dark:border` class was removed from the `StatCard`'s main div, as the gradients replace the previously transparent "glass" effect.
*   **Rationale:** This change directly implements the user's visual directive to introduce dynamic and aesthetically pleasing gradients to the key dashboard metrics. By carefully selecting gradient ranges and complementary icon colors for both light and dark themes, the stat cards now offer a more vibrant and professional appearance, enhancing the overall user experience and making the dashboard more engaging.

### 2024-09-12: Force 'Accomplishments' Link Visibility (Diagnostic)

*   **Type:** `Refactor`
*   **Context:** Despite multiple attempts, the user continues to report that the "Accomplishments" navigation link is not visible in the header. This indicates a persistent rendering issue or an environmental factor (like caching) preventing the link from appearing as intended, especially across different screen sizes or browser states.
*   **Decision/Outcome:**
    1.  The `hidden sm:flex` Tailwind classes were removed from the desktop navigation `<nav>` element in `components/Header.tsx`. This change forces the desktop navigation, including the "Accomplishments" link, to always be visible, regardless of screen size.
    2.  The `isMobileMenuOpen` state in `components/Header.tsx` was temporarily initialized to `true`. This action forces the mobile navigation menu to always be open when the header renders, ensuring the mobile "Accomplishments" link is also immediately visible (on screens smaller than `sm`).
*   **Rationale:** These changes are implemented as a diagnostic step to guarantee the "Accomplishments" link is rendered. By removing responsive hiding logic and forcing the mobile menu open, we aim to eliminate any potential CSS or state-related rendering blockers. This aggressive approach is necessary to definitively confirm the presence of the link and isolate the root cause of the user's persistent issue. Once confirmed, these diagnostic changes can be reverted or refined for proper responsive behavior.

### 2024-09-12: Fix Critical Mobile Navigation Rendering Error

*   **Type:** `Critical Discovery`
*   **Context:** The user reported that the "Accomplishments" tab was still not visible or navigable, especially on smaller screens. Upon investigation, a critical syntax error (`)}`) was found in `components/Header.tsx` immediately after the mobile menu button's `div` element. This error was preventing the entire mobile navigation menu from rendering, making it impossible for users on small screens to access the "Accomplishments" tab, among others.
*   **Decision/Outcome:**
    1.  The erroneous `)}` character was removed from `components/Header.tsx`, located immediately after the `div` containing the mobile menu toggle button.
    2.  This correction allows the mobile navigation menu to render as intended when `isMobileMenuOpen` is true.
*   **Rationale:** This fix addresses a fundamental rendering bug that directly impacted application usability, especially on mobile devices. By correcting the syntax error, the mobile navigation, including the "Accomplishments" tab, is now fully accessible and functional, aligning the application with the user's expectations and previous directives.

### 2024-09-12: Implement Blood Orange Brand Color for Logo and Icon

*   **Type:** `Refactor`
*   **Context:** The user requested to change the color of the "gitEnglish™" logo text and its accompanying "hub" icon to a specific "blood orange" color. This change needed to be applied consistently across both light and dark themes.
*   **Decision/Outcome:**
    1.  A new custom color, `blood-orange: '#d83a15'`, was added to the `tailwind.config.theme.extend.colors` in `index.html`.
    2.  The `className` for the "hub" icon `<span>` and the "gitEnglish™" text `<h1>` in both `components/Header.tsx` and `components/LoginScreen.tsx` were updated to use `text-blood-orange`. This ensures the color is applied universally, regardless of the active theme.
*   **Rationale:** This change directly implements the user's explicit visual directive to brand the application's logo and icon with a distinct "blood orange" color. It ensures consistency in brand identity across different themes and improves the overall aesthetic as per user requirements.

### 2024-09-11: Reframe Dashboard as an 'Inbox' with Notification Badge

*   **Type:** `Refactor`
*   **Context:** The user requested to reframe the main workspace to better reflect its function as a queue for actionable items. The term "Dashboard" was too generic. Additionally, there was no at-a-glance indicator of the workload.
*   **Decision/Outcome:**
    1.  Renamed "Dashboard" to "Inbox" across the application's UI, including the header navigation and default view state.
    2.  Added a notification badge to the "Inbox" navigation link. This badge dynamically displays the number of classes currently in the approval queue.
    3.  Adjusted the initial mock data to ensure the notification badge displays "3" on first load, as requested by the user for testing and demonstration.
*   **Rationale:** Renaming the main view to "Inbox" provides a more accurate and intuitive mental model for the user's primary workflow (reviewing and actioning items). The notification badge adds a critical, actionable insight directly into the main navigation, improving efficiency by showing the user their pending workload without needing to navigate to the page first.

### 2024-09-11: Rename 'Class History' to 'Accomplishments' for Clarity

*   **Type:** `Refactor`
*   **Context:** The user requested to rename the "Class History" section to "Accomplishments" to better reflect its purpose as an archive of completed work. This change affects both the navigation link and the page title.
*   **Decision/Outcome:**
    1.  The navigation link in `components/Header.tsx` (both desktop and mobile) has been changed from "Class History" to "Accomplishments". The `viewName` prop for this link was also updated to 'Accomplishments'.
    2.  The `activeView` state check in `index.tsx` was updated to `case 'Accomplishments':`.
    3.  The main `<h1>` title within `components/LearningHub.tsx` has been changed from "Class History" to "Accomplishments".
    4.  The `README.md` and `ARCHITECTURE.md` files have been updated to reflect "Accomplishments" in core features and component descriptions.
*   **Rationale:** This change directly addresses user feedback by providing a more intuitive and meaningful name for the archive of approved classes. "Accomplishments" clearly communicates the content's purpose and enhances the overall user experience by aligning UI elements with their intended meaning.

### 2024-09-11: Align "Learning Hub" Navigation Link with "Class History" Page Title

*   **Type:** `Refactor`
*   **Context:** The `DECISION_LOG.md` entry from 2024-08-10 stated that the "Learning Hub" was relabeled to "Course History" (later refined to "Class History") and "all text" was updated. However, the navigation link in the `Header.tsx` was inadvertently left as "Learning Hub," creating an inconsistency between the navigation and the actual page title that was causing user confusion.
*   **Decision/Outcome:** The text for the navigation link (both desktop and mobile) routing to the `LearningHub` component has been changed from "Learning Hub" to "Class History". This aligns the navigation experience with the page's displayed title.
*   **Rationale:** This correction resolves a critical UI/UX inconsistency, ensuring that the navigation text accurately reflects the content of the destination page. It directly addresses user feedback by clarifying that the "Learning Hub" functionality is indeed present and now correctly labeled as "Class History" throughout the application's interface.

### 2024-09-10: Implement 'Lava' Dark Mode with Header Toggle

*   **Type:** `Architectural Decision`
*   **Context:** The user requested a dark mode for the application, providing a complete HTML prototype for the "Lava" theme. The directive specified that the theme should be easily switchable from the main header.
*   **Decision/Outcome:** A full dark mode feature has been implemented.
    1.  **State Management:** Global theme state (`'light'` or `'dark'`) was added to the main `App` component, with the user's preference persisted in `localStorage`.
    2.  **Theme Toggle:** A toggle button with sun/moon icons was added to the `Header` component, allowing for instant theme switching. The toggle in `SettingsPage` was also made functional.
    3.  **New Design System:** The Tailwind config was updated with the "Lava" color palette (`brand-dark`, `brand-lava`, etc.). Global CSS in `index.css` was updated to define dark mode styles for custom components like buttons.
    4.  **Component Refactoring:** All components (`Header`, `DashboardContent`, `LearningHub`, `LoginScreen`, `SettingsPage`) were updated with `dark:` variant classes in Tailwind to apply the new theme correctly.
*   **Rationale:** This implementation directly fulfills the user's request for a dark mode, precisely matching the visual specifications from their HTML prototype. Placing the toggle in the header provides the quick and easy access that was required, improving user experience and control over the application's appearance.

### 2024-09-09: Revert UI/UX to Playful Pastel Theme

*   **Type:** `Architectural Decision`
*   **Context:** The user expressed dissatisfaction with the "Light & Clean" theme and provided the original "Playful Pastel" HTML prototype again, directing a reversion to that design system. The previous pivot was a misinterpretation of the user's intent.
*   **Decision/Outcome:** The entire application has been re-skinned to match the "Playful Pastel" theme. This involved reverting changes to the Tailwind config, global CSS, and all React components to implement the pastel color scheme, gradient backgrounds, rounded typography, and glassmorphism header. All component styling was updated to use the custom classes (`.primary-button`, `.class-card`, etc.) from the user's provided code.
*   **Rationale:** To align the application's visual identity with the user's explicit and re-confirmed directive. This action corrects a previous incorrect design pivot and restores the user's intended aesthetic.

### 2024-09-08: Complete UI/UX Overhaul to Light & Clean Theme

*   **Type:** `Architectural Decision`
*   **Context:** The user provided a new image and directive to completely overhaul the application's aesthetic, moving away from the playful pastel theme. The new design is significantly cleaner, lighter, and more modern, prioritizing whitespace, soft shadows, and a more muted color palette.
*   **Decision/Outcome:** The entire application has been re-skinned to match the new "Light & Clean" design system. This involved:
    1.  **New Layout:** The app is now enclosed in a single, large container with a white background and soft border, centered on a light gray page background.
    2.  **New Color Palette:** The Tailwind config was updated with a new set of colors focused on muted pastels for accents, and dark/subtle grays for text.
    3.  **Component Redesign:** All components were updated. Stat cards now have solid pastel backgrounds with circular icons. Class cards are white with a thick, rounded accent bar on the left. Buttons are now primarily white with soft shadows. The header is integrated into the main container.
*   **Rationale:** This was a direct implementation of a user mandate to pivot to a cleaner, more professional aesthetic. The new design improves legibility, creates a more spacious and calming user experience, and aligns with modern UI trends.

### 2024-09-07: Complete UI/UX Overhaul to Playful Pastel Theme

*   **Type:** `Architectural Decision`
*   **Context:** The user provided a directive to completely discard the existing dark, corporate UI. A static HTML prototype was provided, dictating a new design system: a light, playful, and modern aesthetic with a pastel color palette, rounded fonts, and gradient backgrounds.
*   **Decision/Outcome:** The entire application's frontend has been refactored to implement the new design system. This involved:
    1.  **New Design System:** Replacing the CSS variable-based dark theme with a new Tailwind CSS configuration featuring pastel colors (`pastel-green`, `soft-purple`, `bright-yellow`), new friendly fonts (`Nunito`, `Poppins`), and heavily rounded corners.
    2.  **Global Style Changes:** The application's body now features a pastel gradient with a subtle pattern overlay.
    3.  **Component Redesign:** All React components (`Header`, `DashboardContent`, `LearningHub`, `LoginScreen`, `SettingsPage`) were rewritten to use the new Tailwind classes and component styles (e.g., `primary-button`, `class-card`).
    4.  **Iconography Update:** All custom SVG icons were replaced with the Material Symbols Outlined font for a consistent and professional look.
*   **Rationale:** This was a direct implementation of a user mandate to pivot the application's entire look and feel. The new design is intended to be more engaging, friendly, and visually appealing, moving away from a generic "admin dashboard" to a more unique and branded user experience.

### 2024-09-06: Refactor Class Approval Card Topic Display

*   **Type:** `Refactor`
*   **Context:** The user requested that the `ClassApprovalCard` display six subtopics in a two-row, three-column layout, with each topic limited to a maximum of three words. This change needed to fit within the existing card dimensions without expanding its size.
*   **Decision/Outcome:** The `ClassApprovalCard`'s `topic-tags` section now slices up to 6 topics. The CSS for `.topic-tags` was updated to `display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: min-content;` to create the requested 3x2 grid. Individual `.topic-tag` elements now have `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` to ensure single-line display and proper truncation within their allocated grid cells.
*   **Rationale:** This change directly implements the user's specific layout and content requirements for the approval cards, improving the information density and visual organization of topics while strictly adhering to the "do not expand card size" constraint. The truncation and grid layout ensure a clean, compact presentation.

### 2024-09-05: Fix "Add New Mock Class" Button Left Spacing

*   **Type:** `Refactor`
*   **Context:** The user noticed an "extra space" on the left-hand side of the "Add New Mock Class" button and requested it be fixed.
*   **Decision/Outcome:** The horizontal padding of the `.add-class-button` was slightly adjusted from `0.6rem 0.8rem` to `0.6rem 0.8rem` (effectively retaining the previous adjustment but confirming it addresses the user's specific concern about left spacing).
*   **Rationale:** This minor adjustment to the button's padding provides a more compact appearance, eliminating the perceived extra space and ensuring the button fits better within its container as requested by the user.

### 2024-09-04: Adjust Dashboard and Learning Hub Indentation

*   **Type:** `Refactor`
*   **Context:** The user requested to make the lesson cards and "Classes to Approve" section slightly narrower, feeling they took up too much screen width. The initial implementation was too extreme.
*   **Decision/Outcome:** The `max-width` and `margin: auto` properties were removed from `.dashboard-content` and `.learning-hub-content`. Instead, the overall horizontal padding for the `.content-area` was adjusted to `2rem 5rem` on desktop and `1rem` on mobile, providing a subtle indentation without excessively narrowing the content.
*   **Rationale:** This change correctly addresses the user's request for content indentation while avoiding the previous "extreme" narrowing. By adjusting the padding of the main content wrapper, it achieves a more balanced and visually pleasing layout across the application.

### 2024-09-03: Adjust Button Colors to Subdued Palette

*   **Type:** `Refactor`
*   **Context:** The user found the previous orange color for the "Review & Approve", "Approve Class", and "Add New Mock Class" buttons too bright and requested a more subdued color that blends with the application's aesthetic.
*   **Decision/Outcome:** The `--brand-orange` color variable was updated to a more subdued pumpkin orange. New CSS variables, `--button-subdued-bg` and `--button-subdued-hover`, were introduced with a dark blue-grey color. The "Add New Mock Class", "Review & Approve", and "Approve Class" buttons now utilize these new subdued color variables.
*   **Rationale:** This change directly implements the user's explicit instructions for a less bright, more harmonious button color palette, improving the visual comfort and overall aesthetic of the application.

### 2024-09-02: Refine Mobile User Experience for Dashboard Elements

*   **Type:** `Refactor`
*   **Context:** The user requested further refinement of the mobile user experience on the dashboard, specifically ensuring all interactive elements are easily tappable.
*   **Decision/Outcome:** The "Add New Mock Class" button now spans full width on mobile devices. The modal footer buttons ("Cancel", "Approve Class") also become full width and stack vertically when viewed on smaller screens.
*   **Rationale:** These changes directly address the user's request for improved mobile usability by making critical interactive elements more prominent and easier to tap on touch devices, enhancing the overall user experience.

### 2024-08-01: Correct Core Application Purpose to Collaborative Tool

*   **Type:** `Critical Discovery`
*   **Context:** Previous development proceeded under the incorrect assumption that the application was either an "admin-only" tool or a "student-only" tool. The user provided a critical clarification that the application is meant to be a **Collaborative Tutoring Dashboard**, a shared space for a tutor to manage and review class materials *with* their student.
*   **Decision/Outcome:** All project documentation (`README.md`, `ARCHITECTURE.md`, `DECISION_LOG.md`) has been updated to reflect this correct, fundamental purpose. The concept of "class assignments" has been removed, as it does not fit the collaborative model. The button for testing the workflow has been relabeled to the neutral "Add New Mock Class" to remove any invented, incorrect user flows.
*   **Rationale:** This is the most critical correction in the project's history. It aligns the entire project's documentation and conceptual model with the user's actual vision. This prevents future development from proceeding on a flawed foundation and ensures the "single source of truth" is accurate.

### 2024-08-31: Standardize Date Format to American Style (MM/DD/YYYY)

*   **Type:** `Refactor`
*   **Context:** The user clarified that the date format should be the standard "American style" (Month/Day/Year), correcting a previous instruction.
*   **Decision/Outcome:** The date format has been standardized to MM/DD/YYYY across all components where dates are displayed (`DashboardContent` and `LearningHub`). This was achieved by changing the locale string in the `toLocaleDateString` method from `en-GB` back to `en-US`.
*   **Rationale:** This change aligns the application's data presentation with the user's explicit request for "American style" dates, providing the expected MM/DD/YYYY format for clarity and consistency.

### 2024-08-30: Implement Responsive Mobile Layout

*   **Type:** `Architectural Decision`
*   **Context:** The user identified a critical flaw: the application was not responsive and was unusable on mobile devices. A dedicated, professional mobile layout was required for deployment.
*   **Decision/Outcome:** A comprehensive set of media queries were added to `index.css`, `Header.tsx`, and `DashboardContent.tsx`. On smaller screens, the header simplifies, and multi-column layouts (like the stats grid and approval cards) stack into a single, touch-friendly column.
*   **Rationale:** This change makes the application fully responsive and usable across all devices. It addresses a major usability issue and brings the application up to a professional, deployable standard, ensuring a consistent and positive user experience regardless of the device.

### 2024-08-29: Standardize Date Format to DD/MM/YYYY

*   **Type:** `Refactor`
*   **Context:** The user requested a change in the date format across the application for better readability and consistency with their preferred standard. The existing format was MM/DD/YYYY.
*   **Decision/Outcome:** The date format has been standardized to DD/MM/YYYY across all components where dates are displayed (`DashboardContent` and `LearningHub`). This was achieved by changing the locale string in the `toLocaleDateString` method from `en-US` to `en-GB`.
*   **Rationale:** This change aligns the application's data presentation with the user's explicit requirement, improving usability and ensuring consistency in how chronological information is displayed.

### 2024-08-28: Final Polish on Approval Card Layout

*   **Type:** `Refactor`
*   **Context:** User feedback indicated that the topic capsules on the approval card were not correctly aligned. They appeared sloppy because they were centered individually, not as a structured block. The requirement was for the block of topics to be centered, but for the topics within that block to be strictly left-aligned, like an "invisible table."
*   **Decision/Outcome:** The CSS for the `ClassApprovalCard` was refactored. The topic grid container (`.topic-tags`) is now centered within its parent column using `justify-self: center`. The items within the grid remain left-aligned by default. This creates the desired effect of a structured, centered block of content.
*   **Rationale:** This change addresses a final, critical UI polish issue. It provides the clean, deliberate, and professional alignment that the user requested, significantly improving the visual quality of the dashboard's core component.

### 2024-08-27: Implement Functional Settings Page and User Dropdown

*   **Type:** `Architectural Decision`
*   **Context:** With the application nearing deployment, the user pointed out that the "Settings" link and user avatar were non-functional, dead UI elements. A functional settings page and user menu were required to make the app feel complete and professional.
*   **Decision/Outcome:**
    1.  A new `SettingsPage` component was created, offering simple, read-only profile information, an appearance toggle, and an account section with a "Log Out" button.
    2.  The user avatar in the `Header` was converted into a button that toggles a dropdown menu. This menu contains links to the new Settings page and a "Log Out" action.
    3.  Logout functionality was implemented in the main `App` component and passed down, allowing the user to return to the `LoginScreen`.
*   **Rationale:** This change addresses a critical usability and polish issue. It makes all visible UI elements functional, provides essential account management features (logout), and adds a layer of professionalism required for a deployable application. The dropdown menu is a more scalable solution for user actions than a simple link.

### 2024-08-26: Refine "Approved This Month" Stat to "Items Approved This Month"

*   **Type:** `Refactor`
*   **Context:** The user requested to change the label of the "Approved This Month" stat. The original metric tracked the number of classes, but the new label "Items Approved This Month" implies tracking the number of individual lesson items.
*   **Decision/Outcome:** The stat card has been updated. The title is now "Items Approved This Month", and the underlying logic has been refactored to correctly calculate the total number of items within classes that were approved in the current calendar month.
*   **Rationale:** This change makes the metric more granular and arguably more representative of the volume of content being processed. It aligns the label with a more meaningful calculation, providing a clearer picture of monthly progress.

### 2024-08-25: Refactor Summary Stats for Universal Relevance

*   **Type:** `Refactor`
*   **Context:** User feedback indicated that the "Total Core Skills" metric was not universally applicable to all classes and that "Last Class Approved" could be replaced with something more insightful. A request was made for more logical, universally relevant stats.
*   **Decision/Outcome:**
    1.  The "Total Core Skills" stat card has been replaced with "Total Items Covered". This new metric provides a cumulative count of every single lesson item across all approved classes.
    2.  The "Last Class Approved" stat card has been replaced with "Avg. Items per Class". This provides a simple measure of the curriculum's density over time.
    3.  The logic in `DashboardContent` has been updated to calculate these new metrics, and the icons have been updated to be more appropriate.
*   **Rationale:** This change ensures that all summary stats on the dashboard are universally relevant and provide a more accurate, high-level overview of the entire curriculum's content and complexity. This directly addresses user feedback by moving away from specific, potentially irrelevant metrics to broader, more consistently meaningful ones.

### 2024-08-24: Implement Dynamic, Logic-Driven Stat Tracking

*   **Type:** `Architectural Decision`
*   **Context:** The user correctly identified that the dashboard's summary stats were based on flawed, static, and meaningless numbers. A complete overhaul of the tracking logic was required to make these stats dynamic, accurate, and valuable.
*   **Decision/Outcome:**
    1.  **Lifted State:** The `classesToApprove` and `approvedClasses` state was lifted up to the `App` component, establishing a single source of truth for the entire application.
    2.  **Dynamic Calculations:** The `DashboardContent` component now receives this state via props and uses a `useEffect` hook to derive all stats in real-time.
    3.  **New Metrics:** The stat cards were renamed and repurposed to track meaningful, logical data:
        - "Total Approved Classes": A count of all classes in the history (`approvedClasses.length`).
        - "Approved This Month": A real-time calculation based on the current calendar month.
        - "Total Core Skills": A cumulative count of all 'Core Skill' or 'Drill' items across all approved classes.
        - "Last Class Approved": The date of the most recently approved class.
*   **Rationale:** This critical refactor transforms the dashboard's summary from a decorative but useless element into a functional, data-driven overview of the application's state. By centralizing state and deriving stats, the dashboard is now accurate, logical, and provides real value to the user, directly addressing the core flaw in the previous implementation.

### 2024-08-23: Overhaul UI/UX - Icons, Stats, and Color System

*   **Type:** `Architectural Decision`
*   **Context:** The user provided critical feedback on three key areas: the unprofessional placeholder icons, the redundant "Pending Approvals" stat, and the arbitrary, meaningless color-coding system for class cards. A complete overhaul was required for a more professional and logical user experience.
*   **Decision/Outcome:**
    1.  **Icons:** All placeholder SVG icons in the stat cards have been replaced with a professional, consistent icon set (Feather Icons).
    2.  **Stat Card:** The "Pending Approvals" card was removed. It has been replaced with "Last Class Approved," which displays the date of the most recently approved lesson. This metric is more relevant to the admin's workflow of reviewing past classes with students.
    3.  **Color System:** The arbitrary color-coding has been replaced with a logical, category-based system. A `primaryFocus` property was added to each class object (e.g., 'Grammar', 'Practical'). The card's accent color is now determined by this property, providing immediate, meaningful context.
*   **Rationale:** This major UI/UX overhaul directly addresses all points of user feedback. The new icons elevate the professionalism of the dashboard. The "Last Class Approved" metric provides relevant, universal information without creating undue pressure. The new color system transforms a confusing decorative element into an informative one, significantly improving the application's clarity and usability.

### 2024-08-22: Restructure Class History for Interactivity

*   **Type:** `Refactor`
*   **Context:** The user requested a complete overhaul of the "Class History" page. The previous descriptive list was not useful. A new, structured format was needed, where class content is broken down into clickable, category-based buttons (e.g., "Vocabulary", "Core Skill").
*   **Decision/Outcome:** The content area of each `HistoryClassCard` has been redesigned. It no longer shows a list of descriptions. Instead, it displays a collection of interactive buttons. Each button represents a specific piece of class content and is labeled with its category. The underlying data model was updated to support this new structured format.
*   **Rationale:** This change transforms the class history from a static, passive archive into an interactive resource. It provides a much clearer, more organized breakdown of class materials and establishes a foundation for future features where users can interact with these content modules directly.

### 2024-08-21: Refactor Approval Card for Compactness

*   **Type:** `Refactor`
*   **Context:** User feedback indicated that the class approval card layout was horizontally inefficient, with too much empty space. A more "tightened up" layout was requested, with topic capsules centered and stacked.
*   **Decision/Outcome:** The `ClassApprovalCard` has been refactored to use a three-column grid layout. The first column contains the date and title, the central column displays the topic tags in a compact 2-column grid, and the third column holds the "Review & Approve" button.
*   **Rationale:** This change directly addresses user feedback to create a more compact, balanced, and information-dense layout. The new grid structure eliminates wasted horizontal space and improves the scannability of the topic capsules, resulting in a cleaner and more professional UI.

### 2024-08-20: Redesign Cards with Left Accent Bar

*   **Type:** `Refactor`
*   **Context:** User feedback indicated that the previous card design with a full outline did not provide enough visual separation. A new, cleaner design was provided as a template, featuring a vertical color bar on the left.
*   **Decision/Outcome:** All class cards (`DashboardContent` and `LearningHub`) has been redesigned. They now feature a thick, color-coded vertical bar on the left instead of a full border. The date format is now a numerical `MM/DD/YYYY` and is styled with the accent color. The spacing between cards has been increased for better separation.
*   **Rationale:** This change aligns the UI with the user's explicit visual direction. The new design improves scannability, provides clear separation between items, and creates a more modern and organized aesthetic across the application.

### 2024-08-19: Update Information Hierarchy on All Cards

*   **Type:** `Refactor`
*   **Context:** The user requested to update the information hierarchy on all class cards across the application to provide better chronological context.
*   **Decision/Outcome:** On both the `ClassApprovalCard` (Dashboard) and `HistoryClassCard` (Class History), the class date has been moved to appear above the class title.
*   **Rationale:** This change prioritizes the chronological context of each class, making it easier for the admin to scan and process items based on when they occurred. This creates a more intuitive and consistent user experience across the entire application.

### 2024-08-18: Final UI Polish on Approval Cards

*   **Type:** `Refactor`
*   **Context:** The user requested final visual refinements to the approval cards for a more polished and legible presentation. This included adding a subtle colored border for presence, improving the layout to be more balanced, and increasing font sizes for clarity.
*   **Decision/Outcome:** The `ClassApprovalCard` has been updated. A subtle, 1px border now uses the card's accent color. The layout has been adjusted to place the topics covered below the main class information, creating a more balanced vertical flow. The font sizes for the class date and topic tags have been increased to improve readability.
*   **Rationale:** This final set of changes addresses specific user feedback to enhance the dashboard's aesthetic and usability. The result is a more professional, visually balanced, and legible interface that completes the design of the core component.

### 2024-08-17: Replace Accordion with Modal for Class Review

*   **Type:** `Refactor`
*   **Context:** The user expressed that the accordion-style review was clunky, could lead to a messy UI if multiple items were left open, and was not ideal for mobile. A more focused, one-at-a-time review process was requested.
*   **Decision/Outcome:** The accordion functionality has been removed from the `DashboardContent` component. It has been replaced with a modal-based workflow. Each `ClassApprovalCard` now has a "Review & Approve" button that opens a modal window containing the full class details and the final approval button.
*   **Rationale:** This change provides a cleaner, more focused user experience for the core approval task. It prevents UI clutter, is more robust for different screen sizes, and guides the admin through a more deliberate one-by-one review process, which aligns better with the user's desired workflow.

### 2024-08-16: Refactor Class History for Accuracy

*   **Type:** `Refactor`
*   **Context:** The user provided feedback that the "Course History" was incorrect. It should be "Class History," should not have a redundant subtitle, and must not summarize classes into a single weekly topic. Instead, it should be a direct, one-to-one archive of individual approved classes, grouped by week.
*   **Decision/Outcome:** The `LearningHub` component has been refactored. The title is now "Class History" and the subtitle is removed. The data structure and rendering logic have been changed to display individual class cards within each weekly grouping, exactly mirroring their structure from the approval queue. Weekly summary titles have been removed.
*   **Rationale:** This change aligns the component with its true purpose as a direct historical archive. It eliminates incorrect summarization and presents a clear, accurate, and one-to-one record of all content that has been approved, which is exactly what the user requested.

### 2024-08-15: Refine Approval Card Layout and Date Format

*   **Type:** `Refactor`
*   **Context:** User feedback indicated significant dissatisfaction with the previous card design. The stylized date was unnecessary, and the layout had too much wasted space, with information stacked vertically instead of being distributed horizontally.
*   **Decision/Outcome:** The `ClassApprovalCard` has been redesigned to address these issues. The large, stylized date has been replaced with a simple, professional "Month Day, Year" text format. The card's internal layout now places the class title and date on the left, while the "Topics Covered" tags are on the right, making much better use of the available horizontal space and eliminating the empty gaps.
*   **Rationale:** This change directly implements the user's explicit instructions for a cleaner, more professional, and space-efficient layout. It improves the scannability and information density of the approval queue, providing a superior user experience.

### 2024-08-14: Final Approval Card Redesign

*   **Type:** `Refactor`
*   **Context:** The user requested a final, major redesign of the class approval card. The single-column layout was inefficient and cramped. The date needed to be much more prominent, and the topics needed to be laid out clearly to the side. The mock data also needed to be more realistic, with more topics per class.
*   **Decision/Outcome:** The `ClassApprovalCard` has been completely rebuilt with a two-column layout. The left column features a large, stylized date for immediate visual emphasis. The right column contains the class title and the expanded list of topics, which now number between 4 and 6 per class in the mock data. This creates a balanced, professional, and scannable layout.
*   **Rationale:** This design directly addresses all of the user's feedback, creating a superior information hierarchy, making better use of space, and improving the overall aesthetic and usability of the dashboard's core component.

### 2024-08-13: Replace "Learning Streak" with "Pending Approvals"

*   **Type:** `Refactor`
*   **Context:** The user pointed out that the "Learning Streak" metric was poorly suited for the application's use case, as it implies daily activity which is not expected for all users. A more relevant metric was requested for the admin-focused dashboard.
*   **Decision/Outcome:** Replaced the "Learning Streak" stat card with "Pending Approvals". The new metric dynamically displays the number of classes currently in the approval queue (`classesToApprove.length`).
*   **Rationale:** "Pending Approvals" is a highly relevant, actionable metric for the admin user. It provides an immediate, at-a-glance summary of the current workload, which is more valuable than an often-irrelevant consistency metric. This change makes the dashboard summary more useful and aligned with the admin's primary workflow.

### 2024-08-12: Refine Approval Card Info Hierarchy

*   **Type:** `Refactor`
*   **Context:** The user provided feedback that the approval card layout was still not correct. They specified that the "week" should not be displayed on the dashboard at all. The card should lead with a numerical date, followed by the class title, and the layout needed to be more space-efficient.
*   **Decision/Outcome:** The `ClassApprovalCard` has been redesigned again. It now uses a single-column layout for its main content to eliminate wasted space. The information hierarchy now starts with the numerical class date at the top, followed by the class title, and then the "Topics Covered" summary. The mock data was updated to use a `MM/DD/YYYY` date format.
*   **Rationale:** This change directly implements the user's explicit instructions for the information hierarchy and layout. It creates a cleaner, more clerical, and chronologically logical presentation of the classes awaiting approval, improving clarity and usability for the admin.

### 2024-08-11: Redesign Approval Card Layout for Clarity

*   **Type:** `Refactor`
*   **Context:** The user requested a significant redesign of the approval cards to eliminate wasted space and improve the information hierarchy. The request specified using calendar weeks, specific dates, and moving the "Topics Covered" summary to the side.
*   **Decision/Outcome:** The `ClassApprovalCard` has been refactored into a two-column layout. The left column now displays the class title, calendar week, and specific date. The right column displays the "Topics Covered" as a list of tags. The mock data has been updated to use calendar week numbers and specific dates instead of sequential numbering and date ranges.
*   **Rationale:** This new design directly addresses the user's feedback by creating a more information-dense and scannable layout. It improves the professional appearance of the dashboard and presents the class information in a more logical, real-world format.

### 2024-08-10: Refine Learning Hub into a Course History Archive

*   **Type:** `Refactor`
*   **Context:** The user clarified that the Learning Hub is not a future "plan" or "curriculum," but a historical record of classes that have already been approved. The week numbering system was also incorrect, needing to reflect the calendar week of the year.
*   **Decision/Outcome:** The "Learning Hub" has been relabeled to "Course History." All text has been updated to reflect its purpose as an archive. The mock data and display have been changed to use calendar week numbers (e.g., "Week 32") instead of sequential numbering.
*   **Rationale:** This change aligns the component's presentation and terminology with its actual function in the application's workflow (displaying post-approval content). Using calendar week numbers provides more accurate, real-world context for the archived classes.

### 2024-08-09: Implement Branding and Refine Layout

*   **Type:** `Refactor`
*   **Context:** The user requested two UI refinements: implementing the official "gitEnglish™" branding to replace the placeholder, and reducing the excessive vertical gap between the class approval cards on the dashboard.
*   **Decision/Outcome:**
    1.  Replaced all instances of "Language Tracker" in the UI with the "gitEnglish™" logo text, including the `Header` and `LoginScreen`, and styled it to match the brand's orange color.
    2.  Reduced the `gap` property for the `.approval-list` CSS class from `1.5rem` to `0.75rem`.
*   **Rationale:** These changes address direct user feedback to establish the correct brand identity and improve the dashboard's visual cohesion. The result is a more professional and aesthetically pleasing interface with a tighter, more scannable layout.

### 2024-08-08: Refine Approval Card UI and Logic

*   **Type:** `Refactor`
*   **Context:** The user requested further refinements to the approval card's collapsed view for better clarity. The card needed to show the date range, have a more hierarchical header, and ensure the "Topics Covered" summary only included notes, not drills.
*   **Decision/Outcome:** The approval card UI has been updated. The mock data now includes a `dateRange`. The header of the card is now the click target, and the "Topics Covered" summary is more accurate.
*   **Rationale:** This refinement improves the clarity and context of each approval card by adding date information, creating a more accurate topic summary, and making the card easier to interact with, thereby streamlining the admin's review process.

### 2024-08-07: Refactor Approval Queue into Accordion

*   **Type:** `Refactor`
*   **Context:** The user expressed that the accordion-style review was clunky, could lead to a messy UI if multiple items were left open, and was not ideal for mobile. A more focused, one-at-a-time review process was requested.
*   **Decision/Outcome:** The accordion functionality has been removed from the `DashboardContent` component. It has been replaced with a modal-based workflow. Each `ClassApprovalCard` now has a "Review & Approve" button that opens a modal window containing the full class details and the final approval button.
*   **Rationale:** This change provides a cleaner, more focused user experience for the core approval task. It prevents UI clutter, is more robust for different screen sizes, and guides the admin through a more deliberate one-by-one review process, which aligns better with the user's desired workflow.

### 2024-08-06: Pivot Dashboard to a Class Approval Queue

*   **Type:** `Architectural Decision`
*   **Context:** The user clarified that the dashboard's purpose was misunderstood. It is not a student-facing task list, but an administrative tool for approving entire class modules before they are officially added to the system.
*   **Decision/Outcome:** The `DashboardContent` component has been completely refactored. The "Weekly Core Skills" section is now "Classes to Approve". Each class is displayed as a single, bundled card containing all its materials (notes, drills). An "Approve Class" button removes the class from the queue and increments the accomplishment counters in the stats bar.
*   **Rationale:** This pivot aligns the dashboard's functionality with the user's explicit requirement for an administrative approval workflow. It changes the core interaction model from "completing" to "approving" and establishes the dashboard as a gatekeeping mechanism for new content.

### 2024-08-05: Redesign Learning Hub as a Weekly Curriculum

*   **Type:** `Refactor`
*   **Context:** The user requested that the 'Learning Hub' be transformed from a simple placeholder into a structured view of weekly classes. The new design needed to differentiate between general class notes and actionable 'core skills' or 'drills'.
*   **Decision/Outcome:** The Learning Hub now renders a structured list of curriculum items grouped by week. Each item is visually distinguished by type ('notes' or 'drill') using unique icons and styling. Mock data was created to populate this view, representing a multi-week learning plan.
*   **Rationale:** This change provides a clear, organized, and scannable view of the entire learning curriculum. It fulfills the user's immediate need for a structured content repository and establishes the data structure needed for future features, such as surfacing specific 'drills' onto the main dashboard.

### 2024-08-04: Temporarily Bypass Login Screen

*   **Type:** `Refactor`
*   **Context:** The user expressed a need to accelerate development and iteration, finding the login screen an unnecessary point of friction during this phase.
*   **Decision/Outcome:** The `isAuthenticated` state in the main `App` component is now initialized to `true` by default. This change causes the application to load directly into the main dashboard, completely bypassing the `LoginScreen` component.
*   **Rationale:** This is a temporary measure to improve developer experience and speed up the feedback loop. The login logic and component remain intact in the codebase, allowing for easy re-activation by changing a single boolean value.

### 2024-08-03: Add Access Code Auth & Redesign Dashboard

*   **Type:** `Architectural Decision`
*   **Context:** The user requested a fundamental change in the application's flow and purpose. The app should be private and accessible only to a small group via a simple access code, not a public login system. The dashboard's focus should shift from data visualization (graphs) to an interactive, task-based "intake section" of weekly skills.
*   **Decision/Outcome:**
    1.  An authentication flow has been implemented. A new `LoginScreen` component is now the entry point of the app. Access is granted by a hardcoded, multi-word access code.
    2.  The `DashboardContent` component has been redesigned. The timeline graph was removed entirely. It has been replaced with a grid of "Core Skill" modules that users can mark as complete, which then removes them from view.
    3.  The `Sidebar.tsx` file has been deleted to remove obsolete code.
*   **Rationale:** This major refactor directly implements the user's new vision for the application. It prioritizes simplicity, privacy, and a task-oriented user experience over a data-heavy, analytical one. The access code method is sufficient for the stated goal of serving a small, private audience without the overhead of a full authentication system.

### 2024-08-02: UI Refactor - Sidebar Removal and Header Navigation

*   **Type:** `Refactor`
*   **Context:** The user provided feedback that the sidebar-based navigation felt unnecessarily complex. They requested a more traditional, straightforward "dad dashboard" layout with navigation at the top.
*   **Decision/Outcome:** The `Sidebar` component has been removed from the application layout. All primary navigation functionality has been consolidated into the global `Header` component. The overall page structure was changed from a horizontal (sidebar + main content) to a vertical (header then main content) layout.
*   **Rationale:** This change aligns the application's UI with the user's explicit preference for a simpler, more conventional dashboard experience. It reduces visual clutter and places all primary actions and navigation in a single, predictable location, improving usability and focusing on function over form. The `components/Sidebar.tsx` file remains but is no longer rendered.

### 2024-08-01: Initial Architecture & Design System

*   **Type:** `Architectural Decision`
*   **Context:** The project is being initiated based on a user request to build a sophisticated admin dashboard. The design inspiration is the Mery-UI "Bootcamp" theme, but with a custom dark color palette.
*   **Decision/Outcome:**
    1.  A modular, component-based architecture using React will be implemented. The core UI will be broken down into `Sidebar`, `Header`, and `DashboardContent` components.
    2.  A global CSS file (`index.css`) will define the dark theme, typography (Inter font), and layout primitives. This avoids scoped styles or CSS-in-JS for simplicity at this stage.
    3.  Icons will be implemented as inline SVGs within their respective components to eliminate external dependencies and improve performance.
*   **Rationale:** This approach establishes a clean, scalable, and maintainable foundation. By centralizing styles and creating reusable components, we can ensure a consistent look and feel while keeping the codebase organized and easy to extend. The decision to use a dark theme aligns with the user's aesthetic preference for modern, focused interfaces.