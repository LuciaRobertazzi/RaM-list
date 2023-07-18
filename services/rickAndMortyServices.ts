const baseURL = "https://rickandmortyapi.com/api";

const getAllCharacters = async (page?: number) => {
  const response = await fetch(`${baseURL}/character/?page=${page || 1}`);
  const data = await response.json();
  return data;
};

const getAllEpisodes = async () => {
  const response = await fetch(`${baseURL}/episode`);
  const data = await response.json();
  return data;
};

const getEpisodesById = async (ids: string[]) => {
  const response = await fetch(`${baseURL}/episode/${ids.join()}`);
  const data = await response.json();
  return data;
};

export { getAllCharacters, getAllEpisodes, getEpisodesById };
