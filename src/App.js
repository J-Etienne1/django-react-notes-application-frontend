import React, { Component } from "react";
import "./App.css";
import Modal from "./components/Modal";

const tasks = [
  {
    id: 1,
    title: "Call Clients",
    description: "Call Clients for overdue invoices",
    completed: true,
  },
  {
    id: 2,
    title: "Dunning",
    description: "sending dunning letters to client for uncollected cash",
    completed: false,
  },
  {
    id: 3,
    title: "Order Release",
    description:
      "Check out custoemrs account and release or block orders accordingly",
    completed: true,
  },
  {
    id: 4,
    title: "Weekly Reports",
    description: "Sending the weekly reports for overdue invoices",
    completed: false,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      taskList: tasks,
      activeItem: {
        title: "",
        description: false,
      },
      taskList: tasks,
    };
  }

  // Create toggle property
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  // Submit an item
  handleSubmit = (item) => {
    this.toggle();
    alert("Saved!" + JSON.stringify(item));
  };

  // Delete item
  handleDelete = (item) => {
    alert("Deleted!" + JSON.stringify(item));
  };

  // Create item
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  //Edit item
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Completed
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    );
  };

  // rendering items in the list (completed || incompleted)
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.taskList.filter(
      (item) => item.completed === viewCompleted
    );
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };
  // ///////////////////////////////////////////////////////////

  render() {
    return (
      <main classname="content p-3 mb-2 bg-info">
        <h1 className="text-black text-uppercase text-center my-4">
          Task Manager
        </h1>
        <div className="row">
          <div classname="col-md-6 col-sma-10 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button className="btn btn-warning">Add Task</button>
              </div>
              {this.renderTabList()}
              <ul classname="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        <footer className="my-3 mb-2 bg-info text-white text-center">
          Copyright 2022 &copy; All Rights Reserved
        </footer>
        {this.state.modal ? (
          <Modal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit}/>
        ): null}
      </main>
    );
  }
}

export default App;
