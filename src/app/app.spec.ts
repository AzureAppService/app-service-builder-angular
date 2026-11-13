import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { vi } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the home route', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Angular SPA is running');
    expect(compiled.textContent).toContain('app-service-builder-angular 1.0.0');
    expect(compiled.querySelector('.eyebrow')?.textContent).toContain(
      'App Service Builder / Angular',
    );
  });

  it('should increment the interaction counter', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const button = Array.from(compiled.querySelectorAll('button')).find(
      (candidate) => candidate.textContent?.includes('Interaction count:'),
    );
    expect(button).not.toBeNull();
    expect(button?.textContent).toContain('Interaction count: 0');
    button?.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(button?.textContent).toContain('Interaction count: 1');
  });

  it('should check static health inline and allow retry after failure', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('{"status":"ok","app":"app-service-builder-angular"}'),
    ).mockResolvedValueOnce(new Response('Unavailable', { status: 503 }));
    try {
      const fixture = TestBed.createComponent(App);
      await TestBed.inject(Router).navigateByUrl('/');
      await fixture.whenStable();
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const button = Array.from(compiled.querySelectorAll('button')).find(
        (candidate) => candidate.textContent?.includes('Check static health'),
      )!;
      button.click();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(compiled.querySelector('[role="status"]')?.textContent).toContain('file serving, not a running backend');
      expect(fetchMock).toHaveBeenCalledWith('/health.json', expect.objectContaining({ cache: 'no-store' }));
      expect(button.disabled).toBe(false);
      button.click();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(compiled.querySelector('[role="status"]')?.textContent).toContain('check failed');
      expect(button.disabled).toBe(false);
    } finally {
      fetchMock.mockRestore();
    }
  });

  it('should render the deep route', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/products/widget-1');
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Widget 1');
  });

  it('should render the client-side fallback route', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/unknown-client-route');
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Page not found');
  });
});
