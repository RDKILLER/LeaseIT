import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, User, ArrowLeft, ShieldCheck } from "lucide-react";
import { mockListings } from "../data/mockData";

export default function ListingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const listing = mockListings.find(l => l.id === parseInt(id));

    if (!listing) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-800">Asset not found</h2>
                <Link to="/assets" className="text-blue-600 mt-4 inline-block hover:underline">
                    Back to browsing
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition"
            >
                <ArrowLeft size={20} className="mr-2" /> Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
                    <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details Section */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {listing.category}
                        </span>
                        <span className="flex items-center text-gray-500 text-sm">
                            <MapPin size={14} className="mr-1" /> {listing.location}
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{listing.title}</h1>

                    <div className="flex items-center mb-6">
                        <span className="text-3xl font-bold text-blue-600">₹{listing.price}</span>
                        <span className="text-gray-500 ml-2">/ {listing.period}</span>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {listing.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Listed by</p>
                            <p className="font-semibold text-gray-900">{listing.lessor}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                            <ShieldCheck className="text-green-600 mt-0.5" size={20} />
                            <div>
                                <h4 className="font-semibold text-green-800 text-sm">Verified Listing</h4>
                                <p className="text-green-700 text-xs">This asset has been verified for quality and availability.</p>
                            </div>
                        </div>

                        <Link
                            to={`/agreement/${listing.id}`}
                            className="block w-full bg-blue-600 text-white text-center font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg text-lg"
                        >
                            Lease Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
