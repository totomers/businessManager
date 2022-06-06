import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ErrorAlerter from "../errors/ErrorAlerter";
import {
  respondToSignIn,
  selectIdToken,
  selectSessionToken,
  signIn,
} from "./accountSlice";

export default function AccessControl() {
  const session = useAppSelector(selectSessionToken);
  const idToken = useAppSelector(selectIdToken);
  const [email, setEmail] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);
  const [confirmCodeLoading, setConfirmCodeLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (idToken) navigate("/businesses");

    return () => {};
  }, [idToken]);

  const onSignInFinish = (values: any) => {
    console.log("Success:", values);
    const { email, password } = values;
    setEmail(email);
    setSignInLoading(true);
    dispatch(signIn({ email, password })).finally(() =>
      setSignInLoading(false)
    );
  };

  const onSigninFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onConfirmationCodeFinish = (values: any) => {
    console.log("Success:", values);
    const { confirmationCode } = values;
    if (session) {
      setConfirmCodeLoading(true);
      dispatch(
        respondToSignIn({ confirmationCode, session, username: email })
      ).finally(() => setConfirmCodeLoading(false));
    }
  };

  const onConfirmationCodeFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {!session && (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onSignInFinish}
          onFinishFailed={onSigninFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={signInLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}

      {session && (
        <Form
          onFinish={onConfirmationCodeFinish}
          onFinishFailed={onConfirmationCodeFailed}
        >
          <Form.Item
            label="Confirmation Code"
            name="confirmationCode"
            rules={[
              {
                required: true,
                message: "Please enter your confirmationCode!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={confirmCodeLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
      <ErrorAlerter />
    </div>
  );
}
