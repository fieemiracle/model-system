// app/router.js
module.exports = (app) => {
    const { router, controller, config, middleware } = app;
    // console.log(controller.sign);
    // router.get('/user/:id', controller.user.index);

    // 游客可以访问的路由
    // router.get('/chat', controller.chat.index);
    // router.post('/login', controller.user.login);
    // router.get('/home', controller.home.index);

    // 需要登录的路由
    // router.get('/dashboard', app.middleware.auth(), controller.dashboard.index);
    router.post('/sign', app.middleware.auth(), controller.sign.index);

    // 仅普通用户可以访问的路由
    // router.get('/user', app.middleware.auth(), app.middleware.role('user'), controller.user.index);
};