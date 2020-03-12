import packageJson from '../../package.json';
const Config = {
  get PUBLIC_URL() {
    return process.env.PUBLIC_URL;
  },
  get SERVER_URL() {
    return process.env.REACT_APP_SERVER_URL;
  },
  get NODE_ENV() {
    return process.env.NODE_ENV;
  },
  get DEBUG() {
    return process.env.NODE_ENV !== 'production';
  },

  get VERSION() {
    return packageJson.version;
  },
};

export default Config;
