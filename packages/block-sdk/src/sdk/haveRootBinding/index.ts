import traverse from '@babel/traverse';
import { parseContent } from '../util';

export default (content, name) =>
  new Promise(resolve => {
    const ast: any = parseContent(content);
    traverse(ast, {
      Program(path) {
        resolve(path.scope.hasBinding(name));
      },
    });
  });
