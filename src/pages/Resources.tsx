import React from 'react'

const laws = [
  {
    id: 'l833',
    title: 'Legge 23 dicembre 1978, n. 833',
    summary: 'Istituzione del Servizio Sanitario Nazionale (SSN): definisce l’organizzazione e i principi generali del sistema sanitario pubblico in Italia.'
  },
  {
    id: 'd502',
    title: 'Decreto Legislativo 30 dicembre 1992, n. 502',
    summary: 'Riforma dell’organizzazione sanitaria: introduce modifiche al funzionamento e al finanziamento del servizio sanitario.'
  },
  {
    id: 'd229',
    title: 'Decreto Legislativo 19 giugno 1999, n. 229',
    summary: 'Ulteriori disposizioni sui servizi sanitari e sull’autonomia organizzativa delle aziende sanitarie locali.'
  },
  {
    id: 'psr-lazio',
    title: 'Piano Sanitario Regionale - Regione Lazio',
    summary: 'Documento programmatico regionale che definisce le priorità, i servizi e le reti sanitarie operative nella Regione Lazio e nella città di Roma.'
  },
  {
    id: 'local',
    title: 'Delibere e regolamenti locali (ASL Roma)',
    summary: 'Norme e provvedimenti emessi dalle Aziende Sanitarie Locali e dal Comune di Roma relativi a servizi territoriali, assistenza e piani vaccinali locali.'
  }
]

export default function Resources() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Documentazione: leggi e riferimenti sanitari (area Roma)</h1>

      <p className="mb-6 text-slate-700">Qui trovi una panoramica delle principali leggi e documenti utili per comprendere l’organizzazione sanitaria nazionale e regionale che influenzano i servizi nella città di Roma. Per dettagli e testi ufficiali consulta i siti istituzionali (Normattiva, Ministero della Salute, Regione Lazio, ASL Roma).</p>

      <div className="space-y-4">
        {laws.map((law) => (
          <article key={law.id} className="bg-white p-4 rounded shadow-sm">
            <h2 className="font-medium text-lg">{law.title}</h2>
            <p className="text-sm text-slate-600 mt-1">{law.summary}</p>
          </article>
        ))}
      </div>

      <section className="mt-8 bg-white p-4 rounded shadow-sm">
        <h3 className="font-semibold mb-2">Risorse utili</h3>
        <ul className="list-disc pl-5 text-sm text-slate-700">
          <li>Normattiva — ricerca testi delle leggi nazionali.</li>
          <li>Ministero della Salute — linee guida e direttive nazionali.</li>
          <li>Regione Lazio — Piano Sanitario Regionale e informazioni locali.</li>
          <li>ASL Roma — delibere e servizi territoriali.</li>
        </ul>
      </section>
    </div>
  )
}
