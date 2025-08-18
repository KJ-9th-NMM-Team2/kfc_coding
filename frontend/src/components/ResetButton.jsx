function ResetButton({ onClick }) {
    return (
        <button
            type="button"
            className="btn btn-outline-secondary d-flex justify-content-center align-items-center"
            onClick={onClick}
            style={{ width: "40px", height: "40px" }}
        >
            <FaSyncAlt />
        </button>
    );
}
export default ResetButton;
