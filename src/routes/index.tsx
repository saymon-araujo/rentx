import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppStackRoutes } from "./app.stack.routes";
import { AppTabRoutes } from "./app.tab.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/auth";
import { LoadAnimated } from "../components/LoadAnimated";

export function Routes() {
  const { user, loading } = useAuth();

  // return loading ? (
  //   <LoadAnimated />
  // ) : (
  return (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
  // );
}
