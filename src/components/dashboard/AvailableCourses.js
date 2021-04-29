import { useNavigate } from 'react-router-dom';
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

// Handles the component that for available courses
function AvailableCourses() {
  const user = useSelector(selectUser);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const response = db.collection('courses');
    const data = await response.get();
    data.docs.forEach((course) => {
      setCourses((prev) => [...prev, ...courses, course.data()]);
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const navigate = useNavigate();

  const joinCourse = (e, index) => {
    e.preventDefault();
    db.collection('courses')
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => doc);
        db.collection('users')
          .doc(user.uid)
          .get()
          .then((courseDoc) => {
            const userCourses = courseDoc.data().courses;
            const newUserCourses = [...userCourses];
            newUserCourses.push(documents[index].id);
            db.collection('users').doc(user.uid).set(
              {
                courses: newUserCourses,
              },
              { merge: true }
            );
          })
          .then(() => {
            navigate('/app/courses');
            alert('Course Added!');
          });
      });
  };

  return (
    <Card>
      <CardHeader title="Available Courses" />
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
                      onClick={(e) => {
                        if (
                          window.confirm(
                            'Are you sure you wish to join this course?'
                          )
                        )
                          joinCourse(e, index);
                      }}
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

export default AvailableCourses;
