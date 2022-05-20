import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserBlogs } from "../redux/travelSlice";

const Dahsboard = () => {
  const { userBlogs } = useSelector((store) => store.travel);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserBlogs());
  }, []);

  const handleDelete = () => {};

  return (
    <div
      style={{
        margin: "auto",
        padding: "120px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      {userBlogs.length === 0 && (
        <h3>No tour available with the user: {user.name}</h3>
      )}
      {userBlogs.length > 0 && (
        <>
          <h5 className="text-center">Dashboard: {user.name}</h5>
          <hr style={{ maxWidth: "570px" }} />
        </>
      )}
      {userBlogs.map((item) => (
        <MDBCardGroup key={item._id}>
          <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
            <MDBRow className="g-0">
              <MDBCol md="4">
                <MDBCardImage
                  className="rounded"
                  src={item.image}
                  alt={item.title}
                  fluid
                  style={{height:100}}
                />
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody>
                  <MDBCardTitle className="text-start">
                    {item.title}
                  </MDBCardTitle>
                  <MDBCardText className="text-start">
                    <small className="text-muted">
                      {item.description.substring(0, 40) + "..."}
                    </small>
                  </MDBCardText>
                  <div
                    style={{
                      marginLeft: "5px",
                      float: "right",
                      marginTop: "-60px",
                    }}
                  >
                    <MDBBtn className="mt-1" tag="a" color="none">
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "#dd4b39" }}
                        size="lg"
                        onClick={() => handleDelete(item._id)}
                      />
                    </MDBBtn>
                    <Link to={`/editTravel/${item._id}`}>
                      <MDBIcon
                        fas
                        icon="edit"
                        style={{ color: "#55acee", marginLeft: "10px" }}
                        size="lg"
                      />
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
      ))}
    </div>
  );
};
export default Dahsboard;
