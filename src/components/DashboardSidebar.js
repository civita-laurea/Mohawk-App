import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon,
} from 'react-feather';
import { db } from '../firebase';
import { selectUser } from '../features/userSlice';
import NavItem from './NavItem';

// The left hand side navbar on webpage.
function DashboardSidebar({ onMobileClose, openMobile }) {
  const selectedUser = useSelector(selectUser);
  const [nameValue, setName] = useState('');
  const [accountValue, setAccount] = useState('');

  db.collection('users')
    .doc(selectedUser.uid)
    .get()
    .then((doc) => {
      setName(`${doc.data().fname} ${doc.data().lname}`);
      setAccount(doc.data().accountType);
    });

  const user = {
    avatar:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/200px-No_image_3x4.svg.png',
    accountType: accountValue,
    name: nameValue,
  };

  const items = [
    {
      href: '/app/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard',
    },
    {
      href: '/app/students',
      icon: UsersIcon,
      title: 'Students',
    },
    {
      href: '/app/courses',
      icon: ShoppingBagIcon,
      title: 'Courses',
    },
    {
      href: '/app/account',
      icon: UserIcon,
      title: 'Account',
    },
    {
      href: '/app/settings',
      icon: SettingsIcon,
      title: 'Settings',
    },
    {
      href: '/logout',
      icon: LockIcon,
      title: 'Logout',
    },
  ];
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64,
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.accountType}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
