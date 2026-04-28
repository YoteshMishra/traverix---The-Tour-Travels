import { Link } from "react-router-dom";

function PackageCard({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">{item.title}</h2>

        <p className="text-gray-600">{item.days}</p>

        <p className="text-blue-600 font-bold mt-2">
          ₹{item.price}
        </p>

        <Link to={`/package/${item.id}`}>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PackageCard;