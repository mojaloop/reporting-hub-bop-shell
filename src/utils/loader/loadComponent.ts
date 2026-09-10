import { ComponentType } from 'react';
import WebpackContainerError from './WebpackContainerError';
import WebpackLoadingError from './WebpackLoadingError';

class Externals {
  private apps = new Map<string, boolean>();

  private callbacks = new Map<string, (() => void)[]>();

  addApp(app: string) {
    this.apps.set(app, false);
  }

  hasApp(app: string) {
    return this.apps.has(app);
  }

  deleteApp(app: string) {
    return this.apps.delete(app);
  }

  hasLoadedApp(app: string) {
    return this.apps.get(app) === true;
  }

  setCallback(app: string, fn: () => void) {
    const cbs = this.callbacks.get(app) || [];
    this.callbacks.set(app, [...cbs, fn]);
  }

  runCallbacks(app: string) {
    this.apps.set(app, true);

    const callbacks = this.callbacks.get(app);

    if (callbacks) {
      callbacks.forEach((callback) => callback());
    }
  }
}

async function init(
  resolve: (arg: any) => void,
  reject: (arg: any) => void,
  scope: string,
  component: string,
) {
  try {
    // @ts-ignore
    const factory = await window[scope].get(`./${component}`);
    const Module = factory();
    resolve(Module);
  } catch (e) {
    reject(e);
  }
}

const externals = new Externals();

export default function loadComponent<Props = any>(
  url: string,
  scope: string,
  component: string,
  crossOrigin?: boolean,
): () => Promise<{ default: ComponentType<Props> }> {
  return () =>
    new Promise((resolve, reject) => {
      // defines the applicaton reference
      const app = `${url}#${scope}`;

      function makeLoad(element: Element, appName: string) {
        return async function load() {
          try {
            // @ts-ignore
            await __webpack_init_sharing__('default');

            // @ts-ignore
            const container = window[scope];
            if (!container) {
              reject(new WebpackContainerError(`container ${scope} not found`));
            }

            // @ts-ignore
            await container.init(__webpack_share_scopes__.default);
          } catch (error) {
            reject(error);
          } finally {
            externals.runCallbacks(appName);
            element.parentNode?.removeChild(element);
          }
        };
      }

      // this is the callback returning the compnent we want to run
      // once the script is loaded and the container is initialized
      const resolveComponent = () => init(resolve, reject, scope, component);

      if (externals.hasLoadedApp(app)) {
        // resolve immediately
        resolveComponent();
      } else if (externals.hasApp(app)) {
        // resolve once ready
        externals.setCallback(app, resolveComponent);
      } else {
        // start the loading
        externals.addApp(app);
        externals.setCallback(app, resolveComponent);

        // setup the script
        const script = document.createElement('script');
        script.src = url;
        if (crossOrigin) {
          script.crossOrigin = 'anonymous';
        }
        // The browser reports a refused container the same way it reports an
        // unreachable one, so name both rather than guess between them
        script.onerror = () => {
          reject(
            new WebpackLoadingError(
              `Could not load ${url}. It is either unavailable or not available to this user.`,
            ),
          );
          externals.deleteApp(app);
        };
        script.onload = makeLoad(script, app);

        const head =
          document.querySelector('head') ||
          document.body.appendChild(document.createElement('head'));
        head.appendChild(script);
      }
    });
}
