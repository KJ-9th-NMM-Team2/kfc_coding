import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function FestivalVisual(props) {
  let festival = props;

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
        className="festival_visual_item"
        style={{ display: "inline-block", margin: "1rem" }}
      >
        <Card
          as={Link}
          to={`/festivals/${festival._id}`}
          style={{ width: "20rem" }}
        >
          <Card.Img src={festival.poster_url} />
          <Card.Body className="festival_visual_body">
            <Card.Title>{festival.name}</Card.Title>
            <Card.Text>
              {formatDate(festival.start_date)} ~{" "}
              {formatDate(festival.end_date)}
              {festival.region}
              go
            </Card.Text>
          </Card.Body>
        </Card>
      </li>
    </>
  );
}

function FestivalVisualList(props) {
  let featuredFestivals = props.festivals;

  return (
    <div className="festival_visual_list_container">
      <ul className="festival_visual_list">
        {/* <FestivalVisual key={featuredFestivals[0].id} {...featuredFestivals[0]} />
                <FestivalVisual key={featuredFestivals[1].id} {...featuredFestivals[1]} />
                <FestivalVisual key={featuredFestivals[2].id} {...featuredFestivals[2]} /> */}
        {featuredFestivals.map((festival) => (
          <FestivalVisual key={festival._id} {...festival} />
        ))}
      </ul>
    </div>
  );
}

export default FestivalVisualList;
