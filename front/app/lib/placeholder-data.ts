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
export const categoryInfo = {
  path: "/humor",
  name: "유머",
  img: "/baseBoardImg.png",
  description: "아아아",
  cmtPlacholder: "댓글 placeholder입니다~",
  titlePlaceholder: "게시글 제목 placeholder입니다~",
  descriptionPlaceholder: "게시글  설명글 placeholder입니다~",
  contentPlaceholder: "게시글 내용 placeholder입니다~",
  boardCnt: "게",
  rules: ["아아", "이런곳에서"],
  categoryInformBoard,
};

{
  cmtList: Array<{
    id: number;
    writer: string;
    writerId: number;
    createdAt: Date;
    content: string;
    isUpdated: boolean;
    like: number;
    dislike: number;
    img: string;
    isDoLike: boolean;
    isDoDislike: boolean;
    boardId: number;
    categoryPath: string;
    category: string;
    boardTitle: string;
    cmtCnt: number;
    isDeleted: boolean;
  }>;
}
//'<div><div style="width: 10rem; height: 10rem;"><img src="/baseBoardImg.png" style="width: 100%; height: 100%;"></div><div><span style="color: #042552;font-size: 0.75rem;">(*수정됨)</span>아아아</div></div>';
