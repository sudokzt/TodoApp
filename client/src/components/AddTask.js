import React from "react";
import DatePicker from "react-datepicker";

import Button from "material-ui/Button";
import Input from "material-ui/Input";

import { EDIT } from "../constants/Task";

// Date型からstr型へ変換する関数
const convertDateToStr = date => {
  date = new Date(date);
  // date.setTime(date.getTime() + 1000 * 60 * 60 * 9); // JSTに変換(サーバー側がJSTの場合いらない)
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

export default function AddTask(props) {
  /* 通常モードでは「タスク追加フォーム」表示 */
  if (props.mode === EDIT) return <div />;

  return (
    <section className="add-task">
      <div className="section-title">タスクの追加</div>
      <Input
        id="input_task_area"
        onChange={e => props.inputTask(e.target.value)}
      />
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={new Date(props.task.deadLine)}
        onChange={props.selectDeadLine}
        className="input-date"
      />
      <Button
        raised
        color="primary"
        onClick={() =>
          props.addTask(props.task.name, convertDateToStr(props.task.deadLine))
        }
        className="button"
      >
        追加
      </Button>
    </section>
  );
}
