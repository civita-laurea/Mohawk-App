import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

// Component that handles displaying a course card.
const CourseCard = ({ course, ...rest }) => (
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3,
        }}
      >
        <Avatar
          alt="Course"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/200px-No_image_3x4.svg.png"
          variant="square"
          style={{ height: '70px', width: '70px' }}
        />
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h4">
        {course.courseTitle}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        {course.courseDescription}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <AccessTimeIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Start Date: {course.courseStart}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <AccessTimeIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            End Date: {course.courseEnd}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
);

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseCard;
