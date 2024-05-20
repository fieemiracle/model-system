'use strict';

module.exports = appInfo => {

  const config = exports = {
    baseUrl: 'server',
    keys: 'servercookie',
    middleware: ['auth'],
    security: {
      csrf: {
        enable: false,
      },
    },
    mongoose: {
      client: {
        url: 'mongodb://127.0.0.1:27017/model-system',
        options: {},
      },
    },
    // bodyParser: {
    //   enable: true,
    //   encoding: 'utf8',
    //   formLimit: '1mb',
    //   jsonLimit: '1mb',
    //   strict: true, // 默认值是 true，表示只解析 JSON
    //   // 如果你需要解析其他格式的请求体，例如 form-data，可以设置 multipart
    //   multipart: true,
    // };
  };

  return config;
};
