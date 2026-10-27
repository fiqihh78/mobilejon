import { Navigate, Route, useLocation } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { bicycleOutline, heartOutline, homeOutline, personOutline } from "ionicons/icons";
import Home from "./pages/Home";
import Motor from "./pages/Motor";
import Favorite from "./pages/Favorite";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./theme/motodeal.css";

setupIonicReact();

const AppTabs = () => {
  const location = useLocation();

  return (
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Motor" element={<Motor />} />
          <Route path="/Favorite" element={<Favorite />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/dashboard" element={<Navigate to="/Home" replace />} />
          <Route path="/motor" element={<Navigate to="/Motor" replace />} />
          <Route path="/favorite" element={<Navigate to="/Favorite" replace />} />
          <Route path="/profile" element={<Navigate to="/Profile" replace />} />
          <Route path="/" element={<Navigate to="/Login" replace />} />
          <Route path="*" element={<Navigate to="/Login" replace />} />
        </IonRouterOutlet>

        {location.pathname.toLowerCase() !== "/login" && (
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/Home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="motor" href="/Motor">
            <IonIcon icon={bicycleOutline} />
            <IonLabel>Motor</IonLabel>
          </IonTabButton>
          <IonTabButton tab="favorite" href="/Favorite">
            <IonIcon icon={heartOutline} />
            <IonLabel>Favorite</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/Profile">
            <IonIcon icon={personOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
        )}
      </IonTabs>
  );
};

const App = () => (
  <IonApp>
    <IonReactRouter>
      <AppTabs />
    </IonReactRouter>
  </IonApp>
);

export default App;
