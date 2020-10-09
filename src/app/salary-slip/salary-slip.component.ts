import {
  AngularFireDatabase
} from '@angular/fire/database';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  jsPDF
} from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-salary-slip',
  templateUrl: './salary-slip.component.html',
  styleUrls: ['./salary-slip.component.css']
})
export class SalarySlipComponent implements OnInit {
  download() {
    var element = document.getElementById('content');
    html2canvas(element).then((canvas) => {
      console.log(canvas);
      var imgData = canvas.toDataURL('image/png');
      var doc = new jsPDF();
      doc.addImage(imgData, 0, 0, 208, 298);
      doc.save("Salary-Slip.pdf");
    })
  }
  EmployeeDetails: any = [];
  BankDetails: any = [];
  Payroll: any = [];
  employees: any = [];
  constructor(db: AngularFireDatabase) {
    db.object('/EmployeeDetails').valueChanges().subscribe(EmployeeDetails => {
      this.EmployeeDetails = EmployeeDetails;
      console.log(this.EmployeeDetails);
    })
    db.object('/BankDetails').valueChanges().subscribe(BankDetails => {
      this.BankDetails = BankDetails;
      console.log(this.BankDetails);
    })
    db.object('/Payroll').valueChanges().subscribe(Payroll => {
      this.Payroll = Payroll;
      console.log(this.Payroll);
    })
    db.list('/employees').valueChanges().subscribe(employees => {
      this.employees = employees;
      console.log(this.employees);
    })
  }
  ngOnInit(): void {}
}