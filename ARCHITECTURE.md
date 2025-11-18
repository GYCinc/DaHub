# System Architecture

## 1. Core Components
| Component Name | Responsibility |
|---|---|
| `App.tsx` | The main application container. Manages global state, including authentication, theme, `activeView`, `classesToApprove`, and `approvedClasses`. Renders the `Header` and the main content area. |
| `LoginScreen.tsx` | Renders the full-page access code entry form for the shared dashboard. |
| `Header.tsx` | Renders the global header, including branding, primary navigation links (Inbox, Accomplishments, etc.), theme toggle, and user menu. |
| `DashboardContent.tsx` | Renders the "Inbox" view. Features a functional UI for reviewing and approving new lessons. |
| `LearningHub.tsx` | Renders the "Accomplishments" view, which is the main library of all approved classes. Features a vibrant, colorful UI with indigo and amber highlights. |
| `Playground.tsx` | Renders the "Playground" view, a sandbox for future interactive features. |
| `Statistics.tsx` | Renders the "Statistics" view for displaying analytics and metrics. |
| `SettingsPage.tsx` | Renders the "Settings" view, accessible from the user dropdown in the header. |

## 2. Data Models & Schemas
```json
"// Class Data Object (used for preparation and history)
{
  "id": "number (unique)",
  "week": "number", // Used for grouping in Accomplishments
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
**Application Load & Navigation:**
1. `index.tsx` renders the `App` component.
2. `App` component's `isAuthenticated` state is initialized to `true`, bypassing the `LoginScreen`. `activeView` is initialized to 'Inbox'.
3. `App` renders the `Header` and the main content `div`.
4. The user clicks a navigation link in the `Header` (e.g., "Accomplishments").
5. The `onNavigate` callback updates the `activeView` state in `App.tsx` to 'Accomplishments'.
6. The `App` component re-renders. The `renderContent` function now returns the `LearningHub` component, which is displayed within the main content area with a smooth transition.

**Finalizing ("Approving") a Class:**
1. The user views the `ClassApprovalCard` in `DashboardContent` ("Inbox").
2. The user clicks "Review & Approve" and then the final "Approve Class" button in the modal.
3. `DashboardContent` calls the `onApproveClass` function passed down from `App.tsx`.
4. The `handleApproveClass` function in `App.tsx` updates the application's state:
    a. The class is removed from the `classesToApprove` array.
    b. The class is added to the `approvedClasses` array.
5. The `App` component re-renders, passing the new state down.
6. `DashboardContent` shows one fewer class, and if the user navigates to `LearningHub`, it displays the newly approved class in its library.

## 4. Prompt Engineering Library
*No prompts have been defined at this stage.*

## 5. API Contracts
*No API contracts have been defined at this stage.*