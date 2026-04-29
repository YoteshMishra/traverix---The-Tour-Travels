// Navbar.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from '../config/api'

function Navbar() {
  const [count, setCount] = useState(0);

  const getBookingsCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`)

      const data = await response.json();

      setCount(data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookingsCount();

    const interval = setInterval(() => {
      getBookingsCount();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Traverix
        </h1>

        <div className="flex gap-6 text-lg">
          <Link
            to="/"
            className="hover:text-yellow-300 transition"
          >
            Home
          </Link>

          <Link
            to="/bookings"
            className="hover:text-yellow-300 transition"
          >
            Bookings ({count})
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;