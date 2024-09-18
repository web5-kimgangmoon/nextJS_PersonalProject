import { usePopup } from "@/app/hooks/callback/popUp";
import { Button, ImgButton } from "../buttons";
import { useQueryClient } from "@tanstack/react-query";
import { useWithdraw } from "@/app/lib/actions";
import { useModalText } from "@/app/hooks/modal";
import { Modal_little } from "../modal";

export const Withdraw = () => {
  const queryClient = useQueryClient();
  const modalText = useModalText();
  const withdraw = useWithdraw(async () => {
    await queryClient.refetchQueries({ queryKey: ["get", "userInfo", "own"] });
  }, modalText.openText);
  return (
    <div>
      <div className="flex gap-4 justify-center p-4">
        <Button
          color="red"
          radius="medium"
          onClick={async () => await withdraw.mutate}
        >
          회원탈퇴
        </Button>
      </div>
      <div className="p-4">
        <div className="text-alert font-bold">경고</div>
        <div className="text-xs text-textBlue">
          탈퇴후에도 회원정보가 남아있으며, 재가입시에 기존의 회원정보를
          바탕으로 복구됩니다. 하지만 서버상황에 따라 복구가 불가능할 수
          있습니다. 그래도 탈퇴하시겠습니까?
        </div>
      </div>
      <Modal_little modalCtl={modalText.is} closeModalCtl={modalText.close}>
        {modalText.text}
      </Modal_little>
    </div>
  );
};
