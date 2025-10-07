/**
 * Mesh 5 - Simplified WebGPU mesh gradient
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
  length,
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
} from 'three/tsl'
import { grainTextureEffect } from '@/tsl/post_processing/grain_texture_effect'

const colors = uniformArray([
  new Color('#fff9bf'),
  new Color('#f8a097'),
  new Color('#b7dbf9'),
  new Color('#20b2aa'),
])

const mesh5 = Fn(() => {
  const _uv = screenAspectUV(screenSize)
  const uv0 = uv().toVar()
  
  const finalColor = vec3(0).toVar()
  const totalWeight = float(0).toVar()

  const _time = time.mul(0.1)
  const colorCount = 4

  // Loop through color spots
  // @ts-ignore
  Loop({ start: 0, end: colorCount }, ({ i: _i }) => {
    const i = float(_i)
    const baseAngle = mul(i, PI)

    // Calculate animated positions
    const x = sin(mul(_time, mul(i, 0.75)).add(baseAngle))
    const y = cos(mul(_time, 2).add(mul(baseAngle, 2.5)))
    const pos = vec2(x, y)

    const _c = colors.element(_i)

    // Calculate distance from current fragment to this color spot
    const dist = length(_uv.sub(pos))
    const distPow = pow(dist, 4.2)

    // Calculate weight based on distance
    const weight = div(1, max(0.01, distPow))

    // Accumulate color
    finalColor.addAssign(_c.mul(weight))
    totalWeight.addAssign(weight)
  })

  // Normalize
  finalColor.divAssign(totalWeight)
  
  // Add grain for texture
  const grain = grainTextureEffect(uv0).mul(0.1)
  finalColor.addAssign(grain)

  return finalColor
})

export default mesh5
