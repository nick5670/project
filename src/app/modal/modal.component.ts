import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

@Injectable()
export class ModalComponent implements OnInit {

  @Input()
  display!: Observable<'open' | 'close'>;

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
    this.display = this.modalService.watch();
  }

  close()
  {
    this.modalService.close();
  }

}
