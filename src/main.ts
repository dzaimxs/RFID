/*import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Router, RouterModule } from '@angular/router';
import {appRoutes} from './app.routes';

bootstrapApplication(AppComponent, {
  providers:[RouterModule.forRoot(appRoutes),    
  ],
});
  
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));*/

  import { bootstrapApplication } from '@angular/platform-browser';
  import { appConfig } from './app/app.config'; // Adjust if needed
  import { AppComponent } from './app/app.component';
  import { provideRouter } from '@angular/router';
  import { routes } from './app/app.routes'; // Ensure the path is correct
  
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes), // Use provideRouter for routing
      ...(appConfig ? appConfig.providers : []), // Spread appConfig providers if necessary
    ],
  })
  .catch((err) => console.error(err));
  
  
