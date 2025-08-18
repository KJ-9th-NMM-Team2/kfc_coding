import { useState } from "react";
import "./FestivalSearch.css";

function FestivalSearch() {
    const [region, setRegion] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");

    const handleReset = () => {
        setRegion("");
        setDate("");
        setCategory("");
    };

    const buildQueryString = (filters) => {
        const entries = Object.entries(filters).filter(([, v]) => v !== "");
        return new URLSearchParams(entries).toString();
    };

    const handleSearch = async () => {
        const qs = buildQueryString({ region, date, category });
        const url = `/api/festivals${qs ? `?${qs}` : ""}`;
        console.log("검색 요청:", url);
    };

    const disabled = !region && !date && !category;

    return (
        <div className="filter-bar">
            <div className="item">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <div className="item">
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                    <option value="">지역 선택</option>
                    <option value="서울">서울</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                </select>
            </div>

            <div className="item">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">카테고리 선택</option>
                    <option value="음악">음악</option>
                    <option value="미술">미술</option>
                    <option value="전통">전통</option>
                </select>
            </div>

            <div className="item-auto">
                <button type="button" onClick={handleReset}>
                    <img src="/icons/reset.png" alt="리셋" width="16" height="16" />
                </button>
            </div>

            <div className="item-auto">
                <button type="button" onClick={handleSearch} disabled={disabled}>
                    <img src="/icons/search.png" alt="검색" width="16" height="16" />
                </button>
            </div>
        </div>
    );
}
export default FestivalSearch;