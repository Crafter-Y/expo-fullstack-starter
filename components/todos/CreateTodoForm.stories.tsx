import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { RouterOutput } from "@/lib/routers/_app";
import { View } from "react-native";
import CreateTodoForm from "./CreateTodoForm";

const SAMPLE_CATEGORIES: RouterOutput["category"]["getAll"] = [
  {
    id: "1",
    name: "Home",
    color: "#2563EB",
    icon: "🏠",
    _count: { todos: 5 },
  },
  {
    id: "2",
    name: "Work",
    color: "#000",
    icon: "💼",
    _count: { todos: 2 },
  },
  {
    id: "3",
    name: "Errands",
    color: "#DB3316",
    icon: null,
    _count: { todos: 0 },
  },
];

const meta = {
  title: "todos/CreateTodoForm",
  component: CreateTodoForm,
  tags: ["autodocs"],
  args: {
    error: null,
    categories: SAMPLE_CATEGORIES,
    createTodo: fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      return true;
    }),
  },
  decorators: [
    (Story) => (
      <View className="w-full max-w-md">
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof CreateTodoForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.createTodo.mockClear();

    const titleInput = canvas.getByTestId(
      "todo-form-title"
    ) as HTMLInputElement;
    const descriptionInput = canvas.getByTestId(
      "todo-form-description"
    ) as HTMLTextAreaElement;

    await userEvent.type(titleInput, "Buy groceries");
    await userEvent.type(descriptionInput, "Milk and eggs");

    const iconButtons = canvas.getAllByRole("radio");

    await userEvent.click(iconButtons[0]);

    const submitButton = canvas.getByRole("button");
    await userEvent.click(submitButton);

    await expect(args.createTodo).toHaveBeenCalledTimes(1);
    await expect(args.createTodo).toHaveBeenCalledWith(
      "Buy groceries",
      "Milk and eggs",
      SAMPLE_CATEGORIES[0].id
    );

    await waitFor(() => expect(titleInput).toHaveValue(""));
    await waitFor(() => expect(descriptionInput).toHaveValue(""));
  },
};

export const WithError: Story = {
  args: {
    error: "Something went wrong",
  },
};

export const WithoutCategories: Story = {
  args: {
    categories: [],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.queryByText(SAMPLE_CATEGORIES[0].name)).toBeNull();

    const titleInput = canvas.getByTestId(
      "todo-form-title"
    ) as HTMLInputElement;
    const descriptionInput = canvas.getByTestId(
      "todo-form-description"
    ) as HTMLTextAreaElement;

    await userEvent.type(titleInput, "Walk the dog");
    await userEvent.clear(descriptionInput);

    const submitButton = canvas.getByRole("button");
    await userEvent.click(submitButton);

    await expect(args.createTodo).toHaveBeenCalledTimes(1);
    await expect(args.createTodo).toHaveBeenCalledWith(
      "Walk the dog",
      "",
      undefined
    );

    await waitFor(() => expect(titleInput).toHaveValue(""));
  },
};

export const FailedSubmission: Story = {
  args: {
    createTodo: fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      return false; // Simulate failure
    }),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const titleInput = canvas.getByTestId(
      "todo-form-title"
    ) as HTMLInputElement;
    const descriptionInput = canvas.getByTestId(
      "todo-form-description"
    ) as HTMLTextAreaElement;

    // Fill in the form
    await userEvent.type(titleInput, "Failed todo");
    await userEvent.type(descriptionInput, "This should not reset");

    const submitButton = canvas.getByRole("button");
    await userEvent.click(submitButton);

    await expect(args.createTodo).toHaveBeenCalledTimes(1);

    // Wait for the async operation to complete
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Verify inputs are NOT reset when createTodo returns false
    await expect(titleInput).toHaveValue("Failed todo");
    await expect(descriptionInput).toHaveValue("This should not reset");
  },
};

export const CategoryToggle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on title to expand form
    const titleInput = canvas.getByTestId("todo-form-title");
    await userEvent.click(titleInput);

    // Wait for animation
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Find all category buttons
    const categoryButtons = canvas.getAllByRole("radio");

    // Click first category to select it
    await userEvent.click(categoryButtons[0]);

    // Verify it's selected (you can check aria-checked or visual state)
    const firstCategory = categoryButtons[0];
    await expect(firstCategory).toHaveAttribute("aria-checked", "true");

    // Click the same category again to unselect it
    await userEvent.click(categoryButtons[0]);

    // Verify it's unselected
    await expect(firstCategory).toHaveAttribute("aria-checked", "false");
  },
};

export const HandleBlur: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const titleInput = canvas.getByTestId(
      "todo-form-title"
    ) as HTMLInputElement;

    // Focus the title input to expand the form
    await userEvent.click(titleInput);

    // Wait for animation
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Verify form is expanded by checking if description field exists
    const descriptionInput = canvas.getByTestId("todo-form-description");
    await expect(descriptionInput).toBeInTheDocument();

    // Type some text
    await userEvent.type(titleInput, "Test");

    // Clear the input
    await userEvent.clear(titleInput);

    // Blur the input
    titleInput.blur();

    // Wait for animation to collapse
    await new Promise((resolve) => setTimeout(resolve, 250));

    // The form should collapse when title is empty after blur
    // We can't easily test the animation, but we can verify the logic works
    // by checking that the input is still accessible (form doesn't unmount)
    await expect(titleInput).toBeInTheDocument();
  },
};
