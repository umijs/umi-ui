import React from 'react';
import * as IUi from '@umijs/ui-types';
import { FormInstance } from 'antd/lib/form/util';
import StringComp from './String';
import StringArrayComp from './StringArray';
import BooleanComp from './Boolean';
import ObjectComp from './Object';
import ObjectArrayComp from './ObjectArray';
import ListComp from './List';
import TextAreaComp from './TextArea';
import AnyComp from './Any';
import Label from './label';

export type IConfigTypeMapping = { [x in IUi.IConfigTypes]: any };

export enum TYPES {
  string = 'string',
  stringArr = 'string[]',
  boolean = 'boolean',
  object = 'object',
  objectArr = 'object[]',
  list = 'list',
  textarea = 'textarea',
  any = 'any',
}

const configTypeMapping: IConfigTypeMapping = {
  [TYPES.string]: StringComp,
  [TYPES.stringArr]: StringArrayComp,
  [TYPES.boolean]: BooleanComp,
  [TYPES.object]: ObjectComp,
  [TYPES.objectArr]: ObjectArrayComp,
  [TYPES.list]: ListComp,
  [TYPES.textarea]: TextAreaComp,
  [TYPES.any]: AnyComp,
};

export interface FieldProps extends IUi.IFieldProps {
  form: FormInstance;
}

const Field: React.SFC<FieldProps> = ({ type, size = 'default', label, ...restProps }) => {
  const ConfigItem = configTypeMapping[type] || configTypeMapping.any;
  const fieldLabel = typeof label === 'object' ? <Label {...label} /> : label;
  return <ConfigItem size={size} label={fieldLabel} {...restProps} />;
};

export default Field;
