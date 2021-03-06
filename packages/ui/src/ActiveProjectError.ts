import * as IUi from '@umijs/ui-types';

function getLangStr(obj, lang) {
  if (typeof obj === 'string') {
    return obj;
  }
  if (typeof obj === 'object') {
    return obj[lang] || obj['en-US'];
  }
  throw new Error(`Unsupport type ${typeof obj}`);
}

function normalizeAction(action, lang) {
  return {
    ...action,
    title: getLangStr(action.title, lang),
  };
}

interface IAction {
  browserHandler?: string;
  buttonType?: string;
  title: IUi.Locale;
  handler?: IUi.IAction;
}

interface IOpts {
  title: IUi.Locale;
  lang: IUi.ILang;
  actions?: IAction[];
  exception?: boolean;
  stack?: string;
  message?: IUi.Locale;
}

export default class ActiveProjectError extends Error {
  actions: IAction[];

  exception: boolean;

  title: string;

  constructor(opts: IOpts) {
    const { title, message, stack, actions, lang, exception } = opts;
    super(getLangStr(message || '', lang));
    if (title) this.title = getLangStr(title, lang);
    if (stack) this.stack = stack;
    if (exception) {
      this.exception = exception;
    }
    if (actions) this.actions = actions.map(action => normalizeAction(action, lang));
  }
}
