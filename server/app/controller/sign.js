const Controller = require('egg').Controller;

class SignController extends Controller {

  async index() {
    const { ctx, service } = this;
    ctx.logger.info('sign index:::::::::::::::::::', ctx.request.body);
    const { username, password, repassword, phone, email, avatar, status } = ctx.request.body;
    const sign_info = await service.sign.gotoSign(ctx, ctx.request.body);
    ctx.logger.info('sign_info:::::::::::::::::::', sign_info);
    ctx.body = sign_info;
  }

  async login() {
    const { ctx, service } = this;
    const { username, password } = ctx.request.body;
    const user = await service.user.findUserByUsername(username);
    if (user && user.password === password) {
      ctx.body = { message: 'Login successful' };
    } else {
      ctx.body = { message: 'Invalid username or password' };
    }
  }
}

module.exports = SignController;