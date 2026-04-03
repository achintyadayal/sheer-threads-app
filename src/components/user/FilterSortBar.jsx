import React from "react";
import { Filter, ArrowUpDown, Search } from "lucide-react";

function FilterSortBar({
    fabrics,
    selectedFabric,
    setSelectedFabric,
    sortOption,
    setSortOption,
    searchQuery,
    setSearchQuery
}) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-neutral-100 p-4 rounded-xl shadow-sm mb-8 gap-4">

            {/* Search (optional) */}
            {setSearchQuery && (
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Search className="w-5 h-5 text-neutral-500 hidden md:block" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-52 bg-white border border-neutral-300 text-neutral-800 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 outline-none transition"
                    />
                </div>
            )}

            {/* Filter by Fabric */}
            <div className="flex items-center gap-3 w-full md:w-auto">
                <Filter className="w-5 h-5 text-neutral-500 hidden md:block" />
                <label htmlFor="fabric-filter" className="font-semibold text-neutral-700 whitespace-nowrap">
                    Fabric:
                </label>
                <select
                    id="fabric-filter"
                    value={selectedFabric}
                    onChange={(e) => setSelectedFabric(e.target.value)}
                    className="w-full md:w-48 bg-white border border-neutral-300 text-neutral-800 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 outline-none transition"
                >
                    <option value="All">All Fabrics</option>
                    {fabrics.map((fabric, idx) => (
                        <option key={idx} value={fabric}>
                            {fabric}
                        </option>
                    ))}
                </select>
            </div>

            {/* Sort by Price */}
            <div className="flex items-center gap-3 w-full md:w-auto">
                <ArrowUpDown className="w-5 h-5 text-neutral-500 hidden md:block" />
                <label htmlFor="price-sort" className="font-semibold text-neutral-700 whitespace-nowrap">
                    Sort by:
                </label>
                <select
                    id="price-sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full md:w-48 bg-white border border-neutral-300 text-neutral-800 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 outline-none transition"
                >
                    <option value="Default">Default</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                </select>
            </div>

        </div>
    );
}

export default FilterSortBar;
