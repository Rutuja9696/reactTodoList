import { Component } from "react";
import url from "./ApiCall";
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: [],
    };
    this.submitForm = (event) => {
      event.preventDefault();
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName: event.target.task.value }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let taskList = [...this.state.taskName];
          taskList.push(data.data);
          this.setState({ taskName: taskList });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    this.deleteTask = (event) => {
      let id = event.target.parentNode.querySelector("span").id;
      fetch(url + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    this.componentDidMount = (event) => {
      fetch(url)
        .then(() => {
          return response.json();
        })
        .then((data) => {
          this.setState({ taskName: [...data.data] });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    this.componentDidUpdate = (event) => {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ taskName: [...data.data] });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <label>Task list : </label>
          <input type="text" name="task" />
          <input type="submit" value="+ Add task" />
        </form>
        {this.state.taskName.map((task, i) => {
          return (
            <div key={i}>
              <span id={task.taskId}>{task.taskName}</span>
              <input type="button" value="X" onClick={this.deleteTask} />
            </div>
          );
        })}
      </div>
    );
  }
}
export default TodoList;
