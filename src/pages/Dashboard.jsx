import { Link, useNavigate } from "react-router-dom";
import { Plus, CheckSquare, PackageOpen, Info } from "lucide-react";
import ListingCard from "../components/ListingCard";
import { useListings } from "../context/ListingsContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import SEO from "../components/SEO";

export default function Dashboard() {
    const { listings, leasedAssets } = useListings();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Secure route: Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null; // Avoid flicker

    // Filter listings owned by the user
    const myListings = listings.filter(l => l.lessor === user.name);

    // Filter leases made by the user
    // Since we didn't strictly attach lessee ID, we can assume all leasedAssets in this mock belong to the active user profile for demo purposes, 
    // or filter by `lessee` matching the user's name
    const myLeases = leasedAssets.filter(l => l.leaseDetails?.lessee === user.name);

    return (
        <div className="bg-slate-50 min-h-screen py-10">
            <SEO title="Dashboard | LeaseIT" />
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back, {user.name}</h1>
                        <p className="text-slate-500 font-medium tracking-wide">Manage your property and active leases from one unified interface.</p>
                    </div>
                    <Link
                        to="/list"
                        className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center gap-2 font-bold shadow-lg shadow-primary-600/20"
                    >
                        <Plus size={20} /> Add New Asset
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center group hover:border-primary-200 transition">
                        <div>
                            <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">My Listings</div>
                            <div className="text-4xl font-extrabold text-slate-900 group-hover:text-primary-600 transition">{myListings.length}</div>
                        </div>
                        <div className="w-16 h-16 bg-blue-50 text-primary-600 rounded-full flex items-center justify-center">
                            <PackageOpen size={28} />
                        </div>
                    </div>
                    
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center group hover:border-emerald-200 transition">
                        <div>
                            <div className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Active Leases</div>
                            <div className="text-4xl font-extrabold text-emerald-600">{myLeases.length}</div>
                        </div>
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                            <CheckSquare size={28} />
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-xl flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Info size={100} />
                        </div>
                        <div className="text-slate-300 text-sm font-bold uppercase tracking-widest mb-2 relative z-10">Estimated ROI</div>
                        <div className="text-3xl font-extrabold text-white relative z-10">₹ {(myListings.reduce((sum, item) => sum + item.price, 0) * 0.7).toLocaleString()}<span className="text-sm text-slate-400 ml-1 font-medium tracking-normal">/mo</span></div>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                        Assets I'm Leasing
                    </h2>
                    {myLeases.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myLeases.map(lease => (
                                <div key={lease.leaseId} className="bg-white border-2 border-emerald-100 rounded-2xl p-6 relative overflow-hidden shadow-sm">
                                    <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-bl-lg">ACTIVE LEASE</div>
                                    <h3 className="font-bold text-xl text-slate-900 mb-1 leading-snug pr-16">{lease.title}</h3>
                                    <p className="text-slate-500 text-sm mb-4">Partner: <span className="font-medium text-slate-700">{lease.lessor}</span></p>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm font-medium">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-slate-500">Rent</span>
                                            <span className="text-slate-900">₹{lease.price}/{lease.period}</span>
                                        </div>
                                        <hr className="border-slate-200 my-2" />
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Date</span>
                                            <span className="text-slate-900">{new Date(lease.leaseDetails.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
                            <p className="text-slate-500 mb-4 font-medium">You haven't leased any assets yet.</p>
                            <Link to="/assets" className="text-primary-600 font-bold hover:underline">
                                Browse the Marketplace
                            </Link>
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-6">My Listed Assets</h2>
                    {myListings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myListings.map(listing => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                            <p className="text-slate-500 mb-4 font-medium">You haven't listed any assets on the platform.</p>
                            <Link to="/list" className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition">
                                Create your first listing
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
