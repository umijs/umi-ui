import { useState } from 'react';
import { parse } from 'qs';
import { IUiApi } from '@umijs/ui-types';
import { Resource } from '@umijs/block-sdk/lib/data.d';
import { createContainer } from './unstated-next';

export default createContainer((initialState: { api: IUiApi }) => {
  const getQueryConfig = () => parse(window.location.search.substr(1));
  const query = getQueryConfig();
  const [type, setType] = useState<Resource['blockType']>(query.type || 'block');
  const [activeResource, setActiveResource] = useState<Resource>(
    query.resource ? { id: query.resource } : null,
  );

  return {
    ...initialState,
    type,
    setType,
    activeResource,
    setActiveResource,
  };
});
