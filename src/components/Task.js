import React from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import { ALL, DONE, NOT_DONE } from '../constants/Task';

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

  const convertDateToStr = (date) => (
    `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}`
  );

  return (
    <div>
      <section>
        <input type="text" id="input_task_area" onChange={e => inputTask(e.target.value)} />
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={task.deadLine}
          onChange={selectDeadLine}
        />
        <input type="button" onClick={() => addTask(task.name)} value="Add" />
      </section>

      <section>
        <input type="button" onClick={() => selectTaskType(ALL)} value="全て" />
        <input type="button" onClick={() => selectTaskType(NOT_DONE)} value="未完了" />
        <input type="button" onClick={() => selectTaskType(DONE)} value="完了" />
      </section>

      <section>
        <ul>
          {
            printTasks.map((item) => {
              return (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <span>{convertDateToStr(item.deadLine)}</span>
                  <input type="button" onClick={() => doneTask(item.id)} value={item.status} />
                </li>
              );
            })
          }
        </ul>
      </section>

    </div>
  )
};
