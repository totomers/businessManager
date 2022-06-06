import { Button, Form, Input, Modal, Spin, Typography } from "antd";
import React, { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { IBusinessSimple } from "../../../../interfaces/businessSimple.interface";
import {
  approveBusiness,
  declineBusiness,
  markAsPendingVerification,
} from "../../businessesSlice";
interface IPropsBusinessModel {
  visible: boolean;
  setVisible: any;
  business: IBusinessSimple;
}

export default function PendingVerificationModal({
  visible,
  setVisible,
  business,
}: IPropsBusinessModel) {
  const [loading, setLoading] = useState(false);
  const { _id } = business;

  const dispatch = useAppDispatch();

  const onFinish = () => {
    handleBusinessPendingVerification();
  };

  const handleBusinessPendingVerification = () => {
    setLoading(true);
    dispatch(markAsPendingVerification({ _id }))
      .then(() => setVisible(false))
      .finally(() => setLoading(false));
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      title={business?.businessName}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        onFinish={onFinish}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        {/* <Form.Item
          label="Details"
          name="text"
        >
           <TextArea showCount maxLength={100} />
        </Form.Item> */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            key="submit"
            type="primary"
            loading={loading}
            htmlType="submit"
          >
            Mark As Pending Verification
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
