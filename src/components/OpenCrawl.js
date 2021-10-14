import React from 'react';
import { useSelector } from 'react-redux';

export const OpenCrawl = () => {
  const { current } = useSelector((state) => state.movies);

  return (
    <section className="container opening-crawl mt-3">
      <div id="crawler" className="crawler">
        <div className="crawl">
          <div className="title">
            <h1 className="text-center">{current && Object.keys(current).length > 0 && current.title}</h1>
          </div>
          <p className="text-center">{current && Object.keys(current).length > 0 && current.opening_crawl}</p>
        </div>
      </div>
    </section>
  );
};

OpenCrawl.propTypes = {};
