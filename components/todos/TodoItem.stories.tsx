import type { Meta, StoryObj } from "@storybook/react-native-web-vite";
import { useState } from "react";
import { Platform, View } from "react-native";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { TodoItem } from "./TodoItem";

import { RouterOutput } from "@/lib/routers/_app";

const SAMPLE_CATEGORY: RouterOutput["category"]["getAll"][number] = {
  id: "cat-1",
  name: "Work",
  color: "#2563EB",
  icon: "💼",
  _count: { todos: 3 },
};

const SAMPLE_CATEGORY_NO_ICON: RouterOutput["category"]["getAll"][number] = {
  id: "cat-2",
  name: "Personal",
  color: "#DC2626",
  icon: null,
  _count: { todos: 5 },
};

const SAMPLE_CATEGORIES: RouterOutput["category"]["getAll"] = [
  SAMPLE_CATEGORY,
  SAMPLE_CATEGORY_NO_ICON,
  {
    id: "cat-3",
    name: "Errands",
    color: "#047857",
    icon: "🛒",
    _count: { todos: 2 },
  },
];

const SAMPLE_TODO: RouterOutput["todo"]["getAll"][number] = {
  id: "todo-1",
  title: "Buy groceries",
  description: "Milk, eggs, and bread",
  completed: false,
  categoryId: "cat-1",
  category: {
    name: SAMPLE_CATEGORY.name,
    color: SAMPLE_CATEGORY.color,
    icon: SAMPLE_CATEGORY.icon,
  },
};

const SAMPLE_TODO_NO_DESCRIPTION: RouterOutput["todo"]["getAll"][number] = {
  id: "todo-2",
  title: "Call mom",
  description: null,
  completed: false,
  categoryId: null,
  category: null,
};

const SAMPLE_TODO_COMPLETED: RouterOutput["todo"]["getAll"][number] = {
  id: "todo-3",
  title: "Finish report",
  description: "Q4 Financial Summary",
  completed: true,
  categoryId: "cat-1",
  category: {
    name: SAMPLE_CATEGORY.name,
    color: SAMPLE_CATEGORY.color,
    icon: SAMPLE_CATEGORY.icon,
  },
};

const SAMPLE_TODO_CATEGORY_NO_ICON: RouterOutput["todo"]["getAll"][number] = {
  id: "todo-4",
  title: "Read a book",
  description: "At least 30 pages",
  completed: false,
  categoryId: "cat-2",
  category: {
    name: SAMPLE_CATEGORY_NO_ICON.name,
    color: SAMPLE_CATEGORY_NO_ICON.color,
    icon: SAMPLE_CATEGORY_NO_ICON.icon,
  },
};

const meta = {
  title: "todos/TodoItem",
  component: TodoItem,
  tags: ["autodocs"],
  args: {
    todo: SAMPLE_TODO,
    categories: SAMPLE_CATEGORIES,
    onToggleComplete: fn(),
    onUpdateTodo: fn(
      async (
        _id: string,
        _title: string,
        _description: string,
        _categoryId?: string | null
      ) => {}
    ),
    onOpenDeleteModal: fn(),
  },
  decorators: [
    (Story) => (
      <View className="w-full max-w-md">
        <Story />
      </View>
    ),
  ],
  render: (args) => {
    const [todo, setTodo] = useState<RouterOutput["todo"]["getAll"][number]>(
      args.todo
    );

    return (
      <TodoItem
        {...args}
        todo={todo}
        onToggleComplete={(id: string) => {
          setTodo({
            ...todo,
            completed: !todo.completed,
          });
          args.onToggleComplete(id);
        }}
      />
    );
  },
} satisfies Meta<typeof TodoItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onToggleComplete.mockClear();

    // Find the todo title
    const title = canvas.getByText("Buy groceries");
    await expect(title).toBeInTheDocument();

    // Find the description
    const description = canvas.getByText("Milk, eggs, and bread");
    await expect(description).toBeInTheDocument();

    // Find the category name
    const category = canvas.getByText(/Work/);
    await expect(category).toBeInTheDocument();

    // Click to toggle complete
    await userEvent.click(title);

    await expect(args.onToggleComplete).toHaveBeenCalledTimes(1);
    await expect(args.onToggleComplete).toHaveBeenCalledWith("todo-1");
  },
};

export const Completed: Story = {
  args: {
    todo: SAMPLE_TODO_COMPLETED,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the title with strikethrough styling
    const title = canvas.getByText("Finish report");
    await expect(title).toBeInTheDocument();

    // Verify checkmark is visible
    const checkmark = canvas.getByText("✓");
    await expect(checkmark).toBeInTheDocument();
  },
};

export const WithoutDescription: Story = {
  args: {
    todo: SAMPLE_TODO_NO_DESCRIPTION,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the title
    const title = canvas.getByText("Call mom");
    await expect(title).toBeInTheDocument();

    // Description should not be present
    const description = canvas.queryByText("Milk, eggs, and bread");
    await expect(description).toBeNull();
  },
};

