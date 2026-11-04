import { Injectable } from '@angular/core';
import { Observable, map, of, shareReplay } from 'rxjs';
import { RESULT_CONFIG } from '../config/result.config';
import { Grade, Student, StudentRecord, StudentResult } from '../models/student.model';
import rawStudents from '../studentsData.json';

/**
 * Single place that loads results and computes ranks.
 * To move the data to an API or Firestore later, change `loadRecords()`; nothing else needs to change.
 */
@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly students$: Observable<Student[]> = this.loadRecords().pipe(
    map(records => this.rank(this.clean(records))),
    shareReplay(1),
  );

  /** Finds a student by roll number (case-insensitive). Returns null if none matches. */
  findResult(rollNo: string): Observable<StudentResult | null> {
    const key = normalizeRollNo(rollNo);
    return this.students$.pipe(
      map(students => {
        const student = students.find(s => s.rollNo === key);
        if (!student) return null;
        const scope = scopeKey(student);
        const topPerformers = students
          .filter(s => scopeKey(s) === scope)
          .sort((a, b) => a.rank - b.rank)
          .slice(0, RESULT_CONFIG.topPerformersCount);
        return { student, topPerformers };
      }),
    );
  }

  getPercentage(student: StudentRecord): number {
    return student.totalMarks > 0 ? (student.marks / student.totalMarks) * 100 : 0;
  }

  getGrade(student: StudentRecord): Grade {
    const pct = this.getPercentage(student);
    const bands = RESULT_CONFIG.grades;
    return bands.find(g => pct >= g.min) ?? bands[bands.length - 1];
  }

  // --- data loading ---------------------------------------------------------

  private loadRecords(): Observable<unknown[]> {
    // Swap this for `this.http.get<unknown[]>('/api/results')` (or Firestore) later.
    return of(rawStudents as unknown[]);
  }

  /** Normalizes rows and drops invalid ones (header rows, missing marks) so bad data never reaches the UI. */
  private clean(rows: unknown[]): StudentRecord[] {
    const seen = new Set<string>();
    const records: StudentRecord[] = [];

    for (const row of rows as Record<string, unknown>[]) {
      const record: StudentRecord = {
        rollNo: normalizeRollNo(String(row['rollNo'] ?? '')),
        name: String(row['name'] ?? '').trim(),
        group: String(row['group'] ?? '').trim().toUpperCase(),
        department: String(row['department'] ?? '').trim(),
        city: String(row['city'] ?? '').trim(),
        timeTaken: Number(row['timeTaken']),
        marks: Number(row['marks']),
        totalMarks: Number(row['totalMarks']),
      };

      const valid =
        record.rollNo &&
        Number.isFinite(record.marks) &&
        Number.isFinite(record.timeTaken) &&
        Number.isFinite(record.totalMarks) &&
        record.totalMarks > 0;
      if (!valid) {
        console.warn('[StudentService] Skipping invalid row:', row);
        continue;
      }
      if (seen.has(record.rollNo)) {
        console.warn(`[StudentService] Duplicate roll number ${record.rollNo}; only the first entry is used.`);
        continue;
      }
      seen.add(record.rollNo);
      records.push(record);
    }
    return records;
  }

  /** Ranks students within their scope: higher marks first, then less time taken. */
  private rank(records: StudentRecord[]): Student[] {
    const byScope = new Map<string, StudentRecord[]>();
    for (const r of records) {
      const key = scopeKey(r);
      byScope.set(key, [...(byScope.get(key) ?? []), r]);
    }

    const ranked: Student[] = [];
    for (const group of byScope.values()) {
      group
        .sort((a, b) => b.marks - a.marks || a.timeTaken - b.timeTaken)
        .forEach((s, i) => ranked.push({ ...s, rank: i + 1 }));
    }
    return ranked;
  }
}

function normalizeRollNo(rollNo: string): string {
  return rollNo.trim().toUpperCase();
}

function scopeKey(s: StudentRecord): string {
  return RESULT_CONFIG.rankScope.map(field => String(s[field]).toLowerCase()).join('|');
}
