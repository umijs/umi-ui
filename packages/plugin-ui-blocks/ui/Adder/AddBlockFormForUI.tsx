/**
 *  在 umi ui 中添加区块
 *  不需要选择安装的具体文件位置
 *  min ui 提供了可视化的方案来选择
 */
import React, { useContext, useState } from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form/util';
import Context from '../UIApiContext';
import InfoToolTip from './InfoToolTip';

const PathLabel: React.FC<{
  intl: any;
  value?: string;
  name?: string;
}> = ({ value, name, intl }) => (
  <div
    style={{
      display: 'flex',
      marginBottom: 24,
    }}
  >
    {intl({ id: 'org.umi.ui.blocks.adder.path.label' })}
    <code
      style={{
        backgroundColor: '#3b3b4d',
        margin: '0 8px',
        padding: '0 8px',
        borderRadius: 4,
      }}
    >
      {`${value}${name ? `/${name}` : ''}`.replace(/\//g, '/').replace(/\/\//g, '/')}
    </code>
  </div>
);

const AddBlockFormForUI: React.FC<{
  blockTarget: string;
  form: FormInstance;
}> = ({ blockTarget, form }) => {
  const { api } = useContext(Context);
  const { useIntl } = api;
  const { formatMessage: intl } = useIntl();
  const [varName, setValueName] = useState<string>(form.getFieldValue('name'));
  return (
    <>
      <Form.Item
        noStyle
        name="path"
        label={
          <InfoToolTip
            title={intl({ id: 'org.umi.ui.blocks.adder.path' })}
            placeholder={intl({
              id: 'org.umi.ui.blocks.adder.path.minitooltip',
            })}
          />
        }
        rules={[
          {
            required: true,
            message: intl({ id: 'org.umi.ui.blocks.adder.path.rule' }),
          },
        ]}
      >
        <PathLabel name={varName} intl={intl} />
      </Form.Item>
      <Form.Item
        name="name"
        label={
          <InfoToolTip
            title={intl({ id: 'org.umi.ui.blocks.adder.name' })}
            placeholder={intl({ id: 'org.umi.ui.blocks.adder.name.tooltip' })}
          />
        }
        rules={[
          {
            validator: async (rule, name) => {
              if (!name) {
                throw new Error(intl({ id: 'org.umi.ui.blocks.adder.name.required' }));
              }
              if (!/^[a-zA-Z$_][a-zA-Z\d_]*$/.test(name)) {
                throw new Error(intl({ id: 'org.umi.ui.blocks.adder.name.illegal' }));
              }
              if (!/^(?:[A-Z][a-z\d]+)+$/.test(name)) {
                throw new Error(intl({ id: 'org.umi.ui.blocks.adder.name.illegalReact' }));
              }
              const { exists } = (await api.callRemote({
                type: 'org.umi.block.checkExistFilePath',
                payload: {
                  path: `${blockTarget}/${name}`,
                },
              })) as {
                exists: boolean;
              };
              if (exists) {
                throw new Error(intl({ id: 'org.umi.ui.blocks.adder.pathexist' }));
              }
              const blockFileTarget = form.getFieldValue('path');
              const { exists: varExists } = (await api.callRemote({
                type: 'org.umi.block.checkBindingInFile',
                payload: {
                  path: blockFileTarget,
                  name,
                },
              })) as { exists: boolean };
              if (varExists) {
                throw new Error(intl({ id: 'org.umi.ui.blocks.adder.varexist' }));
              }
            },
          },
        ]}
      >
        <Input
          placeholder={intl({ id: 'org.umi.ui.blocks.adder.name.placeholder' })}
          onChange={e => {
            setValueName(e.target.value);
          }}
        />
      </Form.Item>
    </>
  );
};

export default AddBlockFormForUI;
