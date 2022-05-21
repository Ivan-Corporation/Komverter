import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './SearchBar.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { motion } from 'framer-motion/dist/framer-motion'


const SearchBar = ({ searchTerm, onChange, onSubmit, className }) => {
  return (

    <form className={classNames(styles.searchBar, className)} onSubmit={onSubmit}>
      <input
        className={styles.searchInput}
        onChange={onChange}
        type="text"
        value={searchTerm}
        placeholder="Copy or search ✏️"
        required
      />
     
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{marginLeft:'1px'}}
            type='submit'
          >
      <SearchIcon sx={{fontSize:'30px'}}/>
      </IconButton>
     
    </form>
   
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SearchBar.defaultProps = {
  className: '',
};

export default SearchBar;
