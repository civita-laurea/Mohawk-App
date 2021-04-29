import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Container,
  Grid,
  Button,
  Card,
  CardHeader,
  Divider,
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../course/CourseCard';
import { db } from '../../firebase';
import { selectUser } from '../../features/userSlice';

// Handles displaying the user's courses!
function MyCourses() {
  const user = useSelector(selectUser);
  const [courses, setCourses] = useState([]);

  const fetchUser = async () => {
    const response = db.collection('users');
    const data = await response.get();
    data.docs.forEach((dbUser) => {
      if (dbUser.id === user.uid) {
        const userCourses = dbUser.data().courses;
        for (let i = 0; i < userCourses.length; i += 1) {
          db.collection('courses')
            .doc(userCourses[i])
            .get()
            .then((docCourse) => {
              setCourses((prev) => [...prev, ...courses, docCourse.data()]);
            });
        }
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Card>
      <CardHeader title="My Courses" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Container maxWidth={false}>
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {courses.map((course, index) => (
                  <Grid item key={index} lg={4} md={6} xs={12}>
                    <CourseCard
                      course={course}
                      component={RouterLink}
                      to={`/app/course/${index}`}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

export default MyCourses;
