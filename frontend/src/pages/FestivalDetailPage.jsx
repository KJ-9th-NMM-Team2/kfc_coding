import React from "react";
import { useParams } from "react-router-dom";

export default function FestivalDetailPage() {
  // /festivals/:id의 id를 가져오는 용도
  const { id } = useParams();

  // 임시.
  return <div>FestivalDetailPage, id: {id}</div>;
}
