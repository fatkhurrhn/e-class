import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
    InstantSearch,
    SearchBox,
    Hits,
} from "react-instantsearch-dom";
import { useNavigate } from "react-router-dom";

const searchClient = algoliasearch("5P9VETS69D", "acf7bf7a8120c779bcabd9e6dcc0be74");

// Komponen hasil pencarian
function Hit({ hit }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(hit.url)}
            className="p-3 border-b hover:bg-gray-100 cursor-pointer transition"
        >
            <p className="font-semibold text-[#2a436c]">{hit.name}</p>
            <p className="text-sm text-gray-600">{hit.description}</p>
        </div>
    );
}

export default function AlgoliaSearch() {
    return (
        <InstantSearch indexName="uploadData" searchClient={searchClient}>
            <div className="relative">
                <SearchBox
                    placeholder="Cari materi..."
                    classNames={{
                        root: "w-full",
                        form: "relative",
                        input:
                            "w-full border border-gray-300 rounded-lg py-2 px-4 text-sm bg-white " +
                            "focus:outline-none focus:ring-2 focus:ring-[#355485]",
                    }}
                />

                {/* Dropdown rekomendasi */}
                <div className="absolute w-full bg-white rounded-lg shadow-lg mt-2 z-50 max-h-64 overflow-y-auto">
                    <Hits hitComponent={Hit} />
                </div>
            </div>
        </InstantSearch>
    );
}
