import { useCallback, useState } from "react";

export const useStretchBtn = () => {
  const [limit, setLimit] = useState<number>(5);
  const stretchLimit = useCallback(() => {
    setLimit((value) => value + 5);
  }, []);
  return { limit, stretchLimit };
};
