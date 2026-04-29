// src/pages/PackageDetails.jsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from '../config/api'

function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] =
    useState(false);

  const getSinglePackage = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/packages`);

      const data = await response.json();

      const selectedPackage = data.find(
        (item) => item.id === Number(id)
      );

      setTour(selectedPackage);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSinglePackage();
  }, [id]);

  const handleBooking = async () => {
    try {
      setBookingLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(tour)
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Booking Successful");
        navigate("/bookings");
      } else {
        alert("Booking Failed");
      }

      setBookingLoading(false);
    } catch (error) {
      console.log(error);
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Loading...
      </h1>
    );
  }

  if (!tour) {
    return (
      <h1 className="text-center mt-10 text-xl">
        Package not found
      </h1>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2 gap-8">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {tour.title}
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            {tour.days}
          </p>

          <p className="mt-4 text-3xl font-bold text-blue-600">
            ₹{tour.price}
          </p>

          <p className="mt-6 text-gray-600 leading-7">
            Enjoy an unforgettable travel
            experience with premium stay,
            sightseeing, meals and guided
            support.
          </p>

          <ul className="mt-6 space-y-2 text-gray-700">
            <li>✔ Hotel Included</li>
            <li>✔ Breakfast Included</li>
            <li>✔ Sightseeing Included</li>
            <li>✔ Free Pickup & Drop</li>
          </ul>

          <button
            onClick={handleBooking}
            disabled={bookingLoading}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {bookingLoading
              ? "Processing..."
              : "Book Now"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default PackageDetails;