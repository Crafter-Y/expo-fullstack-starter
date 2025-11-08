import type { CategoryFiler } from "@/app/(tabs)/(todos)";
import { Divider } from "@/components/elements/Divider";
import { LoadingScreen } from "@/components/elements/LoadingScreen";
import { ModalWrapper } from "@/components/elements/ModalWrapper";
import {
  CategoryFormModal,
  PRESET_COLORS,
  PRESET_ICONS,
} from "@/components/todos/CategoryFormModal";
import { WebCategorySelector } from "@/components/todos/WebCategorySelector";
import { authClient } from "@/lib/auth-client";
import { useCreateCategory } from "@/lib/hooks/useCreateCategory";
import { useUpdateCategory } from "@/lib/hooks/useUpdateCategory";
import { RouterOutput } from "@/lib/routers/_app";
import { trpc } from "@/lib/trpc-client";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "nativewind";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Image, useWindowDimensions, View } from "react-native";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  // Extract category from navigation state
  const selectedCategory = useMemo(() => {
    const state = props.state;
    const currentRoute = state.routes[state.index];

    // Check if we're on the todos route
    if (currentRoute.name === "(todos)") {
      // Access the nested route params
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const todosState = currentRoute.state as any;
      if (todosState && todosState.index !== undefined) {
        const todosRoute = todosState.routes[todosState.index];
        const params = todosRoute.params as { category?: string };
        return (params?.category as CategoryFiler) || "all";
      }
    }

    return "all" as CategoryFiler;
  }, [props.state]);

  const { data: categories } = trpc.category.getAll.useQuery();

  const {
    showModal: showCreateModal,
    error: createError,
    isPending: isCreating,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
    handleCreateCategory,
  } = useCreateCategory();

  const {
    isModalOpen: isUpdateModalOpen,
    editingCategory,
    error: updateError,
    isPending: isUpdating,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
    handleUpdateCategory,
  } = useUpdateCategory();

  const handleEditCategory = (
    category: RouterOutput["category"]["getAll"][number]
  ) => {
    openUpdateModal({
      id: category.id,
      name: category.name,
      color: category.color || PRESET_COLORS[0],
      icon: category.icon || PRESET_ICONS[0],
    });
  };

  const navigateToTodos = (categoryId: CategoryFiler) => {
    router.push({
      pathname: "/(tabs)/(todos)",
      params: { category: categoryId },
    });
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <View className="items-center">
          <Image
            source={require("@/assets/images/icon.png")}
            className="mb-12"
            style={{ width: 100, height: 100 }}
          />
        </View>
        <DrawerItemList {...props} />

        <Divider className="my-4" />

        <WebCategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          isDark={isDark}
          onSelectCategory={navigateToTodos}
          onAddCategory={openCreateModal}
          onEditCategory={handleEditCategory}
        />
      </DrawerContentScrollView>

      {/* Create Category Modal */}
      <ModalWrapper
        visible={showCreateModal}
        onClose={closeCreateModal}
        title="category.createCategory"
      >
        <CategoryFormModal
          visible={showCreateModal}
          error={createError}
          isPending={isCreating}
          onSubmit={handleCreateCategory}
          onCancel={closeCreateModal}
        />
      </ModalWrapper>

      {/* Edit Category Modal */}
      <ModalWrapper
        visible={isUpdateModalOpen}
        onClose={closeUpdateModal}
        title="category.editCategory"
      >
        <CategoryFormModal
          category={
            editingCategory
              ? {
                  id: editingCategory.id,
                  name: editingCategory.name,
                  color: editingCategory.color,
                  icon: editingCategory.icon,
                  _count: { todos: 0 },
                }
              : undefined
          }
          visible={isUpdateModalOpen}
          error={updateError}
          isPending={isUpdating}
          onSubmit={handleUpdateCategory}
          onCancel={closeUpdateModal}
        />
      </ModalWrapper>
    </>
  );
};

export default function TabsLayout() {
  const { t } = useTranslation();
  const dimensions = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      // User is not authenticated, redirect to login
      router.replace("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <LoadingScreen />;
  }

  const isLargeScreen = dimensions.width >= 768;
  const isDark = colorScheme === "dark";

  return (
    <Drawer
      drawerContent={CustomDrawer}
      screenOptions={{
        drawerType: isLargeScreen ? "permanent" : "front",
        headerShown: true,
        swipeEnabled: !isLargeScreen,
        overlayColor: isLargeScreen ? "transparent" : "rgba(0, 0, 0, 0.5)",
        headerLeft: isLargeScreen ? () => null : undefined,
        headerStyle: {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          borderBottomWidth: 1,
          borderBottomColor: isDark ? "#374151" : "#e5e7eb",
        },
        headerTintColor: isDark ? "#ffffff" : "#111827",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 20,
        },
        drawerStyle: {
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          borderRightWidth: 1,
          borderRightColor: isDark ? "#374151" : "#e5e7eb",
        },
        drawerActiveTintColor: isDark ? "#60a5fa" : "#2563eb",
        drawerInactiveTintColor: isDark ? "#9ca3af" : "#6b7280",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "500",
        },
        drawerItemStyle: {
          marginVertical: 4,
        },
      }}
    >
      <Drawer.Screen
        name="(todos)"
        options={{
          drawerLabel: t("navigation.todos"),
          title: t("navigation.todos"),
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="check-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: t("navigation.profile"),
          title: t("navigation.profile"),
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
