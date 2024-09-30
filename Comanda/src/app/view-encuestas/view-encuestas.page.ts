import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../interfaces/encuesta';
import { EncuestasService } from '../services/encuestas.service';

@Component({
  selector: 'app-view-encuestas',
  templateUrl: './view-encuestas.page.html',
  styleUrls: ['./view-encuestas.page.scss'],
})
export class ViewEncuestasPage implements OnInit {

  public encuestas: Encuesta[] = [];

  constructor(private encuestaService: EncuestasService) { }

  ngOnInit() {
    this.encuestaService.getAll().subscribe((res) => this.encuestas = res);
  }

}
