import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

function FestivalCard(props) {
  let festival = props;

  return (
    <>
      <Card as={Link} to={`/festivals/:${festival.id}`}>
        <Card.Img src={festival.thumbnail_url} />
        <Card.Body className="festival_card_body">
          <Card.Title>{festival.name}</Card.Title>
          <Card.Text>
            <p>{festival.start_date} ~ {festival.end_date}</p>
            <p>{festival.region}</p>
          </Card.Text>
        </Card.Body>
      </Card>
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
      <ul className="festival_card_list">
        {filteredFestivals.map(festival => (
          <FestivalCard key={festival.id} {...festival} />
        ))}
      </ul>
    </div>
  );
}

export default FestivalCardList;