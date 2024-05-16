import { Container } from "semantic-ui-react";
import Navbar from "./nav/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import ModalManager from "../common/modals/ModalManager";

function App() {
  const loaction = useLocation();
  return (
    <>
      {loaction.pathname == "/" ? (
        <HomePage />
      ) : (
        <>
          <ModalManager />
          <Navbar />
          <Container className="main">
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default App;
