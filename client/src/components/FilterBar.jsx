import { BROKER } from "../data/properties";
import { styles } from "../styles/styles";

export default function FilterBar({
  filter,
  setFilter,
  areaFilter,
  setAreaFilter,
  propertyType,
  setPropertyType,
}) {
  return (
    <div style={styles.filterBar}>
      <div style={styles.filterInner}>

        {/* Sale / Rent Filter */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: "#888",
              marginRight: 4,
            }}
          >
            Show:
          </span>

          {[
            ["all", "All"],
            ["sell", "For Sale"],
            ["rent", "For Rent"],
          ].map(([v, l]) => (
            <button
              key={v}
              style={{
                ...styles.filterBtn,

                ...(filter === v
                  ? {
                      background: "#111",
                      color: "#fff",
                      border: "1px solid #111",
                    }
                  : {}),
              }}
              onClick={() => setFilter(v)}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Commercial / Residential Filter */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: "#888",
              marginRight: 4,
            }}
          >
            Type:
          </span>

          {[
            ["all", "All"],
            ["residential", "Residential"],
            ["commercial", "Commercial"],
          ].map(([v, l]) => (
            <button
              key={v}
              style={{
                ...styles.filterBtn,

                ...(propertyType === v
                  ? {
                      background: "#111",
                      color: "#fff",
                      border: "1px solid #111",
                    }
                  : {}),
              }}
              onClick={() => setPropertyType(v)}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Area Filter */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 13, color: "#888" }}>
            Area:
          </span>

          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            style={styles.select}
          >
            <option value="all">All Areas</option>

            {BROKER.areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
}