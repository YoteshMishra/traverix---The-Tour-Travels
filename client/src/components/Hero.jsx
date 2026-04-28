function Hero() {
  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')] bg-cover bg-center h-[90vh] flex items-center justify-center text-white">
      <div className="bg-black/50 p-8 rounded-xl text-center w-[90%] md:w-[60%]">
        <h1 className="text-4xl md:text-6xl font-bold">
          Explore The World
        </h1>

        <p className="mt-4 text-lg">
          Book your dream destination at best prices
        </p>

        <div className="mt-6 grid md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Destination"
            className="p-3 rounded text-black"
          />

          <input
            type="date"
            className="p-3 rounded text-black"
          />

          <input
            type="number"
            placeholder="Guests"
            className="p-3 rounded text-black"
          />

          <button className="bg-blue-600 p-3 rounded font-bold">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;