import { Component } from "react";
class TodoList extends Component {
  render() {
    return (
      <div>
        <label>Task list </label>
        <input type="text" />
        <input type="submit" value="Add task" />
      </div>
    );
  }
}
export default TodoList;
