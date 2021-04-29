import React, { useState, useEffect } from 'react';
import { Box, Card, Divider } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { selectUser } from '../../features/userSlice';

// Displays the course about information
export default function About() {
  const user = useSelector(selectUser);
  const { id } = useParams();
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
  return (
    <Card>
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Box sx={{ m: 5 }}>
            <h2>{course.courseTitle}</h2>
            <hr />
            <br />
            <p>{course.courseDescription}</p>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}
