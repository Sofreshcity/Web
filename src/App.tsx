import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Media from "./pages/Media";
import Barbers from "./pages/Barbers";
import Events from "./pages/Events";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Admin from "./pages/Admin";
import Resources from "./pages/Resources";
import Newsletter from "./pages/Newsletter";
import Unsubscribe from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="media" element={<Media />} />
        <Route path="barbers" element={<Barbers />} />
        <Route path="resources" element={<Resources />} />
        <Route path="events" element={<Events />} />
        <Route path="get-involved" element={<GetInvolved />} />
        <Route path="contact" element={<Contact />} />
        <Route path="newsletter" element={<Newsletter />} />
        <Route path="unsubscribe" element={<Unsubscribe />} />
        <Route path="donate" element={<Donate />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
