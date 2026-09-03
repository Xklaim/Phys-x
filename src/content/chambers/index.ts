import { act1Chambers } from './act1';
import { act2Chambers } from './act2';
import { act3Chambers } from './act3';
import { act4Chambers } from './act4';
import { act5Chambers } from './act5';
import type { Chamber } from '../../types/chamber';

/**
 * All chambers in play order.
 * To add new chambers: import them here and spread into allChambers.
 * No engine changes required.
 */
export const allChambers: Chamber[] = [
  ...act1Chambers,
  ...act2Chambers,
  ...act3Chambers,
  ...act4Chambers,
  ...act5Chambers,
];

export { act1Chambers, act2Chambers, act3Chambers, act4Chambers, act5Chambers };

/**
 * Lookup map for O(1) chamber access by id.
 */
export const chamberById: Record<string, Chamber> = Object.fromEntries(
  allChambers.map(c => [c.id, c])
);

/**
 * Chambers grouped by actId.
 */
export const chambersByAct: Record<string, Chamber[]> = allChambers.reduce(
  (acc, c) => {
    if (!acc[c.actId]) acc[c.actId] = [];
    acc[c.actId].push(c);
    return acc;
  },
  {} as Record<string, Chamber[]>
);
