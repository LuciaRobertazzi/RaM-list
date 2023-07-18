type EpisodesContextType = {
  firstCharacterEpisodes: Episode[] | null;
  secondCharacterEpisodes: Episode[] | null;
  sharedEpisodes: Episode[] | null;
  firstCharacterId?: number;
  setFirstCharacter: (character: Character | null) => void;
  secondCharacterId?: number;
  setSecondCharacter: (character: Character | null) => void;
};
