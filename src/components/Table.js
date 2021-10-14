import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatHeight } from '../utils';

const Table = ({ ...props }) => {
  const [direction, setDirection] = useState(true);
  const [entityList, setEntityListing] = useState([]);
  const { filteredList, total } = props;

  useEffect(() => {
    if (filteredList && filteredList.length > 0) {
      setEntityListing(filteredList);
    }
    return () => {
      setEntityListing([]);
    };
  }, [filteredList]);

  const compareBy = (key, ascending) => {
    const reverse = ascending ? 1 : -1;

    if (key === 'height') {
      if (ascending) {
        return (a, b) => b[key] - a[key];
      }
      return (a, b) => a[key] - b[key];
    }

    return (a, b) => {
      if (a[key] < b[key]) return -1 * reverse;
      if (a[key] > b[key]) return 1 * reverse;
      return 0;
    };
  };

  const sortBy = (key) => {
    const listCopy = [...entityList];
    listCopy.sort(compareBy(key, direction));
    setEntityListing(listCopy);
  };

  return (
    <section className="">
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <div
                  onClick={() => {
                    sortBy('name');
                    setDirection(!direction);
                  }}
                  className="sortable"
                  aria-hidden
                >
                  Name
                </div>
              </th>
              <th scope="col">
                <div
                  onClick={() => {
                    sortBy('gender');
                    setDirection(!direction);
                  }}
                  className="sortable"
                  aria-hidden
                >
                  Gender
                </div>
              </th>
              <th scope="col">
                <div
                  onClick={() => {
                    sortBy('height');
                    setDirection(!direction);
                  }}
                  className="sortable"
                  aria-hidden
                >
                  Height
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {entityList && entityList.length > 0 ? (
              entityList.map((actor) => {
                const gender = actor.gender !== 'n/a' ? actor.gender.charAt(0) : actor.gender;
                return (
                  <tr key={actor.name}>
                    <th scope="row">{actor.name}</th>
                    <td className="text-capitalize">{gender}</td>
                    <td>{formatHeight(actor.height)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <th scope="row" colSpan="3">
                  <p className="text-center"> No content</p>
                </th>
              </tr>
            )}
          </tbody>
          {filteredList && filteredList.length > 0 && (
            <tfoot>
              <tr>
                <th scope="col" colSpan="2">
                  Character count {filteredList && filteredList.length}
                </th>
                <th scope="col">
                  {' '}
                  {filteredList && filteredList.length && `Total Height ${total && formatHeight(total)}`}
                </th>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </section>
  );
};

Table.defaultProps = {
  filteredList: [],
  total: 0,
};

Table.propTypes = {
  filteredList: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  total: PropTypes.number,
};

export default Table;
