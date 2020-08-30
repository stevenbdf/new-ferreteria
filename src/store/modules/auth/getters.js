import token from '@/services/TokenService'
export default {
  profile: () => JSON.parse(token.getData())
}