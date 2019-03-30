import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Task from '../components/Task';
import { inputTask, addTask, doneTask, selectTaskType } from '../actions/Task';

/**
 * store内のstateから特定のものだけをpropsに渡す
 */
function mapStateToProps({ task, tasks, printTask }) {
  return {
    task,
    tasks,
    printTask,
  };
}

/**
 * 該当のactionをdispatchさせる関数をpropsに渡す
 */
function mapDispatchToProps(dispatch) {
  return (
    bindActionCreators({ inputTask, addTask, doneTask, selectTaskType }, dispatch)
  );
  // return {
  //   addTask(task) {
  //     dispatch(addTask(task));
  //   },
  //   inputTask(task) {
  //     dispatch(inputTask(task));
  //   },
  //   doneTask(taskId) {
  //     dispatch(doneTask(taskId));
  //   },
  //   selectTaskType(printTask) {
  //     dispatch(selectTaskType(printTask));
  //   }
  // }
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
