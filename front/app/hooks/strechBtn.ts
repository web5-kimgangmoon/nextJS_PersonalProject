import { useCallback, useState } from "react";

export const useStretchBtn = () => {
  const [limit, setLimit] = useState<number>(2);
  const stretchLimit = useCallback(() => {
    setLimit((value) => value + 2);
  }, []);
  return { limit, stretchLimit };
};
