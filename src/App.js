import { Routes, Route } from "react-router-dom";
import AdminPanel from "./pages/admin/AdminPanel";
import UsersList from "./pages/Users/UsersList";
import MainPage from "./pages/main/MainPage";
import PlanetsAdmin from "./pages/PlanetsAdmin/PlanetsAdmin"
import SpaceShips from "./pages/SpaceShips/SpaceShips";
import Customer from "./pages/Customer/Customer";
import Ticket from "./pages/Ticket/Ticket";
import Planets from "./pages/Planets/Planets";
import About from "./pages/About/About";
import Iletisim from "./pages/Communication/Iletisim";
import PlanetDetails from "./pages/PlanetDetails/PlanetDetails";
import Expedition from "./pages/Expedition/Expedition";
import TicketAdmin from "./pages/TicketAdmin/TicketAdmin";

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Customer />}/>
      <Route path="/*" element={<Customer />} />
      <Route path="about" element={<About />} />
      <Route path="ticket" element={<Ticket />} />
      <Route path="communication" element={<Iletisim />} />
      <Route path="planets" element={<Planets />} />
      <Route path="/planet/:id" element={<PlanetDetails />} />
      <Route path="admin/*" element={<AdminPanel />}>
        <Route path="userlist" element={<UsersList />} />
        <Route path="spaceships" element={<SpaceShips />} />
        <Route path="mainpage" element={<MainPage />} />
        <Route path="planestadmin" element={<PlanetsAdmin />} />
        <Route path="expedition" element={<Expedition />} />
        <Route path="ticketadmin" element={<TicketAdmin />} />
      </Route>
    </Routes>
  );
}