import {environment} from '../../environments/environment';

interface App {
  readonly Origin: URL;
  readonly DefaultDebounce_ms: number;
}

const app: App = {
  Origin: new URL(environment.production ? 'https://mv-dev.fleksbit.org/app' : 'http://localhost:4200'),
  DefaultDebounce_ms: 300
};

export const App: App = app;
