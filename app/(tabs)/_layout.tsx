import type { CategoryFiler } from "@/app/(tabs)/(todos)";
import { LoadingScreen } from "@/components/elements/LoadingScreen";
import { ModalWrapper } from "@/components/elements/ModalWrapper";
import { CreateCategoryModal } from "@/components/todos/CreateCategoryModal";
import { authClient } from "@/lib/auth-client";
import { useCreateCategory } from "@/lib/hooks/useCreateCategory";
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
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const { data: categories } = trpc.category.getAll.useQuery();

  const {
    showModal: showCategoryModal,
    error: categoryError,
    isPending,
    openModal,
    closeModal,
    handleCreateCategory,
  } = useCreateCategory();

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

        {/* Categories Section */}
        <View className="mt-6 border-t border-gray-200 px-4 pt-4 dark:border-gray-700">
          <Text className="mb-3 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
            {t("todos.categories")}
          </Text>

          {/* All Todos */}
          <Pressable
            onPress={() => navigateToTodos("all")}
            className="mb-2 flex-row items-center rounded-lg px-3 py-2 active:bg-gray-100 dark:active:bg-gray-700"
          >
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("todos.all")}
            </Text>
          </Pressable>

          {/* Uncategorized */}
          <Pressable
            onPress={() => navigateToTodos("uncategorized")}
            className="mb-2 flex-row items-center rounded-lg px-3 py-2 active:bg-gray-100 dark:active:bg-gray-700"
          >
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("todos.uncategorized")}
            </Text>
          </Pressable>

          {/* Category Items */}
          {categories?.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => navigateToTodos(category.id)}
              className="mb-2 flex-row rounded-lg px-3 py-2 active:bg-gray-100 dark:active:bg-gray-700"
            >
              {category.icon && (
                <Text className="w-6 text-sm">{category.icon}</Text>
              )}
              <Text
                className="text-sm font-medium"
                style={{
                  color: category.color || (isDark ? "#d1d5db" : "#374151"),
                }}
              >
                {category.name}
              </Text>
            </Pressable>
          ))}

          {/* Add Category Button */}
          <Pressable
            onPress={openModal}
            className="mt-2 flex-row items-center rounded-lg border border-dashed border-gray-400 px-3 py-2 dark:border-gray-500"
          >
            <Text className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {t("todos.add")}
            </Text>
          </Pressable>
        </View>
      </DrawerContentScrollView>

      <ModalWrapper
        visible={showCategoryModal}
        onClose={closeModal}
        title="category.createCategory"
      >
        <CreateCategoryModal
          visible={showCategoryModal}
          error={categoryError}
          isPending={isPending}
          onSubmit={handleCreateCategory}
          onCancel={closeModal}
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
