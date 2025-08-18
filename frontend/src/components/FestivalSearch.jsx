import { useState } from "react";
import RegionSelect from "./RegionSelect";
import DateSelect from "./DateSelect";
import CategorySelect from "./CategorySelect";
import ResetButton from "./ResetButton";
import SearchButton from "./SearchButton";
import "../css/FestivalSearch.css"; 

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
            <div className="item"><DateSelect value={date} onChange={setDate} /></div>
            <div className="item"><RegionSelect value={region} onChange={setRegion} /></div>
            <div className="item"><CategorySelect value={category} onChange={setCategory} /></div>

            <div className="item-auto">
                <ResetButton onClick={handleReset} />
            </div>
            <div className="item-auto">
                <SearchButton onClick={handleSearch} disabled={disabled} />
            </div>
        </div>
    );
}
export default FestivalSearch;
