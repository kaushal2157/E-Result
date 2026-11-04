import { StudentRecord } from '../models/student.model';

/**
 * Settings for the results page. Change values here, not in the components.
 */
export const RESULT_CONFIG = {
  /**
   * Fields that decide which students compete against each other for rank and Top 3.
   * Students compete only with others who share ALL of these values.
   * Example: ['group'] ranks by group only; ['group', 'department', 'city'] gives
   * each group, department and city its own ranking.
   */
  rankScope: ['group', 'department', 'city'] as const satisfies readonly (keyof StudentRecord)[],

  /** How many students to show in the Top performers list. */
  topPerformersCount: 3,

  /** Time limit in minutes, shown as "x / limit min". */
  timeLimitMinutes: 15,

  /** Grade bands by percentage, highest first. The first band whose `min` is met is used. */
  grades: [
    { min: 90, grade: 'A+', color: '#16a34a', bg: '#dcfce7' },
    { min: 80, grade: 'A', color: '#22c55e', bg: '#f0fdf4' },
    { min: 70, grade: 'B+', color: '#2563eb', bg: '#dbeafe' },
    { min: 60, grade: 'B', color: '#3b82f6', bg: '#eff6ff' },
    { min: 50, grade: 'C', color: '#ca8a04', bg: '#fef9c3' },
    { min: 0, grade: 'D', color: '#ea580c', bg: '#ffedd5' },
  ],
};
