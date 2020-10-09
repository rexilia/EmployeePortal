import { element } from 'protractor';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
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
      doc.addImage(imgData,0,0,208,500);
      doc.save("Salary-Slip.pdf");
    })
  }
  //constructor(public PayrollService: PayrollService) { }
//   @ViewChild('content') content: ElementRef;
//   public downloadPdf(){
// let doc = new jspdf();
// let specialElementHandlers = {
//   '#editor': function(element, renderer) {
//     return true;
//   }
// };
// let content = this.content.nativeElement;
// doc.fromHTML(content.innerHTML, 10, 10, {
// 'width':190,
// 'elementHandlers': specialElementHandlers
// });
// doc.save('Salary-Slip.pdf');
//   }
  EmployeeDetails:any = [];
  BankDetails:any = [];
  Payroll:any = [];
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
  }
  ngOnInit():void { }
  //   this.PayrollService.getData().subscribe(
  //     list => {
  //       this.EmployeeDetails = list.map(item => {
  //         return {
  //           ...item.payload.val()
  //         };
  //       });console.log(this.EmployeeDetails);
  //     });
  // }
}