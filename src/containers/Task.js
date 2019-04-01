// container と presentationComponentを明示的に分けたかったため、ただimport して export するだけ
// コメントとして書くべきではないが、ReactHooksにおいてこのようなことをするべきかどうかは悩んだ。
// また、分けた際にはcontainer にReducerやinitialStateを渡して、バケツリレーをした方が良いのかも悩んだ。

import Task from "../components/Task";

export default Task;
