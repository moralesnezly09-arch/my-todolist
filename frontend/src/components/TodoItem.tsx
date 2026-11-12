
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <View style={styles.card}>
      <Text
        style={[
          styles.title,
          todo.completed && styles.completedTitle,
        ]}
      >
        {todo.title}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            todo.completed && styles.undoButton,
          ]}
          onPress={() => onToggle(todo._id, !todo.completed)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {todo.completed ? "Undo" : "Complete"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(todo._id)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 50,
    backgroundColor: "#f6e7d4",
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 9,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    color: "#302820",
    fontSize: 13,
    marginRight: 8,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#897d70",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  completeButton: {
    backgroundColor: "#004b17",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
  },
  undoButton: {
    backgroundColor: "#806d5c",
  },
  deleteButton: {
    backgroundColor: "#8b1111",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "bold",
  },
});