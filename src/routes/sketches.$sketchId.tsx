import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useEffect, useRef, useState } from 'react'
import WebGPUScene from '@/components/canvas/webgpu_scene'
import { WebGPUSketch } from '@/components/canvas/webgpu_sketch'

export const Route = createFileRoute('/sketches/$sketchId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { sketchId } = Route.useParams()

  const [module, setModule] = useState<any>({})

  useEffect(() => {
    import(`../sketches/${sketchId}.ts`)
      .then((module) => {
        setModule({
          colorNode: module.default,
        })
      })
      .catch((error) => {
        console.error('Failed to load shader:', error)
      })
  }, [sketchId])

  const ref = useRef<any>(null)

  const { colorNode } = module

  return (
    <section className='fragments-boilerplate__main__canvas' ref={ref}>
      <Suspense fallback={null}>
        {colorNode ? (
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
        ) : null}
      </Suspense>
    </section>
  )
}
