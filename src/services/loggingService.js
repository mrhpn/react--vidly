import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://8f4e276c72b04f58a4755ed178685748@o1022347.ingest.sentry.io/5989254',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