export const WithoutCategory: Story = {
  args: {
    todo: SAMPLE_TODO_NO_DESCRIPTION,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Category should not be displayed
    const categoryName = canvas.queryByText(/Work/);
    await expect(categoryName).toBeNull();
  },
};

export const CategoryWithoutIcon: Story = {
  args: {
    todo: SAMPLE_TODO_CATEGORY_NO_ICON,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Category name should be displayed
    const categoryName = canvas.getByText(/Personal/);
    await expect(categoryName).toBeInTheDocument();
  },
};

export const EditMode: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onUpdateTodo.mockClear();
    args.onOpenDeleteModal.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Find the form inputs
    const titleInput = canvas.getByTestId(
      "todo-item-title-input"
    ) as HTMLInputElement;
    const descriptionInput = canvas.getByTestId(
      "todo-item-description-input"
    ) as HTMLTextAreaElement;

    // Clear and type new values
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Updated title");

    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, "Updated description");

    // Find and click save button
    const saveButton = canvas.getByTestId("todo-item-save-button");
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(args.onUpdateTodo).toHaveBeenCalledWith(
        "todo-1",
        "Updated title",
        "Updated description",
        "cat-1"
      );
    });
  },
};

export const EditModeCancel: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onUpdateTodo.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Find the form inputs
    const titleInput = canvas.getByTestId(
      "todo-item-title-input"
    ) as HTMLInputElement;

    // Modify the title
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Modified title");

    // Click cancel button
    const cancelButton = canvas.getByTestId("todo-item-cancel-button");
    await userEvent.click(cancelButton);

    // Verify edit mode is closed (original title shows again)
    await waitFor(() => {
      const title = canvas.getByText("Buy groceries");
      expect(title).toBeInTheDocument();
    });

    // Verify onUpdateTodo was not called
    await expect(args.onUpdateTodo).not.toHaveBeenCalled();
  },
};

export const EditModeDelete: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onOpenDeleteModal.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const deleteButton = canvas.getByTestId("todo-item-delete-button");
      expect(deleteButton).toBeInTheDocument();
    });

    // Click delete button
    const deleteButton = canvas.getByTestId("todo-item-delete-button");
    await userEvent.click(deleteButton);

    await expect(args.onOpenDeleteModal).toHaveBeenCalledWith(
      "todo-1",
      "Buy groceries"
    );
  },
};

export const EditModeCategorySelection: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onUpdateTodo.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Find category badges - they should be radio buttons
    const categoryBadges = canvas.getAllByRole("radio");
    await expect(categoryBadges.length).toBe(3);

    // Click on Personal category (second one)
    await userEvent.click(categoryBadges[1]);

    // Save the changes
    const saveButton = canvas.getByTestId("todo-item-save-button");
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(args.onUpdateTodo).toHaveBeenCalledWith(
        "todo-1",
        "Buy groceries",
        "Milk, eggs, and bread",
        "cat-2"
      );
    });
  },
};

export const EditModeCategoryDeselection: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onUpdateTodo.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Find category badges
    const categoryBadges = canvas.getAllByRole("radio");

    // Click on the already selected Work category (first one) to deselect it
    await userEvent.click(categoryBadges[0]);

    // Save the changes
    const saveButton = canvas.getByTestId("todo-item-save-button");
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(args.onUpdateTodo).toHaveBeenCalledWith(
        "todo-1",
        "Buy groceries",
        "Milk, eggs, and bread",
        null
      );
    });
  },
};

export const EditModeWithError: Story = {
  args: {
    onUpdateTodo: fn(
      async (
        _id: string,
        _title: string,
        _description: string,
        _categoryId?: string | null
      ) => {
        throw new Error("Failed to update todo");
      }
    ),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onUpdateTodo.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const saveButton = canvas.getByTestId("todo-item-save-button");
      expect(saveButton).toBeInTheDocument();
    });

    // Click save button
    const saveButton = canvas.getByTestId("todo-item-save-button");
    await userEvent.click(saveButton);

    // Wait for error message to appear
    await waitFor(() => {
      const errorMessage = canvas.getByText("Failed to update todo");
      expect(errorMessage).toBeInTheDocument();
    });

    // Verify we are still in edit mode (title input still visible)
    const titleInput = canvas.getByTestId("todo-item-title-input");
    await expect(titleInput).toBeInTheDocument();
  },
};

export const WithoutCategories: Story = {
  args: {
    categories: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Verify no category badges are displayed
    const categoryBadges = canvas.queryAllByRole("radio");
    await expect(categoryBadges.length).toBe(0);
  },
};

