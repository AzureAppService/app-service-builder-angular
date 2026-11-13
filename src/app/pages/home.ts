import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <main class="sample-sheet">
      <header class="sample-header">
        <a class="sample-brand" routerLink="/"><img src="/brand/builder.svg" alt="" width="32" height="32">App Service Builder</a>
        <nav aria-label="Documentation">
          <a href="https://angular.dev/">Angular documentation</a>
          <a href="https://builder.appservice.azure.com/docs/">App Service Builder documentation</a>
        </nav>
      </header>
      <div class="sample-content">
      <div class="ecosystem-logo"><img class="wordmark" src="/brand/angular.png" alt="Angular" width="156" height="52"></div>
      <p class="eyebrow">App Service Builder / Angular</p>
      <h1>Angular SPA is running</h1>
      <p>
        This sample renders in your browser with Angular.
      </p>

      <nav aria-label="Test routes">
        <a class="button" routerLink="/products/widget-1">Open the deep route</a>
        <button class="secondary" type="button" [disabled]="checking()" (click)="refreshHealth()">
          {{ checking() ? 'Checking health…' : 'Check static health' }}
        </button>
        <a href="/version.json">View version JSON</a>
      </nav>
      <p class="health-result" role="status">{{ health() }}</p>

      <button class="button" type="button" (click)="increment()">
        Interaction count: {{ count() }}
      </button>

      <section aria-labelledby="deployment-heading">
        <h2 id="deployment-heading">Deployment details</h2>
        <dl>
          <div><dt>Application</dt><dd>app-service-builder-angular 1.0.0</dd></div>
          <div><dt>Framework</dt><dd>Angular 22</dd></div>
          <div><dt>Pattern</dt><dd>Client-side rendered SPA</dd></div>
        </dl>
      </section>
      <details>
        <summary>Customize this sample</summary>
        <p>In your fork, edit the home page in <code>src/app/pages/home.ts</code>
          and the visual-family styles in <code>public/brand/family.v1.css</code>. Commit your changes and
          deploy your fork through your Builder App.</p>
      </details>
      <details>
        <summary>Logo sources &amp; notices</summary>
        <p>Unmodified <a href="https://angular.dev/press-kit">Angular press-kit artwork</a>
          identifies this framework. Angular is a trademark of Google LLC.
          App Service Builder uses its supplied official mark. No endorsement implied.</p>
      </details>
      </div>
    </main>
  `,
})
export class Home {
  protected readonly count = signal(0);
  protected readonly checking = signal(false);
  protected readonly health = signal('Check the static health file without leaving this page.');

  protected async refreshHealth(): Promise<void> {
    this.checking.set(true);
    this.health.set('Checking /health.json…');
    try {
      const response = await fetch('/health.json', { cache: 'no-store', signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error('HTTP health failure');
      const body = await response.json();
      if (body.status !== 'ok' || body.app !== 'app-service-builder-angular') throw new Error('Unexpected health response');
      this.health.set('Static health file is reachable. This checks file serving, not a running backend or Azure deployment status.');
    } catch {
      this.health.set('Static health check failed. Retry, or inspect /health.json and your static host configuration.');
    } finally {
      this.checking.set(false);
    }
  }

  protected increment(): void {
    this.count.update((current) => current + 1);
  }
}
