import API from "../../api/axios";


// ======================
// Apply Leave
// ======================

export const applyLeave = async (leaveData) => {
  const response = await API.post(
    "/leaves",
    leaveData
  );

  return response.data;
};


// ======================
// Get All Leaves
// ======================

export const getLeaves = async (
  query = ""
) => {
  const response = await API.get(
    `/leaves${query}`
  );

  return response.data;
};


// ======================
// Get Single Leave
// ======================

export const getLeaveById = async (
  id
) => {
  const response = await API.get(
    `/leaves/${id}`
  );

  return response.data;
};


// ======================
// Update Leave
// ======================

export const updateLeave = async ({
  id,
  leaveData,
}) => {
  const response = await API.put(
    `/leaves/${id}`,
    leaveData
  );

  return response.data;
};


// ======================
// Delete Leave
// ======================

export const deleteLeave = async (
  id
) => {
  const response = await API.delete(
    `/leaves/${id}`
  );

  return response.data;
};


// ======================
// Pending Leaves
// ======================

export const getPendingLeaves =
  async () => {
    const response = await API.get(
      "/leaves/pending/all"
    );

    return response.data;
  };


// ======================
// Approve Leave
// ======================

export const approveLeave = async (
  id
) => {
  const response = await API.put(
    `/leaves/${id}/approve`
  );

  return response.data;
};


// ======================
// Reject Leave
// ======================

export const rejectLeave = async ({
  id,
  managerComments,
}) => {
  const response = await API.put(
    `/leaves/${id}/reject`,
    { managerComments }
  );

  return response.data;
};


const leaveAPI = {
  applyLeave,
  getLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
  getPendingLeaves,
  approveLeave,
  rejectLeave,
};

export default leaveAPI;