import { getAllEpisodes } from "@/services/rickAndMortyServices";
import { List } from "antd";
import { useEffect, useState } from "react";

export const EpisodesList = () => {
  const [episodes, setEpisodes] = useState<episode[] | undefined>(undefined);
  const getInitialData = async () => {
    const data = await getAllEpisodes();
    setEpisodes(data.results);
  };
  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <List
      pagination={{ position: "bottom", align: "end" }}
      dataSource={episodes}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            description={`${item.episode} - ${item.name} - ${item.air_date}`}
          />
        </List.Item>
      )}
    />
  );
};
