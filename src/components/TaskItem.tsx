import React, { useEffect, useRef, useState } from "react"
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import Icon from "react-native-vector-icons/Feather"
import { Task } from "./TasksList"

import trashIcon from "../assets/icons/trash/trash.png"
import editIcon from "../assets/icons/edit.png"

interface TaskItemProps {
  task: Task
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
  editTask: (taskId: number, newTitleTask: string) => void
}

export const TaskItem = ({
  toggleTaskDone,
  removeTask,
  editTask,
  task,
}: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedValue, setEditedValue] = useState<string>(task.title)

  const textInputRef = useRef<TextInput>(null)

  const handleStartEditing = () => {
    setIsEditing(true)
  }

  const handleCancelEditing = () => {
    setEditedValue(task.title)

    setIsEditing(false)
  }

  const handleSubmitEditing = () => {
    editTask(task.id, editedValue)
    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus()
    } else {
      textInputRef.current?.blur()
    }
  }, [isEditing])
  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={editedValue}
            onChangeText={setEditedValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
            style={{ paddingHorizontal: 24 }}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
            style={{ paddingHorizontal: 24 }}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.iconsDivider} />
        <TouchableOpacity
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  iconsContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconsDivider: {
    height: 24,
    width: 1,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
})
