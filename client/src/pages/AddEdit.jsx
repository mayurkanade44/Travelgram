import {
  MDBCard,
  MDBCardBody,
  MDBValidation,
  MDBBtn,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { InputRow } from "../components";
import { createBlog, singleBlog, updateBlog } from "../redux/travelSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
};

const AddEdit = () => {
  const [travelBlog, setTravelBlog] = useState(initialState);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { title, description, tags } = travelBlog;
  const { loading, userBlogs } = useSelector((store) => store.travel);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const singleBlog = userBlogs.find((tour) => tour._id === id);
      setTravelBlog({ ...singleBlog });
    }
  }, [id]);

  const handleAddTag = (tag) => {
    setTravelBlog({ ...travelBlog, tags: [...travelBlog.tags, tag] });
  };

  const handleDeleteTag = (deleteTag) => {
    setTravelBlog({
      ...travelBlog,
      tags: travelBlog.tags.filter((tag) => tag !== deleteTag),
    });
  };
  const handleClear = () => {
    setTravelBlog(initialState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && description && tags) {
      const newBlog = { ...travelBlog, creatorName: user.name };

      if (id) {
        dispatch(updateBlog({ id, travelBlog }));
      } else {
        dispatch(createBlog(newBlog));
      }
      navigate("/home");
      handleClear();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTravelBlog({ ...travelBlog, [name]: value });
  };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>{id ? "Update Travel Blog" : "Add Travel Blog"}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <InputRow
                label="Title"
                type="text"
                value={title}
                name="title"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="col-md-12">
              <MDBTextArea
                label="Description"
                type="text"
                value={description}
                name="description"
                className="form-control"
                required
                rows={4}
                onChange={handleChange}
                validation="Please provide description"
              />
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div className="d-flex justify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTravelBlog({ ...travelBlog, image: base64 })
                }
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>
                {id ? "Update" : "Submit"}
              </MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2"
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};
export default AddEdit;
