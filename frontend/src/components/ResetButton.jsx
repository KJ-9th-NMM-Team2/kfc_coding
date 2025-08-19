function ResetButton({ onClick }) {
    return (
        <button
            type="button"
            className="btn btn-outline-secondary d-flex justify-content-center align-items-center"
            onClick={onClick}
            style={{ width: "40px", height: "40px" }}
        >
            <img
                src="/icons/reset.png"  // public/icons/reset.png 경로에 파일 위치
                alt="Reset"
                width="20"
                height="20"
            />
        </button>
    );
}
export default ResetButton;
