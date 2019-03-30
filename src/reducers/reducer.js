import { ALL, DONE, NOT_DONE, ADD_TASK, INPUT_TASK, DONE_TASK, SELECT_TASKTYPE, SELECT_DATE } from '../constants/Task';

const initialState = {
  task: {
    name: '',
    status: '',
    deadLine: new Date(),
  },
  tasks: [],
  printTask: ALL,
};

export default function Reducer(state = initialState, action) {
  console.log(state.task);
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
      updateTasks[doneTaskIndex].status = (updateTasks[doneTaskIndex].status === DONE) ? NOT_DONE : DONE;
      // newTasks.splice(doneTaskIndex, 1); // 要素削除(=完了)
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
    default:
      return state;
  }
}