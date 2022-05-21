import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const RelatedBlogs = ({ relatedBlogs, blogId }) => {
  return (
    <div>
      {relatedBlogs && relatedBlogs.length > 0 && (
        <>
          {relatedBlogs.length > 1 && <h4>Related Tours</h4>}
          <MDBRow className="row-cols-1 row-cols-md-3 g-4">
            {relatedBlogs
              .filter((item) => item._id !== blogId)
              .splice(0, 3)
              .map((item) => (
                <MDBCol>
                  <MDBCard>
                    <Link to={`/travelBlog/${item._id}`}>
                      <MDBCardImage
                        src={item.image}
                        alt={item.title}
                        position="top"
                        style={{ height: 200 }}
                      />
                    </Link>
                    <span className="text-start tag-card">
                      {item.tags.map((tag) => (
                        <Link to={`/travelTags/${tag}`}> #{tag}</Link>
                      ))}
                    </span>
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">
                        {item.title}
                      </MDBCardTitle>
                      <MDBCardText className="text-start">
                        {item.description.substring(0, 40) + "..."}
                      </MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
          </MDBRow>
        </>
      )}
    </div>
  );
};
export default RelatedBlogs;
