import { useState, useEffect } from "react";
import { InputRow } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  MDBCard,
  MDBCardBody,
  MDBSpinner,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { login } from "../redux/userSlice";

const intialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Login = () => {
  const { loading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(intialState);
  const { name, email, password, isMember } = formValue;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isMember) {
      return dispatch(login({ email, password }));
    }
    
  };

  const toggleMember = () => {
    setFormValue({ ...formValue, isMember: !isMember });
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
    >
      <MDBCard alignment="center">
        <MDBIcon
          fas
          icon="user-circle"
          className="fa-2x"
          style={{ marginBottom: 8 }}
        />
        <h4 style={{ marginBottom: 0, color: "blue" }}>
          {isMember ? "Login" : "Register"}
        </h4>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
            {!isMember && (
              <div className="col-md-12">
                <InputRow
                  label="Name"
                  type="text"
                  value={name}
                  name="name"
                  onChange={handleChange}
                  required={true}
                />
              </div>
            )}
            <div className="col-md-12">
              <InputRow
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="col-md-12">
              <InputRow
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {/* {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )} */}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          {isMember ? "Not a Traveller yet?" : "Already a Traveller?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {isMember ? "Register" : "Login"}
          </button>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};
export default Login;
