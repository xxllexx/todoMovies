import Realm from 'realm';
import _ from 'lodash/fp';

const MovieSchema = {
  name: 'Movie',
  properties: {
    title: 'string',
    image: 'string',
    releaseDate: 'string',
    movieId: 'int',
    watched: 'bool',
    timeAdded: 'date'
  }
};

const realm = new Realm({schema: [MovieSchema]});

export const getRealm = (schemaName) => schemaName ? realm.objects(schemaName) : realm;

export const getMoviesListFromStorage = () => getRealm('Movie');

export const addMoviesToStorage = ({title, image, releaseDate, movieId}) => {
  if (!Boolean(_.find({movieId}, getMoviesListFromStorage()))) {
    realm.write(() => {
      let movie = realm.create('Movie', {
        title,
        image,
        releaseDate,
        movieId,
        watched: false,
        timeAdded: new Date()
      });
      return movie;
    });

    return realm.write(() => {});
  }

  return false;
};

export const changeMovieWatchedStatus = ({id, isWatched}) => {
  realm.write(() => {
    let movie = _.find({movieId: id}, getMoviesListFromStorage());
    movie.watched = isWatched;
    return movie;
  });

  return realm.write(() => {
  });
};

export const deleteMovie = ({id, isWatched}) => {
  realm.write(() => {
    let movie = _.find({movieId: id}, getMoviesListFromStorage())

    realm.delete(movie);
  });

  return realm.write(() => {
  });
};