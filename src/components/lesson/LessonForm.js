import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Box, Button, Card, Divider, TextField } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useNavigate, useParams } from 'react-router-dom';
import { firebaseApp, db } from '../../firebase';
import { selectUser } from '../../features/userSlice';

// Styles.
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50%',
    },
  },
  input: {
    display: 'none',
  },
  space: {
    margin: theme.spacing(1),
  },
}));

// The form that creates a lesson for the designated course.
export default function LessonForm() {
  const classes = useStyles();
  const [lessonTitleValue, setLessonTitle] = React.useState('');

  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const handleCourseTitleChange = (event) => {
    setLessonTitle(event.target.value);
  };

  const [lessonDescriptionValue, setLessonDescription] = React.useState('');

  const handleCourseDescriptionChange = (event) => {
    setLessonDescription(event.target.value);
  };

  const [fileUrl, setFileUrl] = React.useState(null);

  const pdfId = uuid();

  const handleUploadChange = async (event) => {
    document.getElementById('submitButton').disabled = true;
    document.getElementById('submitButton').style.backgroundColor = 'gray';
    document.getElementById('submitButton').innerHTML = 'Uploading...';
    const file = event.target.files[0];
    const storageRef = firebaseApp.storage().ref();
    const fileRef = storageRef.child(pdfId);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
    document.getElementById('submitButton').disabled = false;
    document.getElementById('submitButton').style.backgroundColor = '#5664d2';
    document.getElementById('submitButton').innerHTML = 'Create Lesson';
  };

  const { id } = useParams();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const lesson = uuid();
    db.collection('lessons').doc(lesson).set({
      lessonTitle: lessonTitleValue,
      lessonDescription: lessonDescriptionValue,
      lessonPdf: fileUrl,
    });
    db.collection('users')
      .doc(user.uid)
      .get()
      .then((userDoc) => {
        const course = userDoc.data().courses[id];
        db.collection('courses')
          .doc(course)
          .get()
          .then((courseDoc) => {
            const courseLessons = courseDoc.data().lessons;
            const newCourseLessons = [...courseLessons];
            newCourseLessons.push(lesson);
            db.collection('courses').doc(courseDoc.id).set(
              {
                lessons: newCourseLessons,
              },
              { merge: true }
            );
          });
      })
      .then(() => {
        navigate(`/app/course/${id}`);
        alert('Lesson Added!');
      });
  };

  return (
    <Card>
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Box sx={{ m: 5 }}>
            <form className={classes.root} onSubmit={handleOnSubmit}>
              <h2>Create Lesson</h2>
              <br />
              <TextField
                required
                id="outlined-multiline-flexible-required"
                label="Lesson Title"
                multiline
                rowsMax={4}
                value={lessonTitleValue}
                onChange={handleCourseTitleChange}
                variant="outlined"
              />
              <TextField
                required
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={lessonDescriptionValue}
                onChange={handleCourseDescriptionChange}
                variant="outlined"
              />
              <div className={classes.root}>
                <label htmlFor="upload" className={classes.space}>
                  Upload PDF
                </label>
                <input
                  accept="application/pdf"
                  className={classes.space}
                  id="upload"
                  type="file"
                  onChange={handleUploadChange}
                />
              </div>
              <br />
              <br />
              <div>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.margin}
                  type="submit"
                  id="submitButton"
                >
                  Create Lesson
                </Button>
              </div>
            </form>
          </Box>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}
