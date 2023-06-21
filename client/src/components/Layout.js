import { Outlet, NavLink } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { CatchingPokemon } from "@mui/icons-material";
import { useSelector } from "react-redux";

export const Layout = () => {
  const { email, loading, error, token, succes } = useSelector(state => state.userReducer);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <CatchingPokemon />
          </IconButton>
          <Stack direction="row" spacing={2} flexGrow={1}>
            <Typography
              color="white"
              noWrap
              variant="h6"
              component={NavLink}
              to="/"
              sx={{ textDecoration: "none" }}
            >
              ChatApp
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <>
              {
                !succes.message ?
                  <>
                    <Button
                      component={NavLink}
                      to="/signin"
                      variant="outlined"
                      color="inherit"
                    >
                      Sign In
                    </Button>
                    <Button
                      component={NavLink}
                      to="/"
                      variant="outlined"
                      color="inherit"
                    >
                      Sign Up
                     </Button>
                  </>
                  :
                  <>
                    <Typography
                      color="white"
                      noWrap
                      variant="h6"
                      component={NavLink}
                      to="/"
                      sx={{ textDecoration: "none" }}
                    >
                      {succes.name }
                     </Typography>
                    <Button
                      component={NavLink}
                      to="/"
                      variant="outlined"
                      color="inherit"
                    >
                      Logout
                      </Button>
                  </>
              }

            </>
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};
