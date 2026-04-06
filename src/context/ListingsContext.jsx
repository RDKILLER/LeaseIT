import { createContext, useState, useContext, useEffect } from "react";
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { mockListings } from "../data/mockData";

const ListingsContext = createContext();

export const useListings = () => useContext(ListingsContext);

export const ListingsProvider = ({ children }) => {
    const [listings, setListings] = useState([]);
    const [leasedAssets, setLeasedAssets] = useState([]);
    const [loadingListings, setLoadingListings] = useState(true);

    // Fetch all listings from Firestore on mount
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    // Seed Firestore with mock data on first run
                    for (const listing of mockListings) {
                        await addDoc(collection(db, "listings"), {
                            ...listing,
                            createdAt: serverTimestamp(),
                        });
                    }
                    setListings(mockListings);
                } else {
                    const fetched = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
                    setListings(fetched);
                }
            } catch (err) {
                console.error("Error fetching listings:", err);
                // Fallback to mock data if Firestore fails
                setListings(mockListings);
            } finally {
                setLoadingListings(false);
            }
        };

        fetchListings();

        // Also load leased assets from localStorage as a local session cache
        const storedLeases = localStorage.getItem("leaseit_leases");
        if (storedLeases) {
            setLeasedAssets(JSON.parse(storedLeases));
        }
    }, []);

    // Add a new listing to Firestore
    const addListing = async (newListing) => {
        const docRef = await addDoc(collection(db, "listings"), {
            ...newListing,
            createdAt: serverTimestamp(),
        });
        const listingWithId = { ...newListing, id: docRef.id };
        setListings((prev) => [listingWithId, ...prev]);
        return listingWithId;
    };

    // Lease an asset (stored locally for session + Firestore for persistence)
    const leaseAsset = async (assetId, leaseDetails) => {
        const assetToLease = listings.find((l) => l.id === assetId);
        if (!assetToLease) return;

        const newLease = { ...assetToLease, leaseDetails, leaseId: Date.now() };
        const updatedLeases = [...leasedAssets, newLease];
        setLeasedAssets(updatedLeases);
        localStorage.setItem("leaseit_leases", JSON.stringify(updatedLeases));

        // Optionally mark the listing as leased in Firestore
        try {
            await updateDoc(doc(db, "listings", assetId), { status: "leased" });
        } catch (err) {
            console.warn("Could not update listing status in Firestore:", err);
        }
    };

    return (
        <ListingsContext.Provider value={{ listings, leasedAssets, addListing, leaseAsset, loadingListings }}>
            {children}
        </ListingsContext.Provider>
    );
};
