import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

const EditLeave = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    });

  // Fetch Leave Details

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const { data } = await API.get(
          `/leaves/${id}`
        );

        const leave = data.leave || data;

        setFormData({
          leaveType: leave.leaveType || "",
          startDate: leave.startDate
            ? leave.startDate.split("T")[0]
            : "",
          endDate: leave.endDate
            ? leave.endDate.split("T")[0]
            : "",
          reason: leave.reason || "",
        });
      } catch (error) {
        toast.error(
          "Failed to fetch leave details"
        );
      }
    };

    fetchLeave();
  }, [id]);

  // Handle Input Change

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // Update Leave

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await API.put(
        `/leaves/${id}`,
        formData
      );

      toast.success(
        "Leave Updated Successfully"
      );

      navigate("/employee/history");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to update leave"
      );

    } finally {

      setIsLoading(false);
    }
  };

  return (
    <div className="p-5">

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Leave Request
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Leave Type */}

          <div>
            <label className="block mb-2 font-medium">
              Leave Type
            </label>

            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="">
                Select Leave Type
              </option>

              <option value="Sick">
                Sick
              </option>

              <option value="Casual">
                Casual
              </option>

              <option value="Annual">
                Annual
              </option>
            </select>
          </div>

          {/* Start Date */}

          <div>
            <label className="block mb-2 font-medium">
              Start Date
            </label>

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          {/* End Date */}

          <div>
            <label className="block mb-2 font-medium">
              End Date
            </label>

            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          {/* Reason */}

          <div>
            <label className="block mb-2 font-medium">
              Reason
            </label>

            <textarea
              name="reason"
              rows="4"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason"
              className="w-full border p-3 rounded"
            />
          </div>

          {/* Buttons */}

          <div className="flex gap-3">

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-5 py-3 rounded w-full"
            >
              {isLoading
                ? "Updating..."
                : "Update Leave"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/employee/history")
              }
              className="bg-gray-500 text-white px-5 py-3 rounded w-full"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditLeave;