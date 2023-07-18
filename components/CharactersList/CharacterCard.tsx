import { Card, Typography, Avatar } from "antd";
import Image from "next/image";

const { Text } = Typography;

export const CharacterCard = ({
  item,
  selected,
  onPress,
}: {
  item: Character;
  selected: boolean;
  onPress: (character: Character | null) => void;
}) => {
  return (
    <Card
      style={{
        width: 300,
        display: "flex",
        justifyContent: "row",
        cursor: "pointer",
        backgroundColor: `${selected ? "#1677ff31" : "white"}`,
      }}
      size="small"
      bordered={selected}
      onClick={() => (selected ? onPress(null) : onPress(item))}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
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
