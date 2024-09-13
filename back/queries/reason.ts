import Reason from "../models/reasons";

export const getReasonList = async (reasonType: string | null) => {
  return await Reason.findAll({
    where: { deletedAt: null, reasonType: reasonType },
  });
};
