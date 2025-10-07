/**
 * Mesh 7 - Distorted gradient
 * Adapted from fragments.supply
 * 
 * @license CC BY-NC-SA 4.0
 * Attribution: Ben McCormick (phobon) - https://fragments.supply
 */

import { Color } from 'three/webgpu'
import { screenAspectUV } from '@/tsl/utils/function/screen_aspect_uv'
import {
  uniformArray,
  float,
  vec2,
  Loop,
  Fn,
  screenSize,
  time,
  sin,
  cos,
  mul,
  PI,
  pow,
  div,
  max,
  vec3,
  uv,
  length,
  add,
} from 'three/tsl'
import { grainTextureEffect } from '@/tsl/post_processing/grain_texture_effect'

const colors = uniformArray([
  new Color('#667eea'),
  new Color('#764ba2'),
  new Color('#f093fb'),
  new Color('#4facfe'),
])

const mesh7 = Fn(() => {
  const _uv = screenAspectUV(screenSize)
  const uv0 = uv().toVar()
  
  const finalColor = vec3(0).toVar()
  const totalWeight = float(0).toVar()

  const _time = time.mul(0.2)
  const colorCount = 4

  // Loop through color spots
  // @ts-ignore
  Loop({ start: 0, end: colorCount }, ({ i: _i }) => {
    const i = float(_i)
    
    // Distorted movement
    const offset = mul(i, mul(PI, 0.5))
    const x = sin(add(_time, offset)).mul(0.6)
    const y = cos(add(mul(_time, 1.3), mul(offset, 1.5))).mul(0.6)
    const pos = vec2(x, y)

    const _c = colors.element(_i)

    // Distorted distance
    const dist = length(_uv.sub(pos))
    const distortion = mul(sin(add(mul(_time, 3), mul(i, PI))), 0.2)
    const distPow = pow(max(0.05, add(dist, distortion)), 4)

    // Weight
    const weight = div(1, distPow)

    // Accumulate
    finalColor.addAssign(_c.mul(weight))
    totalWeight.addAssign(weight)
  })

  // Normalize
  finalColor.divAssign(totalWeight)
  
  // Enhance with grain
  const grain = grainTextureEffect(uv0).mul(0.12)
  finalColor.addAssign(grain)

  return finalColor
})

export default mesh7
