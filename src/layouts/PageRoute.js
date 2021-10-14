import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loader } from '../components';

const PageRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Suspense fallback={<Loader show />}>
        <Layout>
          <Component {...props} />{' '}
        </Layout>
      </Suspense>
    )}
  />
);

PageRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  layout: PropTypes.func.isRequired,
};

export default PageRoute;
