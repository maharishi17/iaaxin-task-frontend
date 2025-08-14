export default function CategoryFilter({ value, selected, onChange, onSelect }) {
  const cats = ["all", "general", "work", "personal", "shopping"];

  // Support either prop style:
  const currentValue = (value ?? selected ?? "all").toLowerCase();
  const handleChange = onChange ?? onSelect;

  return (
    <select
      value={currentValue}
      onChange={(e) => handleChange && handleChange(e.target.value)}
    >
      {cats.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}
