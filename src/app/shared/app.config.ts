import {environment} from '../../environments/environment';

interface App {
  readonly Api: Api;
  readonly DefaultDebounce_ms: number;
}

interface Api {
  rootUrl: URL;
}

const app: App = {
  Api: {
    rootUrl: new URL(environment.production ? 'https://mv-dev.fleksbit.org/api' : 'https://localhost:5021/api')
  },
  DefaultDebounce_ms: 300
};

export const App: App = app;
