import { INPUT_TASK, ADD_TASK, DONE_TASK, SELECT_TASKTYPE, SELECT_DATE, DELETE_TASK, EDIT_MODE, INPUT_EDITTING_TASK, EDIT_TASK } from '../constants/Task'

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

// タスク削除クリック時のアクション、該当タスクのインデックスが渡される
export function deleteTask(taskId) {
  if (window.confirm("削除してよろしいですか")) {
    return {
      type: DELETE_TASK,
      payload: {
        taskId,
      }
    }
  } else {
    return {
      type: "NONE",
    }
  }
}

// [編集or完了]ボタンクリック時のアクション、モードが変更される。押したモードが渡される
export function editMode() {
  return {
    type: EDIT_MODE,
  }
}

// タスク名入力時のアクション、入力中タスク名が渡される
export function inputEditingTask(task, taskId) {
  return {
    type: INPUT_EDITTING_TASK,
    payload: {
      task,
      taskId,
    }
  }
}

// タスク編集クリック時のアクション、該当タスクの編集後の値とインデックスが渡される
export function editTask(taskId) {
  return {
    type: EDIT_TASK,
    payload: {
      taskId,
    }
  }
}
