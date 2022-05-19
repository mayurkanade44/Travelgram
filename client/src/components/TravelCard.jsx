import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const TravelCard = ({
  title,
  description,
  image,
  _id,
  creatorName,
  likes,
  tags,
}) => {
  return (
    <MDBCardGroup>
      <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={image}
          alt={title}
          position="top"
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <div className="top-left">{creatorName}</div>
        <span className="text-start tag-card">
          {tags.map((tag, index) => (
            <Link key={index} to={`/tours/tag/${tag}`}>
              {" "}
              #{tag}
            </Link>
          ))}
          <MDBBtn style={{ float: "right" }} tag="a" color="none"></MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
              {description.substring(0,10) + "..."}
            <Link to={`/tour/${_id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};
export default TravelCard;
