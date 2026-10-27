import { IonContent, IonPage } from "@ionic/react";
import TopBar from "../components/TopBar";

const Profile = () => (
  <IonPage>
    <TopBar Title="Profile" />
    <IonContent className="motodeal-content">
      <main className="motodeal-page">
        <section className="profile-card">
          <div className="profile-avatar">M</div>
          <span className="section-kicker">AKUN MOTODEAL</span>
          <h1>Ruang <span>berkendara</span><br />milikmu.</h1>
          <p>Semua pilihan motor favoritmu, tersimpan dalam satu tempat.</p>
          <div className="profile-stat"><strong>01</strong><span>Temukan motor yang paling pas buat perjalananmu.</span></div>
        </section>
      </main>
    </IonContent>
  </IonPage>
);

export default Profile;
