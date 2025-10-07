import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useEffect, useRef, useState } from 'react'
import WebGPUScene from '@/components/canvas/webgpu_scene'
import { WebGPUSketch } from '@/components/canvas/webgpu_sketch'
import { SketchesDropdown } from '@/components/sketches_dropdown'

export const Route = createFileRoute('/sketches/$')({
  component: RouteComponent,
})

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload()
  })
}

function RouteComponent() {
  const { _splat: sketchPath } = Route.useParams()

  const [module, setModule] = useState<any>({})
  const [copied, setCopied] = useState(false)

  // Updated glob pattern to include subfolders
  const sketches: Record<string, { default: () => any }> = import.meta.glob('../sketches/**/*.ts', { eager: true })

  useEffect(() => {
    // Convert URL path to file path
    const filePath = `../sketches/${sketchPath}.ts`
    const mod = sketches[filePath]

    if (mod) {
      setModule({ colorNode: mod.default })
    } else {
      console.error('Sketch not found:', sketchPath)
    }
  }, [sketchPath])

  const ref = useRef<any>(null)

  const { colorNode } = module

  const generateEmbedCode = () => {
    const deployedUrl = window.location.origin
    return `<!-- Embed ${sketchPath} fragment -->
<iframe 
  src="${deployedUrl}/sketches/${sketchPath}"
  width="100%" 
  height="600px"
  frameborder="0"
  style="border: none; display: block;">
</iframe>

<!-- For full viewport height: -->
<iframe 
  src="${deployedUrl}/sketches/${sketchPath}"
  width="100%" 
  height="100vh"
  frameborder="0"
  style="border: none; display: block;">
</iframe>`
  }

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(generateEmbedCode())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

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

      <SketchesDropdown />
      
      {/* Copy Embed Code Button */}
      <button
        onClick={copyEmbedCode}
        style={{
          position: 'fixed',
          top: '20px',
          left: '190px',
          zIndex: 10,
          padding: '12px 20px',
          background: copied ? '#16a34a' : '#000',
          border: 'none',
          borderRadius: '0',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          letterSpacing: '0.03em',
          fontFamily: 'inherit'
        }}
        onMouseEnter={(e) => {
          if (!copied) {
            e.currentTarget.style.background = '#1a1a1a'
          }
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            e.currentTarget.style.background = '#000'
          }
        }}
      >
        {copied ? '✓ Copied!' : '📋 Copy Embed Code'}
      </button>
    </section>
  )
}
