import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { StudentService } from './student.service';

const rows = [
  { rollNo: 'rollNo', name: 'name', group: 'Group C', timeTaken: 'timeTaken', marks: 'marks', totalMarks: 'totalMarks' },
  { rollNo: 'k-1', name: 'A', group: 'A', department: 'Sci', city: 'Pune', timeTaken: 10, marks: 50, totalMarks: 60 },
  { rollNo: 'K-2', name: 'B', group: 'A', department: 'Sci', city: 'Pune', timeTaken: 8, marks: 50, totalMarks: 60 },
  { rollNo: 'K-3', name: 'C', group: 'A', department: 'Sci', city: 'Nashik', timeTaken: 9, marks: 55, totalMarks: 60 },
  { rollNo: 'K-2', name: 'Dup', group: 'A', department: 'Sci', city: 'Pune', timeTaken: 1, marks: 60, totalMarks: 60 },
];

describe('StudentService', () => {
  let service: StudentService;

  beforeEach(() => {
    spyOn(StudentService.prototype as any, 'loadRecords').and.returnValue(of(rows));
    spyOn(console, 'warn');
    service = TestBed.inject(StudentService);
  });

  it('finds roll numbers case-insensitively and skips header rows', async () => {
    expect(await firstValueFrom(service.findResult(' K-1 '))).not.toBeNull();
    expect(await firstValueFrom(service.findResult('rollNo'))).toBeNull();
  });

  it('ranks within group + department + city, breaking ties by time', async () => {
    const res = await firstValueFrom(service.findResult('K-1'));
    expect(res!.student.rank).toBe(2);
    expect(res!.topPerformers.map(s => s.rollNo)).toEqual(['K-2', 'K-1']); // K-3 is in another city
  });

  it('keeps the first entry when a roll number is duplicated', async () => {
    const res = await firstValueFrom(service.findResult('K-2'));
    expect(res!.student.name).toBe('B');
  });

  it('computes percentage from the student totalMarks', async () => {
    const res = await firstValueFrom(service.findResult('K-3'));
    expect(service.getPercentage(res!.student)).toBeCloseTo(91.67, 1);
    expect(service.getGrade(res!.student).grade).toBe('A+');
  });
});
