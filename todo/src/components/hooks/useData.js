import { useState } from "react";

const useData = () => {
  const [data, setData] = useState("");
  const changeData = (e) => {
    setData(e.target.value);
  };
  const clear = () => {
    setData("");
  };
  return { data, changeData, clear };
};
export default useData;
