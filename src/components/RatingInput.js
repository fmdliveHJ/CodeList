import { useState } from "react";
import Rating from "./Rating";
import "./RatingInput.css";

//name input input의 값과 이름 ,  onchange input을 선택했을때 함수
function RatingInput({ name, value, onChange }) {
  //선택한 별점 보여주거나 마우스 올렸을때 별점 미리보기
  const [rating, setRating] = useState(value);
  const handleSelect = (nextValue) => onChange(name, nextValue);
  const handleMouseOut = () => setRating(value);

  return (
    <Rating
      className="RatingInput"
      value={rating}
      onSelect={handleSelect}
      onHover={setRating}
      onMouseOut={handleMouseOut}
    />
  );
}

export default RatingInput;
