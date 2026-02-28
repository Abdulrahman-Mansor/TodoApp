import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  Platform,
} from "react-native";

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<{ id: string; text: string; isDone: boolean }[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  function addTask() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTask = {
      id: Date.now().toString(),
      text: trimmed,
      isDone: false,
    };
    setTasks((t) => [newTask, ...t]);
    setText("");
    Keyboard.dismiss();
  }

  function toggleDone(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingText("");
    }
  }

  function beginEdit(id: string, currentText: string) {
    setEditingId(id);
    setEditingText(currentText);
  }

  function saveEdit(id: string) {
    const trimmed = editingText.trim();
    if (!trimmed) return;
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, text: trimmed } : task)));
    setEditingId(null);
    setEditingText("");
    Keyboard.dismiss();
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  const renderItem = ({ item }: { item: { id: string; text: string; isDone: boolean } }) => {
    const containerStyle = [
      styles.item,
      { backgroundColor: palette.listItemBackground },
      item.isDone && styles.itemDone,
    ];

    return (
      <View style={containerStyle}>
        <TouchableOpacity
          style={styles.itemLeft}
          onPress={() => toggleDone(item.id)}
          activeOpacity={0.7}
        >
          {editingId === item.id ? (
            <TextInput
              style={[styles.itemText, styles.editInput]}
              value={editingText}
              onChangeText={setEditingText}
              placeholder="Edit task"
              placeholderTextColor="#e6f0d9"
              autoFocus={true}
              onSubmitEditing={() => saveEdit(item.id)}
              returnKeyType="done"
            />
          ) : (
            <Text
              style={[
                styles.itemText,
                item.isDone && styles.itemTextDone,
              ]}
            >
              {item.text}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.itemButtons}>
          {editingId === item.id ? (
            <>
              <TouchableOpacity
                onPress={() => saveEdit(item.id)}
                style={[styles.smallButton, styles.saveButton]}
              >
                <Text style={styles.smallButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cancelEdit}
                style={[styles.smallButton, styles.cancelButton]}
              >
                <Text style={styles.smallButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => beginEdit(item.id, item.text)}
                style={[styles.smallButton, styles.editButton]}
              >
                <Text style={styles.smallButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteTask(item.id)}
                style={[styles.smallButton, styles.deleteButton]}
              >
                <Text style={styles.smallButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>My To‑Do List</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Add a new task..."
            placeholderTextColor="#7a8b66"
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask} activeOpacity={0.8}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const palette = {
  background: "#EBF5D6",
  listItemBackground: "#96BE69",
  primary: "#598234",
  secondary: "#345B2A",
  text: "#193315",
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.background,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: palette.text,
    marginTop: 12,
    marginBottom: 10,
    textAlign: "left",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f8e6",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.secondary,
    color: palette.text,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: palette.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.secondary,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 72,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(52,91,42,0.15)",
  },
  itemDone: {
    opacity: 0.75,
  },
  itemLeft: {
    flex: 1,
    paddingRight: 8,
  },
  itemText: {
    color: palette.text,
    fontSize: 16,
  },
  itemTextDone: {
    textDecorationLine: "line-through",
    color: "#173218",
    opacity: 0.9,
  },
  itemButtons: {
    flexDirection: "row",
    gap: 8,
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 6,
    minWidth: 56,
    alignItems: "center",
  },
  smallButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  editButton: {
    backgroundColor: palette.primary,
    borderColor: palette.secondary,
    borderWidth: 1,
  },
  deleteButton: {
    backgroundColor: palette.secondary,
    borderColor: palette.secondary,
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: "#2f7b2a",
  },
  cancelButton: {
    backgroundColor: "#7a8b66",
  },
  editInput: {
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    color: palette.text,
    borderWidth: 1,
    borderColor: "rgba(25,51,21,0.06)",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  footerText: {
    color: palette.secondary,
    fontSize: 13,
  },
});