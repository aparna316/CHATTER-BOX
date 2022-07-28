import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from "./styles/HomePage.module.css";
import  olaLogo from "./assets/olalogo.png";

//bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("Token") !== null) {
      navigate("/newsfeed");
    }
  });
  return (
    //using bootstrap and custom css to make homepage
    <Container fluid>
      <Row className={styles.container}>
        <Col className={`${styles.colContainerLeft} ${styles.leftBackground}`}>
        </Col>
        <Col className={styles.colContainerRight}>
          <div className={styles.colWithButtons}>
            <Row>
              <h1 className=" mb-3">CHATTER BOX</h1>
            </Row>
            <br />
            <Row>
              <h3 className=" mb-3">DIVE IN!</h3>
            </Row>{" "}
            <br />
            <Row>
              <Link to="/signin" className={styles.linkTextFormat}><Button variant="success" className={`${styles.btnHomePage} mb-3`}>Sign In  </Button></Link>
            </Row>
            <Row>
            <Link to="/signup" className={styles.linkTextFormat}><Button variant="success" className={styles.btnHomePage}>Sign Up  </Button></Link>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
 
