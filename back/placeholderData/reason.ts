import Reason from "../models/reasons";

// reasonType: "BAN" | 
//                      "CMT_REPORT" | 
//                      "CMT_DELETE" | 
//                      "BOARD_DELETE"|
//                      "BOARD_REPORT"
export const createReason = async () => {
  const reasonData: {
    title: string;
    description: string;
    reasonType: string;
  }[] = [
    {
      title: "욕설이나 비방",
      description: "",
      reasonType: "CMT_REPORT",
    },

    {
      title: "공격적인 어조",
      description: "상대를 내리깎는 어조.",
      reasonType: "CMT_REPORT",
    },

    {
      title: "도배",
      description: "무분별한 수의 댓글 작성.",
      reasonType: "CMT_REPORT",
    },
    {
      title: "욕설이나 비방",
      description: "",
      reasonType: "BOARD_REPORT",
    },

    {
      title: "저격",
      description: "특정한 인물을 지목하고 비난하는 행위.",
      reasonType: "BOARD_REPORT",
    },
  ];

  reasonData;
  for (let item of reasonData) {
    await Reason.create(item);
  }
};
