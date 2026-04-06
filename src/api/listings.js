import { mockListings } from "../data/mockData";

export const fetchListings = async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return mockListings;
};

export const fetchListingById = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const listing = mockListings.find((l) => l.id === parseInt(id));
    if (!listing) throw new Error("Listing not found");
    return listing;
};
