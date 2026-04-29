// src/pages/Home.jsx

import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import PackageCard from "../components/PackageCard";
import API_BASE_URL from "../config/api";

function Home() {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const getPackages = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/packages`
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch packages"
        );
      }

      const data = await response.json();

      setPackages(data);
      setFilteredPackages(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  useEffect(() => {
    const result = packages.filter((item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredPackages(result);
  }, [search, packages]);

  const handleHeroSearch = ({
    destination
  }) => {
    const result = packages.filter((item) =>
      item.title
        .toLowerCase()
        .includes(
          destination.toLowerCase()
        )
    );

    setFilteredPackages(result);

    window.scrollTo({
      top: 700,
      behavior: "smooth"
    });
  };

  return (
    <>
      <Hero
        onSearch={handleHeroSearch}
      />

      <section className="bg-gray-100 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Featured Packages
          </h1>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Search destination..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full md:w-96 border p-3 rounded-lg bg-white"
            />
          </div>

          {loading && (
            <p className="text-center text-lg">
              Loading packages...
            </p>
          )}

          {error && (
            <p className="text-center text-red-600">
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            filteredPackages.length ===
              0 && (
              <p className="text-center text-gray-600">
                No packages found.
              </p>
            )}

          {!loading &&
            !error &&
            filteredPackages.length >
              0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map(
                  (item) => (
                    <PackageCard
                      key={item.id}
                      item={item}
                    />
                  )
                )}
              </div>
            )}
        </div>
      </section>
    </>
  );
}

export default Home;