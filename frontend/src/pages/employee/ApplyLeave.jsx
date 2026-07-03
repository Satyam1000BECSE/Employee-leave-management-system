import { useState } from "react";

import { useDispatch } from "react-redux";

import { applyLeave } from "../../features/leave/leaveSlice";

import toast from "react-hot-toast";

const ApplyLeave = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] =
    useState({
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await dispatch(
      applyLeave(formData)
    );

    toast.success(
      "Leave Applied Successfully"
    );
  };

  return (
    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Apply Leave
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg"
      >

        <select
          name="leaveType"
          onChange={handleChange}
          className="border p-3 w-full"
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

        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <textarea
          name="reason"
          placeholder="Reason"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <button className="bg-blue-600 text-white px-5 py-3 rounded">
          Apply
        </button>

      </form>

    </div>
  );
};

export default ApplyLeave;