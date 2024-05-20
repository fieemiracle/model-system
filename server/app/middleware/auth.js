// app/middleware/auth.js
// import jwt from 'jsonwebtoken'
// import { datetime, timedelta } from 'datetime'

const jwt = require('jsonwebtoken')
const dt = require('datetime')

module.exports = () => {
  return async function auth(ctx, next) {
    // 检查请求路径，如果是登录或注册路径，直接放行
    if (ctx.path === '/sign') {
      await next();
      return;
    }

    const token = ctx.request.header.authorization;
    if (!token) {
      ctx.status = 401;
      ctx.body = { message: 'Unauthorized' };
      return;
    }

    try {
      // const decoded = ctx.app.jwt.verify(token, 'modelsystemserver'); // 使用 jwt 进行验证
      const decoded = jwt.verify(token, 'modelsystemserver', { algorithms: ['HS256'] })
      // ctx.state.user = decoded;
      if (jwt.exceptions.ExpiredSignatureError) {
        ctx.body = {
          code: '-2',
          msg: 'token已过期'
        }
      }

      if (jwt.exceptions.DecodeError) {
        ctx.body = {
          code: '-2',
          msg: 'token解码失败，可能是格式错误或签名不匹配'
        }
      }

      if (jwt.exceptions.InvalidTokenError) {
        ctx.body = {
          code: '-2',
          msg: '无效的token'
        }
      }

      await next();
    } catch (err) {
      ctx.status = 401;
      ctx.body = { msg: 'Token expired or invalid' };
    }
  };
};
