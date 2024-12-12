import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../Service/api-service.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-pdf-objective',
  templateUrl: './pdf-objective.component.html',
  styleUrls: ['./pdf-objective.component.css']
})
export class PdfObjectiveComponent implements OnInit {
   data : any ;
  constructor(private apiService : ApiServiceService) { }

  ngOnInit(): void {
    this.fetchData();
  }
  
  fetchData() {
    this.apiService.getDummyData().subscribe({
      next : (res)=> {
        this.data = res;
        console.log(this.data);
      },
      error : (err) => {
        console.error("Some Issue Encountered",err);
      }
    })
}
downloadAsPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Construct the table body dynamically
  const tableBody: any[] = [];

  // Populate rows dynamically based on the fetched data
  tableBody.push([
    { content: 'Name', rowSpan: 2 },
    { content: `Company Code: ${this.data?.name?.companyCode || ''}`, styles: { halign: 'left'} },
    { content: `Survey Number: ${this.data?.name?.surveyNumber || ''}`, styles: { halign: 'left' } },
     { content: '' }, // Leave blank if no value
  ]);
  tableBody.push([
    { content: `Title: ${this.data?.name?.title || ''}`, styles: { halign: 'left' } },
    { content: `Farmer Name: ${this.data?.name?.farmerName || ''}`, styles: { halign: 'left' } },
  ]);
  tableBody.push([
    { content: 'Tax', rowSpan: 2 },
    { content: `PAN Number: ${this.data?.tax?.panNumber || ''}`, styles: { halign: 'left' } },
    { content: `PAN Registration Date: ${this.data?.tax?.panRegistrationDate || ''}`, styles: { halign: 'left' } },
  ]);
  tableBody.push([
    { content: `Aadhar Number: ${this.data?.tax?.aadharNumber || ''}`, styles: { halign: 'left' } },
    { content: `PAN Attachment: ${this.data?.tax?.panAttachment || ''}`, styles: { halign: 'left' } },
    { content: `Aadhar Attachment: ${this.data?.tax?.aadharAttachment || ''}`, styles: { halign: 'left' } },
  ]);
  tableBody.push([
    { content: 'Address', rowSpan: 3 },
    { content: `Door Number: ${this.data?.address?.doorNumber || ''}`, styles: { halign: 'left' } },
    { content: `Street Line 1: ${this.data?.address?.streetLine1 || ''}`, styles: { halign: 'left' } },
    { content: `Street Line 2: ${this.data?.address?.streetLine2 || ''}`, styles: { halign: 'left' } },
  ]);
  tableBody.push([
    { content: `Street Line 3: ${this.data?.address?.streetLine3 || ''}`, styles: { halign: 'left' } },
    { content: `City / Town: ${this.data?.address?.city || ''}`, styles: { halign: 'left' } },
    { content: `Country: ${this.data?.address?.country || ''}`, styles: { halign: 'left' } },
  ]);
  tableBody.push([
    { content: `State / Region: ${this.data?.address?.state || ''}`, styles: { halign: 'left' } },
    { content: `Zip / Postal Code: ${this.data?.address?.postalCode || ''}`, styles: { halign: 'left' } },
  ]);

  // Generate the table
  autoTable(doc, {
    // head: [['Field', 'Value 1', 'Value 2']], // Table headers
    body: tableBody,                        // Dynamic table body
    theme: 'grid',
    styles: {
      fontSize: 10, // Increase font size
      cellPadding: 2, // Add padding to cells
      minCellHeight: 10, // Minimum cell height
      lineColor: [0, 0, 255], // Blue border color (RGB format)
      lineWidth: 0.2, // Border width
      textColor: [0, 0, 0], // Black text color
      cellWidth : 'auto',
      minCellWidth : 5
    },
    headStyles: { fillColor: [41, 128, 185], fontStyle: 'bold'}, // Make the header font bold},
    margin: { top: 10 },
    pageBreak: 'auto',
  });

  // Save the PDF
  doc.save('TableData.pdf');
}
}
