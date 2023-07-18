import { Card, Typography, Avatar } from "antd";
import Image from "next/image";

const { Text } = Typography;

interface CharacterCardProps {
  item: Character;
  isSelected: boolean;
  isDisabled: boolean;
  onPress: (character: Character | null) => void;
}

export const CharacterCard = ({
  item,
  isSelected,
  onPress,
  isDisabled,
}: CharacterCardProps) => {
  return (
    <Card
      style={{
        width: 300,
        display: "flex",
        justifyContent: "row",
        cursor: isDisabled ? "not-allowed" : "pointer",
        backgroundColor: `${isSelected ? "#1677ff31" : "white"}`,
      }}
      size="small"
      bordered={isSelected}
      onClick={() => {
        if (!isDisabled) {
          isSelected ? onPress(null) : onPress(item);
        }
      }}
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ fontWeight: "bold" }} disabled={isDisabled}>
            {item.name}
          </Text>
          <Text
            disabled={isDisabled}
          >{`${item.status} - ${item.species}`}</Text>
        </div>
      </div>
    </Card>
  );
};
