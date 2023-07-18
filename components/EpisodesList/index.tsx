import { List, Typography } from "antd";
import { ScrollView, InformationIcon } from "@/components";
const { Title } = Typography;

interface EpisodesListProps {
  episodes: Episode[] | [];
  title: string;
  tooltipText?: string;
}

export const EpisodesList = ({
  episodes,
  title,
  tooltipText,
}: EpisodesListProps) => {
  return (
    <div>
      <Title level={3}>
        {title} {tooltipText && <InformationIcon message={tooltipText} />}
      </Title>

      <ScrollView height={380}>
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
      </ScrollView>
    </div>
  );
};
