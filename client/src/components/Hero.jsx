import { useState } from "react";

function Hero({ onSearch }) {
  const [destination, setDestination] =
    useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");

  const handleSubmit = () => {
    onSearch({
      destination,
      date,
      guests
    });
  };

  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')] bg-cover bg-center min-h-[90vh] flex items-center justify-center text-white px-4">

      <div className="bg-black/55 p-6 md:p-8 rounded-2xl text-center w-full max-w-5xl">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Explore The World
        </h1>

        <p className="mt-4 text-base md:text-lg">
          Book your dream destination at best prices
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
            className="p-3 rounded-lg border border-white/70 bg-white/10 text-white placeholder-white outline-none"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="p-3 rounded-lg border border-white/70 bg-white/10 text-white outline-none"
          />

          <input
            type="number"
            placeholder="Guests"
            value={guests}
            onChange={(e) =>
              setGuests(e.target.value)
            }
            className="p-3 rounded-lg border border-white/70 bg-white/10 text-white placeholder-white outline-none"
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-bold"
          >
            Search
          </button>

        </div>
      </div>
    </div>
  );
}

export default Hero;