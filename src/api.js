const BASE_URL = "https://learn.codeit.kr/api";

export async function getReviews({
  order = "createAt",
  offset = 0,
  limit = 6,
  search = "",
}) {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(`${BASE_URL}/film-reviews?${query}`);
  if (!response.ok) {
    throw new Error("리뷰를 불러오는대 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function createReview(formData) {
  const response = await fetch(`${BASE_URL}/film-reviews`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰를 생성하는대 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
export async function updateReview(id, formData) {
  const response = await fetch(`${BASE_URL}/film-reviews/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("리뷰를 수정하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

/**
 *
 * 리뷰생성하고 받은 리스폰스 데이터를 전체 리뷰 목록의 state인 items state에 추가해주면 별도로 리퀘스트 하지 않아도 추가됨
 */
