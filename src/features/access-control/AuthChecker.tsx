import { Spin } from "antd";
import React, { JSXElementConstructor } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { Navigate } from "react-router-dom";
import { selectIdToken } from "./accountSlice";

interface IPropsAuthChecker {
  children: any;
}

export default function AuthChecker({ children }: IPropsAuthChecker) {
  const idToken = useAppSelector(selectIdToken);

  const refreshToken = localStorage.getItem("refreshToken");

  return refreshToken ? children : <Navigate to={"/"}></Navigate>;
}
