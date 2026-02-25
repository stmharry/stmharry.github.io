function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-6 py-16 sm:px-10">
      <p className="text-xs tracking-[0.24em] text-(--ink-700) uppercase">
        Personal site scaffold
      </p>
      <h1 className="mt-4 text-4xl leading-tight font-medium sm:text-6xl" style={{ fontFamily: "var(--font-serif)" }}>
        Tzu-Ming Harry Hsu
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-(--ink-700) sm:text-lg">
        This project is now configured with Vite, React, TypeScript, Bun, and Tailwind CSS. Next, we will replace
        this placeholder with the minimal one-page personal website content.
      </p>
      <div className="mt-10 border-t border-(--line) pt-4 text-sm text-(--ink-700)">
        <span className="font-medium">Stack:</span> React + TypeScript + Tailwind CSS + Bun
      </div>
    </main>
  );
}

export default App;
