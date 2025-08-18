import { Card } from 'react-bootstrap';

export default function FestivalDetailShortDesc({festival}) {
    return (
        <Card className="mb-3">
        <Card.Body>
          {/* 축제 제목 */}
          <Card.Title>{festival.title || "제목 없음"}</Card.Title>
  
          {/* 짧은 설명 */}
          <Card.Text>{festival.short_description || "설명 없음"}</Card.Text>
  
          {/* 축제 기간 */}
          {festival.start_date && festival.end_date && (
            <Card.Text>
              축제 기간: {festival.start_date} ~ {festival.end_date}
            </Card.Text>
          )}
  
          {/* 좋아요, 공유, 조회수 (예시) */}
          <Card.Text>
            좋아요: {festival.likes || 0} | 공유: {festival.shares || 0} | 조회수: {festival.views || 0}
          </Card.Text>
  
          {/* 행사 내용 */}
          {festival.description && (
            <>
              <hr />
              <Card.Text>{festival.description}</Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
        
    );
}