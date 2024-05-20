// app/middleware/role.js
module.exports = requiredRole => {
    return async function role(ctx, next) {
      const user = ctx.state.user;
      if (user.role !== requiredRole) {
        ctx.status = 403;
        ctx.body = { message: 'Forbidden' };
        return;
      }
      await next();
    };
  };
  