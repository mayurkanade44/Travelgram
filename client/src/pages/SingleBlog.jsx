import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { useEffect } from "react";
import { realtedBlogs, singleBlog } from "../redux/travelSlice";
import { RelatedBlogs, Spinner } from "../components";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, blog, realtedBlog } = useSelector((store) => store.travel);
  const tags = blog?.tags;

  useEffect(() => {
    tags && dispatch(realtedBlogs(tags));
  }, [tags]);

  useEffect(() => {
    dispatch(singleBlog(id));
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <MDBContainer style={{marginTop:64}}>
      <MDBCard className="mb-3 mt-2">
        <MDBCardImage
          position="top"
          style={{ width: "100%", maxHeight: "600px" }}
          src={blog.image}
          alt={blog.title}
        />
        <MDBCardBody>
          <h3>{blog.title}</h3>
          <span>
            <p className="text-start tourName">
              Created By: {blog.creatorName}
            </p>
          </span>
          <div style={{ float: "left" }}>
            <span className="text-start">
              {blog.tags && blog.tags.map((item) => `#${item} `)}
            </span>
          </div>
          <br />
          <MDBCardText className="text-start mt-2">
            <MDBIcon
              style={{ float: "left", margin: "5px" }}
              far
              icon="calendar-alt"
              size="lg"
            />
            <small className="text-muted">
              {moment(blog.createdAt).fromNow()}
            </small>
          </MDBCardText>
          <MDBCardText className="lead mb-0 text-start">
            {blog.description}
          </MDBCardText>
        </MDBCardBody>
        <RelatedBlogs relatedBlogs={realtedBlog} blogId={id} />
      </MDBCard>
    </MDBContainer>
  );
};
export default SingleBlog;
