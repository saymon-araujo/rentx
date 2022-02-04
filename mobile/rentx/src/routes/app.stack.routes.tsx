import React from "react";

import { CarDetails } from "../screens/CarDetails";
import { Schedule } from "../screens/Schedule";
import { ScheduleDetails } from "../screens/ScheduleDetails";
import { SuccessInAction } from "../screens/SuccessInAction";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";
import { Home } from "../screens/Home";

import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();
export function AppStackRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Schedule" component={Schedule} />
      <Screen name="ScheduleDetails" component={ScheduleDetails} />
      <Screen name="SuccessInAction" component={SuccessInAction} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="Splash" component={Splash} />
    </Navigator>
  );
}
