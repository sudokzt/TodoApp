import React from "react";

import Reboot from "material-ui/Reboot";
import AppBar from "material-ui/AppBar";
import ToolBar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import LoginButton from "../containers/Auth";

export default function Header() {
  return (
    <div>
      <Reboot />
      <AppBar position="static">
        <ToolBar>
          <Typography type="title" color="inherit">
            TodoApp
          </Typography>
          <div style={{ width: "100%", textAlign: "right" }}>
            <LoginButton />
          </div>
        </ToolBar>
      </AppBar>
    </div>
  );
}
