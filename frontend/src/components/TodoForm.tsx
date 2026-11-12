
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type TodoFormProps = {
  onAdd: (title: string) => Promise<boolean>;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle || submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const success = await onAdd(trimmedTitle);

      if (success) {
        setTitle("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a task..."
        placeholderTextColor="#776653"
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
        editable={!submitting}
      />

      <TouchableOpacity
        style={[styles.addButton, submitting && styles.disabledButton]}
        onPress={handleAdd}
        disabled={submitting}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>
          {submitting ? "Adding..." : "Add To do"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    height: 43,
    borderWidth: 1,
    borderColor: "#76614d",
    borderRadius: 7,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#382b21",
    backgroundColor: "transparent",
    marginBottom: 7,
  },
  addButton: {
    height: 43,
    backgroundColor: "#303030",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
