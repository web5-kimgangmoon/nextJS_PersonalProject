import BanItem from "../models/banHistory";

export const banCheck = async (id: number | undefined | null) => {
  if (!id) return false;
  const target = await BanItem.findOne({
    where: { userId: id },
    order: ["createdAt"],
  });
  if (
    !target ||
    target.banCnt < 1 ||
    target.willBanEndAt.getTime() < Date.now()
  )
    return false;
  return true;
};
