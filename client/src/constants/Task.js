// タスクの状態
export const ALL = "全て";
export const DONE = "完了";
export const NOT_DONE = "未完了";

// 画面モード
export const NORMAL = "通常";
export const EDIT = "編集";

// アクションタイプ
export const TODOS_RECEIVE_DATA = Symbol("TODOS_RECEIVE_DATA");
export const INPUT_TASK = Symbol("INPUT_TASK");
export const SELECT_TASKTYPE = Symbol("SELECT_TASKTYPE"); // 表示するタスク状態を選択
export const SELECT_DATE = Symbol("SELECT_DATE");
export const EDIT_MODE = Symbol("EDIT_MODE");
export const INPUT_EDITTING_TASK = Symbol("INPUT_EDITTING_TASK"); // 編集中（編集モードにて入力中）
export const EDIT_DATE = Symbol("EDIT_DATE"); // 編集モードにてカレンダー選択
export const AFTER_EDIT = Symbol("AFTER_EDIT");
export const AFTER_DELETE = Symbol("AFTER_DELETE");
