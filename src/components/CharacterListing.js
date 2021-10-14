import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCharacter, resetCharacters } from '../redux/actions';
import Table from './Table';
import { LoaderEllipsis } from './LoaderEllipsis';

export const CharacterListing = () => {
  const [movieKey, setMovieKey] = useState();
  const [actorList, setActorList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [total, setTotal] = useState();
  const [gender, setGender] = useState('');

  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const { current, loading } = movies;

  const getLength = current && current.characters && current.characters.length;

  const getMovieCharacters = useCallback(
    async (key, characterList) => {
      dispatch(resetCharacters(key));
      if (characterList && characterList.length > 0) {
        await characterList.map((character) => {
          return dispatch(getCharacter(key, character));
        });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (current && Object.keys(current).includes('characters')) {
      // eslint-disable-next-line camelcase
      const { characters, episode_id } = current;
      setMovieKey(episode_id);
      getMovieCharacters(episode_id, characters);
    }
  }, [getMovieCharacters, current]);

  useEffect(() => {
    if (movieKey && Object.keys(movies).includes('current')) {
      setActorList(movies[movieKey]);
      setGender('');
    }
  }, [movieKey, movies]);

  useEffect(() => {
    if (filteredList && filteredList.length > 0) {
      const actorHeight = filteredList.map((item) => {
        return !isNaN(parseInt(item.height, 10)) ? parseInt(item.height, 10) : 0;
      });

      setTotal(
        actorHeight.reduce((a, b) => {
          return a + b;
        }),
      );
    }
  }, [getLength, filteredList, gender]);

  useEffect(() => {
    if (actorList && actorList.length === getLength) {
      const filtered = actorList.filter((item) => {
        return gender.length > 0 ? item.gender === gender : item.gender;
      });

      setFilteredList(filtered);
    }
  }, [actorList, getLength, gender]);

  return (
    <section className="py-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-3">Character's List</h4>
        <div className="form-group">
          <select className="form-control" value={gender} onChange={(event) => setGender(event.target.value)}>
            <option value="">All Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="hermaphrodite">Hermaphrodite</option>
          </select>
        </div>
      </div>

      {loading ? <LoaderEllipsis /> : <>{filteredList && <Table filteredList={filteredList} total={total} />}</>}
    </section>
  );
};

CharacterListing.propTypes = {};
