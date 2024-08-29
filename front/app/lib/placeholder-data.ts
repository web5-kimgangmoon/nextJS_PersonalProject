import { CategoryBoard } from "./definitions";

export const categoryList = [
  { title: "전체", href: "/category" },
  { title: "공지", href: "/category/inform" },
  { title: "잡담", href: "/talk" },
  { title: "유머", href: "/category/humor" },
  { title: "자랑", href: "/category/goodItem" },
  { title: "질문", href: "/category/question" },
];
export const userInfo = {
  profileImg: "/placeholder-noavatar32.svg",
  isLogin: true,
};
// export const boardList: CategoryBoard[] = [{}];
export const categoryInformBoard: CategoryBoard = {
  isTop: true,
  commentNum: 32,
  boardId: 24,
  categoryPath: "all",
  createdAt: new Date(Date.now() - 6048000000),
  img: "/baseBoardImg.png",
  category: "공지",
  content: "내용",
  title: "타이틀",
  writer: "작성자",
  writerId: 23,
};
