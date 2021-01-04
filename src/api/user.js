import request from '@/utils/request'

export const login = (data) => {
  return request({
    method : 'POST',
    url : 'app/v1_0/authorizations',
    data : data  // 传入用户登录信息，ES6特性可以简写为：data
  })
}

export const getUserProfile = () => {
  return request ({
    method : 'GET',
    url : '/app/v1_0/user/profile'
  })
}
