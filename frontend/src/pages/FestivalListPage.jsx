import React from "react";
import FestivalSearch from "./FestivalSearch";

export default function FestivalListPage() {
  // 임시.
  return (
    <div>
      <p>FestivalListPage</p>
      <FestivalSearch />
      <a href="/festivals/:1">Go to FestivalDetailPage id=1</a>
    </div>
  );
}
