import { useMutation, UseMutationResult } from "@tanstack/react-query";
import serverAxios from "./serverActionAxios";
import { AxiosResponse } from "axios";

export const useBoardAdd = (
  refetch: () => void,
  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync } = useMutation({
    mutationKey: ["board", "post"],
    mutationFn: async (
      formData: FormData
    ): Promise<UseMutationResult<AxiosResponse<any, any>, any>> => {
      return await serverAxios.post(`/board`, formData, {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      });
    },
    onSuccess: () => {
      refetch();
    },
    onError: (err: any) => {
      modalTextSet(err.response.data);
    },
  });
  return { mutate, mutateAsync };
};
export const useBoardRemake = (
  refetch: () => void,
  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync } = useMutation({
    mutationKey: ["board", "patch"],
    mutationFn: async ({
      formData,
      boardId,
    }: {
      formData: FormData;
      boardId: number;
    }): Promise<UseMutationResult<AxiosResponse<any, any>, any>> => {
      return await serverAxios.patch(`/board/${boardId}`, formData, {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      });
    },
    onSuccess: () => {
      refetch();
    },
    onError: (err: any) => {
      modalTextSet(err.response.data);
    },
  });
  return { mutate, mutateAsync };
};
export const useBoardDelete = (
  refetch: () => void,
  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync } = useMutation({
    mutationKey: ["board", "delete"],
    mutationFn: async (
      boardId: number
    ): Promise<UseMutationResult<AxiosResponse<any, any>, any>> => {
      return await serverAxios.delete(`/board/${boardId}`);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (err: any) => {
      modalTextSet(err.response.data);
    },
  });
  return { mutate, mutateAsync };
};
export const useWithdraw = (
  refetch: () => void,
  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync } = useMutation({
    mutationKey: ["user", "delete", "own"],
    mutationFn: async (): Promise<
      UseMutationResult<AxiosResponse<any, any>, any>
    > => {
      return await serverAxios.delete(`/user`);
    },
    onSuccess: () => {
      refetch();
    },
    onError: (err: any) => {
      err.response.response.status === 400 && modalTextSet(err.response.data);
    },
  });
  return { mutate, mutateAsync };
};
export const useProfileUpdate = (
  refetch: () => void,
  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync } = useMutation({
    mutationKey: ["user", "patch", "own"],
    mutationFn: async (
      formData: FormData
    ): Promise<UseMutationResult<AxiosResponse<any, any>, any>> => {
      return await serverAxios.patch(`/user`, formData, {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      });
    },
    onSuccess: () => {
      refetch();
    },
    onError: (err: any) => {
      modalTextSet(err.response.data);
    },
  });
  return { mutate, mutateAsync };
};

export const useBoardGiveScore = (
  refetch: () => void,

  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync } = useMutation({
    mutationKey: ["board", "eval", "post"],
    mutationFn: async ({
      boardId,
      score,
    }: {
      boardId: number;
      score: number;
    }): Promise<UseMutationResult<AxiosResponse<any, any>, any>> => {
      return await serverAxios.post(`/board/eval/${boardId}`, { score });
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      modalTextSet("게시글 평가에 실패했습니다");
    },
  });
  return { mutate, mutateAsync };
};

