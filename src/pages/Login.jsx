import { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useNavigate } from "react-router-dom";

const ACCOUNT_KEY = "motodeal-account";

const Login = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    const savedAccount = JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "{}");
    localStorage.setItem(
      ACCOUNT_KEY,
      JSON.stringify({
        ...savedAccount,
        name: nama.trim(),
      }),
    );
    navigate("/Home");
  };

  return (
    <IonPage>
      <IonContent className="motodeal-content">
        <main className="login-page">
          <section className="login-picture">
            <div className="login-picture-copy">
              <span>MOTO DEAL</span>
              <h1>Temukan motor.<br />Mulai cerita baru.</h1>
              <p>Pilihan motor untuk perjalanan yang lebih seru.</p>
            </div>
          </section>
          <section className="login-form-side">
            <div className="login-form-card">
              <span className="section-kicker">SELAMAT DATANG</span>
              <h2>Masuk ke MotoDeal</h2>
              <p className="login-description">Isi nama dan password untuk melanjutkan.</p>
              <form onSubmit={handleLogin}>
                <label htmlFor="login-name">Nama pengguna</label>
                <input
                  id="login-name"
                  type="text"
                  placeholder="Contoh: Budi"
                  value={nama}
                  onChange={(event) => setNama(event.target.value)}
                  required
                />
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Masukkan password"
                  required
                />
                <button type="submit">Masuk</button>
              </form>
              <small>Belum punya akun? Jelajahi MotoDeal tanpa biaya.</small>
            </div>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Login;
