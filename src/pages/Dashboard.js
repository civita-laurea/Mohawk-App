import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import LatestNotifications from '../components/dashboard/LatestNotifications';
import TasksProgress from '../components/dashboard/TasksProgress';
import PositiveFeedback from '../components/dashboard/PositiveFeedback';
import MyCourses from '../components/dashboard/MyCourses';
import AvailableCourses from '../components/dashboard/AvailableCourses';
import NegativeFeedback from '../components/dashboard/NegativeFeedback';

// The home page for student and instructor.
const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <NegativeFeedback />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <PositiveFeedback />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestNotifications />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <MyCourses />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <AvailableCourses />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
