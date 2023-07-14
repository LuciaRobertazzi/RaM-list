import { Card, Typography, Avatar } from "antd";
import Image from "next/image";

const { Text } = Typography;

export const CharacterCard = ({ item }: { item: character }) => {
  return (
    <Card style={{ width: 300, display: "flex", justifyContent: "row" }}>
      <div>
        <Avatar
          size={64}
          src={<Image width={24} height={24} src={item.image} alt="avatar" />}
        />
        <div>
          <Text>{item.name}</Text>
          <Text>{`${item.status} - ${item.species}`}</Text>
        </div>
      </div>
    </Card>
  );
};
