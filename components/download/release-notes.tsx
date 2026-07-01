import { Streamdown } from 'streamdown';

// =============================================================================
// ReleaseNotes — Server-compatible component
// Renders release notes markdown in a styled glass card.
// =============================================================================

interface ReleaseNotesProps {
    notes: string | null;
}

export function ReleaseNotes({ notes }: ReleaseNotesProps) {
    if (!notes || notes.trim().length === 0) {
        return (
            <div className="bg-card border rounded-2xl p-6 md:p-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">Notas de la versión</h2>
                <p className="text-sm text-foreground-subtle italic">No hay notas de la versión disponibles.</p>
            </div>
        );
    }

    return (
        <div className="bg-card border rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-foreground mb-6">Notas de la versión</h2>
            <div>
                <Streamdown>{notes}</Streamdown>
            </div>
        </div>
    );
}
