import { Table, Space, Tag, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { IBusinessSimple } from "../../../../interfaces/businessSimple.interface";
import styles from "./BusinessTable.module.css";
import {
  filterTableByStatus,
  getBusinesses,
  selectBusinessesInTable,
  setTableToAll,
} from "../../businessesSlice";
import BusinessModal from "../Business-Details-Modal/BusinessDetailsModal";

import { Segmented } from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  ClockCircleOutlined,
  SendOutlined,
  CheckCircleOutlined,
  HourglassOutlined,
  CloseOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";
import ApprovalModal from "../Approval-Modal/ApprovalModal";
import DeclinedModal from "../Declined-Modal/DeclinedModal";
import PendingVerificationModal from "../Pending-Verification-Modal/PendingVerificationModal";

const { Column, ColumnGroup } = Table;

export default function BusinessTable() {
  const emptyBusiness = {
    _id: "",
    businessName: "",
    businessAdmin: {},
    status: "pendingAction",
  } as IBusinessSimple;
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isApprovalModalVisible, setIsApprovalModalVisible] = useState(false);
  const [isDeclinedModalVisible, setIsDeclinedModalVisible] = useState(false);
  const [
    isPendingVerificationModalVisible,
    setIsPendingVerificationdModalVisible,
  ] = useState(false);
  const [business, setBusiness] = useState(emptyBusiness);
  const [loading, setLoading] = useState(false);
  const businessesInTable = useAppSelector(selectBusinessesInTable);

  const dispatch = useAppDispatch();

  const fetchAllBusinesses = async () => {
    setLoading(true);
    await dispatch(getBusinesses()).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchAllBusinesses();
  }, []);

  const showBusinessModal = (business: IBusinessSimple) => {
    setBusiness(business);
    setIsDetailModalVisible(true);
  };

  const showApprovalModal = (business: IBusinessSimple) => {
    setBusiness(business);
    setIsApprovalModalVisible(true);
  };
  const showDeclinedModal = (business: IBusinessSimple) => {
    setBusiness(business);
    setIsDeclinedModalVisible(true);
  };
  const showPendingVerificationModal = (business: IBusinessSimple) => {
    setBusiness(business);
    setIsPendingVerificationdModalVisible(true);
  };

  const setBusinessesInDataTable = (
    value?: "pendingAction" | "pendingVerification" | "verified" | "unverified"
  ) => {
    if (value) dispatch(filterTableByStatus(value));
    else dispatch(setTableToAll());
  };

  const mapStatusLabels = (
    status: "pendingVerification" | "pendingAction" | "verified" | "unverified"
  ) => {
    switch (status) {
      case "pendingAction":
        return { label: "Pending Action", color: "" };
      case "pendingVerification":
        return { label: "Pending Verification", color: "orange" };
      case "verified":
        return { label: "Approved", color: "green" };
      case "unverified":
        return { label: "Declined", color: "red" };
      default:
        return { label: "", color: "white" };
    }
  };

  return (
    <div className={styles.container} key="divTable">
      <Segmented
        key={"segmented_01"}
        className={styles.segment_box}
        onChange={(value: any) => {
          setBusinessesInDataTable(value);
        }}
        size="large"
        options={[
          {
            label: <div className={styles.segment_item}>All</div>,
            value: "",
          },
          {
            label: <div className={styles.segment_item}>Pending Action</div>,
            value: "pendingAction",
          },
          {
            label: (
              <div className={styles.segment_item}>Pending Verification</div>
            ),
            value: "pendingVerification",
          },
          {
            label: <div className={styles.segment_item}>Approved</div>,
            value: "verified",
          },
          {
            label: <div className={styles.segment_item}>Declined</div>,
            value: "unverified",
          },
        ]}
      />

      <Table dataSource={businessesInTable} loading={loading}>
        <Column title="Name" dataIndex="businessName" key="name" />
        <Column
          title="Email"
          key="email"
          render={(_: any, record: IBusinessSimple) => (
            <span key={record._id + "email"}>
              {record.businessAdmin?.email}
            </span>
          )}
        />
        <Column
          title="status"
          dataIndex="status"
          key="status"
          render={(status: any) => {
            const { color, label } = mapStatusLabels(status);
            return (
              <Tag color={color} key={status}>
                {label}
              </Tag>
            );
          }}
        />
        <Column
          title=""
          key="action"
          render={(_: any, record: IBusinessSimple) => (
            <Space key={record._id}>
              {record.status === "pendingAction" && (
                <Button
                  onClick={() => {
                    showPendingVerificationModal(record);
                  }}
                  icon={<HourglassOutlined />}
                >
                  Mark As Pending verification
                </Button>
              )}
              {record.status === "pendingVerification" && (
                <>
                  <Button
                    type="dashed"
                    onClick={() => {
                      showApprovalModal(record);
                    }}
                    icon={<CheckCircleOutlined />}
                  >
                    Approve
                  </Button>
                  <Button
                    type="dashed"
                    danger
                    onClick={() => {
                      showDeclinedModal(record);
                    }}
                    icon={<CloseOutlined />}
                  >
                    Decline
                  </Button>
                </>
              )}
            </Space>
          )}
        />
        <Column
          title=""
          key="details"
          render={(_: any, record: IBusinessSimple) => (
            <Space size="middle" key={record._id}>
              <Button
                shape="round"
                onClick={() => {
                  showBusinessModal(record);
                }}
              >
                View Details
              </Button>
            </Space>
          )}
        />
      </Table>
      <BusinessModal
        visible={isDetailModalVisible}
        setVisible={setIsDetailModalVisible}
        business={business}
      ></BusinessModal>
      <ApprovalModal
        visible={isApprovalModalVisible}
        setVisible={setIsApprovalModalVisible}
        business={business}
      />
      <DeclinedModal
        visible={isDeclinedModalVisible}
        setVisible={setIsDeclinedModalVisible}
        business={business}
      />
      <PendingVerificationModal
        visible={isPendingVerificationModalVisible}
        setVisible={setIsPendingVerificationdModalVisible}
        business={business}
      />
    </div>
  );
}
