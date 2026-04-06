import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./firebase";
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // good for dev
      retry: 1,
    },
  },
});

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/Home"));
const Assets = lazy(() => import("@/pages/Assets"));
const ListingDetails = lazy(() => import("@/pages/ListingDetails"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ListAsset = lazy(() => import("@/pages/ListAsset"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Agreement = lazy(() => import("@/pages/Agreement"));

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Layout>
          <Toaster position="top-center" reverseOrder={false} />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/assets/:id" element={<ListingDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/list" element={<ListAsset />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/agreement/:id" element={<Agreement />} />
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
