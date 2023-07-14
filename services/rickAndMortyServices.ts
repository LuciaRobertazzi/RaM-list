const getAllCharacters = async () => {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character/?page=1"
  );
  const data = await response.json();
  return data;
};

const getAllEpisodes = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/episode");
  const data = await response.json();
  return data;
};

export { getAllCharacters, getAllEpisodes };
