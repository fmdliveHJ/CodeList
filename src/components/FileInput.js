import { useEffect, useRef, useState } from "react";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();
  /**
   * input의 file은 value값이 비제어 컴포넌트라서 적용안됨
   * file의 value값은 props로 전달 받기 위해 상위 컴포넌트로 넘겨줌
   * reviewForm에서 values의 객체 속성으로 imgFile을 주고
   * name과 value 속성을 props로 전달해줌
   * 전달 받은 name과 value 속성은 onChange 함수로 전달 받고 속성을 요청
   */
  const handleChange = (e) => {
    //파일프로퍼티의 0번인덱스에 값으로 변수를 만듬
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  useEffect(() => {
    if (!value) return;
    //문자열 리턴하는 함수
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);
    //사이드 이펙트 정리
    //사이드 이펙트 = objectUrl을 만들면서 웹 브라우저가할당한 메모리
    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      {/* file input의 state를 props로 변경 상위 컴포넌트인 reviewForm컴포넌트에 있는 state를 내려받음  */}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
