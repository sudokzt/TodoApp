import React from "react";

// date-pickerのcss
import "react-datepicker/dist/react-datepicker.css";

import Button from "material-ui/Button";
import { ALL, DONE, NOT_DONE } from "../constants/Task";

export default function FilterTask(props) {
  return (
    <section className="filter-tasks">
      <div className="section-title">タスクの絞り込み</div>
      <Button raised onClick={() => props.selectTaskType(ALL)}>
        {ALL}
      </Button>
      <Button
        raised
        onClick={() => props.selectTaskType(NOT_DONE)}
        className="button"
      >
        {NOT_DONE}
      </Button>
      <Button
        raised
        onClick={() => props.selectTaskType(DONE)}
        className="button"
      >
        {DONE}
      </Button>
    </section>
  );
}
