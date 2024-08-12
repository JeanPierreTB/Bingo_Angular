import { Component ,OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  title = 'bingo';
  ncolumnas=5;
  nfilas=4;

  tablaDatos:String[][]=[];

  girarset:Set<String>=new Set();


  numeroactual?:String;


  ngOnInit(): void {
    this.generarDatosTabla();
  }

  generarDatosTabla() {

    const rangos = [
      { min: 1, max: 15 },    // Primera columna
      { min: 16, max: 30 },   // Segunda columna
      { min: 31, max: 45 },   // Tercera columna
      { min: 46, max: 60 },   // Cuarta columna
      { min: 61, max: 75 }    // Quinta columna
    ];
    for (let i = 0; i < this.nfilas; i++) {
      const filaSet: Set<number> = new Set();
      while (filaSet.size < this.ncolumnas) {
          const { min, max } = rangos[filaSet.size];
          filaSet.add(this.generarnumeroaleatorio(min, max));
      }

      this.tablaDatos.push(Array.from(filaSet).map(String));
      
    }
  }

  generarnumeroaleatorio(min:number,max:number):number{
    return Math.floor(Math.random() * (max - min + 1)) + min;

  }


  girar() {
    let nuevoNumero: String;
    do {
      nuevoNumero = this.generarnumeroaleatorio(1, 75).toString();
    } while (this.girarset.has(nuevoNumero));
  
    alert("El numero es:"+nuevoNumero);
    this.numeroactual=nuevoNumero;
  }


  determinarnumero(celda:String){
   
    if(celda===this.numeroactual){
        for(let i=0;i<this.nfilas;i++){
          for(let j=0;j<this.ncolumnas;j++){
            if(this.tablaDatos[i][j]===this.numeroactual){
              this.tablaDatos[i][j]='X';
              alert("Numero actualizado")
              return;
            }
          }
        }
    }

    alert("Numeros no coindicen")

 
    
   
  }
  
  
}
