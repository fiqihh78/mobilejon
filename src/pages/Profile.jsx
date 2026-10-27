import { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

const ACCOUNT_KEY = "motodeal-account";

const loadAccount = () => {
  try {
    const savedAccount = JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "{}");
    return {
      name: typeof savedAccount.name === "string" ? savedAccount.name : "",
      email: typeof savedAccount.email === "string" ? savedAccount.email : "",
      phone: typeof savedAccount.phone === "string" ? savedAccount.phone : "",
      city: typeof savedAccount.city === "string" ? savedAccount.city : "",
    };
  } catch (error) {
    console.error("Gagal membaca profil pengguna.", error);
    return { name: "", email: "", phone: "", city: "" };
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(loadAccount);
  const [saved, setSaved] = useState(false);

  const updateAccount = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
    setSaved(false);
  };

  const saveAccount = (event) => {
    event.preventDefault();
    try {
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
      setSaved(true);
    } catch (error) {
      console.error("Gagal menyimpan profil pengguna.", error);
      setSaved(false);
    }
  };

  const initials = account.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "U";

  return (
    <IonPage>
      <TopBar Title="Profile" />
      <IonContent className="motodeal-content">
        <main className="motodeal-page">
          <section className="profile-panel">
            <div className="profile-heading">
              <div className="profile-avatar">{initials}</div>
              <div>
                <span className="section-kicker">AKUN SAYA</span>
                <h1>{account.name || "Pengguna MotoDeal"}</h1>
                <p>Kelola informasi profilmu di sini.</p>
              </div>
            </div>
            <form className="profile-form" onSubmit={saveAccount}>
              <label>
                Nama lengkap
                <input name="name" value={account.name} onChange={updateAccount} placeholder="Masukkan nama lengkap" required />
              </label>
              <label>
                Email
                <input name="email" type="email" value={account.email} onChange={updateAccount} placeholder="nama@email.com" />
              </label>
              <label>
                Nomor telepon
                <input name="phone" type="tel" value={account.phone} onChange={updateAccount} placeholder="08xxxxxxxxxx" />
              </label>
              <label>
                Kota
                <input name="city" value={account.city} onChange={updateAccount} placeholder="Kota tempat tinggal" />
              </label>
              <div className="profile-actions">
                <button type="submit" className="profile-save">Simpan Profil</button>
                {saved && <span role="status">Profil berhasil disimpan.</span>}
              </div>
            </form>
            <div className="profile-bottom">
              <p>Password dan autentikasi akun belum terhubung ke server.</p>
              <button type="button" className="profile-logout" onClick={() => navigate("/Login")}>
                Keluar
              </button>
            </div>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
