import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import About from './About';
import CourseContent from './CourseContent';
import { db } from '../../firebase';
import { selectUser } from '../../features/userSlice';

// Handles switching between tabs.
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// Tabs are scrollable if too many tabs.
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

// Styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: '1em',
  },
}));

// Component to display a full course
export default function Course() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const { id } = useParams();

  const user = useSelector(selectUser);
  const [course, setCourse] = useState({});

  const fetchUser = async () => {
    const response = db.collection('users');
    const data = await response.get();
    data.docs.forEach((dbUser) => {
      if (dbUser.id === user.uid) {
        const userCourses = dbUser.data().courses;
        db.collection('courses')
          .doc(userCourses[id])
          .get()
          .then((docCourse) => {
            setCourse(docCourse.data());
          });
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <h1 className={classes.title}>{course.courseTitle}</h1>
        <hr />
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Content" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <About id={id} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CourseContent id={id} />
      </TabPanel>
    </div>
  );
}
