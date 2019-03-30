import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Task from '../components/Task';
import * as Actions from '../actions/Task';

/**
 * store内のstateから特定のものだけをpropsに渡す
 */
function mapStateToProps({ task, tasks, editTasks, printTask, mode }) {
  return {
    task,
    tasks,
    editTasks,
    printTask,
    mode,
  };
}

/**
 * 該当のactionをdispatchさせる関数をpropsに渡す
 */
function mapDispatchToProps(dispatch) {
  return (
    bindActionCreators(Actions, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
