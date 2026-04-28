import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PackageDetails from "./pages/PackageDetails";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/package/:id"
          element={<PackageDetails />}
        />
        <Route
          path="/bookings"
          element={<Bookings />}
        />
      </Routes>
    </>
  );
}

export default App;