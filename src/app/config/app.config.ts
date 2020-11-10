import {environment} from '../../environments/environment';

interface App {
  readonly Origin: URL;
  readonly DefaultDebounce_ms: number;
}

const app: App = {
  Origin: new URL(environment.production ? `${window.location.origin}/app` : window.location.origin),
  DefaultDebounce_ms: 300
};

export const App: App = app;
