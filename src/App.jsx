import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Assets from "./pages/Assets";
import Login from "./pages/Login";
import ListAsset from "./pages/ListAsset";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ListingDetails from "./pages/ListingDetails";
import Agreement from "./pages/Agreement";

export default function App() {
  return (
    <Layout>
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
    </Layout>
  );
}
