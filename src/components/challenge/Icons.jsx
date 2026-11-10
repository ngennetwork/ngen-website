const paths = {
  who: "M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 19v-1a3.5 3.5 0 0 0-2.5-3.3",
  calendar: "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  laptop: "M4 6h16v9H4zM2 18h20M9 15h6",
  fee: "M4 7h16v10H4zM4 11h16M8 15h3",
  mentor: "M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5 19a7 7 0 0 1 14 0",
  build: "M4 16l4-1 9-9a2 2 0 0 1 3 3l-9 9-1 4-6-6z",
  workshop: "M5 18V8l7-4 7 4v10M9 18v-5h6v5",
  school: "M3 10l9-5 9 5-9 5-9-5zM7 12v5c2 1.5 8 1.5 10 0v-5",
  shield: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z",
};

export default function Icon({ name, className = "size-6 text-[#1c3a2a]" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] || paths.who} />
    </svg>
  );
}
