import React, { useState } from "react"
import { StyleSheet, View } from "react-native"

import { Header } from "../components/Header"
import { Task, TasksList } from "../components/TasksList"
import { TodoInput } from "../components/TodoInput"

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks((oldValue) => [...oldValue, task])
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = [...tasks]

    const task = updateTasks.find((t) => t.id === id) as Task

    task.done = !task.done

    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {
    setTasks((oldValue) => oldValue.filter((task) => task.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
})
