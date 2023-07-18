import { getEpisodesById } from "@/services/rickAndMortyServices";
import React, { useState } from "react";
import { createContext } from "react";

export const EpisodesContext = createContext<EpisodesContextType>({
  firstCharacterEpisodes: [],
  secondCharacterEpisodes: [],
  sharedEpisodes: [],
  firstCharacterId: undefined,
  setFirstCharacter: () => {},
  secondCharacterId: undefined,
  setSecondCharacter: () => {},
});

const EpisodesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [firstCharacterEpisodes, setFirstCharacterEpisodes] = useState<
    Episode[] | []
  >([]);
  const [secondCharacterEpisodes, setSecondCharacterEpisodes] = useState<
    Episode[] | []
  >([]);
  const [sharedEpisodes, setSharedEpisodes] = useState<Episode[] | []>([]);

  const [firstCharacter, setFirstCharacter] = useState<Character | null>(null);
  const [secondCharacter, setSecondCharacter] = useState<Character | null>(
    null
  );

  const getEpisodes = async (ids: string[]) => {
    if (!ids.length) {
      return [];
    } else {
      const episodes = await getEpisodesById(ids);
      return episodes.length ? episodes : [episodes];
    }
  };

  // ------------------------------------------------------------------------------------------
  const fetchAndSetEpisodes = async (
    character: Character | null,
    setCharacterEpisodes: React.Dispatch<React.SetStateAction<Episode[] | []>>,
    otherCharacter: Character | null
  ) => {
    const cleanStates = () => {
      setCharacterEpisodes([]);
      setSharedEpisodes([]);
    };

    if (!character) {
      cleanStates();
      return;
    }

    const episodesId = character.episode?.map((epURL) => {
      const splitURL = epURL.split("/");
      return splitURL[splitURL.length - 1];
    });

    if (!episodesId) {
      cleanStates();
      return;
    }

    const characterEpisodes = await getEpisodes(episodesId);
    setCharacterEpisodes(characterEpisodes);

    if (otherCharacter) {
      const sharedIds = episodesId.filter((num) =>
        otherCharacter.episode
          ?.map((epURL) => {
            const splitURL = epURL.split("/");
            return splitURL[splitURL.length - 1];
          })
          ?.includes(num)
      );

      const sharedEpisodes = await getEpisodes(sharedIds);
      setSharedEpisodes(sharedEpisodes);
    }
  };

  // ------------------------------------------------------------------------------------------

  const handleChangeFirstCharacter = async (character: Character | null) => {
    if (character !== firstCharacter) {
      setFirstCharacter(character);
      await fetchAndSetEpisodes(
        character,
        setFirstCharacterEpisodes,
        secondCharacter
      );
    }
  };

  const handleChangeSecondCharacter = async (character: Character | null) => {
    if (character !== secondCharacter) {
      setSecondCharacter(character);
      await fetchAndSetEpisodes(
        character,
        setSecondCharacterEpisodes,
        firstCharacter
      );
    }
  };

  return (
    <EpisodesContext.Provider
      value={{
        firstCharacterEpisodes,
        secondCharacterEpisodes,
        sharedEpisodes,
        firstCharacterId: firstCharacter?.id,
        setFirstCharacter: handleChangeFirstCharacter,
        secondCharacterId: secondCharacter?.id,
        setSecondCharacter: handleChangeSecondCharacter,
      }}
    >
      {children}
    </EpisodesContext.Provider>
  );
};

export default EpisodesProvider;
