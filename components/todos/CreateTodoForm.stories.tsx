import type { Meta, StoryObj } from "@storybook/react-native-web-vite";

import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { RouterOutput } from "@/lib/routers/_app";
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
    color: "#16A34A",
    icon: "💼",
    _count: { todos: 2 },
  },
  {
    id: "3",
    name: "Errands",
    color: "#F97316",
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
} satisfies Meta<typeof CreateTodoForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.createTodo.mockClear();

    const titleInput = canvas.getByPlaceholderText(
      "What needs to be done?"
    ) as HTMLInputElement;
    const descriptionInput = canvas.getByPlaceholderText(
      "Add more details..."
    ) as HTMLTextAreaElement;

    await userEvent.type(titleInput, "Buy groceries");
    await userEvent.type(descriptionInput, "Milk and eggs");

    const homeCategoryLabel = canvas.getByText("Home");
    const homeCategory = homeCategoryLabel.closest<HTMLElement>("[tabindex]");
    if (!homeCategory) {
      throw new Error("Expected Home category option to be focusable");
    }
    await userEvent.click(homeCategory);

    const submitButton = canvas.getByRole("button", { name: "Create Todo" });
    await userEvent.click(submitButton);

    await canvas.findByRole("button", { name: "Creating..." });

    await expect(args.createTodo).toHaveBeenCalledTimes(1);
    await expect(args.createTodo).toHaveBeenCalledWith(
      "Buy groceries",
      "Milk and eggs",
      SAMPLE_CATEGORIES[0].id
    );

    await canvas.findByRole("button", { name: "Create Todo" });

    await waitFor(() => expect(titleInput).toHaveValue(""));
    await waitFor(() => expect(descriptionInput).toHaveValue(""));
  },
};

export const WithError: Story = {
  args: {
    error: "Something went wrong",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Something went wrong")).toBeVisible();
  },
};

export const WithoutCategories: Story = {
  args: {
    categories: [],
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    args.createTodo.mockClear();

    expect(canvas.queryByText(SAMPLE_CATEGORIES[0].name)).toBeNull();

    const titleInput = canvas.getByPlaceholderText(
      "What needs to be done?"
    ) as HTMLInputElement;
    const descriptionInput = canvas.getByPlaceholderText(
      "Add more details..."
    ) as HTMLTextAreaElement;

    await userEvent.type(titleInput, "Walk the dog");
    await userEvent.clear(descriptionInput);

    const submitButton = canvas.getByRole("button", { name: "Create Todo" });
    await userEvent.click(submitButton);

    await canvas.findByRole("button", { name: "Creating..." });
    await expect(args.createTodo).toHaveBeenCalledTimes(1);
    await expect(args.createTodo).toHaveBeenCalledWith(
      "Walk the dog",
      "",
      undefined
    );

    await canvas.findByRole("button", { name: "Create Todo" });
    await waitFor(() => expect(titleInput).toHaveValue(""));
  },
};
