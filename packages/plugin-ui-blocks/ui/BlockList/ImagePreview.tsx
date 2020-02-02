import React, { useState, useContext } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import { Tooltip, Button, Spin } from 'antd';

export default props => {
  const { cls, img } = props;
  const [loading, setLoading] = useState(true);
  const handleImgLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <Tooltip
        title={
          <div
            style={{
              width: 450,
            }}
          >
            {loading && <Spin />}
            <img
              style={{ display: loading ? 'none' : 'block' }}
              onLoad={handleImgLoad}
              width="100%"
              alt="img"
              draggable="false"
              src={img}
            />
          </div>
        }
      >
        <Button className={cls}>
          <EyeOutlined />
        </Button>
      </Tooltip>
    </>
  );
};
