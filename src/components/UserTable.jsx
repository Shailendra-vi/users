import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserTable = ({ loading, error }) => {
    const userList = useSelector((state) => state?.data?.users);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const keys = ["name", "email", "phone", "address"];


    // Filter users with selected city
    const filteredUsers = userList?.filter((user) => {
        const matchesName = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCity = selectedCity
            ? user.address?.city.toLowerCase() === selectedCity.toLowerCase()
            : true;
        return matchesName && matchesCity;
    });

    const cities = [...new Set(userList?.map((user) => user.address?.city))];

    // If Loading
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h2 className="text-2xl font-bold text-gray-300 tracking-wide">
                    Loading...
                </h2>
            </div>
        );
    }

    // If error occurred
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h2 className="text-2xl font-bold text-red-400 tracking-wide">
                    Error: {error}
                </h2>
            </div>
        );
    }

    // If userlist has no data
    if (!userList || userList.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h2 className="text-2xl font-bold text-gray-300 tracking-wide">
                    No Users Found
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-10">
            <div className="w-full max-w-6xl mx-auto bg-gray-800 shadow-2xl rounded-xl border border-gray-700 p-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                    {/* Search by name */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name"
                        className="w-full md:w-1/3 px-4 py-2 bg-gray-700 text-gray-300 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Filter by city */}
                    <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full md:w-1/4 px-4 py-2 bg-gray-700 text-gray-300 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">All Cities</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Table data to be renderred */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <TableHeader columns={keys} />
                        <TableData data={filteredUsers} keys={keys} clickableKey="name" />
                    </table>
                </div>
            </div>
        </div>
    );
};

// Table header
const TableHeader = ({ columns = [] }) => {
    return (
        <thead className=" bg-gray-700 text-gray-300">
            <tr>
                {columns.map((column, index) => (
                    <th
                        key={index}
                        className="px-6 py-3 text-left text-sm font-bold tracking-wider uppercase border-b border-gray-600"
                    >
                        {column}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

// Table rows
const TableData = ({ data = [], keys = [], clickableKey = "" }) => {
    const navigate = useNavigate();

    const handleNameClick = (item) => {
        navigate(`/user/${item.id}`);
    };

    return (
        <tbody className="bg-gray-800 divide-y divide-gray-700">
            {data?.map((item, index) => (
                <tr
                    key={index}
                    className="from-gray-700 via-gray-800 to-gray-700 hover:bg-gradient"
                >
                    {keys.map((keyName, i) => {
                        const isClickable = clickableKey.toLowerCase() === keyName.toLowerCase();
                        return (
                            <td
                                key={i}
                                className={`px-6 py-4 whitespace-nowrap text-sm ${isClickable ? "cursor-pointer" : ""
                                    }`}
                                onClick={() => {
                                    if (isClickable) {
                                        handleNameClick(item);
                                    }
                                }}
                            >
                                <div
                                    className={`${isClickable
                                        ? "text-blue-400 hover:text-blue-500 font-semibold transition duration-300 ease-in-out transform hover:scale-105"
                                        : "text-gray-300"
                                        }`}
                                >
                                    {keyName.toLowerCase() !== "address"
                                        ? item[keyName]
                                        : `${item[keyName]?.street}, ${item[keyName]?.suite}, ${item[keyName]?.city}, ${item[keyName]?.zipcode}`}
                                </div>
                            </td>
                        );
                    })}
                </tr>
            ))}
        </tbody>
    );
};

export default UserTable;
