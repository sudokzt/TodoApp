import {
  ALL,
  DONE,
  NOT_DONE,
  NORMAL,
  EDIT,
  INPUT_TASK,
  ADD_TASK,
  DONE_TASK,
  SELECT_TASKTYPE,
  SELECT_DATE,
  DELETE_TASK,
  EDIT_MODE,
  INPUT_EDITTING_TASK,
  EDIT_TASK,
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
  mode: NORMAL
};

export default function Reducer(state = initialState, action) {
  const { task, tasks, mode, editTasks } = state;
  const { type, payload } = action;
  switch (type) {
    case INPUT_TASK:
      return {
        ...state,
        task: {
          ...task,
          name: payload.task
        }
      };
    case ADD_TASK:
      const newTask = {
        id: tasks.length,
        name: payload.task,
        deadLine: task.deadLine,
        status: NOT_DONE
      };
      return {
        ...state,
        task: {
          name: "",
          status: "",
          deadLine: new Date()
        },
        tasks: tasks.concat([newTask])
      };
    case DONE_TASK:
      const doneTaskIndex = payload.taskId;
      const updateTasks = tasks.slice(); // 配列コピー
      updateTasks[doneTaskIndex].status =
        updateTasks[doneTaskIndex].status === DONE ? NOT_DONE : DONE; // ステータストグル
      return {
        ...state,
        tasks: updateTasks
      };
    case SELECT_TASKTYPE:
      return {
        ...state,
        printTask: payload.printTask
      };
    case SELECT_DATE:
      return {
        ...state,
        task: {
          ...task,
          deadLine: payload.deadLine
        }
      };
    case DELETE_TASK:
      const deleteTaskIndex = payload.taskId;
      const deletedTasks = tasks.slice(); // 配列コピー
      deletedTasks.splice(deleteTaskIndex, 1); // 要素削除
      deletedTasks.forEach(v => {
        if (v.id > deleteTaskIndex) v.id--;
      }); // 削除した以降のタスクのidを-1する
      return {
        ...state,
        tasks: deletedTasks,
        editTasks: deletedTasks.slice() // 編集モード時に変更したタスクを保存するための配列
      };
    case EDIT_MODE:
      return {
        ...state,
        mode: mode === EDIT ? NORMAL : EDIT,
        editTasks: tasks.slice() // 編集モード時に変更したタスクを保存するための配列
      };
    case INPUT_EDITTING_TASK:
      const edittingTasks = editTasks.slice();
      edittingTasks[payload.taskId] = {
        ...edittingTasks[payload.taskId],
        name: payload.task,
        editting: true
      };
      return {
        ...state,
        editTasks: edittingTasks
      };
    case EDIT_DATE:
      const edittingDateTasks = editTasks.slice();
      let activeTaskId = Number(document.activeElement.className[0]); // classからカレンダーフォームidを取得
      edittingDateTasks[activeTaskId] = {
        ...edittingDateTasks[activeTaskId],
        deadLine: payload.deadLine,
        editting: true
      };
      return {
        ...state,
        editTasks: edittingDateTasks
      };
    case EDIT_TASK:
      const edittedTasks = tasks.slice();
      edittedTasks.find(v => v.id === payload.taskId).name = editTasks.find(
        v => v.id === payload.taskId
      ).name; // taskIdが一致したタスクの名前を更新
      edittedTasks[payload.taskId].deadLine =
        editTasks[payload.taskId].deadLine;
      editTasks[payload.taskId].editting = false;
      return {
        ...state,
        tasks: edittedTasks,
        editTasks
      };
    default:
      return state;
  }
}
