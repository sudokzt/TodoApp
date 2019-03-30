import React from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import {
  ALL, DONE, NOT_DONE,
  NORMAL, EDIT
} from '../constants/Task';

// Date型からstr型へ変換
const convertDateToStr = (date) => (
  `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}`
);

export default function TodoApp(props) {
  let { task, tasks, editTasks, printTask, mode, inputTask, addTask, doneTask, deleteTask, selectTaskType, selectDeadLine, editMode, inputEditingTask, editTask } = { ...props };

  const toggleMode = (mode === NORMAL ? EDIT : NORMAL); // 「モード変更ボタンには」現在のモードと逆のものを表示するため

  /*************************************************************************************************************/
  // 表示するタスク一覧に絞り込み
  let printTasks = tasks.slice();
  let printEditTasks = editTasks.slice();
  // ソート
  printTasks.sort(function (a, b) {
    return (a.deadLine > b.deadLine ? 1 : -1);
  });
  printEditTasks.sort(function (a, b) {
    return (a.deadLine > b.deadLine ? 1 : -1);
  });
  switch (printTask) {
    case DONE:
      printTasks = printTasks.filter(task => ((task.status === DONE)));
      break;
    case NOT_DONE:
      printTasks = printTasks.filter(task => ((task.status === NOT_DONE)));
      break;
    default:
      break;
  }
  switch (printTask) {
    case DONE:
      printEditTasks = printEditTasks.filter(task => ((task.status === DONE)));
      break;
    case NOT_DONE:
      printEditTasks = printEditTasks.filter(task => ((task.status === NOT_DONE)));
      break;
    default:
      break;
  }
  /*************************************************************************************************************/

  let prevItemDate = convertDateToStr(new Date(1990, 1, 1));

  return (
    <div>
      {
        (() => {
          /* 通常モード */
          if (mode === NORMAL) {
            return (<section>
              タスクの追加<br />
              <input type="text" id="input_task_area" onChange={e => inputTask(e.target.value)} />
              <DatePicker
                dateFormat="yyyy/MM/dd"
                selected={task.deadLine}
                onChange={selectDeadLine}
              />
              <input type="button" onClick={() => addTask(task.name)} value="追加" />
            </section>
            )
          }
        })()
      }

      <section>
        モード選択
        <input type="button" onClick={() => editMode()} value={toggleMode} />
      </section>

      <section>
        タスクの絞り込み<br />
        <input type="button" onClick={() => selectTaskType(ALL)} value={ALL} />
        <input type="button" onClick={() => selectTaskType(NOT_DONE)} value={NOT_DONE} />
        <input type="button" onClick={() => selectTaskType(DONE)} value={DONE} />
      </section>

      <section>
        タスクの表示<br />
        <ul>
          {
            (() => {
              // モードによって返すDOMを変更

              /* 通常モード */
              if (mode === NORMAL) {
                return (
                  printTasks.map((item) => {
                    // 期限単位で表示をまとめる
                    let dateDOM = <span></span>;
                    const itemDate = convertDateToStr(item.deadLine);
                    if (itemDate !== prevItemDate) {
                      dateDOM = <span>{itemDate}</span>;
                      prevItemDate = itemDate;
                    }

                    return (
                      <div key={item.id}>
                        {dateDOM}
                        <li>
                          <div>
                            <span>{item.name}</span>
                            <input type="button" onClick={() => doneTask(item.id)} value={item.status} />
                          </div>
                        </li>
                      </div>
                    );
                  })
                );
              }

              /* 編集モード */
              else {
                return (
                  printEditTasks.map((item) => {
                    // 期限単位で表示をまとめる
                    let dateDOM = <span></span>;
                    const itemDate = convertDateToStr(item.deadLine);
                    if (itemDate !== prevItemDate) {
                      dateDOM = <span>{itemDate}</span>;
                      prevItemDate = itemDate;
                    }

                    return (
                      <div key={item.id}>
                        {dateDOM}
                        <li>
                          <div>
                            <input type="text" value={item.name} onChange={e => inputEditingTask(e.target.value, item.id)} />
                            <DatePicker
                              dateFormat="yyyy/MM/dd"
                              selected={item.deadLine}
                              onChange={selectDeadLine}
                            />
                            <input type="button" onClick={() => editTask(item.id)} value="更新" />
                            <input type="button" onClick={() => deleteTask(item.id)} value="削除" />
                          </div>
                        </li>
                      </div>
                    );
                  })
                );
              }
            })()
          }
        </ul>
      </section>

    </div>
  )
};
