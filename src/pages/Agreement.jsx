import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, FileText, PenTool, ShieldAlert } from "lucide-react";
import { useListings } from "../context/ListingsContext";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

export default function Agreement() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { listings, leaseAsset } = useListings();
    const { user } = useAuth();
    
    const [step, setStep] = useState(1);
    const [signature, setSignature] = useState(user?.name || "");

    const listing = listings.find(l => l.id === parseInt(id));

    const handleSign = (e) => {
        e.preventDefault();
        if (signature.trim()) {
            setStep(3);
            
            // Trigger lease context action
            leaseAsset(listing.id, {
                lessee: signature,
                date: new Date().toISOString(),
                termsAccepted: true
            });

            // Simulate redirect to dashboard
            setTimeout(() => {
                navigate("/dashboard");
            }, 2500);
        }
    };

    if (!listing) return (
        <div className="container mx-auto px-4 py-24 text-center">
            <h2 className="text-2xl font-bold text-slate-800">Asset not found.</h2>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <SEO title="Lease Agreement | LeaseIT" />
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">

                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-10 px-4 md:px-12">
                        <div className={`flex flex-col items-center ${step >= 1 ? "text-primary-600" : "text-slate-400"}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${step >= 1 ? "border-primary-600 bg-primary-50" : "border-slate-300"}`}>
                                <FileText size={20} />
                            </div>
                            <span className="text-sm mt-3 font-bold">Review Terms</span>
                        </div>
                        <div className={`flex-grow border-t-2 mx-4 transition-colors ${step >= 2 ? "border-primary-600" : "border-slate-200"}`}></div>
                        <div className={`flex flex-col items-center ${step >= 2 ? "text-primary-600" : "text-slate-400"}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${step >= 2 ? "border-primary-600 bg-primary-50" : "border-slate-300"}`}>
                                <PenTool size={20} />
                            </div>
                            <span className="text-sm mt-3 font-bold">Sign</span>
                        </div>
                        <div className={`flex-grow border-t-2 mx-4 transition-colors ${step >= 3 ? "border-primary-600" : "border-slate-200"}`}></div>
                        <div className={`flex flex-col items-center ${step >= 3 ? "text-emerald-600" : "text-slate-400"}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${step >= 3 ? "border-emerald-600 bg-emerald-50" : "border-slate-300"}`}>
                                <CheckCircle size={20} />
                            </div>
                            <span className="text-sm mt-3 font-bold">Complete</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

                        {/* Header */}
                        <div className="bg-slate-900 px-8 py-8 border-b border-slate-800 text-white">
                            <h1 className="text-3xl font-extrabold mb-1">Digital Lease Agreement</h1>
                            <p className="text-slate-400 font-medium">for {listing.title} ({listing.category})</p>
                        </div>

                        {/* Body */}
                        <div className="p-8 md:p-10">
                            {step === 1 && (
                                <div className="space-y-8">
                                    <div className="prose max-w-none text-slate-700 space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 border-b border-slate-100 pb-2">1. Parties</h3>
                                            <p className="leading-relaxed">This Digital Lease Agreement ("Agreement") is electronically entered into between <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{listing.lessor}</strong> ("Lessor") and <strong className="text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{user?.name || "The Undersigned"}</strong> ("Lessee").</p>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 border-b border-slate-100 pb-2">2. Asset Details & Pricing</h3>
                                            <p className="leading-relaxed">The Lessor agrees to lease <strong>{listing.title}</strong> to the Lessee.</p>
                                            <ul className="mt-3 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100 font-medium">
                                                <li><span className="text-slate-500 w-32 inline-block">Base Rent:</span> <strong className="text-slate-900 text-lg">₹{listing.price.toLocaleString()} /{listing.period}</strong></li>
                                                <li><span className="text-slate-500 w-32 inline-block">Security Deposit:</span> <strong className="text-slate-900">₹{(listing.deposit_amount || 0).toLocaleString()}</strong></li>
                                                <li><span className="text-slate-500 w-32 inline-block">Insurance:</span> <strong className="text-slate-900">{listing.insurance_required ? 'Mandatory policy required' : 'Not required'}</strong></li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 border-b border-slate-100 pb-2">3. General Liability</h3>
                                            <p className="leading-relaxed">The Lessee assumes all risks and liability for any loss, damage, or injury to persons or property arising from the use or possession of the asset. Normal wear and tear is accepted unless specified otherwise.</p>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                                                <h3 className="text-xl font-bold text-slate-900">4. Specific Company Rulings & Documentation</h3>
                                            </div>
                                            <div className="bg-amber-50 p-5 rounded-xl border border-amber-200 mt-4">
                                                <div className="flex items-start gap-3 mb-2">
                                                    <ShieldAlert className="text-amber-600 mt-0.5" size={18} />
                                                    <span className="font-bold text-amber-900">Custom rules set by {listing.lessor}</span>
                                                </div>
                                                <div className="whitespace-pre-wrap text-amber-900 font-medium leading-relaxed pl-7 text-sm">
                                                    {listing.companyRules || "No specialized documentation attached. Standard platform terms apply."}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-8 border-t border-slate-200">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="bg-primary-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-primary-700 transition shadow-lg shadow-primary-600/20 text-lg"
                                        >
                                            Accept Terms & Continue
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <form onSubmit={handleSign} className="space-y-8">
                                    <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl text-amber-900 font-medium leading-relaxed shadow-sm">
                                        <strong>Legal Notice:</strong> By typing your full name below and clicking "Sign Agreement", you are applying a legally binding Electronic Signature to this lease. You agree to be bound by the General Liability terms and the Specific Company Rulings set forth by {listing.lessor}.
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">Electronic Signature (Type Full Legal Name)</label>
                                        <input
                                            type="text"
                                            value={signature}
                                            onChange={(e) => setSignature(e.target.value)}
                                            className="w-full px-6 py-4 border-2 border-slate-300 rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 font-serif text-2xl italic bg-slate-50 transition-all font-semibold"
                                            placeholder="e.g. Johnathan Doe"
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-between items-center pt-8 border-t border-slate-200">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="text-slate-500 font-bold hover:text-slate-800 transition"
                                        >
                                            Back to Review
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition flex items-center gap-3 shadow-lg shadow-emerald-600/20 text-lg"
                                        >
                                            Sign Agreement <PenTool size={20} />
                                        </button>
                                    </div>
                                </form>
                            )}

                            {step === 3 && (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-emerald-200 border-4 border-emerald-50">
                                        <CheckCircle size={48} />
                                    </div>
                                    <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Agreement Signed & Sealed</h2>
                                    <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
                                        You have successfully completed the lease agreement for <strong>{listing.title}</strong>. The asset has been logged in your dashboard and is ready for coordination.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-sm text-slate-400 font-semibold animate-pulse">
                                        <div className="w-2 h-2 rounded-full bg-slate-400"></div> redirecting to dashboard...
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
