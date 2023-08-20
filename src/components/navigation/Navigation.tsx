import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Role, getUser } from '../../utils/tokenHelpers';
import { useEffect, useState } from 'react';
import { useAppDisptach, useAppSelector } from '../../app/hooks';
import { Link, useNavigate } from 'react-router-dom';
import CodelyAvatar from '../avatar/CodelyAvatar';
import { logOut } from '../../features/shared/auth/authSlice';

interface LinkData{
  name: string;
  href: string;
}

const adminPages: LinkData[] = [
  {
    name: "Problems",
    href: "/admin/problems"
  }];

const userPages: LinkData[] =   [ 
  {
    name: "Problems",
    href: "/problems"
  }];

function Navigation() {
  const dispatch = useAppDisptach();

  const role = useAppSelector(state => state.auth.role);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [pages, setPages] = useState<LinkData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
      if(role === Role.Admin) {
        setPages(adminPages);
      }

      if(role === Role.User) {
        setPages(userPages);
      }

      if(role === null) {
        setPages([]);
      }
  },[role])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}  sx={{maxWidth:"1400px"}}>
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: "none", color:"white" }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Codely
            </Typography>
          </Link>

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
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography 
                    textAlign="center">
                      <Link to={page.href} style={{textDecoration: "none", color: "inherit"}}>
                        {page.name}
                      </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page.href} 
                key={page.name}
                style={{textDecoration: "none", color: "inherit"}}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name} 
                </Button>
              </Link>
            ))}
          </Box>
          {isAuthenticated && 
            <Box sx={{ flexGrow: 0 }}>
             <Tooltip title="Open settings">
               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                 <CodelyAvatar/>
               </IconButton>
             </Tooltip>
             <Menu
               sx={{ mt: '45px' }}
               id="menu-appbar"
               anchorEl={anchorElUser}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               open={Boolean(anchorElUser)}
               onClose={handleCloseUserMenu}
             >
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handleLogoutClick}>Log Out</Typography>
                </MenuItem>
             </Menu>
           </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;