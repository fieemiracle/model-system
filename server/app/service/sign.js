const Service = require('egg').Service;
// const Sign = require('../model/sign')
const jwt = require('jsonwebtoken')
const dt = require('datetime')
const {
	v1: uuidv1
} = require('uuid')

class SignService extends Service {

  async gotoSign(ctx, payload) {
    const { username, password, repassword, phone, email, avatar, status } = payload
    const user = await ctx.model.Sign.find({
			phone: phone
		})
    ctx.logger.info('user user:::::::::::', user)
    // ctx.status = 200
		if (user && user.length) {//存在
			// ctx.body = {
			// 	code: 0,
			// 	msg: '用户已存在'
			// }
			return {
				code: 0,
				msg: '用户已存在'
			};
		}
    const userId = uuidv1()
    const _payload = {
      userId,
			username,
      password,
      repassword,
      phone,
      email,
      avatar,
      status,
      signtime: Math.floor(Date.now() / 1000),  // 签发时间
      expiretime: Math.floor(Date.now() / 1000) + 18000,  // 过期时间 5个小时
    }
		const newUser = await ctx.model.Sign.create(_payload)
    console.log('newUser===================', newUser);
    // const token = jwt.encode(payload, 'modelsystemserver', algorithm='HS256')
    const token = jwt.sign(_payload, 'modelsystemserver', { algorithm: 'HS256' })
    if (newUser) {
      const result = {
        code: 0,
        msg: '注册成功',
        data: {
          username: newUser.username,
          avatar: newUser.avatar,
          expiretime: Math.floor(Date.now() / 1000) + 18000,
          token,
          role: newUser.status === 'user' | newUser.status === '普通用户' : 1 : 0
        }
      }
      return result
    } else {
      return {
        code: '-1',
        msg: '注册失败'
      }
    }
    // const info = new this.ctx.model.Sign({ userId, username, password, repassword, phone, email, avatar, status });
    // console.log('gotoSign------------------->', info);
    // return info.save();
  }

  async findUserByUsername(phone) {
    return this.ctx.model.User.findOne({ phone });
  }
}

module.exports = SignService;
