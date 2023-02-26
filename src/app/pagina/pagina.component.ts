import { Component, OnInit, ViewChild } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss'],
})
export class PaginaComponent implements OnInit {
  public apiGreeting = '';
  public dateTime = '';
  public text = '';
  public showText = '';

  constructor(private apiService: ApiService) {}

  onchangeInput(value: string) {
    this.text = value;
  }

  sendText() {
    this.apiService
      .postText(this.text)
      .pipe(
        catchError((err) => {
          console.log(err);
          this.dateTime = 'Falha na comunicação com o servidor.';
          return [];
        })
      )
      .subscribe((response) => {
        this.text = '';
        if (response) {
          this.showText = response.mensagem;
        }
      });
  }

  ngOnInit(): void {
    this.apiService
      .getDateTime()
      .pipe(
        catchError((err) => {
          console.log(err);
          this.dateTime = 'Falha na comunicação com o servidor.';
          return [];
        })
      )
      .subscribe((response) => {
        if (response) {
          this.dateTime = response.mensagem;
        }
      });

    this.apiService
      .getHello()
      .pipe(
        catchError((err) => {
          this.apiGreeting = 'Falha na comunicação com o servidor.';
          return [];
        })
      )
      .subscribe((response) => {
        if (response) {
          this.apiGreeting = response.mensagem;
        }
      });
  }
}
