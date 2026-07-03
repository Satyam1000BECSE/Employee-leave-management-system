import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

const PendingLeaves = () => {
    const navigate = useNavigate();

    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [leaveTypeFilter, setLeaveTypeFilter] =
        useState("");

    const [comment, setComment] = useState("");

    const fetchLeaves = async () => {
        try {
            setLoading(true);

            const { data } = await API.get(
                "/leaves/pending/all"
            );

            setLeaves(data.leaves || data);

        } catch (error) {

            toast.error(
                "Failed to fetch leaves"
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const approve = async (id) => {
        try {

            await API.put(
                `/leaves/${id}/approve`
            );

            toast.success(
                "Leave Approved"
            );

            fetchLeaves();

        } catch (error) {

            toast.error(
                error.response?.data?.message
            );
        }
    };

    const reject = async (id) => {

        if (!comment) {
            return toast.error(
                "Please enter comment"
            );
        }

        try {

            await API.put(
                `/leaves/${id}/reject`,
                {
                    managerComments: comment,
                }
            );

            toast.success(
                "Leave Rejected"
            );

            setComment("");

            fetchLeaves();

        } catch (error) {

            toast.error(
                error.response?.data?.message
            );
        }
    };

    // Search + Filter

    const filteredLeaves = leaves.filter(
        (leave) => {

            const employeeName =
                leave.employee?.name || "";

            const leaveType =
                leave.leaveType || "";

            const searchMatch =
                employeeName
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const leaveTypeMatch =
                leaveTypeFilter === ""
                    ? true
                    : leaveType === leaveTypeFilter;

            return (
                searchMatch &&
                leaveTypeMatch
            );
        }
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <h1 className="text-2xl">
                    Loading...
                </h1>
            </div>
        );
    }

    return (
        <div className="p-5">

            <h1 className="text-3xl font-bold mb-5">
                Pending Leave Requests
            </h1>

            {/* Search + Filter */}

            {/* Search + Filter */}

            <div className="flex flex-col md:flex-row gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Search Employee Name"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="border p-3 rounded w-full"
                />

                <select
                    value={leaveTypeFilter}
                    onChange={(e) =>
                        setLeaveTypeFilter(
                            e.target.value
                        )
                    }
                    className="border p-3 rounded"
                >
                    <option value="">
                        All Leave Types
                    </option>

                    <option value="Casual">
                        Casual
                    </option>

                    <option value="Sick">
                        Sick
                    </option>

                    <option value="Annual">
                        Annual
                    </option>

                </select>

            </div>

            {filteredLeaves.length > 0 ? (

                filteredLeaves.map((leave) => (

                    <div
                        key={leave._id}
                        className="bg-white shadow rounded p-5 mb-5"
                    >

                        <h2 className="text-xl font-semibold mb-3">
                            {leave.employee?.name}
                        </h2>

                        <p>
                            <strong>Email:</strong>{" "}
                            {leave.employee?.email}
                        </p>

                        <p>
                            <strong>Department:</strong>{" "}
                            {leave.employee?.department}
                        </p>

                        <p>
                            <strong>Leave Type:</strong>{" "}
                            {leave.leaveType}
                        </p>

                        <p>
                            <strong>Reason:</strong>{" "}
                            {leave.reason}
                        </p>

                        <p>
                            <strong>Start Date:</strong>{" "}
                            {new Date(
                                leave.startDate
                            ).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>End Date:</strong>{" "}
                            {new Date(
                                leave.endDate
                            ).toLocaleDateString()}
                        </p>

                        <p className="mb-3">
                            <strong>Status:</strong>{" "}

                            <span className="bg-yellow-500 text-white px-3 py-1 rounded">
                                {leave.status}
                            </span>
                        </p>

                        {/* Comment */}

                        <textarea
                            placeholder="Manager Comments"
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            className="border p-3 rounded w-full mb-4"
                        />

                        <div className="flex flex-wrap gap-3">

                            <button
                                onClick={() =>
                                    navigate(
                                        `/manager/leave/${leave._id}`
                                    )
                                }
                                className="bg-gray-700 text-white px-4 py-2 rounded"
                            >
                                View Details
                            </button>

                            <button
                                onClick={() =>
                                    approve(leave._id)
                                }
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                Approve
                            </button>

                            <button
                                onClick={() =>
                                    reject(leave._id)
                                }
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Reject
                            </button>

                        </div>

                    </div>

                ))

            ) : (

                <div className="text-center mt-10">
                    <h2 className="text-2xl text-gray-500">
                        No Pending Requests
                    </h2>
                </div>

            )}

        </div>
    );
};

export default PendingLeaves;