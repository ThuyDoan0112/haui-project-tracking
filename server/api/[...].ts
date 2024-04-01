import { joinURL } from 'ufo'

export default defineEventHandler((event) => {
  const { public: { apiBaseUrl } } = useRuntimeConfig()

  const path = event.path.replace(/^\/api\//, '')
  const target = joinURL(apiBaseUrl, 'api/v1', path)

  return proxyRequest(event, target)
})
