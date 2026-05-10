'use client';

interface Props {
  value: string;
  onChange: (next: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative px-4 mt-8">
      <div className="mx-auto max-w-3xl">
        <div className="relative group">
          {/* Animated gradient ring on focus-within */}
          <div className="absolute -inset-px rounded-2xl
                          bg-gradient-to-r from-kyvo-cyan via-kyvo-violet to-kyvo-magenta
                          opacity-0 group-focus-within:opacity-100
                          transition-opacity duration-300 blur-sm" />

          <div className="relative flex items-center
                          bg-kyvo-surface/80 backdrop-blur-md
                          border border-kyvo-border
                          rounded-2xl
                          group-focus-within:border-transparent">
            <div className="pl-5 pr-3 text-kyvo-muted">
              <SearchIcon className="w-5 h-5" />
            </div>
            <input
              type="search"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search brands or products..."
              className="flex-1 bg-transparent py-4 pr-5 text-base
                         text-white placeholder-kyvo-muted
                         focus:outline-none"
            />
            {value && (
              <button
                onClick={() => onChange('')}
                aria-label="Clear search"
                className="mr-3 p-1.5 rounded-full
                           hover:bg-kyvo-elevated text-kyvo-muted hover:text-white
                           transition-colors"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         className={className} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
