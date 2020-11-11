import {environment} from '../../environments/environment';

interface App {
  readonly BaseHref: string;
  readonly DefaultDebounce_ms: number;
}

const app: App = {
  BaseHref: environment.production ? '/app/' : '/',
  DefaultDebounce_ms: 300
};

export const App: App = app;
