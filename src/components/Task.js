import React from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import "../css/task.css";
// date-pickerのcss
import "react-datepicker/dist/react-datepicker.css";

import Button from "material-ui/Button";
import Input from "material-ui/Input";

import Header from "../containers/Header";
import { ALL, DONE, NOT_DONE, NORMAL, EDIT } from "../constants/Task";

// Date型からstr型へ変換する関数
const convertDateToStr = date => {
  date = new Date(date);
  date.setTime(date.getTime() + 1000 * 60 * 60 * 9); // JSTに変換
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

let updateFlag = false;

export default function TodoApp(props) {
  let {
    task,
    tasks,
    editTasks,
    printTask,
    mode,
    inputTask,
    addTask,
    doneTask,
    deleteTask,
    selectTaskType,
    selectDeadLine,
    editMode,
    inputEditingTask,
    editTask,
    editDeadLine,
    uid
  } = { ...props };

  // ログイン前だったらログインボタン以外は表示させません
  if (uid === null) {
    return <div />;
  }

  // ログイン後にFirebase RealTime DB の監視を始めます。DBの変更があるたびに、state(store)を更新します
  if (!updateFlag && uid) {
    props.loadTodos();
    updateFlag = true;
  }

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
  printTasks.sort((a, b) => {
    return new Date(a.deadLine) > new Date(b.deadLine) ? 1 : -1;
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

  // 期限単位で表示をまとめるために1つ前に表示した日付を保持しておく
  let prevItemDate = convertDateToStr(new Date(1990, 1, 1));

  return (
    <div>
      <Header />

      <section className="mode">
        <span className="section-title">モード選択</span>
        <Button
          raised
          color="primary"
          onClick={() => editMode()}
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
                onChange={e => inputTask(e.target.value)}
              />
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={new Date(task.deadLine)}
                onChange={selectDeadLine}
                className="input-date"
              />
              <Button
                raised
                color="primary"
                onClick={() =>
                  addTask(task.name, convertDateToStr(task.deadLine))
                }
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
        <Button raised onClick={() => selectTaskType(ALL)}>
          {ALL}
        </Button>
        <Button
          raised
          onClick={() => selectTaskType(NOT_DONE)}
          className="button"
        >
          {NOT_DONE}
        </Button>
        <Button raised onClick={() => selectTaskType(DONE)} className="button">
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
              <div key={item.key}>
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
                            onClick={() => doneTask(item.key)}
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
                              inputEditingTask(e.target.value, item.key)
                            }
                          />
                          <DatePicker
                            dateFormat="yyyy/MM/dd"
                            selected={new Date(item.deadLine)}
                            onChange={editDeadLine}
                            className={`${String(item.key)} input-date`}
                          />
                          <Button
                            raised
                            onClick={() => editTask(item.key)}
                            className="button"
                          >
                            更新
                          </Button>
                          <Button
                            raised
                            color="secondary"
                            onClick={() => deleteTask(item.key)}
                            className="button"
                          >
                            削除
                          </Button>
                          {(() => {
                            if (item.editting === true) {
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

// 型指定
TodoApp.propTypes = {
  task: PropTypes.object.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  editTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  printTask: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  inputTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  doneTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  selectTaskType: PropTypes.func.isRequired,
  selectDeadLine: PropTypes.func.isRequired,
  editMode: PropTypes.func.isRequired,
  inputEditingTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  editDeadLine: PropTypes.func.isRequired
};
