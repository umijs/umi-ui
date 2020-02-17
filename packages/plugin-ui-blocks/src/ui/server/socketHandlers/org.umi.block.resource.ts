import { IHandlerOpts } from '../index';

export default function({ success, resources }: IHandlerOpts) {
  success({
    data: resources,
    success: true,
  });
}
