import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { grey } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from 'react-responsive';
import styles from './HeaderBar.module.css?after';
import { gViewMode, setGViewMode } from '@pages/_app';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const pages = ['HOME','FRONT-END','BACK-END'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar({ postList, getPostDate }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userInput, setUserInput] = useState({
    searchItem: "",
  });

  let viewMode = useContext(gViewMode);
  let setViewMode = useContext(setGViewMode);
  let [isDarkMode, setDarkMode] = useState(viewMode ? true : false);

  useEffect(() => {
    setDarkMode(viewMode)
  }, [])

  const isDesktop = useMediaQuery({
    query: "(min-width:1024px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (min-width:1023px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeNavMenu = (event) => {
    setAnchorElNav(null);
  }

  // app bar 내에서 MenuItem 클릭시 
  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);

    let clickedTag = postList.posts.filter((post) => {

      return event.currentTarget.textContent.toLowerCase().includes(event.currentTarget.textContent === "HOME" || event.currentTarget.textContent === "ITgrow"? 
                ""  : post.subject.toLowerCase());
    });

    getPostDate({ "posts": clickedTag });
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  let theme = createTheme({
    palette: {
      primary: {
        main: grey[50],
      },
      secondary: {
        // This is green.A700 as hex.
        main: grey[900],
      },
      mode: isDarkMode ? 'dark' : 'light'
    },
  });

  const toggleDarkMode = function darkSwitch() {
    setDarkMode(isDarkMode ? false : true);

    // 다크모드로 변경일 경우  
    if (!isDarkMode) {
      document.documentElement.setAttribute('color-theme', 'dark');
      setViewMode(true);
      localStorage.setItem('viewMode', true);
    } else { // 라이트모드로 변경일 경우 
      document.documentElement.setAttribute('color-theme', 'light');
      setViewMode(false);
      localStorage.setItem('viewMode', false);
    }

  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.07),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.2),
    },
    fontFamily: 'googleSigmar',
    // marginLeft: 16,
    width: '105%',

    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
    },

  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '15ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    '& ::placeholder': {
      fontFamily: "googleSigmar",
      fontWeight: 40,
    }
  }));

  const handleSearchChange = (prop) => (event) => {

    console.log(`onkeyDown event!`)

    if (event.key === 'Enter') {

      const searched = postList.posts.filter((post) => {
        return post.title.toLowerCase().includes(event.target.value.toLowerCase());
      });

      getPostDate({ "posts": searched });
    }
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  });

  const searchInput = useRef();

  const keyDown = (event) => {
    if (event.ctrlKey && (event.key === "Q" || event.key === "q")) {
      const searchEl = searchInput.current;
      if(searchEl){
        searchInput.current.click();
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", keyDown);
    
    setTimeout(() => {

      if(searchInput.current){
        searchInput.current.focus();
      }
    }, 100);

  }, []);

  const handleFocus = () => {
    if (searchInput.current) {
      console.log("handle focus");
      searchInput.current.click();
    }
  };

  return (

    mounted &&
    <ThemeProvider theme={theme}>

      <AppBar position="fixed" disablegutters="true" >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
              className={styles.typographyFont}
              onClick={handleCloseNavMenu}
            >
              ITgrow
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={closeNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" color="inherit" className={styles.typographyFont} >{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {
              // !isMobile &&
              // <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            }

            {
              !isMobile &&

              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'secondary',
                  textDecoration: 'none',
                }}
                className={styles.typographyFont}
                onClick={handleCloseNavMenu}
                
              >
                ITgrow
              </Typography>
            }

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (

                page != "HOME" ? 

                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'inherit', display: 'block' }}
                  className={styles.typographyFont}
                >
                  {page}
                </Button>
                
                :
                ""
              ))}
            </Box>

            {/* <FontAwesomeIcon icon="fa-brands fa-github" /> */}
            
            <DarkModeSwitch
              style={{
                position: 'relative',
                margin: '1%'
              }}
              // true : dark mode , false : light mode 
              checked={isDarkMode}
              onChange={toggleDarkMode}
              size={30}
            />
            {
              <Box sx={{ flexGrow: 0 }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    id="searchInput"
                    key="searchKey"
                    placeholder="Search" 
                    inputProps={{ 'aria-label': 'search' }} 
                    onKeyDown={handleSearchChange("searchItem")} 
                    ref={searchInput}       
                  />
                  
                  <Paper elevation={1} square={false} sx={{
                    position: 'absolute',
                    float: 'right',
                    top: '16%',
                    right: '16%',
                    width: '22%',
                    textAlign: 'center'
                  }}

                  > Ctrl </Paper>

                  <Paper elevation={1} square={false} sx={{
                    position: 'absolute',
                    float: 'right',
                    top: '16%',
                    right: '2%',
                    width: '12%',
                    textAlign: 'center'
                  }}

                  >Q</Paper>

                </Search>
              </Box>
            }

          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;