export const useBoardReport = (
  refetch: () => void,

  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync, data } = useMutation({
    mutationKey: ["post", "board", "report"],
    mutationFn: async ({
      boardId,
      reasonId,
    }: {
      boardId: number;
      reasonId: number;
    }): Promise<UseMutationResult<AxiosResponse<any, any>, any>> => {
      return await serverAxios.post(`/board/report/${boardId}`, {
        reportReasonId: reasonId,
      });
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      modalTextSet("게시글 신고에 실패했습니다");
    },
  });
  return { mutate, mutateAsync, data };
};
export const useCmtReport = (
  refetch: () => void,

  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync, data } = useMutation({
    mutationKey: ["post", "cmt", "report"],
    mutationFn: async ({
      cmtId,
      reasonId,
    }: {
      cmtId: number;
      reasonId: number;
    }): Promise<UseMutationResult<AxiosResponse<any, any>, any>> => {
      return await serverAxios.post(`/cmt/report/${cmtId}`, {
        reportReasonId: reasonId,
      });
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      modalTextSet("댓글 신고에 실패했습니다");
    },
  });
  return { mutate, mutateAsync, data };
};
export const useAddCmt = (
  refetch: () => void,

  modalTextSet: (test: string) => void
) => {
  const { mutate, mutateAsync, data } = useMutation({
    mutationKey: ["post", "cmt"],
    mutationFn: async ({
      formData,
      boardId,
      replyId,
    }: {
      formData: FormData;
      boardId?: number;
      replyId?: number;
    }): Promise<UseMutationResult<AxiosResponse<any, any>, any>> => {
      return await serverAxios.post(`/cmt`, formData, {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
        params: { boardId: boardId, replyId: replyId },
      });
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      modalTextSet("댓글 작성에 실패했습니다");
    },
  });
  return { mutate, mutateAsync, data };
};
export const useUpdateCmt = (
  refetch: () => void,

  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync, data } = useMutation({
    mutationKey: ["patch", "cmt"],
    mutationFn: async ({
      formData,
      cmtId,
    }: {
      formData: FormData;
      cmtId: number;
    }): Promise<UseMutationResult<AxiosResponse<any, any>, any>> => {
      return await serverAxios.patch(`/cmt/${cmtId}`, formData, {
        headers: {
          "Content-Type": "mutipart/form-data",
        },
      });
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      modalTextSet("댓글 수정에 실패했습니다.");
    },
  });
  return { mutate, mutateAsync, data };
};
export const useDeleteCmt = (
  refetch: () => void,

  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync, data } = useMutation({
    mutationKey: ["delete", "cmt"],
    mutationFn: async ({
      cmtId,
    }: {
      cmtId: number;
    }): Promise<UseMutationResult<AxiosResponse<any, any>, any>> => {
      return await serverAxios.delete(`/cmt/${cmtId}`);
    },
    onSuccess: async () => {
      refetch();
    },
    onError: () => {
      modalTextSet("댓글 삭제에 실패했습니다.");
    },
  });
  return { mutate, mutateAsync, data };
};
export const useLikeCmt = (
  refetch: () => void,

  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync, data } = useMutation({
    mutationKey: ["post", "cmt", "like"],
    mutationFn: async ({
      cmtId,
      isDislike,
    }: {
      cmtId: number;
      isDislike: boolean;
    }): Promise<UseMutationResult<AxiosResponse<any, any>, any>> => {
      return await serverAxios.post(`/cmt/like/${cmtId}`, { isDislike });
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      modalTextSet("댓글 (비)추천에 실패했습니다.");
    },
  });
  return { mutate, mutateAsync, data };
};
export const useLogout = (
  refetch: () => void,

  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync } = useMutation({
    mutationKey: ["user", "logout", "post"],
    mutationFn: async () => {
      return await serverAxios.post(`/user/logout`);
    },
    onSuccess: async () => {
      await refetch();
    },
    onError: () => {
      modalTextSet("로그아웃에 실패했습니다");
    },
  });
  return { mutate, mutateAsync };
};
export const useLogin = (
  set: () => void,
  router: () => void,
  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync } = useMutation({
    mutationKey: ["user", "login", "post"],
    mutationFn: async ({
      id,
      pwd,
      isAdminLogin,
    }: {
      id: string;
      pwd: string;
      isAdminLogin: string;
    }) => {
      return await serverAxios.post(
        `/user/login`,
        { id, pwd },
        { params: { isAdminLogin: isAdminLogin } }
      );
    },
    onSuccess: (item) => {
      item?.status === 204 && router();
    },
    onError: (err: any) => {
      if (err.status === 400) {
        modalTextSet(err.response.data);
        set();
      }
    },
  });
  return { mutate, mutateAsync };
};
export const useRegist = (
  set: () => void,
  router: () => void,
  modalTextSet: (text: string) => void
) => {
  const { mutate, mutateAsync } = useMutation({
    mutationKey: ["user", "regist", "post"],
    mutationFn: async ({
      nick,
      email,
      pwd,
    }: {
      nick: string;
      email: string;
      pwd: string;
    }) => {
      return await serverAxios.post(`/user/regist`, { nick, email, pwd });
    },
    onSuccess: (data) => {
      data?.status === 204 && router();
    },
    onError: (err: any) => {
      if (err.status === 400) {
        modalTextSet(err.response.data);
        set();
      }
    },
  });
  return { mutate, mutateAsync };
};
export const oauthLogin = (token: string, oauth: "google" | "facebook") => {
  console.log("token은 ", token);
};
