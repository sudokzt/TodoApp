import React from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import { ALL, DONE, NOT_DONE } from '../constants/Task';

// Date型からstr型へ変換
const convertDateToStr = (date) => (
  `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}`
);

export default function TodoApp(props) {
  let { task, tasks, printTask, inputTask, addTask, doneTask, selectTaskType, selectDeadLine } = { ...props };

  // 表示するタスク一覧に絞り込み
  let printTasks = tasks.slice();
  // ソート
  printTasks.sort(function (a, b) {
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

  let prevItemDate = convertDateToStr(new Date(1990, 1, 1));

  return (
    <div>
      <section>
        タスクの追加<br />
        <input type="text" id="input_task_area" onChange={e => inputTask(e.target.value)} />
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={task.deadLine}
          onChange={selectDeadLine}
        />
        <input type="button" onClick={() => addTask(task.name)} value="Add" />
      </section>

      <section>
        タスクの絞り込み<br />
        <input type="button" onClick={() => selectTaskType(ALL)} value="全て" />
        <input type="button" onClick={() => selectTaskType(NOT_DONE)} value="未完了" />
        <input type="button" onClick={() => selectTaskType(DONE)} value="完了" />
      </section>

      <section>
        タスクの表示<br />
        <ul>
          {
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
          }
        </ul>
      </section>

    </div>
  )
};
