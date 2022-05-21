import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBlogs, searchBlog } from "../redux/travelSlice";
import { logout } from "../redux/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchBlog(search));
    } else {
      dispatch(getAllBlogs());
    }
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "black" }}>
      <MDBContainer>
        <MDBNavbarBrand href="/" style={{ color: "black", fontSize: "22px" }}>
          T
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#606080" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar className="justify-content-center">
          <MDBNavbarNav fullWidth={false} className="mb-2 mb-lg-0">
            {user && (
              <>
                <MDBNavbarItem>
                  <Link to="/home">
                    <p className="header-text">Home</p>
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <Link to="/addTravel">
                    <p className="header-text">Add Travel</p>
                  </Link>
                </MDBNavbarItem>
              </>
            )}
            <MDBNavbarItem>
              <Link to="/home">
                <p className="user-brand">Travelgram</p>
              </Link>
            </MDBNavbarItem>
            {user && (
              <>
                <MDBNavbarItem>
                  <Link to="/dashboard">
                    <p className="header-text" style={{ marginLeft: 50 }}>
                      Dashboard
                    </p>
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <button
                    style={{ background: "transparent", border: "transparent" }}
                    onClick={() => dispatch(logout())}
                  >
                    <p className="header-text">Logout</p>
                  </button>
                </MDBNavbarItem>
              </>
            )}
          </MDBNavbarNav>
          <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Trave Blog"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: "5px", marginLeft: "5px" }}>
              <MDBIcon fas icon="search" />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};
export default Navbar;
