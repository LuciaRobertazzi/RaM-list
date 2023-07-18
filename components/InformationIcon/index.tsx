import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const InformationIcon = ({ message }: { message: string }) => {
  return (
    <Tooltip placement="topLeft" title={message}>
      <InfoCircleOutlined
        style={{ fontSize: 16, color: "rgba(0, 0, 0, 0.25)" }}
      />
    </Tooltip>
  );
};
