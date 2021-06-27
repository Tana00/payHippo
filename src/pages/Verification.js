import React, { Component } from "react";

import Steppers from "../components/Steppers";
import MobileHeader from "../components/MobileHeader";
import ImageSide from "../components/ImageSide";
import Modal from "../components/Modal";

import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { formatPhoneNumberIntl } from "react-phone-number-input";

import "./style.scss";

class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      phoneNumber: "",
      count: 60,
      open: false,
    };
  }

  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const num = this.props.location.state;
    if (num !== undefined) {
      this.setState({ phoneNumber: formatPhoneNumberIntl(num.state) });

      this.inter = setInterval(() => {
        if (this.state.count <= 0) {
          clearInterval(this.inter);
          this.setState({
            count: 0,
          });
        } else {
          this.setState((prevState) => ({ count: prevState.count - 1 }));
        }
      }, 1000);
    } else {
      this.setState({ phoneNumber: "number not provided", count: 1 });
    }
  }

  componentWillUnmount() {
    clearInterval(this.inter);
  }

  render() {
    return (
      <div id="container">
        <MobileHeader />
        <ImageSide />
        <div id="form_sec">
          <Steppers activeStep={this.state.step} />
          <div id="form_wrapper">
            <h3>Verify your phone number</h3>
            <p id="sub-heading" style={{ fontSize: ".85rem" }}>
              An SMS message with your verification code has been sent to{" "}
              <strong>{this.state.phoneNumber}</strong>
            </p>
            <Formik
              initialValues={{
                otp: "",
              }}
              validationSchema={Yup.object({
                otp: Yup.string().required("Required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                this.setState({ open: true });
              }}
            >
              <Form style={{ marginTop: "3rem" }}>
                <div className="inputs" style={{ marginBottom: "0.8rem" }}>
                  <label htmlFor="otp">OTP</label>
                  <Field name="otp" type="text" placeholder="123456" />
                  <ErrorMessage name="otp">
                    {(msg) => <div className="error">{msg}</div>}
                  </ErrorMessage>
                </div>
                <div id="verify_opt">
                  {this.state.count === 0 ? (
                    <a href="#">Resend OTP</a>
                  ) : (
                    <p>Resend OTP in {this.state.count}</p>
                  )}
                  <a href="#">Did not receive OTP?</a>
                </div>
                <button type="submit" id="next_btn">
                  Sign Up
                </button>
              </Form>
            </Formik>
            <p id="login">
              Already have an account? <a href="#">Sign in</a>
            </p>
            <a
              href="/profile"
              style={{ color: "#282c34", textDecoration: "underline" }}
            >
              Go back
            </a>
          </div>
        </div>
        <Modal openModal={this.state.open} />
      </div>
    );
  }
}

export default withRouter(Verification);
