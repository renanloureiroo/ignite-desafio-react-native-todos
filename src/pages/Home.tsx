import React, { useState } from "react"
import { Alert, StyleSheet, View } from "react-native"

import { Header } from "../components/Header"
import { Task, TasksList } from "../components/TasksList"
import { TodoInput } from "../components/TodoInput"

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleAddTask(newTaskTitle: string) {
    const titleDoesExists = tasks.find(
      (task) => task.title.toLowerCase() === newTaskTitle.toLowerCase()
    )
    if (titleDoesExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )
      return
    }

    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks((oldValue) => [...oldValue, task])
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updateTasks = [...tasks]

    const task = updateTasks.find((task) => task.id === taskId) as Task

    task.title = taskNewTitle

    setTasks(updateTasks)
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = [...tasks]

    const task = updateTasks.find((t) => t.id === id) as Task

    task.done = !task.done

    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover tarefa",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((oldValue) => oldValue.filter((task) => task.id !== id)),
        },
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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
