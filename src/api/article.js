import request from '@/utils/request'

export const getArticles = (params) => {
  return request({
    url : '',
    method : 'GET',
    params
  })
}

export const getArticleChannels = () => {
  return request ({
    method : 'GET',
    url : '/app/v1_0/channels'
  })
}