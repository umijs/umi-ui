import React from 'react';
import ReactDOM from 'react-dom/client';
import { history, IRoute } from 'umi';
import { getDvaApp } from '@@/plugin-dva/dva';
import querystring from 'querystring';
import { setCurrentProject, clearCurrentProject } from '@/services/project';
import debug from '@/debug';
import { init as initSocket, callRemote } from './socket';
import proxyConsole from './proxyConsole';
import PluginAPI from './PluginAPI';

const _log = debug.extend('init');

// Service for Plugin API
// eslint-disable-next-line no-multi-assign
const service = (window.g_service = {
  panels: [],
  locales: [],
  configSections: [],
  basicUI: {},
  dashboard: [],
  models: [],
});

class Container extends React.Component {
  constructor(props) {
    super(props);
    const app = getDvaApp();
    window.g_service.models.forEach(model => {
      app.model(model);
    });
  }
  render() {
    return this.props.children;
  }
}

export function rootContainer(container) {
  return React.createElement(Container, null, container);
}

// Avoid scope problem
const geval = eval; // eslint-disable-line

const initBasicUI = async () => {
  try {
    const { script: basicUIScript } = await callRemote({ type: '@@project/getBasicAssets' });
    if (basicUIScript) {
      geval(`;(function(window){;${basicUIScript}\n})(window);`);
      // Init the baseUI
      window.g_uiBasicUI.forEach(basicUI => {
        // only readable
        basicUI(new PluginAPI(service));
      });
    }
  } catch (e) {
    console.error('init basic UI error', e);
  }
};

const initUIPlugin = async (initOpts = {}) => {
  const { currentProject } = initOpts;
  // Get script and style from server, and run
  const { script } = await callRemote({ type: '@@project/getExtraAssets' });
  try {
    geval(`;(function(window){;${script}\n})(window);`);
  } catch (e) {
    console.error('Error occurs while executing script from plugins');
    console.error(e);
  }

  // Init the plugins
  window.g_uiPlugins.forEach(uiPlugin => {
    // only readable
    uiPlugin(Object.freeze(new PluginAPI(service, currentProject)));
  });
};

export async function render(oldRender): void {
  // mini 模式下允许通过加 key 的参数打开
  // 比如: ?mini&key=xxx
  const { search = '' } = window.location;
  const qs = querystring.parse(search.slice(1));
  const miniKey = qs.key || null;
  const isMini = 'mini' in qs;

  // proxy console.* in mini
  if (process.env.NODE_ENV === 'production') {
    proxyConsole(!!isMini);
  }

  // mini open not in project
  // redirect full version
  if (isMini && window.self === window.parent) {
    const { mini, key, ...restProps } = qs;
    const query = querystring.stringify(restProps);
    history.push(`${history.location.pathname}${query ? `?${query}` : ''}`);
    window.location.reload();
    return false;
  }

  // Init Socket Connection
  try {
    await initSocket({
      onMessage({ type, payload }) {
        if (type === '@@core/log') {
          window?.xterm?.writeln?.(`\x1b[90m[LOG]\x1b[0m ${payload}`);
        }
      },
    });
    _log('Init socket success');
  } catch (e) {
    console.error('Init socket failed', e);
  }
  ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(require('./pages/loading').default, {}));
  await initBasicUI();
  const { data } = await callRemote({ type: '@@project/list' });
  const props = {
    data,
  };
  const key = isMini ? miniKey : data.currentProject;

  if (key) {
    // 在 callRemote 里使用
    window.g_currentProject = key;
    const currentProject = {
      key,
      ...(data?.projectsByKey?.[key] || {}),
    };
    window.g_uiCurrentProject =
      {
        ...currentProject,
        key,
      } || {};
    // types 和 api 上先不透露
    window.g_uiProjects = data.projectsByKey || {};
    try {
      await callRemote({
        type: '@@project/open',
        payload: { key },
      });
      if (!isMini) {
        await setCurrentProject({
          key,
        });
      }
    } catch (e) {
      console.error('eeeeee', e);
      props.error = e;
    }
    if (props.error) {
      history.replace(`/error?key=${key}`);
      ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(require('./pages/loading').default, props));
      await clearCurrentProject();
      return false;
    }

    await initUIPlugin({
      currentProject,
    });
  } else {
    history.replace('/project/select');
  }
  // regsiter locale messages
  // Do render
  oldRender();
}

export function patchRoutes({ routes }: { routes: IRoute[] }) {
  for (let route in routes) {
    if (route.key === 'dashboard') {
      service.panels.forEach(panel => {
        routes?.routes?.unshift({
          exact: true,
          ...panel,
        });
      });
      return;
    }
  }
}

// for ga analyse
export const onRouteChange = params => {
  const { location } = params;
  const { pathname, search = '' } = location;
  if (window.gtag && pathname) {
    const isMini = search.indexOf('mini') > -1 ? '?mini' : '';
    window.gtag('config', 'UA-145890626-1', {
      page_path: `${pathname}${isMini}`,
    });
  }
};
