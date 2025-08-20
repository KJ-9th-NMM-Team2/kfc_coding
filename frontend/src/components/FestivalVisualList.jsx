import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./FestivalVisualList.css";

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
        className={`festival_visual_item ${props.visualSelected}`}
        onMouseEnter={() => props.setSelected(festival._id)}
      >
        <Card
          className='festival_visual_card'
          as={Link}
          to={`/festivals/${festival._id}`}

        >
          <Card.Img
            className='festival_visual_img'
            src={festival.thumbnail_url}
            
          />
          <Card.Body
            className="festival_visual_body"
          >
            <Card.Title
              className='festival_visual_title'
            >
              {festival.name}
            </Card.Title>
            <Card.Text className='festival_visual_text'>
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

function FestivalVisualList(props) {
  let featuredFestivals = props.festivals;
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handlePropsChange = () => {
      setSelected(featuredFestivals.length > 0 ? featuredFestivals[0]._id : null);
    };
    handlePropsChange();
  }, [featuredFestivals]);

  return (
    <>
      <ul className="festival_visual_list">
        {featuredFestivals.map((festival) => {
          let visualSelected = festival._id === selected ? "selected" : "shrunk";
          return (
            <FestivalVisual key={festival._id} visualSelected={visualSelected} setSelected={setSelected} {...festival} />
          );
        })}
      </ul>
    </>
  );
}

export default FestivalVisualList;
