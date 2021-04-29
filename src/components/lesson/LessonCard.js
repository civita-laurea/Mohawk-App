import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography, Divider } from '@material-ui/core';

// Lesson item on course content page.
const LessonCard = ({ lesson, ...rest }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      cursor: 'pointer',
    }}
    {...rest}
  >
    <CardContent>
      <Typography align="center" color="textPrimary" gutterBottom variant="h4">
        {lesson.lessonTitle}
      </Typography>
      <Divider />
      <Typography align="center" color="textPrimary" variant="body1">
        {lesson.lessonDescription}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
  </Card>
);

LessonCard.propTypes = {
  lesson: PropTypes.object.isRequired,
};

export default LessonCard;
