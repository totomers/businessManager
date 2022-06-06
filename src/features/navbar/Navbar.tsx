import { Button, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectIdToken } from "../access-control/accountSlice";
import styles from "./Navbar.module.css";
import { logout } from "../access-control/accountSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const idToken = useAppSelector(selectIdToken);
  const navigate = useNavigate();
  const logoutUser = () => {
    dispatch(logout()).then(() => navigate("/"));
  };

  return (
    <div className={styles.row}>
      <div className={styles.left_container}>
        <Space size="middle">
          <Button type="link">
            <Link to="/">Home</Link>
          </Button>
        </Space>
        <Space size="middle">
          <Button type="link">
            <Link to="/businesses">businesses</Link>
          </Button>
        </Space>
      </div>
      <div className={styles.right_container}>
        {idToken && (
          <Space
            size="middle"
            onClick={() => {
              logoutUser();
            }}
          >
            <Button type="link">Logout</Button>
          </Space>
        )}
      </div>
    </div>
  );
}
