import {
  ALL, DONE, NOT_DONE,
  NORMAL, EDIT,
  ADD_TASK, INPUT_TASK, DONE_TASK, SELECT_TASKTYPE, SELECT_DATE, DELETE_TASK, EDIT_MODE, INPUT_EDITTING_TASK, EDIT_TASK, EDIT_DATE
} from '../constants/Task';

const initialState = {
  task: {
    name: '',
    status: '',
    deadLine: new Date(),
  },
  tasks: [],
  editTasks: [],
  printTask: ALL,
  mode: NORMAL,
};

export default function Reducer(state = initialState, action) {
  const task = state.task;
  switch (action.type) {
    case INPUT_TASK:
      return {
        ...state,
        task: {
          ...task,
          name: action.payload.task,
        }
      }
    case ADD_TASK:
      const newTask = {
        id: state.tasks.length,
        name: action.payload.task,
        deadLine: state.task.deadLine,
        status: NOT_DONE,
      };
      return {
        ...state,
        task: {
          name: '',
          status: '',
          deadLine: new Date(),
        },
        tasks: state.tasks.concat([newTask]),
      }
    case DONE_TASK:
      const doneTaskIndex = action.payload.taskId;
      const updateTasks = state.tasks.slice(); // 配列コピー
      updateTasks[doneTaskIndex].status = (updateTasks[doneTaskIndex].status === DONE) ? NOT_DONE : DONE; // ステータストグル
      return {
        ...state,
        tasks: updateTasks,
      }
    case SELECT_TASKTYPE:
      return {
        ...state,
        printTask: action.payload.printTask,
      };
    case SELECT_DATE:
      return {
        ...state,
        task: {
          ...task,
          deadLine: action.payload.deadLine,
        }
      };
    case DELETE_TASK:
      const deleteTaskIndex = action.payload.taskId;
      const deletedTasks = state.tasks.slice(); // 配列コピー
      deletedTasks.splice(deleteTaskIndex, 1); // 要素削除
      deletedTasks.forEach(v => { if (v.id > deleteTaskIndex) v.id-- }); // 削除した以降のタスクのidを-1する
      return {
        ...state,
        tasks: deletedTasks,
        editTasks: deletedTasks.slice() // 編集モード時に変更したタスクを保存するための配列
      };
    case EDIT_MODE:
      return {
        ...state,
        mode: (state.mode === EDIT) ? NORMAL : EDIT,
        editTasks: state.tasks.slice() // 編集モード時に変更したタスクを保存するための配列
      };
    case INPUT_EDITTING_TASK:
      const edittingTasks = state.editTasks.slice();
      edittingTasks[action.payload.taskId] = {
        ...edittingTasks[action.payload.taskId],
        name: action.payload.task,
      };
      return {
        ...state,
        editTasks: edittingTasks,
      }
    case EDIT_DATE:
      const edittingDateTasks = state.editTasks.slice();
      let activeTaskId = Number(document.activeElement.className[0]); // classからカレンダーフォームidを取得
      edittingDateTasks[activeTaskId] = {
        ...edittingDateTasks[activeTaskId],
        deadLine: action.payload.deadLine,
      };
      return {
        ...state,
        editTasks: edittingDateTasks,
      }
    case EDIT_TASK:
      const edittedTasks = state.tasks.slice();
      edittedTasks.find(v => v.id === action.payload.taskId).name =
        state.editTasks.find(v => v.id === action.payload.taskId).name; // taskIdが一致したタスクの名前を更新
      edittedTasks[action.payload.taskId].deadLine = state.editTasks[action.payload.taskId].deadLine;
      return {
        ...state,
        tasks: edittedTasks,
      }
    default:
      return state;
  }
}
