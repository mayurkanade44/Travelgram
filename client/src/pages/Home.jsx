import { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllBlogs, searchByTags } from "../redux/travelSlice";
import { Spinner, TravelCard } from "../components";

const Home = () => {
  const { blogs, loading } = useSelector((store) => store.travel);
  const dispatch = useDispatch();
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(searchByTags(tag));
    } else {
      dispatch(getAllBlogs());
    }
  }, [tag]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
        {tag && (
          <>
            <h3 className="text-center my-3" >Travel Blogs with tag: {tag}</h3>
            
          </>
        )}
        {blogs.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Travel Blogs Found
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-3 g-3">
              {blogs &&
                blogs.map((item) => <TravelCard key={item._id} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  );
};
export default Home;
