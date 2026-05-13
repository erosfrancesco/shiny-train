export default function SanityLawsPage() {
  return (
    <div className="space-y-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-brand-600">Leggi di sanità</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Leggi di sanità CareLink</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Principi semplici per garantire connessioni sicure, rispettose e focalizzate sulla fiducia tra clienti e professionisti della cura.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <article className="rounded-[28px] border border-slate-200 bg-blueglass p-6">
          <h2 className="text-xl font-semibold text-slate-900">Rispetta i confini</h2>
          <p className="mt-3 text-slate-600">Ogni richiesta di prenotazione dovrebbe essere gestita con compassione e rispetto per il consenso e il comfort di ogni persona.</p>
        </article>
        <article className="rounded-[28px] border border-slate-200 bg-blueglass p-6">
          <h2 className="text-xl font-semibold text-slate-900">Rimani trasparente</h2>
          <p className="mt-3 text-slate-600">Mantieni chiara la comunicazione sui servizi offerti, la disponibilità e le aspettative prima di ogni appuntamento.</p>
        </article>
        <article className="rounded-[28px] border border-slate-200 bg-blueglass p-6">
          <h2 className="text-xl font-semibold text-slate-900">Proteggi la privacy</h2>
          <p className="mt-3 text-slate-600">Le informazioni del cliente e del fornitore devono rimanere confidenziali, senza condividere dati al di fuori del contesto CareLink.</p>
        </article>
        <article className="rounded-[28px] border border-slate-200 bg-blueglass p-6">
          <h2 className="text-xl font-semibold text-slate-900">Nessun servizio non supportato</h2>
          <p className="mt-3 text-slate-600">Prenota solo servizi che sono elencati e verificati sulla piattaforma; evita richieste per lavoro medico, assicurativo o di prescrizione.</p>
        </article>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Perché è importante</h2>
        <p className="mt-3 leading-7 text-slate-600">
          Queste leggi aiutano a mantenere CareLink radicato nella fiducia e nella sicurezza, rendendo semplice per i clienti trovare cure e per i professionisti offrire servizi con fiducia.
        </p>
      </div>
    </div>
  );
}
