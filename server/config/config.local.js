'use strict';

/** @type {Egg.EggAppConfig} */
module.exports = appInfo => {
  const config = {};

  // 设置应用的 baseUrl
  config.baseUrl = '/server';

  // 配置 mongoose
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/model-system',
      options: {},
    },
  };

  return config;
};
