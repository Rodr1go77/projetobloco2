import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardGame,
  CardHeader,
  CardMedia,
  DatePicker,
  DateTimePicker,
  Fab,
  Filter,
  Grid,
  Modal,
  Pagination,
  Rating,
  SearchBar,
  Skeleton,
  Snackbar,
  Stack,
  Switch,
  TextField,
  TimePicker,
  Typography,
} from "../Components/default";

import Alert from "../Components/customs/Alert";

const Components = () => {
  return (
    <div>
      <Alert
        alertTitle="Teste de Alerta"
        variant="filled"
        severity="error"
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        {" "}
        Alerta de Teste{" "}
      </Alert>
      <AppBar position="static" />
      <Avatar src="https://i.pravatar.cc/150?img=3" />
      <Button>Button</Button>
      <Card />
      <CardActions>
        <Button>Action</Button>
      </CardActions>
      <CardContent />
      <CardGame />
      <CardHeader title="Header" />
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/300"
      />
      <DatePicker />
      <DateTimePicker />
      <Fab color="primary">+</Fab>
      <Filter />
      <Grid />
      <Modal />
      <Pagination count={10} />
      <Rating />
      <SearchBar />
      <Skeleton variant="rectangular" height={50} />
      <Snackbar message="Snackbar message" />
      <Stack />
      <Switch />
      <TextField label="Text Field" />
      <TimePicker />
      <Typography>Typography Component</Typography>
    </div>
  );
};
export default Components;
