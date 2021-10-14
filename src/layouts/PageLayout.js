import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const PageLayout = ({ children, pageClass }) => <main className={classnames('page-body', pageClass)}>{children}</main>;

PageLayout.defaultProps = {
  pageClass: '',
};

PageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  pageClass: PropTypes.string,
};

export default PageLayout;
