function LoginButton({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
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
            로그인
            <i className="bi bi-arrow-right-circle" aria-hidden="true" />
            <span className="visually-hidden">로그인 실행</span>
        </button>
    );
}
export default LoginButton;