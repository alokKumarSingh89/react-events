import { createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import EventDashboard from "../features/events/dashboard/EventDashboard";
import EventDetailPage from "../features/events/details/EventDetailPage";
import EventForm from "../features/events/form/EventForm";
import ProfilePage from "../features/profiles/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/events", element: <EventDashboard /> },
      { path: "/events/:id", element: <EventDetailPage /> },
      { path: "/manage/:id", element: <EventForm key="update" /> },
      { path: "/createEvent", element: <EventForm key="key" /> },
      { path: "/profile/:id", element: <ProfilePage /> },
    ],
  },
]);
