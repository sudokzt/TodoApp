import React, { useReducer } from "react";
import DatePicker from "react-datepicker";

import "../css/task.css";
// date-pickerのcss
import "react-datepicker/dist/react-datepicker.css";

import Button from "material-ui/Button";
import Input from "material-ui/Input";

import Header from "../containers/Header";
import reducer, { initialState } from "../reducers/reducer";
import { ALL, DONE, NOT_DONE, NORMAL, EDIT } from "../constants/Task";
import {
  inputTask,
  addTask,
  doneTask,
  deleteTask,
  selectTaskType,
  selectDeadLine,
  editMode,
  inputEditingTask,
  editTask,
  editDeadLine
} from "../actions/Task";

// Date型からstr型へ変換する関数
const convertDateToStr = date =>
  `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

export default function TodoApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  let { task, tasks, editTasks, printTask, mode } = { ...state };

  let prevItemDate = convertDateToStr(new Date(1990, 1, 1)); // 期限単位で表示をまとめるために1つ前に表示した日付を保持しておく

  const toggleMode = mode === NORMAL ? EDIT : NORMAL; // 「モード変更ボタンには」現在のモードと逆のものを表示するため

  /*************************************************************************************************************/
  // 表示するタスク一覧に絞り込み
  let printTasks;
  if (mode === NORMAL) {
    printTasks = tasks.slice();
  } else {
    printTasks = editTasks.slice();
  }
  // ソート
  printTasks.sort(function(a, b) {
    return a.deadLine > b.deadLine ? 1 : -1;
  });
  switch (printTask) {
    case DONE:
      printTasks = printTasks.filter(task => task.status === DONE);
      break;
    case NOT_DONE:
      printTasks = printTasks.filter(task => task.status === NOT_DONE);
      break;
    default:
      break;
  }

  /*************************************************************************************************************/

  return (
    <div>
      <Header />

      <section className="mode">
        <span className="section-title">モード選択</span>
        <Button
          raised
          color="primary"
          onClick={() => dispatch(editMode())}
          className="button"
        >
          {toggleMode}モードへ
        </Button>
      </section>

      {(() => {
        /* 通常モード */
        if (mode === NORMAL) {
          return (
            <section className="add-task">
              <div className="section-title">タスクの追加</div>
              <Input
                id="input_task_area"
                onChange={e => dispatch(inputTask(e.target.value))}
              />
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={task.deadLine}
                onChange={date => dispatch(selectDeadLine(date))}
                className="input-date"
              />
              <Button
                raised
                color="primary"
                onClick={() => dispatch(addTask(task.name))}
                className="button"
              >
                追加
              </Button>
            </section>
          );
        }
      })()}

      <section className="filter-tasks">
        <div className="section-title">タスクの絞り込み</div>
        <Button
          raised
          color="primary"
          onClick={() => dispatch(selectTaskType(ALL))}
        >
          {ALL}
        </Button>
        <Button
          raised
          color="primary"
          onClick={() => dispatch(selectTaskType(NOT_DONE))}
          className="button"
        >
          {NOT_DONE}
        </Button>
        <Button
          raised
          color="primary"
          onClick={() => dispatch(selectTaskType(DONE))}
          className="button"
        >
          {DONE}
        </Button>
      </section>

      <section className="print-tasks">
        <ul className="tasks-list">
          {printTasks.map(item => {
            // 期限単位で表示をまとめる
            let dateDOM = <span />;
            const itemDate = convertDateToStr(item.deadLine);
            if (itemDate !== prevItemDate) {
              dateDOM = (
                <div className="task-date">
                  <span className="task-date-text">{itemDate}</span>
                </div>
              );
              prevItemDate = itemDate;
            }

            return (
              <div key={item.id}>
                {dateDOM}
                <li className="task-item">
                  {(() => {
                    // モードによって返すDOMを変更
                    /* 通常モード */
                    if (mode === NORMAL) {
                      return (
                        <div>
                          <span className="task-name">{item.name}</span>
                          <Button
                            raised
                            onClick={() => dispatch(doneTask(item.id))}
                            className="button"
                          >
                            {item.status}
                          </Button>
                        </div>
                      );
                    } else {
                      /* 編集モード */
                      return (
                        <div>
                          <Input
                            value={item.name}
                            onChange={e =>
                              dispatch(
                                inputEditingTask(e.target.value, item.id)
                              )
                            }
                          />
                          <DatePicker
                            dateFormat="yyyy/MM/dd"
                            selected={item.deadLine}
                            onChange={date => dispatch(editDeadLine(date))}
                            className={[String(item.id), "input-date"]}
                          />
                          <Button
                            raised
                            color=""
                            onClick={() => dispatch(editTask(item.id))}
                            className="button"
                          >
                            更新
                          </Button>
                          <Button
                            raised
                            color="secondary"
                            onClick={() => dispatch(deleteTask(item.id))}
                            className="button"
                          >
                            削除
                          </Button>
                        </div>
                      );
                    }
                  })()}
                </li>
              </div>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
