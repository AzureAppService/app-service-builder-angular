import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <main>
      <p class="eyebrow">App Service Builder / Angular</p>
      <h1>Angular SPA is running</h1>
      <p>
        This page was rendered by Angular from a production static bundle.
      </p>

      <nav aria-label="Test routes">
        <a class="button" routerLink="/products/widget-1">Open the deep route</a>
        <a href="/health.json">View static health</a>
        <a href="/version.json">View version metadata</a>
      </nav>

      <button class="button" type="button" (click)="increment()">
        Interaction count: {{ count() }}
      </button>

      <section aria-labelledby="deployment-heading">
        <h2 id="deployment-heading">Deployment details</h2>
        <dl>
          <div><dt>Application</dt><dd>app-service-builder-angular 1.0.0</dd></div>
          <div><dt>Framework</dt><dd>Angular 21</dd></div>
          <div><dt>Pattern</dt><dd>Client-side rendered SPA</dd></div>
        </dl>
      </section>
    </main>
  `,
})
export class Home {
  protected readonly count = signal(0);

  protected increment(): void {
    this.count.update((current) => current + 1);
  }
}
