import React, { useEffect, useState, useContext } from 'react';
import { Layout, message } from 'antd';
import isPlainObject from 'lodash/isPlainObject';
import ProjectContext from '@/layouts/ProjectContext';
import { IProjectList } from '@/enums';
import { fetchProject, getCwd, listDirectory } from '@/services/project';
import * as projectMap from './components';
import styles from './index.less';

const { Content } = Layout;

const Project: React.FC<{}> = () => {
  const [data, setData] = useState<IProjectList>({});
  const [cwd, setCwd] = useState();
  const [files, setFiles] = useState([]);

  const { current, currentData, basicUI, locale } = useContext(ProjectContext);

  async function getProject() {
    const { data: projectData } = await fetchProject({
      onProgress: async res => {
        setData(res);
      },
    });
    setData(projectData);
  }

  const getComponentProps = curr => {
    let projectProps = {
      locale,
    };
    switch (current) {
      case 'list':
        projectProps = {
          projectList: data,
        };
        break;
      case 'create':
        projectProps = {
          cwd,
        };
        break;
      case 'import':
        projectProps = {
          cwd,
          files,
        };
        break;
      case 'progress':
        projectProps = {
          currentData,
          projectList: data,
        };
        break;
      default:
        projectProps = {
          currentData,
          projectList: data,
          cwd,
          files,
        };
        break;
    }
    return projectProps;
  };

  useEffect(() => {
    (async () => {
      await getProject();
      const { cwd: currentCwd } = await getCwd();
      setCwd(currentCwd);
      try {
        const { data: directories } = await listDirectory({
          dirPath: currentCwd,
        });
        setFiles(directories);
      } catch (e) {
        message.error(e && e.message ? e.message : '目录选择错误');
      }
    })();
  }, []);
  const extendProjectPage = basicUI['project.pages'];
  const mergedProjectMap = isPlainObject(extendProjectPage)
    ? Object.assign({}, projectMap, extendProjectPage)
    : projectMap;
  const ProjectComp = mergedProjectMap[current];
  const projectProps = getComponentProps(current);

  return (
    <Layout className={styles.project}>
      <Content className={styles['project-content']}>
        <ProjectComp key={current} {...projectProps} />
      </Content>
    </Layout>
  );
};

export default Project;
