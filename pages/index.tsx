import { CharactersList, EpisodesList } from "@/components";
import { EpisodesContext } from "@/contexts/EpisodesProvider";
import { Row, Col, Divider } from "antd";
import Head from "next/head";
import { useContext } from "react";

export default function Home() {
  const {
    firstCharacterEpisodes,
    secondCharacterEpisodes,
    sharedEpisodes,
    firstCharacter,
    setFirstCharacter,
    secondCharacter,
    setSecondCharacter,
  } = useContext(EpisodesContext);
  return (
    <>
      <Head>
        <title>Rick And Morty</title>
        <meta name="description" content="Playground Code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ backgroundColor: "white" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CharactersList
              selectedCharacter={firstCharacter}
              disabledCharacter={secondCharacter}
              setCharacter={setFirstCharacter}
            />
            <Divider type="vertical" style={{ height: "500px" }} />
            <CharactersList
              selectedCharacter={secondCharacter}
              disabledCharacter={firstCharacter}
              setCharacter={setSecondCharacter}
            />
          </div>
          <Divider />
          <Row style={{ width: "100%" }} wrap gutter={16}>
            <Col span={8}>
              <EpisodesList episodes={firstCharacterEpisodes} />
            </Col>

            <Col span={8}>
              <EpisodesList episodes={sharedEpisodes} />
            </Col>

            <Col span={8}>
              <EpisodesList episodes={secondCharacterEpisodes} />
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
}
