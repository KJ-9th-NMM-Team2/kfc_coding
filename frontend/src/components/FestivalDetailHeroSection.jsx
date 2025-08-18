import { Container, Badge } from 'react-bootstrap';

export default function FestivalDetailHeroSection({festival, festivalDates}) {
    const dateDiff = Date.parse(festival.end_date) - Date.now();
    const calLeftDays = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    const leftDays = Date.parse(festival.start_date) > Date.now() 
            ? `D-${calLeftDays}` 
            : Date.parse(festival.end_date) < Date.now()
            ? "축제 종료"
            : "축제 진행 중"

    return (
        <div 
            className="position-relative text-white py-5"
            style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #be185d 100%)',
                minHeight: '400px'
            }}
        >
            <div 
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{backgroundColor: 'rgba(0,0,0,0.4)'}}
            ></div>
            <Container className="position-relative py-5">
                <div className="text-center">
                    <div 
                        className="d-inline-block p-4 rounded mb-4"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <p className="fs-5 mb-0">
                            {(festival && (festival.short_description || festival['short-description'])) || ''}
                        </p>
                    </div>
                    <h1 className="display-4 fw-bold mb-4">
                        {festival.name}
                    </h1>
                    <Badge bg="danger" className="fs-6 fw-bold mb-4 px-3 py-2">
                        {leftDays}
                    </Badge>
                    <p className="fs-4 mb-0 text-light">
                        {festivalDates}
                    </p>
                </div>
            </Container>
        </div>
    );
}
