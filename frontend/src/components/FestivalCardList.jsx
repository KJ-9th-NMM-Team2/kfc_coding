import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import { forwardRef } from "react";

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
      <li
        className="festival_card_item"
        style={{ display: "inline-block", margin: "0.5rem" }}
      >
        <Card
          as={Link}
          to={`/festivals/${festival._id}`}
          style={{
            width: "18rem",
            height: "20rem",
            border: "none",
            textDecorationLine: "none",
          }}
        >
          <Card.Img
            src={festival.thumbnail_url}
            style={{
              overflowClipMargin: "content-box",
              overflow: "hidden",
              objectFit: "cover",
              height: "15rem",
            }}
          />
          <Card.Body className="festival_card_body">
            <Card.Title style={{ fontWeight: "bold" }}>
              {festival.name}
            </Card.Title>
            <Card.Text style={{ fontSize: "0.9rem", color: "#555" }}>
              {formatDate(festival.start_date)} ~{" "}
              {formatDate(festival.end_date)}
              <br />
              {festival.region}
            </Card.Text>
          </Card.Body>
        </Card>
      </li>
    </>
  );
}

const FestivalCardList = (props, ref) => {
  let filteredFestivals = props.festivals;

  return (
    <div className="festival_card_list_container" ref={ref}>
      {/* <Breadcrumb className="festival_visual_list_order_btn">
        <Breadcrumb.Item active as="span" style={{ textDecorationLine: 'none'}}>축제일순</Breadcrumb.Item>
        <Breadcrumb.Item as="span" style={{ textDecorationLine: 'none'}}>거리순</Breadcrumb.Item>
        <Breadcrumb.Item as="span" style={{ textDecorationLine: 'none'}}>인기순</Breadcrumb.Item>
      </Breadcrumb> */}
      <ul
        className="festival_card_list"
        style={{ paddingLeft: "0", width: "fit-content" }}
      >
        {filteredFestivals.map((festival) => (
          <FestivalCard key={festival._id} festival={festival} />
        ))}
      </ul>
    </div>
  );
};

export default forwardRef(FestivalCardList);
