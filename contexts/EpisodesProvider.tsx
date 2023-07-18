import { getEpisodesById } from "@/services/rickAndMortyServices";
import React, { useState } from "react";
import { createContext } from "react";

type EpisodesContextType = {
  firstCharacterEpisodes: Episode[] | null;
  secondCharacterEpisodes: Episode[] | null;
  sharedEpisodes: Episode[] | null;
  firstCharacter: Character | null;
  setFirstCharacter: (character: Character | null) => void;
  secondCharacter: Character | null;
  setSecondCharacter: (character: Character | null) => void;
};

export const EpisodesContext = createContext<EpisodesContextType>({
  firstCharacterEpisodes: null,
  secondCharacterEpisodes: null,
  sharedEpisodes: null,
  firstCharacter: null,
  setFirstCharacter: () => {},
  secondCharacter: null,
  setSecondCharacter: () => {},
});

const EpisodesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firstCharacterEpisodes, setFirstCharacterEpisodes] = useState<
    Episode[] | null
  >(null);
  const [secondCharacterEpisodes, setSecondCharacterEpisodes] = useState<
    Episode[] | null
  >(null);
  const [sharedEpisodes, setSharedEpisodes] = useState<Episode[] | null>(null);

  const [firstCharacter, setFirstCharacter] = useState<Character | null>(null);
  const [secondCharacter, setSecondCharacter] = useState<Character | null>(
    null
  );

  const getEpisodes = async (ids: string[]) => {
    const episodes = await getEpisodesById(ids);
    return episodes.length ? episodes : [episodes];
  };

  const handleChangeFirstCharacter = async (character: Character | null) => {
    if (character !== firstCharacter) {
      setFirstCharacter(character);
      const episodesId: string[] | null =
        character &&
        character.episode.map((epURL) => {
          const splitURL = epURL.split("/");
          return splitURL[splitURL.length - 1];
        });
      if (!episodesId) {
        setFirstCharacterEpisodes(null);
        setSharedEpisodes(null);
      } else {
        const first = await getEpisodes(episodesId);
        setFirstCharacterEpisodes(first);
        if (secondCharacter) {
          const shared = [
            episodesId.filter((num) =>
              secondCharacter.episode
                .map((epURL) => {
                  const splitURL = epURL.split("/");
                  return splitURL[splitURL.length - 1];
                })
                .includes(num)
            ),
          ].flat();
          const sharedEpisodes = await getEpisodes(shared);
          setSharedEpisodes(sharedEpisodes);
        }
      }
    }
  };

  const handleChangeSecondCharacter = async (character: Character | null) => {
    if (character !== secondCharacter) {
      setSecondCharacter(character);
      const episodesId: string[] | null =
        character &&
        character.episode.map((epURL) => {
          const splitURL = epURL.split("/");
          return splitURL[splitURL.length - 1];
        });
      if (!episodesId) {
        setSecondCharacterEpisodes(null);
        setSharedEpisodes(null);
      } else {
        const second = await getEpisodes(episodesId);
        setSecondCharacterEpisodes(second);
        if (firstCharacter) {
          const shared = [
            episodesId.filter((num) =>
              firstCharacter.episode
                .map((epURL) => {
                  const splitURL = epURL.split("/");
                  return splitURL[splitURL.length - 1];
                })
                .includes(num)
            ),
          ].flat();
          const sharedEpisodes = await getEpisodes(shared);
          setSharedEpisodes(sharedEpisodes);
        }
      }
    }
  };

  return (
    <EpisodesContext.Provider
      value={{
        firstCharacterEpisodes,
        secondCharacterEpisodes,
        sharedEpisodes,
        firstCharacter,
        setFirstCharacter: handleChangeFirstCharacter,
        secondCharacter,
        setSecondCharacter: handleChangeSecondCharacter,
      }}
    >
      {children}
    </EpisodesContext.Provider>
  );
};

export default EpisodesProvider;
