import React from "react";

import Reboot from "material-ui/Reboot";
import AppBar from "material-ui/AppBar";
import ToolBar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

export default function Header() {
  return (
    <div>
      <Reboot />
      <AppBar position="static">
        <ToolBar>
          <Typography type="title" color="inherit">
            TodoApp
          </Typography>
        </ToolBar>
      </AppBar>
    </div>
  );
}
