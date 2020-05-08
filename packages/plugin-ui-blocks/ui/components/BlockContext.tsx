import { createContext } from 'react';
import { ResourceType } from '@umijs/block-sdk/lib/enum';

const BlockContext = createContext(
  {} as {
    current: any;
    resources: any;
    currentResource: { resourceType: ResourceType };
    ResourceType;
  },
);

export default BlockContext;
