import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

export function useProtectedRoute() {
  const segments = useSegments();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        const isAuthenticated =
          session && "data" in session && session.data?.user;

        // Check if we're on auth screens
        const isAuthScreen = pathname === "/login" || pathname === "/register";

        // Check if we're trying to access protected content
        const isProtectedScreen = !isAuthScreen && pathname !== "/_sitemap";

        // Redirect logic
        if (!isAuthenticated && isProtectedScreen) {
          // User is not authenticated but trying to access protected routes
          router.replace("/login" as any);
        } else if (isAuthenticated && isAuthScreen) {
          // User is authenticated but on auth screens
          router.replace("/" as any);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [pathname, router, segments]);

  return { isChecking };
}
