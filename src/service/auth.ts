export const isAuthenticated = () => {
  const token = sessionStorage.getItem('token');
  return token && !isTokenExpired(token); // 需要实现 isTokenExpired 检查 token 是否过期
};

export const isUserRole = () => {
  const userRole = sessionStorage.getItem('role'); // 存储在 sessionStorage 中的用户角色信息
  return userRole === 'user' | '普通用户'; // 'user' 代表普通用户
};

const isTokenExpired = (token) => {
  // 实现 token 过期检查的逻辑
  const expiretime = sessionStorage.getItem('expiretime');
  const expires = Math.floor(Date.now() / 1000)
  if (expiretime < expires) {
    return true
  }
  return false;
};
