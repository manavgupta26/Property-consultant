const TOKEN = {
  cream: "#F7F3EE", stone: "#E8E0D5", warmGray: "#9C9189",
  charcoal: "#1C1917", ink: "#2D2926", gold: "#C9A84C", white: "#FFFFFF",
};

const chipStyle = (active) => ({
  padding: "7px 16px", borderRadius: 100,
  border: `1px solid ${active ? TOKEN.charcoal : TOKEN.stone}`,
  background: active ? TOKEN.charcoal : "transparent",
  fontFamily: "'DM Sans', sans-serif", fontSize: 13,
  color: active ? TOKEN.white : TOKEN.warmGray,
  cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
});

export default function FilterBar({ filter, setFilter, areaFilter, setAreaFilter, propertyType, setPropertyType, areas }) {
  const divider = <div style={{ width: 1, height: 20, background: TOKEN.stone, flexShrink: 0 }} />;

  return (
    <div style={{
      background: TOKEN.white, borderBottom: `1px solid ${TOKEN.stone}`,
      padding: "0 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", display: "flex", gap: 16,
        alignItems: "center", flexWrap: "wrap", padding: "14px 0",
      }}>
        <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: TOKEN.warmGray }}>
          Filter
        </span>
        {divider}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[["all","All"],["sale","For Sale"],["rent","For Rent"]].map(([v,l]) => (
            <button key={v} style={chipStyle(filter === v)} onClick={() => setFilter(v)}>{l}</button>
          ))}
        </div>
        {divider}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[["all","All Types"],["residential","Residential"],["commercial","Commercial"],["plot","Plot"]].map(([v,l]) => (
            <button key={v} style={chipStyle(propertyType === v)} onClick={() => setPropertyType(v)}>{l}</button>
          ))}
        </div>
        {divider}
        <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)} style={{
          appearance: "none", WebkitAppearance: "none",
          background: `${TOKEN.cream} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239C9189' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 12px center`,
          padding: "8px 36px 8px 14px", border: `1px solid ${TOKEN.stone}`,
          borderRadius: 100, fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, color: TOKEN.ink, cursor: "pointer", minWidth: 130,
        }}>
          <option value="all">All Areas</option>
          {areas.map((a) => <option key={a._id || a.name} value={a.name}>{a.name}</option>)}
        </select>
      </div>
    </div>
  );
}