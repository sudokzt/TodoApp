import React from 'react';

import { ALL, DONE, NOT_DONE } from '../constants/Task';

export default function TodoApp({ ...props }) {
  let { task, tasks, printTask, inputTask, addTask, doneTask, selectTaskType } = props;

  // 表示するタスク一覧に絞り込み
  let printTasks = tasks.slice();
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

  return (
    <div>
      <input type="text" id="input_task_area" onChange={e => inputTask(e.target.value)} />
      <input type="button" onClick={() => addTask(task.name)} value="Add" />

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
                  <input type="button" onClick={() => doneTask(item.id)} value={item.status} />
                </li>
              );
            })
          }
        </ul>
      </section>

    </div>
  )
}
