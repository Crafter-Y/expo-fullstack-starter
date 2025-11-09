import { RouterOutput } from "@/lib/routers/_app";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, Pressable, Text, View } from "react-native";
import { Button } from "../elements/Button";
import { ErrorMessage } from "../elements/ErrorMessage";
import { FormTextInput } from "../elements/FormTextInput";
import CategorySelectorBadge from "./CategorySelectorBadge";

interface TodoItemProps {
  todo: RouterOutput["todo"]["getAll"][number];
  categories?: RouterOutput["category"]["getAll"];
  onToggleComplete: (id: string) => void;
  onUpdateTodo: (
    id: string,
    title: string,
    description: string,
    categoryId?: string | null
  ) => Promise<void>;
  onDeleteTodo: (id: string) => Promise<void>;
  onOpenDeleteModal: (id: string, title: string) => void;
}

export function TodoItem({
  todo,
  categories,
  onToggleComplete,
  onUpdateTodo,
  onDeleteTodo,
  onOpenDeleteModal,
}: TodoItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [draftDescription, setDraftDescription] = useState(
    todo.description ?? ""
  );
  const [draftCategoryId, setDraftCategoryId] = useState<string | undefined>(
    todo.categoryId ?? undefined
  );
  const [errorMessage, setErrorMessage] = useState<ErrorState>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!editing) {
      setDraftTitle(todo.title);
      setDraftDescription(todo.description ?? "");
      setDraftCategoryId(todo.categoryId ?? undefined);
    }
  }, [editing, todo.description, todo.title, todo.categoryId]);

  const beginEditing = () => {
    setDraftTitle(todo.title);
    setDraftDescription(todo.description ?? "");
    setDraftCategoryId(todo.categoryId ?? undefined);
    setErrorMessage(null);
    setEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage(null);

    try {
      await onUpdateTodo(
        todo.id,
        draftTitle,
        draftDescription,
        draftCategoryId || null
      );
      setEditing(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t("errors.unexpectedError")
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = () => {
    onOpenDeleteModal(todo.id, todo.title);
  };

  const handleCancel = () => {
    setEditing(false);
    setErrorMessage(null);
    setDraftTitle(todo.title);
    setDraftDescription(todo.description ?? "");
    setDraftCategoryId(todo.categoryId ?? undefined);
  };

  const setSelectedCategory = (categoryId: string | undefined) => {
    if (draftCategoryId === categoryId) {
      setDraftCategoryId(undefined);
    } else {
      setDraftCategoryId(categoryId);
    }
  };

  return (
    <View
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <Pressable
        className={`mb-1 flex-row rounded-lg border border-transparent p-3 pt-1 hover:border-gray-200 dark:hover:border-gray-700 ${
          !editing ? " active:bg-gray-50  dark:active:bg-gray-700" : ""
        }`}
        onPress={() => {
          if (!editing) {
            onToggleComplete(todo.id);
          }
        }}
        onLongPress={() =>
          Platform.OS !== "web" && !editing ? beginEditing() : {}
        }
      >
        <View className="flex-1">
          {editing && (
            <View className="my-2 flex-row gap-2">
              <Button
                t="todos.update"
                type="primary"
                size="small"
                onPress={handleSave}
                className="px-4"
                disabled={isSaving}
              />
              <Button
                t="todos.cancel"
                type="ghost"
                size="small"
                onPress={handleCancel}
                className="px-4"
                disabled={isSaving}
              />
              <Button
                t="todos.delete"
                type="destructive"
                size="small"
                onPress={handleDeleteClick}
                disabled={isSaving}
              />
            </View>
          )}

          {todo.category && !editing && (
            <View className="-mb-3 ml-6 flex-row items-center px-2 py-1">
              {todo.category.icon ? (
                <Text className="mr-1 text-xs">{todo.category.icon}</Text>
              ) : null}
              <Text
                className="text-xs font-medium"
                style={
                  todo.category.color
                    ? { color: todo.category.color }
                    : undefined
                }
              >
                {todo.category.name} <Text className="color-gray-400">/</Text>
              </Text>
            </View>
          )}

          <View className="mt-2 flex-row">
            {!editing && (
              <View
                className={`mr-3 mt-1 h-5 w-5 rounded border-2 ${
                  todo.completed
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                {todo.completed && (
                  <Text className="text-center text-xs leading-4 text-white">
                    ✓
                  </Text>
                )}
              </View>
            )}

            <View className="flex-1">
              {editing ? (
                <View className="gap-2">
                  <FormTextInput
                    type="text"
                    placeholder="todos.title"
                    value={draftTitle}
                    onChangeText={(value) => setDraftTitle(value)}
                    className="px-3 py-2 text-base"
                    editable={!isSaving}
                    maxLength={220}
                  />
                  <FormTextInput
                    type="text"
                    placeholder="todos.addDetails"
                    value={draftDescription}
                    onChangeText={(value) => setDraftDescription(value)}
                    className=" px-3 py-2 text-sm"
                    editable={!isSaving}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                  {categories && categories.length > 0 && (
                    <View className="flex-row flex-wrap gap-2">
                      {categories.map((category) => (
                        <CategorySelectorBadge
                          type="ghost"
                          category={category}
                          key={category.id}
                          selectedCategory={draftCategoryId}
                          setSelectedCategory={setSelectedCategory}
                          disabled={isSaving}
                        />
                      ))}
                    </View>
                  )}
                  <ErrorMessage error={errorMessage} />
                </View>
              ) : (
                <>
                  <Text
                    className={`mt-0.5 text-base font-semibold ${
                      todo.completed
                        ? "text-gray-500 line-through dark:text-gray-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {todo.title}
                  </Text>

                  {todo.description && (
                    <Text
                      className={`mt-1 text-sm ${
                        todo.completed
                          ? "text-gray-400 dark:text-gray-500"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {todo.description}
                    </Text>
                  )}
                </>
              )}
            </View>
          </View>
        </View>
        {!editing && Platform.OS === "web" && (
          <View className="max-w-10 flex-1 items-center justify-center pt-2">
            {isHovered && (
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  beginEditing();
                }}
                className="h-6 w-6 items-center justify-center rounded hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-500"
                style={{ opacity: isHovered ? 1 : 0 }}
              >
                <MaterialIcons name="edit" size={18} color="#6b7280" />
              </Pressable>
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
}
