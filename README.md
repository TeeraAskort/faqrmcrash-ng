# FarmcrashNg

## Objetivo de la aplicación

El objetivo de la aplicación es realizar un juego multijugador online de granja dónde los jugadores compitan por ver quien es el que más dinero puede conseguir.

La aplicación está dividida en un backend realizado en "Java" con el framework "Spring Boot" ([repositorio](https://github.com/TeeraAskort/farmcrash-backend)) y el frontend realizado en "Angular".

## Distribución de archivos

- src/app -> El código fuente de la aplicación.
  - auth/ -> Código de las páginas encargadas de la autenticación.
  - pipes/ -> Código de todas las "Pipes" de la aplicación.
  - user/ -> Páginas de edición de los datos del usuario.
  - friends/ -> Páginas encargadas de gestionar los amigos y bloqueados por el jugador.
  - \*/ -> Resto de páginas encargadas de diferentes funciones.

## Login y registro de la aplicación.

La aplicación utiliza el método de autenticación "BASIC Auth", éste metodo convierte los datos de login a base64 para enviarlos al backend.

Código encargado del login de la aplicación:

```typescript
public login(username: String, password: String) {
    let playerStr = Buffer.from(username + ':' + password);
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + playerStr.toString('base64'),
    });
    return this.http.get<Player>(this.url + 'player/login', {
      headers: loginHeaders,
    });
  }
```

Código del validador personalizado encargado de validar que las dos contraseñas del registro sean iguales:

```typescript
const checkBothPasswordsAreTheSame: ValidatorFn = (fg: AbstractControl) => {
  const password: string = fg.get('password')?.value;
  const passwordRepeat: string = fg.get('passwordRepeat')?.value;

  return password === passwordRepeat ? null : { passwordsDontMatch: true };
};
```

### Usuario de prueba

La aplicación está diseñada para que si creas un usuario con el nombre "prova" se creen datos de estadistica de ejemplo para la sección de estadisticas.
Si creas un usuario con qualquier otro nombre creará un usuario por defecto igual para todos.

## Página principal

La página principal contiene todas las listas de objetos, verduras y trabajadores que tiene el jugador así como el dinero que tiene.

Código encargado de mostrar las verduras del jugador:

```html
<mat-card>
  <mat-card-header>
    <mat-card-title>{{ crop.name }}</mat-card-title>
  </mat-card-header>
  <img mat-card-image src="http://localhost:4040{{ crop.imageUrl }}" alt="{{ crop.name }}">
  <mat-card-content>
    <h3>
      Amount: {{ crop.amount }}
    </h3>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button *ngIf="crop.stage === 'SELL'" (click)="sellCrop(i)">Sell</button>
    <button mat-button *ngIf="crop.stage === 'READYTOFARM'" (click)="farmCrop(i)">Farm</button>
  </mat-card-actions>
</mat-card>
```

## Página de compra de verduras y página de contratación de trabajadores

Éstas páginas contienen listas de los trabajadores y verduras disponibles para contratar o comprar.
Éstas páginas también tienen una barra de búsqueda reactiva que permite filtrar el contenido de la página en función de lo que introduzca el usuario.
El filtro se ha realizado con pipes personalizadas para ésta función, siendo estas "crop-filter.pipe.ts" y "worker-filter.pipe.ts".

Código de la pipe "crop-filter.pipe.ts":

```typescript
@Pipe({
  name: 'cropFilter',
})
export class CropFilterPipe implements PipeTransform {
  transform(items: Crop[], searchText: string): Crop[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      return item.name.toLowerCase().includes(searchText);
    });
  }
}
```

Código encargado de enviar los datos para comprar verduras:

```typescript
  public buyCrop(id: Number, amount: Number) {
    const loginHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'Basic ' + localStorage.getItem('player'),
    });
    return this.http.get<Player>(this.url + `player/crop/${id}/buy/${amount}`, {
      headers: loginHeaders,
    });
  }
```

## Páginas de lista de verduras, trabajadores y objetos

Éstas páginas contienen las mismas listas que la página principal pero cada una de ellas está dedicada a un solo elemento, mostrandolo a pantalla completa.

## Página de leaderboard

Ésta página contiene una lista de los cinco usuarios con más dinero del servidor.

## Página de estadisticas

Ésta página contiene un gráfico de la cantidad de dinero que ha ido teniendo el usuario durante los últimos siete dias.

Código encargado de mostrar el gráfico:

```typescript
// Cogemos el canvas de la plantilla
@ViewChild('chart', { static: false }) canvas?: ElementRef;

constructor(private restService: RestService) {
  // Registramos los componenetes del modulo de gráficos
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );

  // Recogemos los datos del backend y luego se los pasamos al canvas para que los renderice
  this.restService.fetchStats().subscribe((data) => {
    if (data) {
      const config: ChartConfiguration = {
        type: 'line',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };

      if (this.canvas) {
        new Chart(this.canvas.nativeElement, config);
      }
    }
  });
}
```

## Página de amigos

Ésta página es la encargada de gestionar las solicitudes de amistad y el bloqueo de otros jugadores.

Código dónde se utilizan componentes hijos:

```html
<div class="col-12">
  <h2>Friend requests</h2>
  <app-requests [friendRquestsUpdate]="friendRequestUpdate.asObservable()"
      (addFriend)="addFriend($event)" *ngIf="friendRequests != undefined; else norequests">
  </app-requests>
  <ng-template #norequests>
    <p class="no-value-msg">
      You have no requests
    </p>
  </ng-template>
</div>
```

Código del componente de b

```typescript
// Cogemos el observable para saber cuando se introduce un nuevo caracter de busqueda
@Input() searchInputKey: Observable<void> | undefined = undefined;
@Input() searchText: String | undefined = undefined;
@Output() sendRequest: EventEmitter<String> = new EventEmitter<String>();
@Output() blockPlayer: EventEmitter<String> = new EventEmitter<String>();

ngOnInit(): void {
  // Nos suscribimos al observable
  this.searchInputKey?.subscribe(() => {
    if (this.searchText) { // Comprobamos que haya texto
      // Buscamos jugadores según el texto de búsqueda
      this.restService.searchPlayer(this.searchText, 0).subscribe((data) => {
        if (data) {
          // Asginamos los datos que nos ha devuelto el backend
          this.players = data;
          this.page = this.players.pageable.pageNumber;
        }
      });
    }
  });
}
```


## Paquetes NPM

### Paquetes utilizados para el desarrollo:

- @angular-devkit/build-angular
- @angular/cli
- @angular/compiler-cli
- @types/jasmine
- @types/node
- jasmine-core
- karma
- typescript

### Paquetes utilizados en producción:

- @angular/* -> Dependencias de angular para su función.
- bootstrap -> Utilizado para hacer uso de su grid.
- buffer -> Para convertir los datos de login a base64 para enviarlo al backend.
- chart.js -> Modulo de gráficos.
- rxjs -> Utilizado para la programación reactiva.
