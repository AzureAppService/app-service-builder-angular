import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <main>
      <p class="eyebrow">Client-side 404</p>
      <h1>Page not found</h1>
      <p>
        The static host returned the SPA shell, and Angular Router handled this
        unknown route.
      </p>
      <nav>
        <a class="button" routerLink="/">Return home</a>
      </nav>
    </main>
  `,
})
export class NotFound {}
