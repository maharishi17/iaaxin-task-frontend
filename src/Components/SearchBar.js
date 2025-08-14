export default function SearchBar({ value, onChange }) {
  return (
    <input
    
      placeholder="Search todos…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search todos"
    />
  );
}
