import { Button, Form, Input, Modal, Spin, Typography } from "antd";
import React, { useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { IBusinessSimple } from "../../../../interfaces/businessSimple.interface";
import { approveBusiness } from "../../businessesSlice";
interface IPropsBusinessModel {
  visible: boolean;
  setVisible: any;
  business: IBusinessSimple;
}

export default function ApprovalModal({
  visible,
  setVisible,
  business,
}: IPropsBusinessModel) {
  const [loading, setLoading] = useState(false);
  const { _id, businessAdmin } = business;

  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    const merchantId = values.merchantId;
    handleBusinessApproval(merchantId);
  };

  const handleBusinessApproval = (merchantId: string) => {
    const email = businessAdmin?.email || "tomere@moveo.co.il";
    if (!email) return;
    setLoading(true);
    dispatch(approveBusiness({ _id, email, merchantId }))
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
        <Form.Item
          label="Merchant Id"
          name="merchantId"
          rules={[{ required: true, message: "Please Provide a merchant Id." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            key="submit"
            type="primary"
            loading={loading}
            htmlType="submit"
          >
            Update & Approve
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
