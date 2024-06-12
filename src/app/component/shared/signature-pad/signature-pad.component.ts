import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
})
export class SignaturePadComponent implements OnInit {

  signatureNeeded!: boolean;
  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl!: ElementRef;
  signatureImg!: string;

  @Output() dataEmitted = new EventEmitter<String>();

  constructor() { }

  ngOnInit() { }
  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    // works in device not in browser
  }
  moved(event: Event) {
    // works in device not in browser
  }

  savePad() {
    this.signatureImg = this.signaturePad.toDataURL();
    this.signatureNeeded = this.signaturePad.isEmpty();
    this.dataEmitted.emit(this.signatureImg);

    if(!this.signatureNeeded) {
      this.signatureNeeded = false;
    }
    this.clearPad();
  }


  clearPad() {
    this.signaturePad.clear();
  }

}
