import { QualitySnapshot } from '../types/quality';

import { qualitySnapshotSchema } from '../types/quality-validation';

import snapshotData from '../../../quality-engine/aggregation/sample-snapshot.json';

const snapshot: QualitySnapshot = qualitySnapshotSchema.parse(snapshotData);

function getStatusLabel(status: QualitySnapshot['overallStatus']): string {
  return status.toUpperCase();
}

export default function Home(): React.ReactElement {
  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            AI-Powered Quality Engineering Platform
          </p>

          <h1 className="mt-2 text-3xl font-bold">Quality Dashboard</h1>

          <p className="mt-2 text-slate-600">Quality overview for {snapshot.application}</p>
        </header>

        <section className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Overall Quality Score</p>

            <p className="mt-2 text-5xl font-bold">
              {snapshot.overallScore}
              <span className="text-2xl text-slate-400">/100</span>
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Overall Status</p>

            <p className="mt-3 text-3xl font-bold">{getStatusLabel(snapshot.overallStatus)}</p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Quality Areas</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {snapshot.metrics.map((metric) => (
              <div key={metric.area} className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold capitalize">{metric.area}</h3>

                  <span className="text-sm font-medium uppercase">{metric.status}</span>
                </div>

                <p className="mt-2 text-sm text-slate-500">{metric.tool}</p>

                <p className="mt-3 text-sm">{metric.summary}</p>

                <p className="mt-4 text-2xl font-bold">{metric.score ?? 0}/100</p>
              </div>
            ))}
          </div>
        </section>

        {snapshot.intelligence && (
          <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">AI Quality Intelligence</h2>

            <p className="mt-4 text-slate-700">{snapshot.intelligence.summary}</p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-semibold">Key Risks</h3>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                  {snapshot.intelligence.keyRisks.map((risk) => (
                    <li key={risk}>{risk}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Recommended Actions</h3>

                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
                  {snapshot.intelligence.recommendedActions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              AI confidence: {snapshot.intelligence.confidence}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
