<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Stack MEVN</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="row pt-4">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group mb-3">
                  <input
                    type="text"
                    v-model="task.title"
                    placeholder="Inserta una Tarea"
                    class="form-control"
                  />
                </div>
                <div class="form-group mb-3">
                  <textarea
                    v-model="task.description"
                    placeholder="Inserte descripcion de la tarea"
                    cols="30"
                    rows="10"
                    class="form-control"
                  ></textarea>
                </div>
                <template v-if="edit === false">
                  <button class="btn btn-primary">Send</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary">Update</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks" :key="task.id">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                  <button type="button" class="btn btn-danger" @click="deleteTask(task._id)">
                    Delete
                  </button>
                  &nbsp;
                  <button type="button" class="btn btn-warning" @click="editTask(task._id)">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
      edit: false,
      taskToEdit: "",
    };
  },
  created() {
    this.getTask();
  },
  methods: {
    getTask() {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          this.tasks = data;
          console.log(this.tasks);
        });
    },
    sendTask() {
      if (this.edit === false) {
        fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.getTask();
          });
      } else {
        fetch("/api/tasks/" + this.taskToEdit, {
          method: "PUT",
          body: JSON.stringify(this.task),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.getTask();
            this.edit = false;
          });
      }
      this.task = new Task();
    },
    deleteTask(id) {
      fetch("/api/tasks/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.getTask();
        });
    },
    editTask(id) {
      fetch("/api/tasks/" + id)
        .then((res) => res.json())
        .then((data) => {
          this.task = new Task(data.title, data.description);
          this.taskToEdit = data._id;
          this.edit = true;
        });
    },
  },
};
</script>