import { List, Typography, Pagination } from "antd";
import { useEffect, useState } from "react";
import { getAllCharacters } from "@/services/rickAndMortyServices";
import { CharacterCard } from "./CharacterCard";
import { ScrollView } from "@/components";

const { Title } = Typography;
export const CharactersList = () => {
  const [characters, setCharacters] = useState<character[] | undefined>(
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
          dataSource={characters}
          grid={{ gutter: 4, column: 2 }}
          renderItem={(item) => (
            <List.Item key={item.id}>
              {/* TODO: Add logic for the selected item */}
              <CharacterCard item={item} selected={item.id === 6} />{" "}
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
