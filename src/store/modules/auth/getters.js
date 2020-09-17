import token from '@/services/TokenService'
export default {
  profile: () => JSON.parse(token.getData()),
  rememberMeData: () => {
    let rememberMe = token.getRememberMe()
    if (rememberMe) {
      return JSON.parse(token.getRememberMe())
    }
    return undefined;
  }
}