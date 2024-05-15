import { Container } from "semantic-ui-react";
import Navbar from "./nav/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../features/home/HomePage";

function App() {
  const loaction = useLocation();
  return (
    <>
      {loaction.pathname == "/" ? (
        <HomePage />
      ) : (
        <>
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
