import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import CourseListToolbar from '../components/course/CourseListToolbar';
import CourseCard from '../components/course/CourseCard';
import { db } from '../firebase';
import { selectUser } from '../features/userSlice';

// Displays the list of courses the student or instructor has.
function CourseList() {
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
    <>
      <Helmet>
        <title>Courses</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <CourseListToolbar />
          <Box sx={{ pt: 3 }}>
            <Grid container spacing={3}>
              <div id="courses" />
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3,
            }}
          >
            <Pagination color="primary" count={3} size="small" />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CourseList;