export const UseEffectSyncsStateWhenTodoChanges: Story = {
  render: (args) => {
    const [todo, setTodo] = useState(args.todo);

    return (
      <TodoItem
        {...args}
        todo={todo}
        onUpdateTodo={async (id, title, description, categoryId) => {
          // After save, update the todo to simulate external change
          setTodo({
            ...todo,
            title,
            description,
            categoryId: categoryId ?? null,
          });
          await args.onUpdateTodo(id, title, description, categoryId);
        }}
      />
    );
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.onUpdateTodo.mockClear();

    // Verify initial title
    const title = canvas.getByText("Buy groceries");
    await expect(title).toBeInTheDocument();

    // Enter edit mode
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Modify the title
    const titleInput = canvas.getByTestId(
      "todo-item-title-input"
    ) as HTMLInputElement;
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Modified in edit mode");

    // Save changes
    const saveButton = canvas.getByTestId("todo-item-save-button");
    await userEvent.click(saveButton);

    // Wait for save to complete and exit edit mode
    await waitFor(() => {
      expect(args.onUpdateTodo).toHaveBeenCalledWith(
        "todo-1",
        "Modified in edit mode",
        "Milk, eggs, and bread",
        "cat-1"
      );
    });

    // After exiting edit mode, verify new title is displayed
    // This tests that useEffect syncs the state when todo prop changes
    await waitFor(() => {
      const updatedTitle = canvas.getByText("Modified in edit mode");
      expect(updatedTitle).toBeInTheDocument();
    });
  },
};

export const UseEffectResetsStateOnCancel: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Enter edit mode
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Modify all fields
    const titleInput = canvas.getByTestId(
      "todo-item-title-input"
    ) as HTMLInputElement;
    const descriptionInput = canvas.getByTestId(
      "todo-item-description-input"
    ) as HTMLTextAreaElement;

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Modified title");
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, "Modified description");

    // Change category
    const categoryBadges = canvas.getAllByRole("radio");
    await userEvent.click(categoryBadges[1]); // Select second category

    // Verify the modification took effect
    await expect(titleInput.value).toBe("Modified title");
    await expect(descriptionInput.value).toBe("Modified description");

    // Cancel - this triggers handleCancel which resets state
    const cancelButton = canvas.getByTestId("todo-item-cancel-button");
    await userEvent.click(cancelButton);

    // Verify we're back to display mode with original values
    await waitFor(() => {
      const originalTitle = canvas.getByText("Buy groceries");
      expect(originalTitle).toBeInTheDocument();
    });

    // Verify the original description is also displayed
    const originalDescription = canvas.getByText("Milk, eggs, and bread");
    await expect(originalDescription).toBeInTheDocument();
  },
};

export const MobileLongPressToEdit: Story = {
  args: {
    todo: SAMPLE_TODO_NO_DESCRIPTION,
  },
  render: (args) => {
    // Set to iOS for this story
    Object.defineProperty(Platform, "OS", {
      value: "ios",
      writable: true,
      configurable: true,
    });

    return (
      <View>
        <TodoItem {...args} />
      </View>
    );
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    try {
      args.onToggleComplete.mockClear();
      args.onUpdateTodo.mockClear();

      // On mobile (iOS), the edit button should NOT be visible
      const editButton = canvas.queryByTestId("todo-item-edit-button");
      await expect(editButton).toBeNull();

      // Find the todo title
      const title = canvas.getByText("Call mom");
      await expect(title).toBeInTheDocument();

      // Simulate long press to enter edit mode on mobile
      await userEvent.pointer({ keys: "[MouseLeft>]", target: title });
      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 500ms for long press
      await userEvent.pointer({ keys: "[/MouseLeft]" });

      // Wait for edit mode to appear
      await waitFor(() => {
        const titleInput = canvas.getByTestId("todo-item-title-input");
        expect(titleInput).toBeInTheDocument();
      });

      // Find the form inputs
      const titleInput = canvas.getByTestId(
        "todo-item-title-input"
      ) as HTMLInputElement;
      const descriptionInput = canvas.getByTestId(
        "todo-item-description-input"
      ) as HTMLTextAreaElement;

      // Verify edit mode is active and we can modify fields
      await expect(titleInput.value).toBe("Call mom");
      await expect(descriptionInput.value).toBe("");

      // Modify the title and description
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, "Updated via long press");

      await userEvent.clear(descriptionInput);
      await userEvent.type(descriptionInput, "Updated description");

      // Save the changes
      const saveButton = canvas.getByTestId("todo-item-save-button");
      await userEvent.click(saveButton);

      await waitFor(() => {
        expect(args.onUpdateTodo).toHaveBeenCalledWith(
          "todo-2",
          "Updated via long press",
          "Updated description",
          null
        );
      });
    } finally {
      // Reset Platform.OS after test completes
      Object.defineProperty(Platform, "OS", {
        value: "web",
        writable: true,
        configurable: true,
      });
    }
  },
};
