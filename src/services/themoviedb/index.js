export const getMovieList = async({page}) => {
  let result = await fetch(`http://localhost:3000/movielist?page=${page || 0}`);
  let json = await result.json();
  return json;
};

export const searchMovie = async({searchText, page}) => {
  let result = await fetch(`http://localhost:3000/search?searchText=${searchText}&page=${page}`);
  let json = await result.json();
  return json;
};

export const getMovie = async({id}) => {
  let result = await fetch(`http://localhost:3000/movie/${id}`);
  let json = await result.json();
  return json;
};