import { Link } from "react-router-dom";
import { Car, Laptop, Armchair, ChevronRight, CheckCircle2, Factory, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <div className="flex flex-col font-sans overflow-hidden bg-white text-gray-900">
      <SEO
        title="Premium B2B Asset Leasing"
        description="The smartest, most secure way to lease high-quality machinery, electronics, and assets online."
      />

      {/* Hero Section */}
      <section className="relative bg-slate-50 border-b border-slate-200 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[bottom_1px_center]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 max-w-5xl md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-sm font-medium mb-8">
              <CheckCircle2 size={16} /> Verified Partners Only
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-slate-900">
              Procure Assets.<br className="hidden md:block"/> 
              <span className="text-primary-600">Without the CapEx.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
              The enterprise-grade marketplace for leasing heavy machinery, premium electronics, and office infrastructure with complete transparency and built-in rules.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/assets"
                className="group bg-primary-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary-700 transition flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20"
              >
                Browse Marketplace <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/list"
                className="px-8 py-4 rounded-lg font-bold text-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition flex items-center justify-center bg-white shadow-sm"
              >
                List Your Assets
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-b border-slate-100 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-8">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <h2 className="text-2xl font-bold text-slate-800">AcmeCorp</h2>
            <h2 className="text-2xl font-bold text-slate-800">GlobalBuild</h2>
            <h2 className="text-2xl font-bold text-slate-800">TechFlow</h2>
            <h2 className="text-2xl font-bold text-slate-800">Nexus Logistics</h2>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">How LeaseIT Works</h2>
            <p className="text-lg text-slate-600">A streamlined process from discovery to deployment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-slate-200 z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-50 text-primary-600 rounded-full flex items-center justify-center mb-6 border-8 border-white shadow-sm">
                <span className="text-3xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Discover</h3>
              <p className="text-slate-600">Filter through our verified catalog of high-quality machinery, electronics, and vehicles.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-50 text-primary-600 rounded-full flex items-center justify-center mb-6 border-8 border-white shadow-sm">
                <span className="text-3xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Agree & Sign</h3>
              <p className="text-slate-600">Review transparent company documentation, rules, and sign digital lease agreements easily.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-50 text-primary-600 rounded-full flex items-center justify-center mb-6 border-8 border-white shadow-sm">
                <span className="text-3xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Deploy</h3>
              <p className="text-slate-600">Receive your asset and manage your ongoing leases securely through your dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Explore Top Categories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategoryCard
              icon={<Factory size={36} />}
              title="Heavy Machinery"
              desc="Excavators, cranes, and loaders."
            />
            <CategoryCard
              icon={<Laptop size={36} />}
              title="Electronics"
              desc="Workstations, servers, and cameras."
            />
            <CategoryCard
              icon={<Car size={36} />}
              title="Vehicles"
              desc="Executive transport and logistics."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Trusted by Professionals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="flex text-amber-400 mb-4">{"★".repeat(5)}</div>
              <p className="text-lg text-slate-700 font-medium italic mb-6">
                "LeaseIT transformed how we scale our construction projects. Being able to review company documentation and rules before leasing a backhoe saved us countless legal hours."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">AM</div>
                <div>
                  <h4 className="font-bold text-slate-900">Alex Morgan</h4>
                  <p className="text-sm text-slate-500">Site Manager, GlobalBuild</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <div className="flex text-amber-400 mb-4">{"★".repeat(5)}</div>
              <p className="text-lg text-slate-700 font-medium italic mb-6">
                "We listed our unused server racks on LeaseIT. The ability to attach our own terms and conditions directly to the listing gave us total peace of mind."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">SR</div>
                <div>
                  <h4 className="font-bold text-slate-900">Sarah Reed</h4>
                  <p className="text-sm text-slate-500">IT Director, TechFlow</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-5 bg-cover bg-center z-0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to optimize your assets?</h2>
            <p className="text-xl text-primary-100 mb-10 font-light">
              Join thousands of businesses managing their leases securely and transparently.
            </p>
            <Link to="/register" className="inline-flex items-center justify-center gap-2 bg-white text-primary-900 px-10 py-5 rounded-lg font-bold text-xl hover:bg-slate-100 transition shadow-xl">
              Create an Account <ChevronRight size={20} />
            </Link>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col items-center text-center cursor-pointer">
      <div className="w-16 h-16 bg-blue-50 text-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-500 font-medium">{desc}</p>
    </div>
  );
}
