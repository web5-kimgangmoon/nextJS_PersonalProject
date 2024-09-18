import Board from "../models/boards";
import Category from "../models/categories";
import CategoryRule from "../models/categoryRuleList";

export const createBoardNCategory = async () => {
  (
    await Category.create({
      path: "inform",
      name: "공지",
      cmtPlaceholder:
        "공지의 댓글입니다. 모두가  볼 수 있게 예쁜 댓글 부탁드려요.",
      titlePlaceholder: "운영자가 적는 제목",
      descriptionPlaceholder: "설명글을 적습니다.",
      contentPlaceholder: "내용을 적는 공간입니다.",
      description: "공지 적는 일에 설명이 필요한가요?",
    })
  ).$set(
    "informBoard",
    await Board.create({
      categoryId: 1,
      writerId: 1,
      title: "게시글 시작합니다",
      content: "게시글 시작합니다. 많은 이용 부탁드려요.",
      description: "소개글입니다. 게시글을 작성할 때 유의해 주세요.",
    })
  );

  const categoryData = [
    {
      path: "free",
      name: "자유",
      informId: 1,
      cmtPlaceholder:
        "자유 게시글입니다. 모두가 볼 수 있게 예쁜 댓글 부탁드려요.",
      titlePlaceholder: "자유롭게 적는 제목",
      descriptionPlaceholder: "설명글을 적습니다.",
      contentPlaceholder: "내용을 적는 공간입니다.",
      description: "자유롭게 게시글을 작성해보세요!",
    },
    {
      path: "talk",
      name: "잡담",
      informId: 1,
      cmtPlaceholder:
        "잡담의 게시글입니다. 모두가 볼 수 있게 예쁜 댓글 부탁드려요.",
      titlePlaceholder: "잡담 게시글의 제목",
      descriptionPlaceholder: "설명글을 적습니다.",
      contentPlaceholder: "내용을 적는 공간입니다.",
      description: "즐겁게 잡담을 즐겨보세요!",
    },
    {
      path: "humor",
      name: "유머",
      informId: 1,
      cmtPlaceholder:
        "유머의 게시글입니다. 모두가 볼 수 있게 예쁜 댓글 부탁드려요.",
      titlePlaceholder: "유머 게시글의 제목",
      descriptionPlaceholder: "설명글을 적습니다.",
      contentPlaceholder: "내용을 적는 공간입니다.",
      description: "즐겁게 유머를 즐겨보세요!",
    },
    {
      path: "goodItem",
      name: "자랑",
      informId: 1,
      cmtPlaceholder:
        "자랑의 게시글입니다. 모두가 볼 수 있게 예쁜 댓글 부탁드려요.",
      titlePlaceholder: "자랑 게시글의 제목",
      descriptionPlaceholder: "설명글을 적습니다.",
      contentPlaceholder: "내용을 적는 공간입니다.",
      description: "즐겁게 자랑해보세요!",
    },
    {
      path: "question",
      name: "질문",
      informId: 1,
      cmtPlaceholder:
        "질문의 게시글입니다. 모두가 볼 수 있게 예쁜 댓글 부탁드려요.",
      titlePlaceholder: "질문 게시글의 제목",
      descriptionPlaceholder: "설명글을 적습니다.",
      contentPlaceholder: "내용을 적는 공간입니다.",
      description: "궁금한 것을 물어봐주세요!",
    },
  ];

  const categories = ["공지", "자유", "잡담", "유머", "자랑", "질문"];

  const boarddata: {
    categoryId: number;
    writerId: number;
    title: string;
    content: string;
    description: string;
  }[] = [];
  for (let i = 0; i < 100; i++) {
    const random = Math.ceil(Math.random() * 6);
    boarddata.push({
      categoryId: random,
      writerId: random,
      title: `게시글 공간채우기입니다${i}${categories[random - 1]}`,
      content: `게시글 공간채웁시다! 공간 채웁시다!${i}${
        categories[random - 1]
      }`,
      description: `소개글입니다. ${i}${categories[random - 1]}`,
    });
  }
  for (let item of categoryData) {
    await Category.create(item);
  }
  for (let item of boarddata) {
    await Board.create(item);
  }
  await CategoryRule.create({
    categoryId: 2,
    description: "자유 게시글에선 자유롭게 글을 써주세요.",
  });
  await CategoryRule.create({
    categoryId: 2,
    description: "분쟁을 조장하는 글은 전면 금지합니다.",
  });
};
