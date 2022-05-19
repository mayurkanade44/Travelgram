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
import { singleBlog } from "../redux/travelSlice";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.travel);
  const { id } = useParams();

  useEffect(() => {
    dispatch(singleBlog(id));
  }, [id]);

  console.log(blog);

  return <div style={{ marginTop: 200 }}>SingleBlog</div>;
};
export default SingleBlog;
