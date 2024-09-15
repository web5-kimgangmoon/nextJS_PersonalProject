import { useMutation, UseMutationResult } from "@tanstack/react-query";
import serverAxios from "./serverActionAxios";
import { AxiosResponse } from "axios";

export const boardDelete = (boardId: number) => {
  return "";
};

export const useBoardGiveScore = (refetch: () => void) => {
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
  });
  return { mutate, mutateAsync };
};

export const useBoardReport = (refetch: () => void) => {
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
  });
  return { mutate, mutateAsync, data };
};
export const useCmtReport = (refetch: () => void) => {
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
  });
  return { mutate, mutateAsync, data };
};
export const useAddCmt = (refetch: () => void) => {
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
    onSettled: () => {
      refetch();
    },
  });
  return { mutate, mutateAsync, data };
};
export const useUpdateCmt = (refetch: () => void) => {
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
    onSettled: () => {
      refetch();
    },
  });
  return { mutate, mutateAsync, data };
};
export const useDeleteCmt = (refetch: () => void) => {
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
  });
  return { mutate, mutateAsync, data };
};
export const useLikeCmt = (refetch: () => void) => {
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
  });
  return { mutate, mutateAsync, data };
};
export const useLogout = (refetch: () => void) => {
  const { mutate, mutateAsync } = useMutation({
    mutationKey: ["user", "logout", "post"],
    mutationFn: async () => {
      return await serverAxios.post(`/user/logout`);
    },
    onSuccess: async () => {
      await refetch();
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
