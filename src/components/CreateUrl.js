import React from "react";
import Navigation from "./Navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

function CreateUrl() {
  //form validation using formik
  let userSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    longUrl: Yup.string().required("Required"),
  });

  //create url
  const handleUrlShortener = async (values) => {
    try {
      let res = await axios.post(`${url}/users/create-url`, {
        email: values.email,
        longurl: values.longUrl,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Navigation />
      <div>
        <div>
          <Formik
            initialValues={{
              email: "",
              longUrl: "",
            }}
            validationSchema={userSchema}
            onSubmit={(values) => {
              handleUrlShortener(values);
            }}
          >
            {({ errors, touched }) => (
              <div className="container-fluid createUrl">
                <div className="login-form">
                  <div className="createUrl-header text-center text-danger">
                    <p>Create URL-Shortener</p>
                  </div>
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email" className="text-white">
                        Email
                      </label>
                      <Field
                        name="email"
                        className="form-control"
                        type="email"
                        placeholder="Enter Email"
                      />
                      {errors.email && touched.email ? (
                        <div style={{ color: "red" }}>{errors.email}</div>
                      ) : null}
                    </div>
                    <div className="form-group pt-2">
                      <label htmlFor="longUrl" className="text-white">
                        URL
                      </label>
                      <Field
                        name="longUrl"
                        className="form-control"
                        type="text"
                        placeholder="Enter url"
                      />
                      {errors.longUrl && touched.longUrl ? (
                        <div style={{ color: "red" }}>{errors.longUrl}</div>
                      ) : null}
                    </div>
                    <div className="log-button pt-3 d-flex justify-content-center">
                      <Button variant="outline-secondary" type="submit">
                        Create-Url
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateUrl;
