import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RESULT_CONFIG } from '../config/result.config';
import { Grade, Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-show-result',
  imports: [CommonModule, FormsModule],
  templateUrl: './show-result.component.html',
  styleUrl: './show-result.component.css'
})
export class ShowResultComponent {
  private readonly studentService = inject(StudentService);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('resultSection') private resultSection?: ElementRef<HTMLElement>;

  readonly timeLimit = RESULT_CONFIG.timeLimitMinutes;
  readonly topCount = RESULT_CONFIG.topPerformersCount;

  rollNumber = '';
  student: Student | null = null;
  winners: Student[] = [];
  grade: Grade | null = null;
  percentage = 0;
  loading = false;
  error = '';

  fetchResult(): void {
    if (!this.rollNumber.trim() || this.loading) return;

    this.loading = true;
    this.error = '';

    this.studentService
      .findResult(this.rollNumber)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: result => {
          this.student = result?.student ?? null;
          this.winners = result?.topPerformers ?? [];
          this.grade = this.student ? this.studentService.getGrade(this.student) : null;
          this.percentage = this.student ? this.studentService.getPercentage(this.student) : 0;
          if (!result) {
            this.error = 'No result found for this roll number. Please check and try again.';
          }
          this.loading = false;
          if (result) {
            // On phones the result is below the fold; bring it into view once rendered.
            setTimeout(() => this.resultSection?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }));
          }
        },
        error: () => {
          this.error = 'Could not load results. Please try again later.';
          this.loading = false;
        },
      });
  }

  getMedal(index: number): string {
    return ['🥇', '🥈', '🥉'][index] ?? `#${index + 1}`;
  }

  /** Builds a label like "Group A • Science • Jalgaon", leaving out blank fields. */
  scopeLabel(s: Student): string {
    return [`Group ${s.group}`, s.department, s.city].filter(Boolean).join(' • ');
  }

}
