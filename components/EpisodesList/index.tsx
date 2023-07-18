import { getAllEpisodes } from "@/services/rickAndMortyServices";
import { List, Typography, Divider, Skeleton } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const { Title } = Typography;

export const EpisodesList = ({ episodes }: { episodes: Episode[] | null }) => {
  return (
    <div>
      <Title>Episodes</Title>
      {/* <InfiniteScroll
        height={"350px"}
        dataLength={episodes?.length || 0}
        // next={loadMoreData}
        // hasMore={episodes !== undefined && episodes.length < 50} // TODO: Check this logic with a variable number
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
      > */}
      <List
        dataSource={episodes || []}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              style={{ paddingLeft: 8 }}
              description={`${item.episode} - ${item.name} - ${item.air_date}`}
            />
          </List.Item>
        )}
      />
      {/* </InfiniteScroll> */}
    </div>
  );
};
