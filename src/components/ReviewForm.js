import React, { useState } from "react";
import { createReview } from "../api";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";
const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};
const ReviewForm = ({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmitSuccess,
  onSubmit,
  onCancel,
}) => {
  // const [title, setTitle] = useState("");
  // const [rating, setRating] = useState(0);
  // const [content, setContent] = useState("");

  /**
   * state 하나로 죽이기
   */
  //  const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  // };

  // const handleRatingChange = (e) => {
  //   const nextRating = Number(e.target.value) || 0;
  //   setRating(nextRating);
  // };

  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  // };
  //이벤트 객체에서 name값을 가져오는 것을 활용
  const [isSubmit, setIsSubmit] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  //name과 value를 파라미터로 받고 set함수를 호출함
  const handleChange = (name, value) => {
    setValues((prev) => ({
      ...prev,
      //name의 값으로 프로퍼티명 지정, value로 해당 하는 값 지정
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);
    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit(formData);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { review } = result;
    setValues(INITIAL_VALUES);
    onSubmitSuccess(review);
    console.log({
      values,
    });
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
        initialPreview={initialPreview}
      />
      <input
        type="text"
        name="title"
        value={values.title}
        onChange={handleInputChange}
      />
      <RatingInput
        type="number"
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      ></textarea>
      <button type="submit" disabled={isSubmit}>
        확인{" "}
      </button>
      {onCancel && <button onClick={onCancel}>취소</button>}
      {submitError?.message && <div>{submitError.message}</div>}
    </form>
  );
};

export default ReviewForm;
