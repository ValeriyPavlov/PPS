import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }
  //template_uyr9omq
  sendApproveEmail(templateParams: any): void {
    emailjs.send('service_rda76ko', 'template_1ag8sw9', templateParams, 'dyq_TOkOrq5FQxPDN')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        // alert('Email sent successfully!');
      }, (error) => {
        console.log(error.text);
        // alert('Failed to send email. Please try again later.');
      });
  }

  sendRejectEmail(templateParams: any): void {
    emailjs.send('service_rda76ko', 'template_uyr9omq', templateParams, 'dyq_TOkOrq5FQxPDN')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        // alert('Email sent successfully!');
      }, (error) => {
        console.log(error.text);
        // alert('Failed to send email. Please try again later.');
      });
  }

}
