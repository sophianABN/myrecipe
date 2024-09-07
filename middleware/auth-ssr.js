const { parse: parseCookie } = require('cookie');
const jsonwebtoken = require('jsonwebtoken');

/**
 * This middleware is needed when running with SSR
 * it checks if the token in cookie is set and injects it into the nuxtjs/auth module
 * otherwise it will redirect to login
 * @param context
 */
const debugAuthMiddleware = async (context) => {
  if (process.server && context.req.headers.cookie != null) {
    try {
      const cookies = parseCookie(context.req.headers.cookie);
      const token = cookies['auth._token.local'] || 'false';
      const tokenWithoutBearer = token.replace('Bearer ', '');
       console.log('headers.cookie token', token);
       console.log('debugAuthMiddleware $auth 1', context.$auth.$state);
      if (!token || token.includes('false')) {
         console.log("no token")
        // sometimes it stores 'Bearer false' when it unsets
        return;
      }
     
      const jwt = jsonwebtoken.decode(tokenWithoutBearer);
       console.log('jwt payload', jwt);
      if (!jwt) {
        // console.log("error jwt decode")
        return;
      }
       console.log('set token ✅');
      await context.$auth.setUserToken(token)
      context.$auth.$state.loggedIn = true;
      const data = await context.$axios.$get('/api/auth/user', {
        headers: { 'Authorization': token }
      })
      await context.$auth.setUser(data.user)
      // await context.$auth.refreshTokens()
      // await context.$auth.fetchUser()
    } catch (e) {
       console.error('debugAuthMiddleware', e);
    }
     console.log('debugAuthMiddleware $auth 2', context.$auth.$state);
  } else {
     console.log("no cookies or client side")
  }
};

module.exports = debugAuthMiddleware;