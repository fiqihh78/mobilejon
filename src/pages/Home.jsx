import { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import CardMotor from "../components/CardMotor";

const Home = () => {
  const navigate = useNavigate();
  const [dataMotor, setDataMotor] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vivid-lighthouse-7237.de.deplexo.com/api/motor",
        );
        if (!Array.isArray(response.data?.data)) {
          throw new Error("Respons API motor tidak berisi daftar motor.");
        }
        setDataMotor(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data motor.", error);
        setError("Data motor gagal dimuat.");
      }
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <TopBar Title="MotoDeal" />
      <IonContent className="motodeal-content">
        <main className="motodeal-page">
          <section className="hero-banner">
            <div className="hero-copy">
              <span className="hero-kicker">TEMUKAN PERJALANANMU</span>
              <h1>Jalan lebih jauh.<br /><span>Mulai dari sini.</span></h1>
              <p>Pilihan motor impian, harga transparan, dan semua dalam satu tempat.</p>
              <button type="button" className="hero-button" onClick={() => navigate("/Motor")}>
                Jelajahi motor <span aria-hidden="true">↗</span>
              </button>
            </div>
            <div className="hero-photo">
              <img src="/images/motors/01-honda-cbr150r.jpg" alt="Motor Honda CBR150R" />
              <div className="hero-photo-label"><span>01</span> RIDE THE MOMENT</div>
            </div>
            <div className="hero-orbit" aria-hidden="true">M</div>
          </section>

          <section className="home-section">
            <div className="section-heading">
              <div>
                <span className="section-kicker">PILIHAN MINGGU INI</span>
                <h2>Motor yang lagi dilirik</h2>
              </div>
              <button type="button" className="section-link" onClick={() => navigate("/Motor")}>
                Lihat semua <span aria-hidden="true">→</span>
              </button>
            </div>
            {error && <p className="api-error">{error}</p>}
            <div className="motor-grid">
              {dataMotor.slice(0, 4).map((motor) => (
                <CardMotor key={motor.id} motor={motor} />
              ))}
            </div>
            {!dataMotor.length && !error && <p className="loading-message">Menyiapkan pilihan motor untukmu...</p>}
          </section>

          <section className="home-promo">
            <div>
              <span>GAS POL, TAPI TETAP PILIH YANG PAS</span>
              <h2>Motor favoritmu<br />sudah menunggu.</h2>
            </div>
            <button type="button" onClick={() => navigate("/Favorite")}>Buka favorit <span aria-hidden="true">↗</span></button>
            <img src="/images/motors/04-yamaha-aerox.jpg" alt="" aria-hidden="true" />
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Home;
