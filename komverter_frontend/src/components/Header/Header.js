import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CottageIcon from '@mui/icons-material/Cottage';
import { RepositoryMetrics } from 'repository-metrics';
import { motion } from 'framer-motion/dist/framer-motion'

const Header = () => {



  return (
    <header className={styles.header}>
      <motion.div
                initial={{ opacity: 0, y: -180 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1,
                    delay: 0.2,
                }}
                >
       <AppBar position="static" style={{backgroundColor:'darkorange'}}>
       <Toolbar>
         <Link to='/' >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            
          >
            
            <CottageIcon  sx={{ fontSize: 30 }} style={{color:'white'}}/>
          </IconButton>
          </Link>
          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          <Link to='/' style={{ color: '#FFF' }}><b >Komverter</b></Link>
          </Typography>
          
          <RepositoryMetrics 
            owner='Ivan-Corporation' 
            repo='Komverter' 
            theme='light' 
            />
        </Toolbar>
      </AppBar>
      </motion.div>
    </header>
  );
};


export default Header;
