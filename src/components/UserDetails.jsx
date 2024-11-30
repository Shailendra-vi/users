import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MailIcon, PhoneIcon, GlobeIcon, HomeIcon, OfficeBuildingIcon } from '@heroicons/react/outline';

const UserDetails = () => {
    const userList = useSelector((state) => state?.data?.users);
    const navigate = useNavigate();
    const { id } = useParams();
    const user = userList?.find((user) => user.id === parseInt(id));

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
                <h2 className="text-4xl font-bold text-red-400">User Not Found</h2>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
            <div className="bg-gray-800 shadow-2xl rounded-lg overflow-hidden max-w-4xl w-full border border-gray-700">
                <div className="p-6">
                    <div className="flex items-center gap-6">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=100`}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full border-2 border-blue-500"
                        />
                        <div>
                            <h2 className="text-4xl font-bold text-gray-200">{user.name}</h2>
                            <p className="text-gray-400 text-lg italic">{user.username}</p>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-4">Contact Information</h3>
                            <p className="flex items-center gap-2 text-gray-400">
                                <MailIcon className="w-5 h-5 text-blue-400" /> {user.email}
                            </p>
                            <p className="flex items-center gap-2 text-gray-400">
                                <PhoneIcon className="w-5 h-5 text-green-400" /> {user.phone}
                            </p>
                            <p className="flex items-center gap-2 text-gray-400">
                                <GlobeIcon className="w-5 h-5 text-yellow-400" />
                                <a
                                    href={`https://${user.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                >
                                    {user.website}
                                </a>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-300 mb-4">Address</h3>
                            <p className="flex items-center gap-2 text-gray-400">
                                <HomeIcon className="w-5 h-5 text-red-400" /> {user.address.street}, {user.address.suite}
                            </p>
                            <p className="text-gray-400">{user.address.city}, {user.address.zipcode}</p>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-lg font-semibold text-gray-300 mb-4">Company</h3>
                            <p className="flex items-center gap-2 text-gray-400">
                                <OfficeBuildingIcon className="w-5 h-5 text-purple-400" /> {user.company.name}
                            </p>
                            <p className="text-gray-400">
                                <strong>CatchPhrase:</strong> {user.company.catchPhrase}
                            </p>
                            <p className="text-gray-400">
                                <strong>Business:</strong> {user.company.bs}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-700 p-4 text-center">
                    <div
                        className="text-blue-400 hover:text-blue-500 font-semibold transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                        onClick={() => navigate("/users")}
                    >
                        ← Back to User List
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
