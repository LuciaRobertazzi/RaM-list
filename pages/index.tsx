import { CharactersList, EpisodesList } from "@/components";
import { EpisodesContext } from "@/contexts/EpisodesProvider";
import { getAllCharacters } from "@/services";
import { Row, Col, Divider } from "antd";
import Head from "next/head";
import { useContext } from "react";

const Home = ({
  charactersToRender,
  totalOfCharacters,
}: {
  charactersToRender: Character[];
  totalOfCharacters: number;
}) => {
  const {
    firstCharacterEpisodes,
    secondCharacterEpisodes,
    sharedEpisodes,
    firstCharacterId,
    setFirstCharacter,
    secondCharacterId,
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
              selectedCharacter={firstCharacterId}
              disabledCharacter={secondCharacterId}
              setCharacter={setFirstCharacter}
              description="#1"
              initialData={charactersToRender}
              totalOfCharacters={totalOfCharacters}
            />
            <Divider type="vertical" style={{ height: "500px" }} />
            <CharactersList
              selectedCharacter={secondCharacterId}
              disabledCharacter={firstCharacterId}
              setCharacter={setSecondCharacter}
              description="#2"
              initialData={charactersToRender}
              totalOfCharacters={totalOfCharacters}
            />
          </div>
          <Divider />
          <Row style={{ width: "100%" }} wrap gutter={16}>
            <Col span={8}>
              <EpisodesList
                title="Character #1 - Only Episodes"
                episodes={firstCharacterEpisodes}
              />
            </Col>

            <Col span={8}>
              <EpisodesList
                title="Characters #1 & #2 - Shared Episodes"
                episodes={sharedEpisodes}
                tooltipText="Select both characters to view results."
              />
            </Col>

            <Col span={8}>
              <EpisodesList
                title="Character #2 - Only Episodes"
                episodes={secondCharacterEpisodes}
              />
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
};

Home.getInitialProps = async () => {
  console.log("holi");
  const data = await getAllCharacters();
  return {
    charactersToRender: data.results,
    totalOfCharacters: data.info.count,
  };
};

export default Home;
