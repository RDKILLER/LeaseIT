import { Link } from "react-router-dom";
import { Plus, Settings, User } from "lucide-react";
import ListingCard from "../components/ListingCard";
import { mockListings } from "../data/mockData";

export default function Dashboard() {
    // In a real app, filter by logged-in user ID
    const myListings = mockListings.slice(0, 3);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Manage your listings and agreements</p>
                </div>
                <Link
                    to="/list"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                    <Plus size={20} /> Add New Asset
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm font-medium uppercase mb-1">Total Listings</div>
                    <div className="text-3xl font-bold text-gray-900">{myListings.length}</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm font-medium uppercase mb-1">Active Leases</div>
                    <div className="text-3xl font-bold text-blue-600">1</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm font-medium uppercase mb-1">Total Earnings</div>
                    <div className="text-3xl font-bold text-green-600">₹45,000</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="text-gray-500 text-sm font-medium uppercase mb-1">Views</div>
                    <div className="text-3xl font-bold text-purple-600">1,240</div>
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4">My Listings</h2>
            {myListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myListings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                    <p className="text-gray-500 mb-4">You haven't listed any assets yet.</p>
                    <Link to="/list" className="text-blue-600 font-medium hover:underline">
                        Create your first listing
                    </Link>
                </div>
            )}
        </div>
    );
}
