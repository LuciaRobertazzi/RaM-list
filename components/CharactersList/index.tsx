import { List } from "antd";
import { useEffect, useState } from "react";
import { getAllCharacters } from "@/services/rickAndMortyServices";
import { CharacterCard } from "./CharacterCard";

export const CharactersList = () => {
  const [characters, setCharacters] = useState<character[] | undefined>(
    undefined
  );
  const getInitialData = async () => {
    const data = await getAllCharacters();
    setCharacters(data.results);
  };
  useEffect(() => {
    getInitialData();
  }, []);
  return (
    <List
      dataSource={characters}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <CharacterCard item={item} />
        </List.Item>
      )}
    />
  );
};
