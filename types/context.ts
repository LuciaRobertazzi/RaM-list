type EpisodesContextType = {
  firstCharacterEpisodes: Episode[] | [];
  secondCharacterEpisodes: Episode[] | [];
  sharedEpisodes: Episode[] | [];
  firstCharacterId?: number;
  setFirstCharacter: (character: Character | null) => void;
  secondCharacterId?: number;
  setSecondCharacter: (character: Character | null) => void;
};
