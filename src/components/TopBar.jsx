import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

const TopBar = (props) => (
  <IonHeader className="motodeal-header">
    <IonToolbar className="motodeal-toolbar">
      <IonTitle>{props.Title}</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default TopBar;
