import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, User, ArrowLeft, ShieldCheck, CheckSquare, Settings2, Info, Star } from "lucide-react";
import { useListings } from "../context/ListingsContext";
import SEO from "../components/SEO";

export default function ListingDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { listings } = useListings();

    const listing = listings.find(l => l.id === parseInt(id));

    if (!listing) {
        return (
            <div className="container mx-auto px-4 py-32 text-center min-h-[60vh]">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Asset not found</h2>
                <p className="text-slate-500 mb-8">The asset you are looking for does not exist or has been removed.</p>
                <button onClick={() => navigate("/assets")} className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700">
                    Back to Marketplace
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <SEO title={`${listing.title} | LeaseIT`} description={listing.description} />
            
            {/* Header Area */}
            <div className="bg-white border-b border-slate-200 pt-8 pb-8">
                <div className="container mx-auto px-4 max-w-7xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-slate-500 hover:text-primary-600 mb-6 transition font-medium"
                    >
                        <ArrowLeft size={18} className="mr-2" /> Back to listings
                    </button>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="bg-primary-50 text-primary-700 border border-primary-100 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                                    {listing.category}
                                </span>
                                <span className="flex items-center text-slate-500 text-sm font-medium">
                                    <MapPin size={16} className="mr-1" /> {listing.location}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">{listing.title}</h1>
                        </div>
                        <div className="flex gap-2 items-center text-slate-600">
                           <Star className="text-amber-400 fill-amber-400" size={20} />
                           <span className="font-bold text-slate-900">{listing.rating || 'New'}</span>
                           <span className="text-sm">({listing.reviews_count || 0} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-7xl mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Main Content (Left, spans 2 cols) */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Image Gallery */}
                        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 h-[500px] bg-slate-200">
                            <img
                                src={listing.image}
                                alt={listing.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Info className="text-primary-600" /> About this asset
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {listing.description}
                            </p>
                        </div>
                        
                        <hr className="border-slate-200" />

                        {/* Specs Grid */}
                        {listing.specs && Object.keys(listing.specs).length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Settings2 className="text-primary-600" /> Technical Specifications
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(listing.specs).map(([key, val]) => (
                                        <div key={key} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
                                            <span className="text-slate-500 font-medium">{key}</span>
                                            <span className="font-bold text-slate-900">{val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <hr className="border-slate-200" />

                        {/* Original Company Docs / Rules */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <CheckSquare className="text-primary-600" /> Company Rules & Documentation
                            </h3>
                            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-amber-400"></div>
                                <h4 className="font-bold text-amber-900 mb-3">Please read carefully before leasing</h4>
                                <div className="whitespace-pre-wrap text-amber-800 text-sm leading-relaxed font-medium">
                                    {listing.companyRules || "Standard LeaseIT terms and conditions apply. No special documentation provided by the lessor."}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area (Right, sticky) */}
                    <div className="relative">
                        <div className="sticky top-28 space-y-6">
                            {/* Pricing & Booking Card */}
                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                                <div className="flex items-end mb-6">
                                    <span className="text-4xl font-extrabold text-slate-900">₹{listing.price.toLocaleString()}</span>
                                    <span className="text-slate-500 ml-2 mb-1 font-medium text-lg">/ {listing.period}</span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Security Deposit</span>
                                        <span className="font-bold text-slate-800">
                                            {listing.deposit_amount ? `₹${listing.deposit_amount.toLocaleString()}` : "Not required"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Insurance Required</span>
                                        <span className={`font-bold ${listing.insurance_required ? 'text-primary-600' : 'text-slate-800'}`}>
                                            {listing.insurance_required ? "Yes (Mandatory)" : "No"}
                                        </span>
                                    </div>
                                    <hr className="border-slate-100" />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className="text-slate-900">Total Upfront</span>
                                        <span className="text-slate-900">₹{(listing.price + (listing.deposit_amount || 0)).toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link
                                    to={`/agreement/${listing.id}`}
                                    className="block w-full bg-primary-600 text-white text-center font-bold py-4 rounded-xl hover:bg-primary-700 transition shadow-lg shadow-primary-600/20 text-lg mb-4"
                                >
                                    Review Agreement & Lease
                                </Link>
                                <p className="text-center text-xs text-slate-400 font-medium">You won't be charged yet.</p>
                            </div>

                            {/* Host Profile */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center border border-indigo-200">
                                        <User className="text-primary-600" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Lessor</p>
                                        <p className="font-bold text-slate-900 text-lg">{listing.lessor}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-100 mt-4">
                                    <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-bold text-emerald-800 text-sm">Verified Corporate Partner</h4>
                                        <p className="text-emerald-700/80 text-xs mt-1 font-medium">Identity, incorporation, and bank details verified.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
