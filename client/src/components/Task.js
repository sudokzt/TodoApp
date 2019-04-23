import React from "react";
import PropTypes from "prop-types";

import "../css/task.css";
// date-pickerのcss
import "react-datepicker/dist/react-datepicker.css";

import SelectMode from "./SelectMode";
import InputTask from "./AddTask";
import FilterTask from "./FilterTask";
import Task from "./TaskList";
import { DONE, NOT_DONE, NORMAL, EDIT } from "../constants/Task";

// Date型からstr型へ変換する関数
const convertDateToStr = date => {
  date = new Date(date);
  // date.setTime(date.getTime() + 1000 * 60 * 60 * 9); // JSTに変換(サーバー側がJSTの場合いらない)
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
    inputEditingTask,
    editMode,
    editTask,
    editDeadLine,
    uid
  } = { ...props };

  // ログイン前だったらログインボタン以外は表示させません
  if (uid === null) return <div />;

  // 「モード変更ボタンには」現在のモードと逆のものを表示します。
  const toggleMode = mode === NORMAL ? EDIT : NORMAL;
  // 期限単位で表示をまとめるために1つ前に表示した日付を保持しておく
  let prevItemDate = convertDateToStr(new Date(1990, 1, 1));

  // ログイン後にFirebase RealTime DB の監視を始めます。DBの変更があるたびに、storeを更新します。
  if (!updateFlag && uid) {
    props.loadTodos();
    updateFlag = true;
  }

  /*************************************************************************************************************/
  // 表示するタスク一覧に絞り込み
  let printTasks;
  if (mode === NORMAL) printTasks = tasks.slice();
  else printTasks = editTasks.slice();
  // ソート
  printTasks.sort((date1, date2) =>
    new Date(date1.deadLine) > new Date(date2.deadLine) ? 1 : -1
  );
  if (printTask === DONE)
    printTasks = printTasks.filter(task => task.status === DONE);
  else if (printTask === NOT_DONE)
    printTasks = printTasks.filter(task => task.status === NOT_DONE);

  /*************************************************************************************************************/
  return (
    <div>
      {/* 通常・編集モード切り替えコンポーネント */}
      <SelectMode func={editMode} toggleMode={toggleMode} />

      {/* タスク追加コンポーネント */}
      <InputTask
        task={task}
        addTask={addTask}
        inputTask={inputTask}
        selectDeadLine={selectDeadLine}
        mode={mode}
      />

      {/* 表示タスク絞り込みコンポーネント */}
      <FilterTask selectTaskType={selectTaskType} />

      {/* 「タスク一覧」表示 */}
      <section className="print-tasks">
        <ul className="tasks-list">
          {/* 期限単位で表示をまとめる */}
          {printTasks.map(item => {
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
                  {/* タスクコンポーネント */}
                  <Task
                    item={item}
                    doneTask={doneTask}
                    deleteTask={deleteTask}
                    inputEditingTask={inputEditingTask}
                    editTask={editTask}
                    editDeadLine={editDeadLine}
                    mode={mode}
                  />
                </li>
              </div>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

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
