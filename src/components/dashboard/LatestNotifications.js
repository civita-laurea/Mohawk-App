import { Box, Button, Card, CardHeader, Divider } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// Handles displaying the latest notifications
const LatestNotifications = (props) => (
  <Card {...props}>
    <CardHeader
      action={
        <Button endIcon={<ArrowDropDownIcon />} size="small" variant="text">
          Last 7 days
        </Button>
      }
      title="Latest Notifications"
    />
    <Divider />
    <Divider />
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
        Overview
      </Button>
    </Box>
  </Card>
);

export default LatestNotifications;
