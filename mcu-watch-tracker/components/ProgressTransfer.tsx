"use client";

import { Download, Upload } from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";

type ProgressTransferProps = {
  onExport: () => string;
  onImport: (value: unknown) => boolean;
};

const MAX_FILE_SIZE = 1024 * 1024;

export default function ProgressTransfer({ onExport, onImport }: ProgressTransferProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  const handleExport = () => {
    const blob = new Blob([onExport()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mcu-watch-progress.json";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("קובץ ההתקדמות הורד");
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setStatus("הקובץ גדול מדי");
      return;
    }

    try {
      const parsed: unknown = JSON.parse(await file.text());
      setStatus(onImport(parsed) ? "ההתקדמות יובאה בהצלחה" : "קובץ ההתקדמות אינו תקין");
    } catch {
      setStatus("לא ניתן לקרוא את קובץ ההתקדמות");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleExport}
        aria-label="ייצוא ההתקדמות לקובץ"
        className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--text)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label="ייבוא התקדמות מקובץ"
        className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border)] text-[var(--text)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
      >
        <Upload className="h-4 w-4" aria-hidden="true" />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        onChange={handleImport}
        className="sr-only"
        tabIndex={-1}
      />
      <p className="sr-only" role="status">
        {status}
      </p>
    </div>
  );
}
