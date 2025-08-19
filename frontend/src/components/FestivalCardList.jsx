import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

function FestivalCard(props) {
  let festival = props.festival;

  const formatDate = (date_str) => {
    if (!date_str) return '';
    try {
      const d = new Date(date_str);
      if (Number.isNaN(d.getTime())) return String(date_str).slice(0, 10);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    } catch {
      return String(date_str).slice(0, 10);
    }
  };

  return (
    <>
      <li className="festival_card_item" style={{ display: 'inline-block', margin: '1rem' }}>
        <Card as={Link} to={`/festivals/${festival._id}`} style={{ width: '20rem' }}>
          <Card.Img src={festival.thumbnail_url} />
          <Card.Body className="festival_card_body">
            <Card.Title>{festival.name}</Card.Title>
            <Card.Text>
              {formatDate(festival.start_date)} ~ {formatDate(festival.end_date)}
              {festival.region}
            </Card.Text>
          </Card.Body>
        </Card>
      </li>
    </>
  );
}

function FestivalCardList(props) {
  let filteredFestivals = props.festivals;

  return (
    <div className="festival_card_list_container">
      <Breadcrumb className="festival_visual_list_order_btn">
        <Breadcrumb.Item active href="#" as="span">축제일순</Breadcrumb.Item>
        <Breadcrumb.Item href="#" as="span">거리순</Breadcrumb.Item>
        <Breadcrumb.Item href="#" as="span">인기순</Breadcrumb.Item>
      </Breadcrumb>
      <div className="festival_card_list_container">
        <ul className="festival_card_list" >
          {filteredFestivals.map((festival) => (
            <FestivalCard key={festival._id} festival={festival} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FestivalCardList;