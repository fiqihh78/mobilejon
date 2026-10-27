const motorPhotos = [
  ["cbr", "01-honda-cbr150r.jpg"],
  ["nmax", "02-yamaha-nmax.jpg"],
  ["vario", "03-honda-vario-160.jpg"],
  ["aerox", "04-yamaha-aerox.jpg"],
  ["ninja", "05-kawasaki-ninja-zx-25r.jpg"],
  ["beat", "06-honda-beat.jpg"],
  ["pcx", "07-honda-pcx-160.jpg"],
  ["scoopy", "08-honda-scoopy.jpg"],
  ["adv", "09-honda-adv-160.png"],
  ["r15", "10-yamaha-r15.jpg"],
  ["mt-25", "11-yamaha-mt-25.jpg"],
  ["gsx", "12-suzuki-gsx-r150.jpg"],
  ["supra", "13-honda-supra-x-125.jpg"],
  ["satria", "14-suzuki-satria-f150.jpg"],
  ["crf", "15-honda-crf150l.jpg"],
  ["gesits", "18-gesits-g1.jpg"],
  ["alva", "19-alva-one.jpg"],
  ["w175", "20-kawasaki-w175.jpg"],
];

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

const CardMotor = ({ motor, isFavorite, onToggleFavorite }) => {
  const name = motor.nama || motor.name || "Motor";
  const brand = motor.merk || motor.brand || "";
  const image =
    motor.gambar ||
    motor.image ||
    (() => {
      const normalizedName = name.toLowerCase().replace(/[^a-z0-9-]/g, "");
      const photo = motorPhotos.find(([keyword]) => normalizedName.includes(keyword));
      return photo ? `/images/motors/${photo[1]}` : "";
    })();

  return (
    <article className="motor-card">
      <div className="motor-card-image-wrap">
        {image ? (
          <img
            src={image}
            className="motor-card-image"
            alt={name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="motor-image-placeholder">MotoDeal</div>
        )}
        <span className="motor-card-badge">{brand || "Pilihan MotoDeal"}</span>
        {onToggleFavorite && (
          <button
            type="button"
            className={`motor-favorite-button ${isFavorite ? "is-favorite" : ""}`}
            aria-label={isFavorite ? `Hapus ${name} dari favorit` : `Tambah ${name} ke favorit`}
            onClick={() => onToggleFavorite(motor.id)}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        )}
      </div>
      <div className="motor-card-body">
        <div className="motor-card-title-row">
          <div>
            <p className="motor-card-brand">{brand || "Motor pilihan"}</p>
            <h3>{name}</h3>
          </div>
          {motor.tahun && <span className="motor-year">{motor.tahun}</span>}
        </div>
        <div className="motor-card-footer">
          <div>
            <span className="motor-price-label">Harga</span>
            <strong>{formatPrice(motor.harga || motor.price)}</strong>
          </div>
          <span className="motor-card-arrow" aria-hidden="true">↗</span>
        </div>
      </div>
    </article>
  );
};

export default CardMotor;
