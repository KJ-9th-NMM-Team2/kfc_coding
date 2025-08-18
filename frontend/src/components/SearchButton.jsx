function SearchButton({ onClick, disabled }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="btn d-flex align-items-center justify-content-center fw-bold"
            style={{
                background: "#6f42f5",
                borderColor: "#6f42f5",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "12px",
                height: 44,
                gap: 8,
                minWidth: 120,
            }}
        >
            검색
            <i className="bi bi-arrow-right-circle" aria-hidden="true" />
            <span className="visually-hidden">검색 실행</span>
        </button>
    );
}
export default SearchButton;
