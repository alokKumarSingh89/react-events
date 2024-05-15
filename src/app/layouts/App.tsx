import { Container } from "semantic-ui-react";
import EventDashboard from "../features/events/dashboard/EventDashboard";
import Navbar from "./nav/Navbar";
import { useState } from "react";

function App() {
  const [forOpen, setFormOpen] = useState(false);
  return (
    <>
      <Navbar setFormOpen={setFormOpen} />
      <Container className="main">
        <EventDashboard forOpen={forOpen} setFormOpen={setFormOpen} />
      </Container>
    </>
  );
}

export default App;
