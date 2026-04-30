import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API_BASE_URL from "../config/api";

function Bookings() {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deleteLoading, setDeleteLoading] =
    useState("");

  const getBookings = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(
        "Failed to load bookings"
      );
    }
  };

  useEffect(() => {
    getBookings();

    const interval = setInterval(() => {
      getBookings();
    }, 3000);

    return () =>
      clearInterval(interval);
  }, []);

  const deleteBooking = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this booking?"
      );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(id);

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      if (data.success) {
        toast.success(
          "Booking Deleted"
        );
        getBookings();
      } else {
        toast.error(
          "Delete Failed"
        );
      }

      setDeleteLoading("");
    } catch (error) {
      console.log(error);
      setDeleteLoading("");
      toast.error(
        "Delete Failed"
      );
    }
  };

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-xl font-semibold">
        Loading...
      </h1>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          My Bookings (
          {bookings.length})
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold">
              No bookings found ✈️
            </h2>

            <p className="mt-3 text-gray-600">
              Book your first trip
              now and start your
              journey.
            </p>
          </div>
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
                  className="h-52 w-full object-cover rounded-lg"
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
                    deleteBooking(
                      item._id
                    )
                  }
                  disabled={
                    deleteLoading ===
                    item._id
                  }
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                >
                  {deleteLoading ===
                  item._id
                    ? "Deleting..."
                    : "Delete Booking"}
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