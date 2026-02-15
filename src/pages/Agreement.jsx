import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, FileText, PenTool } from "lucide-react";
import { mockListings } from "../data/mockData";

export default function Agreement() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [signature, setSignature] = useState("");

    const listing = mockListings.find(l => l.id === parseInt(id));

    const handleSign = (e) => {
        e.preventDefault();
        if (signature.trim()) {
            setStep(3);
            // Simulate API call
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        }
    };

    if (!listing) return <div className="p-8">Asset not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8 px-8">
                    <div className={`flex flex-col items-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}>
                            <FileText size={20} />
                        </div>
                        <span className="text-sm mt-2 font-medium">Review Terms</span>
                    </div>
                    <div className={`flex-grow border-t-2 mx-4 ${step >= 2 ? "border-blue-600" : "border-gray-300"}`}></div>
                    <div className={`flex flex-col items-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}>
                            <PenTool size={20} />
                        </div>
                        <span className="text-sm mt-2 font-medium">Sign</span>
                    </div>
                    <div className={`flex-grow border-t-2 mx-4 ${step >= 3 ? "border-blue-600" : "border-gray-300"}`}></div>
                    <div className={`flex flex-col items-center ${step >= 3 ? "text-green-600" : "text-gray-400"}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-green-600 bg-green-50" : "border-gray-300"}`}>
                            <CheckCircle size={20} />
                        </div>
                        <span className="text-sm mt-2 font-medium">Complete</span>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

                    {/* Header */}
                    <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
                        <h1 className="text-2xl font-bold text-gray-900">Lease Agreement</h1>
                        <p className="text-gray-600">for {listing.title} ({listing.category})</p>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="prose max-w-none text-gray-600">
                                    <h3 className="text-lg font-bold text-gray-900">1. Parties</h3>
                                    <p>This Lease Agreement ("Agreement") is entered into between <strong>{listing.lessor}</strong> ("Lessor") and <strong>You</strong> ("Lessee").</p>

                                    <h3 className="text-lg font-bold text-gray-900 mt-4">2. Asset Details</h3>
                                    <p>The Lessor agrees to lease the following asset to the Lessee: <strong>{listing.title}</strong> located at {listing.location}.</p>

                                    <h3 className="text-lg font-bold text-gray-900 mt-4">3. Term and Rent</h3>
                                    <p>The rent shall be <strong>₹{listing.price} per {listing.period}</strong>. The lease term begins on the date of signing.</p>

                                    <h3 className="text-lg font-bold text-gray-900 mt-4">4. Liability</h3>
                                    <p>The Lessee is responsible for any damage to the asset during the lease term, excluding normal wear and tear.</p>
                                </div>

                                <div className="flex justify-end pt-6 border-t border-gray-100">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                                    >
                                        Accept & Continue
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleSign} className="space-y-6">
                                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-yellow-800 text-sm mb-6">
                                    By typing your full name below, you are electronically signing this agreement and accepting all terms and conditions.
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Digital Signature (Type Full Name)</label>
                                    <input
                                        type="text"
                                        value={signature}
                                        onChange={(e) => setSignature(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-serif text-xl italic"
                                        placeholder="e.g. John Doe"
                                        required
                                    />
                                </div>

                                <div className="flex justify-between pt-6 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-gray-500 font-medium hover:text-gray-700"
                                    >
                                        Back to Terms
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center gap-2"
                                    >
                                        Sign Agreement <PenTool size={18} />
                                    </button>
                                </div>
                            </form>
                        )}

                        {step === 3 && (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Agreement Signed!</h2>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                    You have successfully leased <strong>{listing.title}</strong>. The asset is now ready for pickup/delivery.
                                </p>
                                <div className="text-sm text-gray-400">Redirecting to dashboard...</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
