import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import students from '../__mocks__/students';
import StudentListResults from '../components/student/StudentListResults';
import StudentListToolbar from '../components/student/StudentListToolbar';

// List of students.
const StudentList = () => (
  <>
    <Helmet>
      <title>Students</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <StudentListToolbar />
        <Box sx={{ pt: 3 }}>
          <StudentListResults students={students} />
        </Box>
      </Container>
    </Box>
  </>
);

export default StudentList;
