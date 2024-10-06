import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0px',
  },
  speedDialButton: {
    backgroundColor: '#fff',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '38px',
    height: '38px',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  speedDialActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '60px',
    zIndex: 2000,
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity: 0,
    transform: 'translateY(10px)',
    '&.open': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  speedDialAction: {
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    margin: '5px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    zIndex: 2001,
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    '& i': {
      fontSize: '18px',
      color: '#007bff',
    },
  },
}));


const CustomSpeedDial = ({
  buttonIcon,
  actions
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const speedDialRef = useRef(null);

  const toggleSpeedDial = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (speedDialRef.current && !speedDialRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [speedDialRef]);

  return (
    <div className={classes.speedDial} ref={speedDialRef}>

      <button className={classes.speedDialButton} onClick={toggleSpeedDial}>
        {buttonIcon}
      </button>

      {
        isOpen &&
        <div className={`${classes.speedDialActions} ${isOpen ? 'open' : ''}`}>
          {
            actions?.map((e) => {
              return (
                <button className={classes.speedDialAction}>
                  <Box sx={{ marginLeft: "1px", marginTop: "12px" }}>
                    {e?.icon}
                  </Box>
                </button>
              )
            })
          }
        </div>
      }
    </div>
  );
};

export default CustomSpeedDial;
