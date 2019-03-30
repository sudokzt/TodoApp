import { INPUT_TASK, ADD_TASK, DONE_TASK, SELECT_TASKTYPE, SELECT_DATE } from '../constants/Task'

// タスク名入力時のアクション、入力中タスク名が渡される
export function inputTask(task) {
  return {
    type: INPUT_TASK,
    payload: {
      task,
    }
  }
}

// 追加ボタンクリック時のアクション、タスク名が渡される
export function addTask(task) {
  // タスク入力部の空欄化
  let inputTaskArea = document.getElementById("input_task_area");
  inputTaskArea.value = "";
  return {
    type: ADD_TASK,
    payload: {
      task,
    }
  }
}

// 完了ボタンクリック時のアクション、該当タスクのインデックスが渡される
export function doneTask(taskId) {
  return {
    type: DONE_TASK,
    payload: {
      taskId,
    }
  }
}

// タスクステータス選択時のアクション、表示するステータスが渡される
export function selectTaskType(printTask) {
  return {
    type: SELECT_TASKTYPE,
    payload: {
      printTask,
    }
  }
}

// タスク締め切り選択時のアクション、表示する日付が渡される
export function selectDeadLine(date) {
  return {
    type: SELECT_DATE,
    payload: {
      deadLine: date,
    }
  }
}
