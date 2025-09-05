import WebGPUScene from '@/components/canvas/webgpu_scene'
import { WebGPUSketch } from '@/components/canvas/webgpu_sketch'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useRef } from 'react'
import { Fn, oscSine, time, uv, vec3 } from 'three/tsl'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const ref = useRef<any>(null)

  const colorNode = Fn(() => vec3(uv(), oscSine(time.mul(0.5))))

  return (
    <section className='fragments-boilerplate__main__canvas' ref={ref}>
      <Suspense fallback={null}>
        <WebGPUScene
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
          }}
          eventSource={ref}
          eventPrefix='client'
        >
          <WebGPUSketch colorNode={colorNode()} />
        </WebGPUScene>
      </Suspense>
    </section>
  )
}
