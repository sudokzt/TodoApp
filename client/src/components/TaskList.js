import React from "react";
import DatePicker from "react-datepicker";

import Button from "material-ui/Button";
import Input from "material-ui/Input";

import { NORMAL } from "../constants/Task";

// モードによって返すDOMを変更するコンポーネント
export default function Task(props) {
  /* 通常モードは「タスクの完了・未完了ボタン」表示 */
  if (props.mode === NORMAL) {
    return (
      <div style={{ display: "flex" }}>
        <div className="task-name">{props.item.name}</div>
        <Button
          raised
          onClick={() => props.doneTask(props.item.key)}
          className="button"
        >
          {props.item.status}
        </Button>
      </div>
    );
  } else {
    /* 編集モード「タスク編集フォーム」表示 */
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div className="task-name">
            <Input
              value={props.item.name}
              onChange={e =>
                props.inputEditingTask(e.target.value, props.item.key)
              }
            />
            <DatePicker
              dateFormat="yyyy/MM/dd"
              selected={new Date(props.item.deadLine)}
              onChange={props.editDeadLine}
              className={`${String(props.item.key)} input-date`}
            />
          </div>
          <div>
            <Button
              raised
              onClick={() => props.editTask(props.item.key)}
              className="button"
            >
              更新
            </Button>
            <Button
              raised
              color="secondary"
              onClick={() => props.deleteTask(props.item.key)}
              className="button"
            >
              削除
            </Button>
          </div>
        </div>

        {(() => {
          if (props.item.editting === true) {
            return (
              <span className="editting-message">
                <i className="fas fa-exclamation-triangle warnning" />
                変更が保存されていません
              </span>
            );
          }
        })()}
      </div>
    );
  }
}
