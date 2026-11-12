
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";
import type { Todo } from "../components/TodoItem";

const API_URL = "http://192.168.1.192:5000";

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getTodos = async () => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/todos`);

      if (!response.ok) {
        throw new Error("Unable to load tasks from the server.");
      }

      const data: Todo[] = await response.json();
      setTodos(data);
    } catch (err) {
      setError("Cannot connect to the server. Check your backend and Wi-Fi.");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title: string): Promise<boolean> => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("The server could not save your task.");
      }

      const newTodo: Todo = await response.json();

      setTodos((currentTodos) => [newTodo, ...currentTodos]);

      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to add your task. Please try again."
      );

      return false;
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        throw new Error("Unable to update this task.");
      }

      const updatedTodo: Todo = await response.json();

      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo._id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update task."
      );
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete this task.");
      }

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo._id !== id)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete task."
      );
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My To-Do List</Text>
        <Text style={styles.subtitle}>Para sa kinabukasan</Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{todos.length}</Text>
          <Text style={styles.summaryLabel}>Total Tasks</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{completedCount}</Text>
          <Text style={styles.summaryLabel}>Completed</Text>
        </View>
      </View>

      <TodoForm onAdd={addTodo} />

      {error !== "" && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#5b4636"
            style={styles.loader}
          />
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                No tasks yet. Add your first task!
              </Text>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8c9a6",
    paddingHorizontal: 16,
    paddingTop: 48,
  },
  header: {
    marginBottom: 12,
  },
  heading: {
    color: "#493628",
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#594a3b",
    fontSize: 12,
    marginTop: 4,
  },
  summary: {
    height: 53,
    backgroundColor: "#f6e7d4",
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryNumber: {
    color: "#302820",
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryLabel: {
    color: "#594a3b",
    fontSize: 9,
    marginTop: 2,
  },
  listContainer: {
    flex: 1,
    marginTop: 1,
  },
  listContent: {
    paddingTop: 1,
    paddingBottom: 20,
    flexGrow: 1,
  },
  loader: {
    marginTop: 25,
  },
  emptyText: {
    color: "#594a3b",
    textAlign: "center",
    marginTop: 25,
    fontSize: 13,
  },
  errorText: {
    color: "#8b1111",
    fontSize: 12,
    marginBottom: 8,
  },
});