/** Editorial specification only: no scheduling or request automation is implemented. */
export const PLANNED_FOLLOW_UP = {
  reminderAfterHours: 24,
  closeAfterHours: 48,
  closeAtSlotStartIfEarlier: true,
} as const;
