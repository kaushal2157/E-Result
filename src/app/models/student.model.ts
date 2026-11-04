/** One row of the results data file (studentsData.json). */
export interface StudentRecord {
  rollNo: string;
  name: string;
  group: string;
  department: string;
  city: string;
  timeTaken: number;
  marks: number;
  totalMarks: number;
}

/** A student after loading: cleaned up, with a rank inside their comparison scope. */
export interface Student extends StudentRecord {
  rank: number;
}

/** What a roll-number search returns. */
export interface StudentResult {
  student: Student;
  topPerformers: Student[];
}

export interface Grade {
  grade: string;
  color: string;
  bg: string;
}
