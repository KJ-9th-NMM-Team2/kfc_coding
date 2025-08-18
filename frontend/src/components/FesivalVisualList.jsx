import Card from "react-bootstrap/Card"
import { Link } from "react-router-dom";

function FestivalVisual(props) {
  return (
    <>
      <Card as={Link} to={`/festivals/:${props.id}`}>
        <Card.Img src={props.thumbnail_url} />
        <Card.Body className="festival_visual_body">
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            <p>{props.start_date} ~ {props.end_date}</p>
            <p>{props.region}</p>
            <p>go</p>
          </Card.Text>
        </Card.Body>
      </Card>
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
        {featuredFestivals.map(festival => (
          <FestivalVisual key={festival.id} {...festival} />
        ))}
      </ul>
    </div>
  );
}

export default FestivalVisualList;