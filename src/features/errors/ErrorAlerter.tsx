import { message } from "antd";
import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectError } from "./errorsSlice";

export default function ErrorAlerter() {
  const error = useAppSelector(selectError);
  useEffect(() => {
    if (error.message) message.warning(error.message);
  }, [error]);

  return <></>;
}
