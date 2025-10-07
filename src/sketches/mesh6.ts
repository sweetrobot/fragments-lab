/**
 * Mesh 6 - Warped mesh gradient
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
} from 'three/tsl'
import { grainTextureEffect } from '@/tsl/post_processing/grain_texture_effect'

const colors = uniformArray([
  new Color('#ffd4e5'),
  new Color('#a1c4fd'),
  new Color('#ffeaa7'),
  new Color('#55efc4'),
])

const mesh6 = Fn(() => {
  const _uv = screenAspectUV(screenSize)
  const uv0 = uv().toVar()
  
  const finalColor = vec3(0).toVar()
  const totalWeight = float(0).toVar()

  const _time = time.mul(0.15)
  const colorCount = 4

  // Loop through color spots with different movement pattern
  // @ts-ignore
  Loop({ start: 0, end: colorCount }, ({ i: _i }) => {
    const i = float(_i)
    
    // Warped circular motion
    const angle = mul(i, mul(PI, 0.5)).add(_time)
    const radius = mul(0.5, sin(mul(_time, mul(i, 0.3))))
    
    const x = mul(radius, cos(angle))
    const y = mul(radius, sin(angle))
    const pos = vec2(x, y)

    const _c = colors.element(_i)

    // Calculate distance with warp
    const dist = length(_uv.sub(pos))
    const warpedDist = mul(dist, sin(mul(_time, 2).add(mul(i, PI))))
    const distPow = pow(max(0.1, warpedDist), 3.5)

    // Calculate weight
    const weight = div(1, distPow)

    // Accumulate
    finalColor.addAssign(_c.mul(weight))
    totalWeight.addAssign(weight)
  })

  // Normalize
  finalColor.divAssign(totalWeight)
  
  // Add grain
  const grain = grainTextureEffect(uv0).mul(0.08)
  finalColor.addAssign(grain)

  return finalColor
})

export default mesh6
