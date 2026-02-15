import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

export default function ListingCard({ listing }) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col h-full group">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
                    {listing.category}
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{listing.title}</h3>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin size={14} className="mr-1" />
                    {listing.location}
                </div>

                <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                    {listing.description}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div>
                        <span className="text-lg font-bold text-blue-600">₹{listing.price}</span>
                        <span className="text-gray-400 text-sm">/{listing.period}</span>
                    </div>

                    <Link
                        to={`/assets/${listing.id}`}
                        className="text-blue-600 font-medium hover:text-blue-700 flex items-center text-sm"
                    >
                        View Details <ArrowRight size={16} className="ml-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
