import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Offcanvas from "react-bootstrap/Offcanvas";
import { Navigate, NavLink,useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./Navbar.css";
import { auth, googleProvider } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { useContextData } from "../../context/context";

function OffcanvasExample() {
  const expand = "lg";
  const [show, setShow] = useState(false);
  const email = useRef(null);
  const password = useRef(null);
  const { user } = useContextData();
  const searchTerm=useRef(null)
  const searchNavigation=useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loginFuntion = async () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    await signInWithEmailAndPassword(auth, emailValue, passwordValue);
    toast("Login successful");
  };
  const registerFuntion = async () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
    toast("SignUp Successfull");
  };
  const googleSignInHandler = async () => {
    await signInWithPopup(auth, googleProvider);
    toast("Login Successfull");
  };
  const signOutHandler = async () => {
    await signOut(auth);
    toast("SignOut Successfull");
  };
  const searchHandler=()=> {
    const searchValue=searchTerm.current.value;
    searchNavigation(`search/${searchValue}`);
    searchTerm.current.value=""
  }

  return (
    <>
      <Navbar
        key={expand}
        expand={expand}
        className="bg-body-tertiary shadow fixed-top"
      >
        <Container>
          <Navbar.Brand href="#" className="fw-bold">
            Swiggy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Swiggy
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3 gap-lg-4 align-items-lg-center">
                <NavLink className="navLinks" to="/">Home</NavLink>
                
                <NavLink to="/cart" className="navLinks cart">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                  Cart
                </NavLink>
                
                {user ? (
                  <NavLink onClick={signOutHandler} className="navLinks">
                    Logout
                  </NavLink>
                ) : (
                  <NavLink onClick={handleShow} className="navLinks">
                    Login
                  </NavLink>
                )}
              </Nav>
              <Form className="d-flex mt-lg-0 mt-3" onSubmit={(e)=>e.preventDefault()}>
                <Form.Control ref={searchTerm}
                  type="search"
                  placeholder="Enter Restaurant Name"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" type="submit" onClick={searchHandler}>Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              ref={email}
              type="email"
              placeholder="name@example.com"
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              ref={password}
              type="password"
              placeholder="Password"
              required
            />
          </FloatingLabel>
          <div className="text-center mt-3">
            <button className="btn btn-success" onClick={loginFuntion}>
              Login
            </button>
          </div>
          <div className="text-center mt-4 googleBtn">
            <button className="shadow" onClick={googleSignInHandler}>
              <img
                src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
                alt="google"
                width="30px"
              />
              <span className="ms-2 fw-semibold">Sign In With Google</span>
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={registerFuntion}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OffcanvasExample;
