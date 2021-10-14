import React, { lazy } from 'react';
import { BrowserRouter, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageLayout from './layouts/PageLayout';
import PageRoute from './layouts/PageRoute';

const Home = lazy(() => import('pages/Home'));

const Scroll = (props) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location]);

  return props.children;
};

Scroll.propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

const ScrollToTop = withRouter(Scroll);

const App = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Switch>
        <PageRoute exact path="/" layout={PageLayout} component={Home} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);

export default App;
