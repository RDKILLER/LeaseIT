import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, DollarSign, MapPin, Building, ShieldCheck } from "lucide-react";
import { useListings } from "../context/ListingsContext";
import { useAuth } from "../context/AuthContext";
import SEO from "../components/SEO";

export default function ListAsset() {
  const navigate = useNavigate();
  const { addListing } = useListings();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    period: "day",
    location: "",
    image: "",
    deposit_amount: "",
    insurance_required: false,
    companyRules: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newListing = {
        ...formData,
        price: Number(formData.price),
        deposit_amount: formData.deposit_amount ? Number(formData.deposit_amount) : 0,
        lessor: user?.name || "Independent Lessor",
        rating: 5.0,
        reviews_count: 0,
        specs: {} // Could add dynamic specs later
    };
    
    addListing(newListing);
    navigate("/dashboard");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SEO title="List an Asset | LeaseIT" description="List your heavy machinery, electronics, and vehicles on LeaseIT securely." />
      <div className="container mx-auto px-4">
        
        <div className="max-w-3xl mx-auto mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">List Your Asset</h1>
            <p className="text-slate-600 font-medium">Reach high-quality businesses across our trusted network.</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section: Basic Details */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-6">1. Basic Information</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Asset Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                            placeholder="e.g. Caterpillar 320 Excavator"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                            <select
                                name="category"
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                <option value="Vehicles">Vehicles</option>
                                <option value="Heavy Machinery">Heavy Machinery</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Furniture">Furniture</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                                    placeholder="e.g. Mumbai, India"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                            placeholder="Describe condition, specifications, and primary use cases..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                            placeholder="https://example.com/asset-image.jpg"
                            value={formData.image}
                            onChange={handleChange}
                        />
                        <p className="text-xs text-slate-500 mt-2 font-medium">Use an Unsplash URL for demo purposes.</p>
                    </div>
                </div>
            </div>

            {/* Section: Pricing & Terms */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-6">2. Pricing & Commercials</h3>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Base Rent Price</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium font-mono"
                                    placeholder="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Billing Period</label>
                            <select
                                name="period"
                                required
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium"
                                value={formData.period}
                                onChange={handleChange}
                            >
                                <option value="day">Per Day</option>
                                <option value="week">Per Week</option>
                                <option value="month">Per Month</option>
                                <option value="year">Per Year</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Security Deposit (₹)</label>
                            <div className="relative">
                                <ShieldCheck className="absolute left-4 top-3.5 text-slate-400" size={18} />
                                <input
                                    type="number"
                                    name="deposit_amount"
                                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium font-mono"
                                    placeholder="Optional"
                                    value={formData.deposit_amount}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="flex items-center pt-8">
                            <input 
                                type="checkbox"
                                name="insurance_required"
                                id="insurance"
                                checked={formData.insurance_required}
                                onChange={handleChange}
                                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="insurance" className="ml-3 text-sm font-bold text-slate-700 cursor-pointer">
                                Mandatory Renter Insurance Required
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section: Custom Documentation */}
            <div>
                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-6 flex items-center gap-2">
                    <Building className="text-primary-600" size={20}/> 3. Company Legal & Rules
                </h3>
                <div className="bg-amber-50 rounded-xl p-5 border border-amber-200/60 mb-6">
                    <p className="text-amber-800 text-sm font-medium leading-relaxed">
                        Different companies have different operational procedures. Use this space to paste your proprietary lease rules, late fees, operational limits, or maintenance requirements. This will be embedded in the final agreement.
                    </p>
                </div>
                
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Original Documentation / Rules</label>
                    <textarea
                        name="companyRules"
                        rows={6}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-medium font-mono text-sm leading-relaxed"
                        placeholder="1. Machine must be returned with a full tank...&#10;2. Late fee of ₹2000/day applies...&#10;3. Operators must carry valid certification..."
                        value={formData.companyRules}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <button
                type="submit"
                className="w-full bg-primary-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl hover:shadow-primary-600/20 text-lg"
              >
                Publish Listing
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
