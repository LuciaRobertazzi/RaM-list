import { getAllEpisodes } from "@/services/rickAndMortyServices";
import { List, Typography, Divider, Skeleton } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const { Title } = Typography;

export const EpisodesList = () => {
  const [episodes, setEpisodes] = useState<episode[] | undefined>(undefined);
  const getInitialData = async () => {
    const data = await getAllEpisodes();
    setEpisodes(data.results);
  };
  const loadMoreData = () => {
    console.log("Loading more episodes");
  };
  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <div>
      <Title>Episodes</Title>
      <InfiniteScroll
        height={"350px"}
        dataLength={episodes?.length || 0}
        next={loadMoreData}
        hasMore={episodes !== undefined && episodes.length < 50} // TODO: Check this logic with a variable number
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={episodes}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                style={{ paddingLeft: 8 }}
                description={`${item.episode} - ${item.name} - ${item.air_date}`}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
