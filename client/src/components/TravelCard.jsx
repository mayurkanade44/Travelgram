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
import { blogLikes } from "../redux/travelSlice";

const TravelCard = ({
  title,
  description,
  image,
  _id,
  creatorName,
  likesCount,
  tags,
}) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const userId = user.userId;
  const Likes = () => {
    if (likesCount.length > 0) {
      return likesCount.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon="thumbs-up" />
          &nbsp;
          {likesCount.length > 2 ? (
            <MDBTooltip
              tag="a"
              title={`You and ${likesCount.length - 1} other people likesCount`}
            >
              {likesCount.length} Likes
            </MDBTooltip>
          ) : (
            `${likesCount.length} Like${likesCount.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon="thumbs-up" />
          &nbsp;{likesCount.length} {likesCount.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon="thumbs-up" />
        &nbsp;Like
      </>
    );
  };

  const handleLike = () => {
    dispatch(blogLikes({ _id }));
  };
  

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
            <Link key={index} to={`/travelTags/${tag}`}>
              {` #${tag}`}
            </Link>
          ))}
          <MDBBtn
            style={{ float: "right" }}
            tag="a"
            color="none"
            onClick={handleLike}
          >
            <Likes />
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className="text-start">{title}</MDBCardTitle>
          <MDBCardText className="text-start">
            {description.substring(0, 10) + "..."}
            <Link to={`/travelBlog/${_id}`}>Read More</Link>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};
export default TravelCard;
