"use client";

import { Search, X } from "lucide-react";
import type { ChangeEvent } from "react";

type SearchInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative w-full sm:w-72">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-[var(--muted)]"
        aria-hidden="true"
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        className="h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] ps-9 pe-9 text-sm text-[var(--text)] transition-colors placeholder:text-[var(--muted)] hover:border-[var(--border-strong)] focus:border-[var(--accent)]/60 focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="ניקוי החיפוש"
          className="absolute inset-y-0 end-2 my-auto grid h-6 w-6 place-items-center rounded text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
