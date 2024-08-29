import { Button, LinkButton, ImgButton } from "../ui/buttons";

export default function () {
  return (
    <div className="p-5">
      <ImgButton
        color="whiteGray"
        img={"./googleLogo.svg"}
        size="short"
        nobold={true}
        radius="little"
      >
        Google
      </ImgButton>
      <Button color="pink" radius="little">
        검색
      </Button>
      <LinkButton
        href="/"
        color="whiteGray"
        img={"./googleLogo.svg"}
        size="smallest"
        nobold={true}
        radius="little"
      >
        게시글 작성 완료
      </LinkButton>
    </div>
  );
}
