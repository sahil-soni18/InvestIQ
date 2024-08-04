import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginContext } from "context/ContextAPI";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "../../assets/css/CustomCSS/Navbar.css";

library.add(faBell, faUser);

export default function IndexNavbar(props) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapseOut, setCollapseOut] = useState("");
  const [color, setColor] = useState("navbar-transparent");
  const [searchCompany, setSearchCompany] = useState("");
  const loginState = useContext(loginContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };

  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };

  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };

  const onCollapseExited = () => {
    setCollapseOut("");
  };

  const handleSearchChange = (e) => {
    setSearchCompany(e.target.value);
  };

  const handleLogout = () => {
    loginState.logout();
    navigate("/blk-design-system-react");
  };

  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" id="navbar-brand" tag={Link}>
            <span>BLK• </span>
            Design System React
          </NavbarBrand>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  BLK•React
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav className="ml-auto" navbar>
            <NavItem className="mx-auto">
              <InputGroup className="search-bar">
                <Input
                  placeholder="Search Stock"
                  type="text"
                  value={searchCompany}
                  onChange={handleSearchChange}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <Link to={`/stock/${searchCompany}`}>
                      <i className="tim-icons icon-zoom-split searchIcon" />
                    </Link>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </NavItem>
            {location.pathname === "/stock" && (
              <NavItem>
                <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
                  <FontAwesomeIcon icon={faBell} />
                </NavLink>
              </NavItem>
            )}
            {loginState.isLoggedIn ? (
              <NavItem>
                <Button className="btn-round" color="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </NavItem>
            ) : (
              <NavItem>
                <Link to="/login">
                  <Button className="btn-round" color="primary" type="button">
                    Login
                  </Button>
                </Link>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
