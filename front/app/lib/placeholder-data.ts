import { CategoryBoard } from "./definitions";

export const categoryList = [
  { title: "전체", path: "all" },
  { title: "공지", path: "inform" },
  { title: "잡담", path: "talk" },
  { title: "유머", path: "humor" },
  { title: "자랑", path: "goodItem" },
  { title: "질문", path: "question" },
];
export const userInfo = {
  profileImg: "/placeholder-noavatar32.svg",
  isLogin: true,
};
export const boardList: CategoryBoard[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];
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
export const countBoard = 132;
export const currentBoard = {
  isLogin: true,
  isWriter: true,
  category: "유머",
  categoryPath: "humor",
  title: "이타치가 왜 강한줄 아나?",
  commentNum: 32,
  boardId: 24,
  createdAt: new Date(Date.now() - 6048000000),
  img: "/baseBoardImg.png",
  content: "내용",
  writer: "작성자",
  writerId: 23,
  score: 4.3,
  scoreUserCnt: 32,
  isGiveScore: false,
  isDidReport: false,
};
export const boardReportList: {
  value: string;
  title: string;
  description?: string;
}[] = [
  { value: "1", title: "그냥 심심풀이" },
  { value: "2", title: "매너가 나쁩니다", description: "ㅇㅇ." },
  { value: "3", title: "그냥 싫습니다", description: "그럴수도 있죠" },
];
