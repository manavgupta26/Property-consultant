import { BROKER } from "../data/properties";
import { styles } from "../styles/styles";

export default function Header({ onListProperty }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        {/* Brand */}
        <div>
          <div style={styles.logo}>Ludhiana Properties</div>
          <div style={styles.logoSub}>by {BROKER.name}</div>
        </div>

        {/* Actions */}
        <div style={styles.headerActions}>
          <a href={`tel:${BROKER.phone}`} style={styles.headerCall}>
            📞 {BROKER.phone}
          </a>
          <button style={styles.sellBtn} onClick={onListProperty}>
            List Your Property
          </button>
        </div>
      </div>
    </header>
  );
}