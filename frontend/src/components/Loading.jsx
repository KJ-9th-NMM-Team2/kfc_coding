export default function Loading(loading) {
    // 로딩 중일 때
    // if (loading) {
    return (
        <Container
            fluid
            className="min-vh-100 bg-light d-flex align-items-center justify-content-center"
        >
            <div>불러오는 중...</div>
        </Container>
    );
    // }
}