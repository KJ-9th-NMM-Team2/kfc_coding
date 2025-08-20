import { Card } from "react-bootstrap";

const FestivalDetailHeroSection = ({ festival }) => {
  return (
    <div>
      <Card className="shadow overflow-hidden">
        <img
          src={festival.thumbnail_url}
          className=" ratio ratio-9x16 object-fit-cover"
        />
      </Card>
    </div>
  );
};

export default FestivalDetailHeroSection;
