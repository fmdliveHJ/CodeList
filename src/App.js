import { useEffect, useState } from "react";
import { getReviews } from "./api";
import ReviewList from "./components/ReviewList";

const LIMIT = 3;

function App() {
  const [order, setOrder] = useState("createdAt");
  //item state의 초기값으로 빈배열을 넣어줌
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [offset, setOffset] = useState(0);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  //api에서 목록에 더 있는지 아닌지 hasNext로 확인할수 있음

  const [hasNext, setHasNext] = useState(false);
  const handleNewestClick = () => setOrder("createdAt");

  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  //비동기 함수
  //setItems에
  const handleLoad = async (option) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(option);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { reviews, paging } = result;
    if (option.offset === 0) {
      setItems(reviews);
    } else {
      //여기서 prev는 고정값이 아니라 현재시점의 state값을 말함
      setItems((prev) => [...prev, ...reviews]);
    }
    setOffset(option.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  const handleMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  /**
   * 비동기 함수 실행후
   * 리뷰수 변수 setItems에 state를 변경 해서 app컴포넌트를 리랜더링함
   * 이때 또다시 핸들 함수를 실행 > 무한 루프
   */
  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {/* <button onClick={handleLoadClick}>불러오기</button> */}
      {hasNext && (
        <button disabled={isLoading} onClick={handleMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
