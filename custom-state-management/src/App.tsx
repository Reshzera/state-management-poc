import './App.css'
import { appActions, useAppStore } from './store'

function CounterPanel() {
  const count = useAppStore((state) => state.count)

  return (
    <section className="card">
      <header className="card__header">
        <div>
          <p className="eyebrow">Estado global</p>
          <h2>Contador</h2>
        </div>
        <span className="pill">Valor: {count}</span>
      </header>
      <p className="card__text">
        Este contador mora em um store simples. Qualquer componente pode ler ou atualizar sem prop drilling.
      </p>
      <div className="button-row">
        <button type="button" className="ghost" onClick={appActions.decrement}>
          -1
        </button>
        <button type="button" onClick={appActions.increment}>
          +1
        </button>
        <button type="button" className="ghost" onClick={appActions.reset}>
          Zerar
        </button>
      </div>
    </section>
  )
}

function NotePanel() {
  const note = useAppStore((state) => state.note)

  return (
    <section className="card">
      <header className="card__header">
        <div>
          <p className="eyebrow">Mensagem global</p>
          <h2>Bloco de notas</h2>
        </div>
      </header>
      <p className="card__text">
        Digite algo aqui e veja o preview atualizar em outro componente, usando o mesmo estado compartilhado.
      </p>
      <textarea
        className="input"
        value={note}
        onChange={(event) => appActions.updateNote(event.target.value)}
        placeholder="Fale algo legal..."
      />
    </section>
  )
}

function PreviewPanel() {
  const state = useAppStore((s) => s)

  return (
    <section className="card highlight">
      <header className="card__header">
        <div>
          <p className="eyebrow">Preview vivo</p>
          <h2>Assinando o store</h2>
        </div>
      </header>
      <p className="preview__note">Nota: {state.note}</p>
      <p className="preview__count">Cliques totais: {state.count}</p>
      <code className="preview__code">
        {JSON.stringify(state, null, 2)}
      </code>
    </section>
  )
}

function App() {
  return (
    <main className="page">
      <header className="hero">
        <p className="eyebrow">Custom State</p>
        <h1>Um mini gerenciador global sem React Context</h1>
        <p className="lead">
          Um store bem simples com subscribe, setState e um hook para consumir. Sem providers nem prop drilling.
        </p>
      </header>
      <div className="grid">
        <CounterPanel />
        <NotePanel />
        <PreviewPanel />
      </div>
    </main>
  )
}

export default App
