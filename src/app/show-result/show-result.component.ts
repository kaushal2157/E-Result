import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import studentsData from '../studentsData.json';
interface Student {
  rollNo: string;
  name: string;
  group: string;
  timeTaken: number;
  marks: number;
  totalMarks: number;
  rank?: number; // Optional rank property
}
@Component({
  selector: 'app-show-result',
  imports: [CommonModule,FormsModule],
  templateUrl: './show-result.component.html',
  styleUrl: './show-result.component.css'
})
export class ShowResultComponent {
rollNumber = '';
  student: any = null;
  winners: any[] = [];
  loading = false;
  error = '';
  showResult = false;
students: Student[] = studentsData as Student[];
//   students = [
//     { rollNo: 'A101', name: 'Kaushal Patil', group: 'B', timeTaken: 12, marks: 46, rank: 1 },
    
//     {
//         "rollNo":"K-570",
//         "name":"Krishna Bhausaheb Patil",
//         "group":"A",
//         "timeTaken":10.35,
//         "marks":38,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1006",
//         "name":"Prathamesh Lalasingh Shinde",
//         "group":"A",
//         "timeTaken":15.0,
//         "marks":25,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-245",
//         "name":"Krishna Sunil Bane",
//         "group":"A",
//         "timeTaken":15.0,
//         "marks":31,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-785",
//         "name":"Tanushka Tushar Chaudhari",
//         "group":"A",
//         "timeTaken":10.53,
//         "marks":30,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-573",
//         "name":"Divya Prashant Patil",
//         "group":"A",
//         "timeTaken":15.0,
//         "marks":32,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-517",
//         "name":"Vaishnavi Amol Chaudhari",
//         "group":"A",
//         "timeTaken":9.54,
//         "marks":36,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-572",
//         "name":"Vidhi Prashant Patil",
//         "group":"A",
//         "timeTaken":12.34,
//         "marks":27,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-107",
//         "name":"Tejashri Sandip Chaudhari",
//         "group":"A",
//         "timeTaken":13.14,
//         "marks":34,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-758",
//         "name":"Ganesh Bhaidas Mhaske",
//         "group":"A",
//         "timeTaken":13.34,
//         "marks":33,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1071",
//         "name":"Maheshwari Ravindra Patil",
//         "group":"A",
//         "timeTaken":7.17,
//         "marks":33,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-305",
//         "name":"Lavnya Rahul Patil",
//         "group":"A",
//         "timeTaken":7.23,
//         "marks":19,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1038",
//         "name":"Naitik Atul Patil",
//         "group":"A",
//         "timeTaken":11.47,
//         "marks":31,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1035",
//         "name":"Aryan Vinod Patil",
//         "group":"A",
//         "timeTaken":9.0,
//         "marks":26,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1022",
//         "name":"Piyush Prakash Patil",
//         "group":"A",
//         "timeTaken":8.58,
//         "marks":47,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-365",
//         "name":"Vansh Balu Chaudhari",
//         "group":"A",
//         "timeTaken":7.59,
//         "marks":26,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1064",
//         "name":"Ketan Valmik Patil",
//         "group":"A",
//         "timeTaken":15.0,
//         "marks":30,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1012",
//         "name":"Yamini Sandip Mali",
//         "group":"A",
//         "timeTaken":7.23,
//         "marks":25,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1105",
//         "name":"Dimpal Prakash Chaudhari",
//         "group":"A",
//         "timeTaken":8.16,
//         "marks":33,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-964",
//         "name":"Ravinath Vinod Patil",
//         "group":"A",
//         "timeTaken":15.0,
//         "marks":24,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-569",
//         "name":"Harshal Chandrakant Patil",
//         "group":"A",
//         "timeTaken":15.0,
//         "marks":26,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-102",
//         "name":"Ilesh Bharat Patil",
//         "group":"A",
//         "timeTaken":14.7,
//         "marks":25,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1009",
//         "name":"Tejas Kishor Patil",
//         "group":"A",
//         "timeTaken":15.0,
//         "marks":32,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-634",
//         "name":"Mitansh Rajendra Khernar",
//         "group":"A",
//         "timeTaken":10.2,
//         "marks":38,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-754",
//         "name":"Samarth Vinod Patil",
//         "group":"A",
//         "timeTaken":11.06,
//         "marks":30,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-618",
//         "name":"Sonakshi Ajay Nikam",
//         "group":"A",
//         "timeTaken":10.36,
//         "marks":29,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-375",
//         "name":"Aaradhya Ravindra Sonar",
//         "group":"A",
//         "timeTaken":10.5,
//         "marks":36,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1072",
//         "name":"Harshali Dipak Patil",
//         "group":"A",
//         "timeTaken":13.8,
//         "marks":33,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1107",
//         "name":"Moksh Suresh Thakur",
//         "group":"A",
//         "timeTaken":5.6,
//         "marks":29,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-890",
//         "name":"Durgesh Manoj Chaudhari",
//         "group":"A",
//         "timeTaken":6.3,
//         "marks":60,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1093",
//         "name":"Mahi Ravindra Patil",
//         "group":"A",
//         "timeTaken":10.53,
//         "marks":35,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-1044",
//         "name":"Jay Dipak Patil",
//         "group":"A",
//         "timeTaken":11.51,
//         "marks":45,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-950",
//         "name":"Sana Akabar Tadavi",
//         "group":"A",
//         "timeTaken":12.44,
//         "marks":40,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"K-487",
//         "name":"Pratiksha Prakash Chaudhari",
//         "group":"A",
//         "timeTaken":8.9,
//         "marks":32,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-755",
//         "name":"Bhumika Mahendra Patil",
//         "group":"A",
//         "timeTaken":10.53,
//         "marks":22,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-487",
//         "name":"Kundan Prakash Patil",
//         "group":"A",
//         "timeTaken":14.15,
//         "marks":36,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-315",
//         "name":"Purvi Naval Patil",
//         "group":"A",
//         "timeTaken":6.4,
//         "marks":38,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-204",
//         "name":"Ishan Nandasing Patil",
//         "group":"A",
//         "timeTaken":7.58,
//         "marks":22,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-561",
//         "name":"Samarth Manoj Patil",
//         "group":"A",
//         "timeTaken":12.55,
//         "marks":35,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-231",
//         "name":"Rinku Ratilal Visan",
//         "group":"A",
//         "timeTaken":13.26,
//         "marks":33,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-484",
//         "name":"Prem Aanand Marathe",
//         "group":"A",
//         "timeTaken":10.2,
//         "marks":32,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-690",
//         "name":"Aditya Vasant Patil",
//         "group":"A",
//         "timeTaken":11.14,
//         "marks":32,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-864",
//         "name":"No Name",
//         "group":"A",
//         "timeTaken":11.58,
//         "marks":31,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-566",
//         "name":"Manoj Sahebrao Jogi",
//         "group":"A",
//         "timeTaken":11.5,
//         "marks":29,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-232",
//         "name":"Samarth Jayvant Patil",
//         "group":"A",
//         "timeTaken":11.4,
//         "marks":31,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-464",
//         "name":"Yadnesh Sandip Patil",
//         "group":"A",
//         "timeTaken":13.49,
//         "marks":48,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-674",
//         "name":"Piyush Dipak Patil",
//         "group":"A",
//         "timeTaken":9.2,
//         "marks":33,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-636",
//         "name":"Parikshit Ravi Bagul",
//         "group":"A",
//         "timeTaken":9.4,
//         "marks":35,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-185",
//         "name":"Apeksha Rohidas Patil",
//         "group":"A",
//         "timeTaken":12.5,
//         "marks":34,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-413",
//         "name":"Roshani Rajendra Jogi",
//         "group":"A",
//         "timeTaken":12.46,
//         "marks":32,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-85",
//         "name":"Pruthviraj Yogaraj Mahale",
//         "group":"A",
//         "timeTaken":15.0,
//         "marks":29,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-741",
//         "name":"Praful Sandip Patil",
//         "group":"A",
//         "timeTaken":5.5,
//         "marks":30,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-344",
//         "name":"Bhagyashri Ashok Patil",
//         "group":"A",
//         "timeTaken":11.27,
//         "marks":34,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-692",
//         "name":"Divya Dnyaneshwar Patil",
//         "group":"A",
//         "timeTaken":9.27,
//         "marks":34,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-780",
//         "name":"Dhiraj Jitendra Mahajan",
//         "group":"A",
//         "timeTaken":7.58,
//         "marks":34,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-689",
//         "name":"Ananya Laxman Telange",
//         "group":"A",
//         "timeTaken":8.09,
//         "marks":28,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-970",
//         "name":"No Name",
//         "group":"A",
//         "timeTaken":10.1,
//         "marks":36,
//         "totalMarks":60
//     },
//     {
//         "rollNo":"E-400",
//         "name":"Kartik Sanjay Kalal",
//         "group":"A",
//         "timeTaken":12.46,
//         "marks":37,
//         "totalMarks":60
//     }
//   ];
// students = new File(src/app/studentsData);
  ngOnInit(){
    this.assignRanks(this.students);    
  }

