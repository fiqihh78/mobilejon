import { useEffect, useMemo, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import axios from "axios";
import TopBar from "../components/TopBar";
import CardMotor from "../components/CardMotor";

const FAVORITES_KEY = "motodeal-favorites";
const FAVORITES_UPDATED_EVENT = "motodeal:favorites-updated";

const loadFavorites = () => {
  try {
    const savedFavorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return Array.isArray(savedFavorites) ? savedFavorites : [];
  } catch (error) {
    console.error("Gagal membaca daftar motor favorit.", error);
    return [];
  }
};

const Motor = () => {
  const [dataMotor, setDataMotor] = useState([]);
  const [dataFavorit, setDataFavorit] = useState(loadFavorites);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const categories = ["Semua", "Matic", "Sport", "Bebek", "Trail", "Listrik"];

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

  const toggleFavorite = (id) => {
    const favoritBaru = dataFavorit.includes(id)
      ? dataFavorit.filter((item) => item !== id)
      : [...dataFavorit, id];

    setDataFavorit(favoritBaru);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritBaru));
    window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
  };

  const filteredMotor = useMemo(() => {
    const query = search.trim().toLowerCase();
    return dataMotor.filter((motor) => {
      const name = `${motor.nama || motor.name || ""} ${motor.merk || motor.brand || ""}`.toLowerCase();
      const matchesSearch = name.includes(query);
      const motorName = (motor.nama || motor.name || "").toLowerCase();
      const motorCategory = /vario|nmax|beat|scoopy|pcx|aerox|adv/.test(motorName)
        ? "Matic"
        : /crf|klx|wr/.test(motorName)
          ? "Trail"
          : /supra|satria/.test(motorName)
            ? "Bebek"
            : /gesits|alva|listrik/.test(motorName)
              ? "Listrik"
              : "Sport";
      return matchesSearch && (category === "Semua" || category === motorCategory);
    });
  }, [category, dataMotor, search]);

  return (
    <IonPage>
      <TopBar Title="Daftar Motor" />
      <IonContent className="motodeal-content">
        <main className="motodeal-page">
          <div className="catalog-intro">
            <span className="section-kicker">GARASI MOTODEAL</span>
            <h1>Temukan motor<br />yang <span>cocok untukmu.</span></h1>
            <p>{dataMotor.length} pilihan untuk menemani setiap perjalanan.</p>
          </div>
          <label className="motor-search">
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari nama atau merek motor..." />
            <kbd>⌘ K</kbd>
          </label>
          <div className="category-list">
            {categories.map((item) => (
              <button key={item} type="button" className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
          {error && <p className="api-error">{error}</p>}
          <div className="motor-grid">
            {filteredMotor.map((motor) => (
              <CardMotor
                key={motor.id}
                motor={motor}
                isFavorite={dataFavorit.includes(motor.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
          {!filteredMotor.length && !error && (
            <div className="empty-catalog"><span>⌕</span><h3>Motor belum ditemukan</h3><p>Coba nama atau kategori lainnya.</p></div>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Motor;
