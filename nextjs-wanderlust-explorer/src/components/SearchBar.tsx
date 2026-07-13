'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input 
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-slate-300 bg-white p-3 rounded-lg w-full"
      placeholder="Buscar por título..."
    />
  );
}