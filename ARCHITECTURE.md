# System Architecture

## 1. Core Components
| Component Name | Responsibility |
|---|---|
| `App.tsx` | The main application container. Manages global state for the shared dashboard, including authentication, view routing, `classesToApprove` and `approvedClasses`, acting as the single source of truth. |
| `LoginScreen.tsx` | Renders the full-page access code entry form for the shared dashboard. |
| `Header.tsx` | Renders the top bar. Contains the logo, primary navigation (Inbox, Learning Hub), notification badge, and the student's user menu. |
| `DashboardContent.tsx` | The primary workspace for the tutor, serving as the application's 'Inbox'. Displays the queue of classes to be finalized ("approved"). Calculates and displays all summary stats. Manages the review modal UI. |
| `LearningHub.tsx` | Renders the "Class History" view, which is a shared archive of all approved classes for both tutor and student. |
| `SettingsPage.tsx`| Renders the student's settings page. |

## 2. Data Models & Schemas
```json
"// Class Data Object (used for preparation and history)
{
  "id": "number (unique)",
  "week": "number", // Used for grouping in Class History
  "date": "string (e.g., '08/05/2024')",
  "title": "string",
  "primaryFocus": "string (e.g., 'Grammar', 'Practical', 'Vocabulary', 'Instructional')", // Drives the card's accent color
  "items": [
    {
      "id": "number",
      "category": "string (e.g., 'Vocabulary', 'Core Skill')",
      "content": "string"
    }
  ]
}"
```

## 3. Critical Logic Flows
**Application Load:**
1. `index.tsx` renders the `App` component.
2. `App` component's `isAuthenticated` state is initialized to `true`, bypassing the `LoginScreen`. `classesToApprove` and `approvedClasses` are initialized from mock data.
3. `App` renders the main shared layout: `Header` on top, `main` content below. `DashboardContent` (acting as the Inbox) is shown by default.

**Finalizing ("Approving") a Class:**
1. The tutor views the `ClassApprovalCard` in `DashboardContent` (the Inbox).
2. The tutor clicks "Review & Approve" and then the final "Approve Class" button in the modal, often during a session with the student.
3. `DashboardContent` calls the `onApproveClass` function passed down from `App.tsx`.
4. The `handleApproveClass` function in `App.tsx` updates the application's state:
    a. The class is removed from the `classesToApprove` (inbox) array.
    b. The class is added to the `approvedClasses` (history) array.
5. The `App` component re-renders, passing the new state down.
6. `DashboardContent` receives the new props and recalculates all summary stats. `LearningHub` also receives the updated `approvedClasses` list for the shared history. The notification badge in the `Header` is also updated.

**Logging Out:**
1. User clicks the avatar in the `Header` to open the dropdown menu.
2. User clicks the "Log Out" button.
3. The `handleLogout` function in `App.tsx` sets the `isAuthenticated` state to `false`.
4. The `LoginScreen` component is rendered.

## 4. Prompt Engineering Library
*No prompts have been defined at this stage.*

## 5. API Contracts
*No API contracts have been defined at this stage.*