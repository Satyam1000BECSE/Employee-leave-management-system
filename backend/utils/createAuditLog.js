import AuditLog from "../models/AuditLog.js";

const createAuditLog = async ({
  userId,
  action,
  entity,
  entityId,
  details,
}) => {
  try {
    await AuditLog.create({
      user: userId,
      action,
      entity,
      entityId,
      details,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export default createAuditLog;