  fetchResult() {

    this.loading = true;
    this.error = '';
    this.showResult = false;

    // Simulate API call delay
    setTimeout(() => {
      this.student = this.students.find(
        s => s.rollNo === this.rollNumber.trim().toUpperCase()
      );

      if (this.student) {
        this.winners = this.students
          .filter(s => s.group === this.student.group)
          .sort((a, b) => b.marks - a.marks)
          .slice(0, 3);
        this.showResult = true;
        this.error = '';
      } else {
        this.winners = [];
        this.error = 'No result found for this roll number. Please check and try again.';
      }
      this.loading = false;
    }, 800);
  }

  getTotalMarks(group: string): number {
    if (group === 'A') return 50;
    if (group === 'B') return 80;
    return 100;
  }

  getPercentage(): number {
    if (!this.student) return 0;
    return (this.student.marks / this.getTotalMarks(this.student.group)) * 100;
  }

  getGrade(): { grade: string; color: string; bg: string } {
    const percentage = this.getPercentage();
    if (percentage >= 90) return { grade: 'A+', color: '#16a34a', bg: '#dcfce7' };
    if (percentage >= 80) return { grade: 'A', color: '#22c55e', bg: '#f0fdf4' };
    if (percentage >= 70) return { grade: 'B+', color: '#2563eb', bg: '#dbeafe' };
    if (percentage >= 60) return { grade: 'B', color: '#3b82f6', bg: '#eff6ff' };
    if (percentage >= 50) return { grade: 'C', color: '#ca8a04', bg: '#fef9c3' };
    return { grade: 'D', color: '#ea580c', bg: '#ffedd5' };
  }

  getMedal(index: number): string {
    return ['🥇', '🥈', '🥉'][index] || '';
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.fetchResult();
    }
  }
  assignRanks(students: any[]) {
  // Sort by marks descending, then timeTaken ascending
  students.sort((a, b) => {
    if (b.marks === a.marks) {
      return a.timeTaken - b.timeTaken; // less time = better
    }
    return b.marks - a.marks; // higher marks = better
  });

  // Assign rank
  students.forEach((student, index) => {
    student.rank = index + 1;
  });

  return students;
  
}

}
