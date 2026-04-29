// Bookings.jsx

import { useEffect, useState } from "react";
import API_BASE_URL from '../config/api'

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`)

      const data = await response.json();

      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();

    const interval = setInterval(() => {
      getBookings();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this booking?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `${API_BASE_URL}/api/bookings/${id}`,
        {
          method: "DELETE"
        }
      );

      getBookings();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Loading...
      </h1>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bookings ({bookings.length})
        </h1>

        {bookings.length === 0 ? (
          <p className="text-center text-lg">
            No bookings found.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-52 w-full object-cover rounded"
                />

                <h2 className="text-2xl font-bold mt-4">
                  {item.title}
                </h2>

                <p className="text-gray-600 mt-1">
                  {item.days}
                </p>

                <p className="text-blue-600 font-bold mt-2 text-xl">
                  ₹{item.price}
                </p>

                <button
                  onClick={() =>
                    deleteBooking(item._id)
                  }
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                >
                  Delete Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Bookings;