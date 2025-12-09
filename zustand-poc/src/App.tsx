import "./App.css";
import { useAppStore } from "./store";

function CounterPanel() {
  const count = useAppStore((state) => state.count);
  const increment = useAppStore((state) => state.increment);
  const decrement = useAppStore((state) => state.decrement);
  const reset = useAppStore((state) => state.reset);

  return (
    <section className="card">
      <header className="card__header">
        <div>
          <p className="eyebrow">Global state</p>
          <h2>Counter</h2>
        </div>
        <span className="pill">value: {count}</span>
      </header>
      <div className="button-row">
        <button type="button" className="ghost" onClick={decrement}>
          -1
        </button>
        <button type="button" onClick={increment}>
          +1
        </button>
        <button type="button" className="ghost" onClick={reset}>
          clear
        </button>
      </div>
    </section>
  );
}

function NotePanel() {
  const note = useAppStore((state) => state.note);
  const updateNote = useAppStore((state) => state.updateNote);

  return (
    <section className="card">
      <header className="card__header">
        <div>
          <p className="eyebrow">Global message</p>
        </div>
      </header>
      <textarea
        className="input"
        value={note}
        onChange={(event) => updateNote(event.target.value)}
        placeholder="Type..."
      />
    </section>
  );
}

function PreviewPanel() {
  const { count, note } = useAppStore((state) => ({
    count: state.count,
    note: state.note,
  }));

  return (
    <section className="card highlight">
      <header className="card__header">
        <div>
          <p className="eyebrow">Preview</p>
        </div>
      </header>
      <p className="preview__note">message: {note}</p>
      <p className="preview__count">counter: {count}</p>
      <code className="preview__code">
        {JSON.stringify({ count, note }, null, 2)}
      </code>
    </section>
  );
}

function App() {
  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Zustand Store</p>
      </header>
      <div className="grid">
        <CounterPanel />
        <NotePanel />
        <PreviewPanel />
      </div>
    </main>
  );
}

export default App;
