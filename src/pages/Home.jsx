import { Link } from "react-router-dom";
import { Car, Laptop, Armchair, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find & Lease Assets <span className="text-blue-200">Smartly</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Lease vehicles, electronics, and furniture easily — list your assets
            or find what you need in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assets"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2"
            >
              Browse Assets <ChevronRight size={20} />
            </Link>
            <Link
              to="/list"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition flex items-center justify-center"
            >
              List Your Asset
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Popular Categories</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition text-center group cursor-pointer border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition duration-300">
                <Car className="text-blue-600 group-hover:text-white transition duration-300" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Vehicles</h3>
              <p className="text-gray-600">Cars, bikes, and scooters for daily or monthly rent</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition text-center group cursor-pointer border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition duration-300">
                <Laptop className="text-blue-600 group-hover:text-white transition duration-300" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Electronics</h3>
              <p className="text-gray-600">High-end laptops, cameras, and gadgets</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition text-center group cursor-pointer border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition duration-300">
                <Armchair className="text-blue-600 group-hover:text-white transition duration-300" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Furniture</h3>
              <p className="text-gray-600">Premium chairs, tables, and home essentials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to get started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you want to earn from your idle assets or need something for a short term, LeaseIt is the platform for you.
          </p>
          <Link to="/register" className="text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1">
            Create an account today <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
