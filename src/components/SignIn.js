import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import styles from "./styles/SignIn.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


//importing bootstrap component

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

export default function SignIn() {
  const [resData, setResData] = useState(null);
  let navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });
  async function postSignInInfo(inputData) {
    const response = await axios({
      method: "post",
      url: "/api/v1/users/signin",
      data: {
        email: inputData.email,
        password: inputData.password,
      },
    });
    //If wrong id and password then it will show warning message
    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);
    }
    // If right id and password then data will be fetched
    if (response.data !== null && response.data.status === "success") {
      setResData(response.data);
      localStorage.setItem("UserId", response.data.payload.user.id);
      localStorage.setItem("UserFirstName", response.data.payload.user.firstName);
      localStorage.setItem("UserLastName", response.data.payload.user.lastName);
      localStorage.setItem("UserEmail", response.data.payload.user.email);
       localStorage.setItem("Token", response.data.payload.token);
      navigate("/newsfeed");
    }
  }
  //warning message
  function showWarningToast(inputMessage) {
    toast.warn("Invalid email or password", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.log("toast");
  }
  return (
    //html part here formik to create forms more easily
    //divided into two parts half left and half right 
    <Container fluid className={styles.container}>
       <Row className={styles.container}>
       <Col className={`${styles.colContainerLeft} ${styles.leftBackground}`}>
         </Col>
         <Col className={styles.colContainerRight}>
         <ToastContainer/>
      <Formik validationSchema={schema} initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values, {setSubmitting}) => {
          postSignInInfo(values);
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,handleChange,handleBlur,values,touched,isInValid,errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit} className={styles.formContainer}>
            <Row className="mb-5 text-center">
              <h1 className={styles.contentSignIn}>Sign In</h1>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={values.email} onChange={handleChange} isInvalid={touched.email && errors.email}/>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="signInPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"name="password"value={values.password} onChange={handleChange} isInvalid={touched.password && errors.password}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" variant="success" className={`${styles.btnSignIn} mb-3`}>
              Sign In 
            </Button>
          </Form>
        )}
      </Formik>
         </Col>
       </Row>
    </Container>
  );
}
