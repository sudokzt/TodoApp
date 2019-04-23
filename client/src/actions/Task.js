import { firebaseDb } from "../firebase";
import {
  TODOS_RECEIVE_DATA,
  INPUT_TASK,
  SELECT_TASKTYPE,
  SELECT_DATE,
  EDIT_MODE,
  INPUT_EDITTING_TASK,
  EDIT_DATE,
  DONE,
  NOT_DONE,
  AFTER_DELETE,
  AFTER_EDIT
} from "../constants/Task";

// firebase RealTime DB への変更を監視
export function loadTodos() {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    firebaseDb.ref("todos/" + uid).off();
    // テーブルの変更を監視する
    firebaseDb.ref("todos/" + uid).on(
      "value",
      snapshot => {
        dispatch(loadTodosSuccess(snapshot));
      },
      error => {
        dispatch(loadTodosError(error));
      }
    );
  };
}
// ロード成功時コールバック
function loadTodosSuccess(snapshot) {
  return {
    type: TODOS_RECEIVE_DATA,
    payload: {
      data: snapshot.val()
    }
  };
}
// ロード失敗時コールバック
function loadTodosError(error) {
  return {
    type: "TODOS_RECEIVE_ERROR",
    payload: {
      message: error.message
    }
  };
}

// タスク名入力時のアクション、入力中タスク名が渡される
export function inputTask(task) {
  return {
    type: INPUT_TASK,
    payload: {
      task
    }
  };
}

// 追加ボタンクリック時のアクション、タスク名とタスク期限が渡される
export function addTask(task, deadLine) {
  // タスク入力部の空欄化
  let inputTaskArea = document.getElementById("input_task_area");
  inputTaskArea.value = "";
  // 入力タスクをDBに保存
  return (dispatch, getState) => {
    const uid = getState().auth.uid; // 誰がそのタスクを登録したかを取得します
    firebaseDb
      .ref("todos/" + uid)
      .push({
        uid,
        task,
        deadLine,
        status: NOT_DONE
      })
      .catch(error =>
        dispatch({
          type: "ADD_TASK_ERROR",
          payload: {
            message: error.message
          }
        })
      );
  };
}

// 完了ボタンクリック時のアクション、該当タスクのインデックスが渡される
export function doneTask(taskId) {
  return (dispatch, getState) => {
    const storeTasks = getState().task.tasks;
    const currentTaskStatus = storeTasks.filter(todo => todo.key === taskId)[0]
      .status;
    const uid = getState().auth.uid; // 誰がそのタスクを登録したかを取得します
    firebaseDb
      .ref(`todos/${uid}/${taskId}`)
      .update({ status: currentTaskStatus === DONE ? NOT_DONE : DONE })
      .catch(error => {
        dispatch({
          type: "DONE_TASK_ERROR",
          payload: {
            message: error
          }
        });
      });
  };
}

// タスクステータス選択時のアクション、表示するステータスが渡される
export function selectTaskType(printTask) {
  return {
    type: SELECT_TASKTYPE,
    payload: {
      printTask
    }
  };
}

// タスク締め切り選択時のアクション、表示する日付が渡される
export function selectDeadLine(date) {
  return {
    type: SELECT_DATE,
    payload: {
      deadLine: date
    }
  };
}

// タスク削除クリック時のアクション、該当タスクのインデックスが渡される
export function deleteTask(taskId) {
  if (window.confirm("削除してよろしいですか")) {
    return (dispatch, getState) => {
      let storeTasks = getState().task.tasks.slice();
      const uid = getState().auth.uid; // 誰がそのタスクを登録したかを取得します
      let indexKey;
      storeTasks.forEach((v, key) => {
        if (v.key === taskId) {
          indexKey = key;
        }
      });
      storeTasks.splice(indexKey, 1);
      // パスをオブジェクトを削除
      firebaseDb
        .ref(`todos/${uid}/${taskId}`)
        .remove()
        .catch(error =>
          dispatch({
            type: "DELETE_TASK_ERROR",
            payload: {
              message: error.message
            }
          })
        )
        .then(() =>
          dispatch({
            type: AFTER_DELETE,
            payload: {
              editTasks: storeTasks
            }
          })
        );
    };
  } else {
    return {
      type: "NONE"
    };
  }
}

// [編集or完了]ボタンクリック時のアクション、モードが変更される。現状のデータでstoreを更新する
export function editMode() {
  return (dispatch, getState) => {
    const uid = getState().auth.uid; // 誰がそのタスクを登録したかを取得します
    firebaseDb
      .ref("todos/" + uid)
      .once("value")
      .then(function(snapshot) {
        dispatch({
          type: EDIT_MODE,
          payload: {
            data: snapshot.val()
          }
        });
      });
  };
}

// タスク名入力時のアクション、入力中タスク名が渡される
export function inputEditingTask(task, taskId) {
  return {
    type: INPUT_EDITTING_TASK,
    payload: {
      task,
      taskId
    }
  };
}

// タスク締め切り選択時のアクション、表示する日付が渡される
export function editDeadLine(date) {
  date = convertDateToStr(date);
  return {
    type: EDIT_DATE,
    payload: {
      deadLine: date
    }
  };
}

// タスク編集クリック時のアクション、該当タスクの編集後の値とインデックスが渡される
export function editTask(taskId) {
  return (dispatch, getState) => {
    const uid = getState().auth.uid; // 誰がそのタスクを登録したかを取得します
    let storeTasks = getState().task.editTasks.slice();
    let indexKey;
    storeTasks.forEach((v, key) => {
      if (v.key === taskId) {
        indexKey = key;
      }
    });
    storeTasks[indexKey].editting = false;
    firebaseDb
      .ref(`todos/${uid}/${taskId}`)
      .update({
        task: storeTasks[indexKey].name,
        deadLine: storeTasks[indexKey].deadLine
      })
      .catch(error => {
        dispatch({
          type: "EDIT_TASK_ERROR",
          payload: {
            message: error
          }
        });
      })
      .then(() =>
        dispatch({
          type: AFTER_EDIT,
          payload: {
            editTasks: storeTasks
          }
        })
      );
  };
}

// Date型からstr型へ変換する関数
const convertDateToStr = date => {
  date = new Date(date);
  date.setTime(date.getTime() + 1000 * 60 * 60 * 9); // JSTに変換
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};
