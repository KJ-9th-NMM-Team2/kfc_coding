import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import "./FestivalCardList.css";

function FestivalCard(props) {
  let festival = props.festival;

  const formatDate = (date_str) => {
    if (!date_str) return "";
    try {
      const d = new Date(date_str);
      if (Number.isNaN(d.getTime())) return String(date_str).slice(0, 10);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    } catch {
      return String(date_str).slice(0, 10);
    }
  };

  return (
    <>
      <li className="festival_card_item">
        <Card
          className="festival_card"
          as={Link}
          to={`/festivals/${festival._id}`}
          style={{ border: "none" }}
        >
          <Card.Img
            className="festival_card_img"
            src={festival.thumbnail_url}
          />
          <Card.Body className="festival_card_text">
            <Card.Text className="festival_card_title mb-0">
              {festival.name}
            </Card.Text>
            <Card.Text className="mb-0">
              {formatDate(festival.start_date)} ~{" "}
              {formatDate(festival.end_date)}
            </Card.Text>
            <Card.Text className="mb-0">{festival.region}</Card.Text>
          </Card.Body>
        </Card>
      </li>
    </>
  );
}

function FestivalCardEmpty() {
  return (
    <li className="festival_card_item">
      <Card className="festival_card empty" style={{ border: "none" }}>
        <Card.Body>
          <Card.Text className="festival_card_text">
            검색 조건에 맞는 축제가 없습니다.
          </Card.Text>
        </Card.Body>
      </Card>
    </li>
  );
}

function FestivalCardList(props, ref) {
  let filteredFestivals = props.festivals;

  return (
    <div className="festival_card_list_container" ref={ref}>
      {/* <Breadcrumb className="festival_visual_list_order_btn">
        <Breadcrumb.Item active as="span" style={{ textDecorationLine: 'none'}}>축제일순</Breadcrumb.Item>
        <Breadcrumb.Item as="span" style={{ textDecorationLine: 'none'}}>거리순</Breadcrumb.Item>
        <Breadcrumb.Item as="span" style={{ textDecorationLine: 'none'}}>인기순</Breadcrumb.Item>
      </Breadcrumb> */}
      <ul className="festival_card_list">
        {filteredFestivals.length > 0 ? (
          filteredFestivals.map((festival) => (
            <FestivalCard key={festival._id} festival={festival} />
          ))
        ) : (
          <FestivalCardEmpty />
        )}
      </ul>
    </div>
  );
}

export default forwardRef(FestivalCardList);
