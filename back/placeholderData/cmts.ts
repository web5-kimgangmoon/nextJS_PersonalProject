import { front } from "..";
import Cmt from "../models/cmts";

export const createCmt = async () => {
  // '<div><div><span style="color: #042552;font-size: 0.75rem;">(*수정됨)</span><span class="cmtTextContent">솔직하게 말할래 그만하자고 헷갈리는 이 관계 정리하자고 오늘부터 </span></div></div>',
  // '<div><div><span style="color: #042552;font-size: 0.75rem;"></span><span class="cmtTextContent">솔직하게 말할래 그만하자고 헷갈리는 이 관계 정리하자고 오늘부터 </span></div></div>',
  await Cmt.create({
    boardId: 1,
    // replyId
    writerId: 1,
    // deleteReasonId
    content: `<div><div style="width: 10rem; height: 10rem;"><img src="${front}baseBoardImg.png" style="width: 100%; height: 100%;"></div><div><span style="color: #042552;font-size: 0.75rem;"></span><span class="cmtTextContent">첫 번째 댓글입니다</span></div></div>`,
  });
  await Cmt.create({
    boardId: 1,
    replyId: 1,
    writerId: 1,
    // deleteReasonId
    content: `<div><div style="width: 10rem; height: 10rem;"><img src="${front}baseBoardImg.png" style="width: 100%; height: 100%;"></div><div><span style="color: #042552;font-size: 0.75rem;"></span><span class="cmtTextContent">첫 번째 댓글입니다</span></div></div>`,
  });
  await Cmt.create({
    boardId: 1,
    replyId: 1,
    writerId: 3,
    // deleteReasonId
    content: `<div><div style="width: 10rem; height: 10rem;"><img src="${front}baseBoardImg.png" style="width: 100%; height: 100%;"></div><div><span style="color: #042552;font-size: 0.75rem;"></span><span class="cmtTextContent">첫 번째 댓글입니다</span></div></div>`,
  });
  await Cmt.create({
    boardId: 1,
    replyId: 2,
    writerId: 2,
    // deleteReasonId
    content: `<div><div style="width: 10rem; height: 10rem;"><img src="${front}baseBoardImg.png" style="width: 100%; height: 100%;"></div><div><span style="color: #042552;font-size: 0.75rem;"></span><span class="cmtTextContent">첫 번째 댓글입니다</span></div></div>`,
  });
  const cmtData: {
    boardId: number;
    replyId?: number;
    writerId: number;
    deleteReasonId?: number;
    content: string;
  }[] = [];
  const roulette = 100;
  for (let i = 0; i < roulette; i++) {
    const random = Math.ceil(Math.random() * roulette);
    cmtData.push({
      boardId: random,
      // replyId:
      //   Math.round(Math.random()) === 1
      //     ? Math.ceil(Math.random() * i + 1)
      //     : undefined,
      writerId: Math.ceil(Math.random() * 6),
      content:
        Math.round(Math.random()) === 1
          ? `<div><div style="width: 10rem; height: 10rem;"><img src="${front}baseBoardImg.png" style="width: 100%; height: 100%;"></div><div><span style="color: #042552;font-size: 0.75rem;">${
              Math.round(Math.random()) === 1 ? "(*수정됨)" : ""
            }</span><span class="cmtTextContent">댓글 작성하고 있습니다${i} ${random}</span></div></div>`
          : `<div><div><span style="color: #042552;font-size: 0.75rem;">${
              Math.round(Math.random()) === 1 ? "(*수정됨)" : ""
            }</span><span class="cmtTextContent">댓글 작성하고 있습니다${i} ${random} </span></div></div>`,
    });
  }
  for (let item of cmtData) {
    await Cmt.create(item);
  }
};
