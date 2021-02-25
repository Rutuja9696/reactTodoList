import { Component } from "react";
import url from "./ApiCall";
import style from "../styles/todoList.module.css";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: [],
    };
    //function to add new task
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
          alert("You have added new task successfully !");
        })
        .catch((err) => {
          console.log(err);
        });
      //clear input field after submit
      document.getElementById("todoForm").reset();
    };
    //function to delete task
    this.deleteTask = (event) => {
      let id = event.target.parentNode.parentNode.querySelector("span").id;
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
          alert("Deleted 1 task successfully !");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    //function to update status of task
    this.updateTask = (event) => {
      let id = event.target.parentNode.parentNode.querySelector("span").id;
      fetch(url + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          alert("Seems like you are motivated to complete task !");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    //life cycles
    this.componentDidMount = (event) => {
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
      //markup
      <div className={style.container}>
        <h2>List down your tasks here !</h2>
        <form id="todoForm" onSubmit={this.submitForm}>
          <input
            type="text"
            name="task"
            placeholder="  Enter Task"
            className={style.addTask}
          />
          <input type="submit" value="+ Add task" className={style.addButton} />
        </form>
        {this.state.taskName.map((task, i) => {
          return (
            <div key={i} className={style.taskList}>
              {this.state.taskName.length ? (
                <div className={style.listContainer}>
                  <span className={style[task.status]} id={task.taskId}>
                    {task.taskName}
                  </span>
                  <div>
                    <input
                      type="button"
                      value="X"
                      onClick={this.deleteTask}
                      className={style.deleteButton}
                    />
                    <input
                      type="button"
                      value="Done"
                      onClick={this.updateTask}
                      className={style.doneButton}
                    />
                  </div>
                </div>
              ) : (
                <p></p>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
export default TodoList;
