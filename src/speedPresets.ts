/**
 * Research-based EMDR speed presets (Hz = full left–right–left cycles per second).
 * Processing: fast BLS for reprocessing; Standard: clinical 1 Hz; Resource: slow for RDI/calm.
 */
export type PresetId = 'processing' | 'standard' | 'resource'

export interface SpeedPreset {
  id: PresetId
  label: string
  hz: number
  description: string
}

export const SPEED_PRESETS: Record<PresetId, SpeedPreset> = {
  processing: {
    id: 'processing',
    label: 'Processing (fast)',
    hz: 1.2,
    description: 'For processing difficult memories. Fast bilateral stimulation.',
  },
  standard: {
    id: 'standard',
    label: 'Standard',
    hz: 1,
    description: 'Standard clinical EMDR frequency (~1 Hz).',
  },
  resource: {
    id: 'resource',
    label: 'Resource / Calm',
    hz: 0.3,
    description: 'Slower, for resource installation and calming.',
  },
}

export const MIN_HZ = 0.1
export const MAX_HZ = 2

export function clampHz(hz: number): number {
  return Math.max(MIN_HZ, Math.min(MAX_HZ, hz))
}
