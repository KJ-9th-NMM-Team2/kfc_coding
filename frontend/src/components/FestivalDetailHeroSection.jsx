import { Card } from "react-bootstrap";

const FestivalDetailHeroSection= ({ festival })=> {
  return (
    <div>
      <Card className="shadow overflow-hidden">
        <img src={festival.thumbnail_url} />
      </Card>
    </div>
  );
}

export default FestivalDetailHeroSection;
