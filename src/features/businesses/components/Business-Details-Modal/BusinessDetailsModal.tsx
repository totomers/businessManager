import { Button, Descriptions, Modal, Spin, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { IBusinessFull } from "../../../../interfaces/businessFull.interface";
import { IBusinessSimple } from "../../../../interfaces/businessSimple.interface";
import { getBusinessDetailsFromServer } from "../../businessesApi";
import styles from "./Business.module.css";
const { Paragraph } = Typography;
interface IPropsBusinessModel {
  visible: boolean;
  setVisible: any;
  business: IBusinessSimple;
}

export default function BusinessDetailsModal({
  visible,
  setVisible,
  business,
}: IPropsBusinessModel) {
  const [loading, setLoading] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({} as IBusinessFull);

  useEffect(() => {
    fetchBusinessDetails();
  }, [business]);

  const fetchBusinessDetails = async () => {
    setLoading(true);

    const businessDetailsFromServer = await getBusinessDetailsFromServer(
      business?._id
    )
      .then((data) => setBusinessDetails(data))
      .catch((e) => console.log("error is: ", e))
      .finally(() => setLoading(false));
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal
      visible={visible}
      title={business?.businessName}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      {business._id && !loading && (
        <div>
          <Descriptions title="Bank Info" layout="vertical" bordered>
            <Descriptions.Item label="Bank Account Holder Name">
              <Paragraph copyable>
                {businessDetails?.bankAccountHolderName}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Bank Account IBAN">
              <Paragraph copyable>{businessDetails?.bankAccountIban}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Bank Account Swift">
              <Paragraph copyable>
                {businessDetails?.bankAccountSwift}
              </Paragraph>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Business Address" layout="vertical" bordered>
            <Descriptions.Item label="Address">
              <Paragraph copyable>{businessDetails?.businessAddress}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="House Number">
              <Paragraph copyable>
                {businessDetails?.businessHouseNumber}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Zipcode">
              <Paragraph copyable>{businessDetails?.businessZipCode}</Paragraph>
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Business Overview" layout="vertical" bordered>
            <Descriptions.Item label="Trade Name">
              <Paragraph copyable>
                {businessDetails?.businessTradeName}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Industry">
              <Paragraph copyable>{businessDetails?.industry}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Registration Number">
              <Paragraph copyable>
                {businessDetails?.businessRegistrationNumber}
              </Paragraph>
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}

      {loading && (
        <div className={styles.spin_container}>
          <Spin size="large" />
        </div>
      )}
    </Modal>
  );
}
