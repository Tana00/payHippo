import React, { Component } from "react";

import Steppers from "../components/Steppers";
import MobileHeader from "../components/MobileHeader";
import ImageSide from "../components/ImageSide";

import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import "./style.scss";
import "./responsive.scss";

class PersonalProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      value: "",
      errMsg: "",
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange = (phoneNumber) => {
    this.setState({ value: phoneNumber });
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  render() {
    const { history } = this.props;
    return (
      <div id="container">
        <MobileHeader />
        <ImageSide />
        <div id="form_sec">
          <Steppers activeStep={this.state.step} />
          <div id="form_wrapper">
            <h3>Tell us about you</h3>
            <Formik
              initialValues={{
                name: "",
                email: "",
                qualification: "",
                gender: "",
                status: "",
              }}
              validationSchema={Yup.object({
                name: Yup.string().required("Required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
                qualification: Yup.string().required("Required"),
                gender: Yup.string().required("Required"),
                status: Yup.string().required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                if (this.state.value !== "") {
                  if (this.state.value.length === 14) {
                    localStorage.setItem("userName", values.name);
                    history.push("/verify", {
                      state: this.state.value,
                    });
                  } else {
                    console.log(this.state.value);
                    this.setState({ errMsg: "Phone number is invalid" });
                  }
                } else {
                  this.setState({ errMsg: "Required" });
                }
                setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <div className="inputs">
                    <label htmlFor="name">First and Last Name</label>
                    <Field name="name" type="text" placeholder="John Doe" />
                    <ErrorMessage name="name">
                      {(msg) => <div className="error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="inputs">
                    <label htmlFor="email">Email Address</label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="demo@gmail.com"
                    />
                    <ErrorMessage name="email">
                      {(msg) => <div className="error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="inputs">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <PhoneInput
                      defaultCountry="NG"
                      international
                      withCountryCallingCode
                      value={this.state.value}
                      onChange={this.onValueChange}
                    />
                    <div className="error">{this.state.errMsg}</div>
                  </div>

                  <div className="inputs">
                    <label htmlFor="qualification">
                      Highest attained qualification
                    </label>
                    <Field
                      name="qualification"
                      as="select"
                      className="my-select"
                    >
                      <option value="">
                        Select your highest attained qualification
                      </option>
                      <option value="first school leaving certificate">
                        First School Leaving Certificate
                      </option>
                      <option value="ssce">SSCE</option>
                      <option value="ond">OND</option>
                      <option value="bachelors degree/hnd">
                        Bachelors Degree/HND
                      </option>
                      <option value="masters degree/hnd">Masters Degree</option>
                      <option value="phd">PHD</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage name="qualification">
                      {(msg) => <div className="error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="inputs checkbox">
                    <label htmlFor="status" className="first_label">
                      Marital Status
                    </label>
                    <div role="group" aria-labelledby="status">
                      <label>
                        <Field type="radio" name="status" value="married" />
                        Married
                      </label>
                      <label>
                        <Field type="radio" name="status" value="single" />
                        Single
                      </label>
                      <label>
                        <Field type="radio" name="status" value="widowed" />
                        Widowed
                      </label>
                    </div>
                    <ErrorMessage name="status">
                      {(msg) => <div className="error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="inputs checkbox">
                    <label htmlFor="gender" className="first_label">
                      Gender
                    </label>
                    <div role="group" aria-labelledby="gender">
                      <label>
                        <Field type="radio" name="gender" value="male" />
                        Male
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="female" />
                        Female
                      </label>
                    </div>
                    <ErrorMessage name="gender">
                      {(msg) => <div className="error">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <button type="submit" id="next_btn">
                    Next
                  </button>
                </Form>
              )}
            </Formik>
            <p id="login">
              Already have an account? <a href="#">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PersonalProfile);
