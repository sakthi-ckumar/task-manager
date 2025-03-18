import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface ApiTask extends Task {
  userId: string;
}

interface TaskState {
  tasks: Task[];
  filter: "all" | "completed" | "pending";
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  filter: "all",
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data.map((task: ApiTask) => ({
    id: task.id.toString(),
    title: task.title,
    completed: task.completed,
  }));
});

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (title: string) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title,
        completed: false,
      }
    );

    return {
      id: uuidv4(),
      title,
      completed: response.data.completed,
    };
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    return response.data.id || id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleComplete: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((ele) => ele.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "completed" | "pending">
    ) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        state.loading = false;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.loading = false;
      });
  },
});

export const { setFilter, toggleComplete } = taskSlice.actions;
export default taskSlice.reducer;
