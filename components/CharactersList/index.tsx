import { List, Typography, Pagination } from "antd";
import { useEffect, useState } from "react";
import { getAllCharacters } from "@/services/rickAndMortyServices";
import { CharacterCard } from "./CharacterCard";
import { ScrollView } from "@/components";

const { Title } = Typography;

export const CharactersList = ({
  selectedCharacter,
  disabledCharacter,
  setCharacter,
}: {
  selectedCharacter?: number;
  disabledCharacter?: number;
  setCharacter: (character: Character | null) => void;
}) => {
  const [characters, setCharacters] = useState<Character[] | undefined>(
    undefined
  );
  const [total, setTotal] = useState<number>(0);
  const getInitialData = async () => {
    const data = await getAllCharacters();
    setCharacters(data.results);
    setTotal(data.info.count);
  };

  const handleChangePage = async (pageNumber: number) => {
    const data = await getAllCharacters(pageNumber);
    setCharacters(data.results);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <div style={{ width: "48vw" }}>
      <Title>Character</Title>
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

      {total && (
        <Pagination
          style={{ marginTop: 8 }}
          pageSize={20}
          defaultCurrent={1}
          showSizeChanger={false}
          total={total}
          onChange={handleChangePage}
        />
      )}
    </div>
  );
};
