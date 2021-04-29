import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';

// Handles the toolbar component for the course lists
const CourseListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Button>Import</Button>
      <Button sx={{ mx: 1 }}>Export</Button>
      <Button
        component={RouterLink}
        to="/app/create-course"
        color="primary"
        variant="contained"
      >
        Add Course
      </Button>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Search Course"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CourseListToolbar;
