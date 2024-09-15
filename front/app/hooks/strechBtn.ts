import { useCallback, useState } from "react";

export const useStretchBtn = (init: number) => {
  const [limit, setLimit] = useState<number>(init);
  const stretchLimit = useCallback(() => {
    setLimit((value) => value + init);
  }, []);
  return { limit, stretchLimit };
};
