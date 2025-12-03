import "./App.css";
import { appActions, useAppStore } from "./store";

function CounterPanel() {
  const count = useAppStore((state) => state.count);

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
        <button type="button" className="ghost" onClick={appActions.decrement}>
          -1
        </button>
        <button type="button" onClick={appActions.increment}>
          +1
        </button>
        <button type="button" className="ghost" onClick={appActions.reset}>
          clear
        </button>
      </div>
    </section>
  );
}

function NotePanel() {
  const note = useAppStore((state) => state.note);

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
        onChange={(event) => appActions.updateNote(event.target.value)}
        placeholder="Type..."
      />
    </section>
  );
}

function PreviewPanel() {
  const state = useAppStore((s) => s);

  return (
    <section className="card highlight">
      <header className="card__header">
        <div>
          <p className="eyebrow">Preview</p>
        </div>
      </header>
      <p className="preview__note">message: {state.note}</p>
      <p className="preview__count">counter: {state.count}</p>
      <code className="preview__code">{JSON.stringify(state, null, 2)}</code>
    </section>
  );
}

function App() {
  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Custom State</p>
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
