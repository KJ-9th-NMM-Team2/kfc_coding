function ResetButton() {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <button
            type="button"
            className="btn btn-outline-secondary d-flex justify-content-center align-items-center"
            onClick={handleReload}
            style={{ width: "40px", height: "40px" }}
        >
            <img
                src="/icons/reset.png"
                alt="Reset"
                width="20"
                height="20"
            />
        </button>
    );
}

export default ResetButton;
