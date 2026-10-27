import { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import axios from "axios";
import TopBar from "../components/TopBar";
import CardMotor from "../components/CardMotor";

const FAVORITES_KEY = "motodeal-favorites";
const FAVORITES_UPDATED_EVENT = "motodeal:favorites-updated";

const Favorite = () => {
  const [dataMotor, setDataMotor] = useState([]);
  const [dataFavorit, setDataFavorit] = useState(() => {
    try {
      const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
      return Array.isArray(savedFavorites) ? savedFavorites : [];
    } catch (error) {
      console.error("Gagal membaca daftar motor favorit.", error);
      return [];
    }
  });
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

  useEffect(() => {
    const updateFavorites = () => {
      try {
        const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        setDataFavorit(Array.isArray(savedFavorites) ? savedFavorites : []);
      } catch (error) {
        console.error("Gagal membaca daftar motor favorit.", error);
        setDataFavorit([]);
      }
    };

    window.addEventListener(FAVORITES_UPDATED_EVENT, updateFavorites);
    return () => window.removeEventListener(FAVORITES_UPDATED_EVENT, updateFavorites);
  }, []);

  const motorFavorit = dataMotor.filter((motor) => dataFavorit.includes(motor.id));

  return (
    <IonPage>
      <TopBar Title="Motor Favorit" />
      <IonContent className="motodeal-content">
        <main className="motodeal-page">
          <div className="catalog-intro">
            <span className="section-kicker">KOLEKSI PILIHANMU</span>
            <h1>Yang kamu <span>suka.</span></h1>
            <p>Simpan motor impianmu, biar gampang ditemukan lagi.</p>
          </div>
          {error && <p className="api-error">{error}</p>}
          {!motorFavorit.length && !error && (
            <div className="empty-catalog">
              <span>♡</span><h3>Belum ada motor favorit</h3>
              <p>Tekan ikon hati di kartu motor untuk menyimpannya di sini.</p>
            </div>
          )}
          <div className="motor-grid">
            {motorFavorit.map((motor) => (
              <CardMotor key={motor.id} motor={motor} />
            ))}
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Favorite;
