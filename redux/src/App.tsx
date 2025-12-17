import "./App.css";
import {
  decrement,
  increment,
  reset,
  updateNote,
  useAppDispatch,
  useAppSelector,
} from "./store";

function CounterPanel() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.app.count);

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
        <button
          type="button"
          className="ghost"
          onClick={() => dispatch(decrement())}
        >
          -1
        </button>
        <button type="button" onClick={() => dispatch(increment())}>
          +1
        </button>
        <button
          type="button"
          className="ghost"
          onClick={() => dispatch(reset())}
        >
          clear
        </button>
      </div>
    </section>
  );
}

function NotePanel() {
  const dispatch = useAppDispatch();
  const note = useAppSelector((state) => state.app.note);

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
        onChange={(event) => dispatch(updateNote(event.target.value))}
        placeholder="Type..."
      />
    </section>
  );
}

function PreviewPanel() {
  const state = useAppSelector((s) => s.app);

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
        <p className="eyebrow">Redux</p>
        <h1>Global state with Redux Toolkit</h1>
        <p className="lead">
          Counter and note are stored in a single slice so every panel reads the
          same state.
        </p>
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
