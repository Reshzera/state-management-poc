import "./App.css";
import {
  appAtom,
  countAtom,
  decrementAtom,
  incrementAtom,
  noteAtom,
  resetCountAtom,
  updateNoteAtom,
} from "./store";
import { useAtomValue, useSetAtom } from "jotai";

function CounterPanel() {
  const count = useAtomValue(countAtom);
  const increment = useSetAtom(incrementAtom);
  const decrement = useSetAtom(decrementAtom);
  const reset = useSetAtom(resetCountAtom);

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
  const note = useAtomValue(noteAtom);
  const updateNote = useSetAtom(updateNoteAtom);

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
  const state = useAtomValue(appAtom);

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
        <p className="eyebrow">Jotai State</p>
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
