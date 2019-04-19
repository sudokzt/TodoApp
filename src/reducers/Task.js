import {
  ALL,
  NORMAL,
  EDIT,
  INPUT_TASK,
  SELECT_TASKTYPE,
  SELECT_DATE,
  EDIT_MODE,
  INPUT_EDITTING_TASK,
  EDIT_DATE
} from "../constants/Task";

const initialState = {
  task: {
    id: 0,
    name: "",
    status: "",
    deadLine: new Date()
  },
  tasks: [],
  editTasks: [],
  printTask: ALL,
  mode: NORMAL,
  todos: [],
  uid: ""
};

export default function taskReducer(state = initialState, action) {
  const { task, mode, editTasks } = state;
  const { type, payload } = action;
  switch (type) {
    // DB の変更があったら最新のtodoリストを返します
    case "TODOS_RECEIVE_DATA": {
      let tasks = [];
      let data = action.payload.data;
      if (data) {
        Object.keys(data).forEach(key => {
          let todo = data[key];
          tasks.push({
            key: key,
            name: todo.task,
            status: todo.status,
            deadLine: todo.deadLine
          });
        });
      }
      return {
        ...state,
        tasks, // タスク一覧
        task: initialState.task // ストアのtaskを初期化
      };
    }

    // タスクを入力します
    case INPUT_TASK: {
      return {
        ...state,
        task: {
          ...task,
          name: payload.task
        }
      };
    }

    // 「全て」「完了」「未完了」と表示するタスクを切り替えます
    case SELECT_TASKTYPE: {
      return {
        ...state,
        printTask: payload.printTask
      };
    }

    // 日付選択時にタスクを
    case SELECT_DATE: {
      return {
        ...state,
        task: {
          ...task,
          deadLine: payload.deadLine
        }
      };
    }

    // 通常モード・編集モードをトグルします
    case EDIT_MODE: {
      // タスクを最新のDBの状態にします(編集→通常トグル時に「未保存」のデータを表示しないため)
      let tasks = [];
      let data = action.payload.data;
      if (data) {
        Object.keys(data).forEach(key => {
          let todo = data[key];
          tasks.push({
            key: key,
            name: todo.task,
            status: todo.status,
            deadLine: todo.deadLine
          });
        });
      }
      return {
        ...state,
        mode: mode === EDIT ? NORMAL : EDIT,
        tasks: tasks,
        editTasks: tasks // 編集モード時に変更したタスクを保存するための配列
      };
    }

    // 編集中のタスクを保持します
    case INPUT_EDITTING_TASK: {
      const edittingTasks = editTasks.slice();
      let indexKey;
      edittingTasks.forEach((v, key) => {
        if (v.key === payload.taskId) {
          indexKey = key;
        }
      });
      edittingTasks[indexKey] = {
        ...edittingTasks[indexKey],
        name: payload.task,
        editting: true
      };
      return {
        ...state,
        tasks: edittingTasks,
        editTasks: edittingTasks
      };
    }

    // 編集中の日付を保持します
    case EDIT_DATE: {
      const edittingDateTasks = editTasks.slice();
      const activeElmClassName = String(document.activeElement.className);
      const activeTaskKey = activeElmClassName.split(" ")[0]; // classからカレンダーフォームidを取得(id = インデックス)
      let indexKey;
      edittingDateTasks.forEach((v, key) => {
        if (v.key === activeTaskKey) {
          indexKey = key;
        }
      });
      edittingDateTasks[indexKey] = {
        ...edittingDateTasks[indexKey],
        deadLine: payload.deadLine,
        editting: true
      };
      return {
        ...state,
        tasks: edittingDateTasks,
        editTasks: edittingDateTasks
      };
    }

    case "AFTER_EDIT": {
      return {
        ...state,
        editTasks: action.payload.editTasks
      };
    }

    case "AFTER_DELETE": {
      return {
        ...state,
        editTasks: action.payload.editTasks
      };
    }

    case "TODOS_RECIVE_ERROR":
    case "ADD_TASK_ERROR":
    case "UPDATE_TASK_ERROR":
    case "DELETE_TASK_ERROR":
      alert(action.message);
      return;

    default:
      return state;
  }
}
