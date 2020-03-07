import React from 'react';
import { PageHeader } from 'antd';
import { PROJECT_STATUS, IProjectStatus } from '@/enums';
import events, { MESSAGES } from '@/message';
import scrollTop from '@/utils/scrollTop';
import Layout from './Layout';
import Context from './Context';
import ProjectContext from './ProjectContext';
import styles from './Project.less';

interface IProjectProps {}

const { useState, useLayoutEffect } = React;

const Project: React.FC<IProjectProps> = props => {
  const [current, setCurrent] = useState(PROJECT_STATUS.list);
  const [currentData, setCurrentData] = useState();

  const changeCurrent = (currentProject: IProjectStatus, currentProjectData?: object) => {
    setCurrent(currentProject);
    setCurrentData(currentProjectData);
    // scrollTop
    scrollTop();
  };

  useLayoutEffect(() => {
    events.on(MESSAGES.CHANGE_PROJECT_CURRENT, changeCurrent);
    return () => {
      events.off(MESSAGES.CHANGE_PROJECT_CURRENT, changeCurrent);
    };
  }, []);

  return (
    <Layout type="list">
      <Context.Consumer>
        {context => (
          <ProjectContext.Provider
            value={{
              ...context,
              current,
              currentData,
              setCurrent: changeCurrent,
            }}
          >
            <div className={styles['project-l']}>
              {current !== 'list' && (
                <PageHeader
                  title={context.formatMessage({
                    id: `org.umi.ui.global.project.${
                      current === 'progress' ? 'create' : current
                    }.title`,
                  })}
                  onBack={() => {
                    changeCurrent('list');
                  }}
                  className={styles['project-l-header']}
                />
              )}
              {props.children}
            </div>
          </ProjectContext.Provider>
        )}
      </Context.Consumer>
    </Layout>
  );
};

export default Project;
