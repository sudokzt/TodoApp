import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Task from "../components/Task";
import * as Actions from "../actions/Task";

function mapStateToProps(state) {
  const { task, tasks, editTasks, printTask, mode } = state.task;
  const uid = state.auth.uid;
  return {
    task,
    tasks,
    editTasks,
    printTask,
    mode,
    uid
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
