import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import API_BASE_URL from "../config/api";

function Navbar() {
  const [count, setCount] =
    useState(0);

  const navigate =
    useNavigate();

  const token =
    localStorage.getItem("token");

  const getBookingsCount =
    async () => {
      try {
        if (!token) {
          setCount(0);
          return;
        }

        const response =
          await fetch(
            `${API_BASE_URL}/api/bookings`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const data =
          await response.json();

        setCount(data.length);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    getBookingsCount();

    const interval =
      setInterval(() => {
        getBookingsCount();
      }, 3000);

    return () =>
      clearInterval(interval);
  }, []);

  const logoutUser = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Traverix
        </h1>

        <div className="flex gap-6 items-center">

          <Link to="/">
            Home
          </Link>

          {token && (
            <Link to="/bookings">
              Bookings ({count})
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={
                logoutUser
              }
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;