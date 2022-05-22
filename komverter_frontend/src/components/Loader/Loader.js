import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Loader.module.scss';
import loader from '../../images/cat.gif'

const Loader = ({ position, size }) => (
  <span className={styles[position]}>
    <img src={loader} style={{marginTop:'20px'}} alt='cat'/>
  </span>
);

Loader.propTypes = {
  position: PropTypes.oneOf(['default', 'center']),
  size: PropTypes.oneOf(['small', 'medium']),
};

Loader.defaultProps = {
  position: 'default',
  size: 'medium',
};

export default Loader;
