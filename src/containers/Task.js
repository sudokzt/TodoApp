import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Task from "../components/Task";
import * as Actions from "../actions/Task";

function mapStateToProps({ task, tasks, editTasks, printTask, mode }) {
  return {
    task,
    tasks,
    editTasks,
    printTask,
    mode
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

// connect() はカリー化関数
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Task);
