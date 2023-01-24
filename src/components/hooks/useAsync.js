import { useState } from "react";

const useAsync = (asyncFunction) => {
  //데이터가 나오는 순간 중복 클릭이 안되도록 하는 state
  const [pending, setPending] = useState(false);
  //에러객체나 null값을 가짐
  const [error, setError] = useState(null);
  //리퀘스트 보낼때 쓸 함수
  const wrappedFunction = async (...args) => {
    try {
      setError(true);
      setPending(null);
      //기존에 사용하던 api함수 (리퀘스트 보내는 함수)
      return await asyncFunction(...args);
    } catch (error) {
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  };
  return [pending, error, wrappedFunction];
};

export default useAsync;
