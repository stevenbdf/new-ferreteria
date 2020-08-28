import token from '@/services/TokenService'
export default {
  profile: state => JSON.parse(token.getData())
}