import { List, Typography, Pagination } from "antd";
import { useEffect, useState } from "react";
import { getAllCharacters } from "@/services";
import { CharacterCard } from "./CharacterCard";
import { ScrollView } from "@/components";

const { Title } = Typography;

interface CharacterListProps {
  initialData: Character[];
  totalOfCharacters: number;
  selectedCharacter?: number;
  disabledCharacter?: number;
  setCharacter: (character: Character | null) => void;
  description: string;
}

export const CharactersList = ({
  initialData,
  totalOfCharacters,
  selectedCharacter,
  disabledCharacter,
  setCharacter,
  description,
}: CharacterListProps) => {
  const [characters, setCharacters] = useState<Character[]>(initialData);

  const handleChangePage = async (pageNumber: number) => {
    const data = await getAllCharacters(pageNumber);
    setCharacters(data.results);
  };

  return (
    <div style={{ width: "48vw" }}>
      <Title level={2}>Character {description}</Title>
      <ScrollView height={"380px"}>
        <List
          grid={{
            gutter: 4,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 2,
            xxl: 2,
          }}
          dataSource={characters}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <CharacterCard
                isDisabled={item.id === disabledCharacter}
                onPress={setCharacter}
                item={item}
                isSelected={item.id === selectedCharacter}
              />
            </List.Item>
          )}
        />
      </ScrollView>

      {totalOfCharacters && (
        <Pagination
          style={{ marginTop: 8 }}
          pageSize={20}
          defaultCurrent={1}
          showSizeChanger={false}
          total={totalOfCharacters}
          onChange={handleChangePage}
        />
      )}
    </div>
  );
};
