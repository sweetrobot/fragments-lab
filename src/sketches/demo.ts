import { Fn, oscSine, time, vec3, length, screenSize, mix } from 'three/tsl'
import { screenAspectUV } from '@/tsl/utils/function/screen_aspect_uv'

const sketch = Fn(() => {
  const _uv = screenAspectUV(screenSize)

  const color1 = vec3(oscSine(time.mul(0.25)), _uv.x, _uv.y)
  const color2 = vec3(_uv.x, oscSine(time.mul(0.25)), _uv.y)

  return mix(color1, color2, length(_uv))
})

export default sketch
