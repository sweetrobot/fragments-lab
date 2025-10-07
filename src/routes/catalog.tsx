import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import WebGPUScene from '@/components/canvas/webgpu_scene'
import { WebGPUSketch } from '@/components/canvas/webgpu_sketch'
import { Suspense } from 'react'

export const Route = createFileRoute('/catalog')({
  component: Catalog,
})

// Available fragments
const fragments = [
  { id: 'mesh5', title: 'Mesh 5', description: 'Animated mesh gradient' },
  { id: 'mesh6', title: 'Mesh 6', description: 'Warped mesh gradient' },
  { id: 'mesh7', title: 'Mesh 7', description: 'Distorted gradient' },
  { id: 'flare-1', title: 'Flare 1', description: 'Fractionated gradient' },
]

function Catalog() {
  const [selectedFragment, setSelectedFragment] = useState(fragments[0].id)
  const [copied, setCopied] = useState(false)
  const [fragmentNode, setFragmentNode] = useState<any>(null)

  const currentFragment = fragments.find(f => f.id === selectedFragment)

  // Load fragment when selection changes
  useEffect(() => {
    const loadFragment = async () => {
      try {
        const module = await import(`../sketches/${selectedFragment}.ts`)
        if (module.default) {
          setFragmentNode(module.default())
        }
      } catch (error) {
        console.error('Failed to load fragment:', error)
        setFragmentNode(null)
      }
    }
    loadFragment()
  }, [selectedFragment])

  const generateEmbedCode = () => {
    return `<!-- Embed ${currentFragment?.title} -->
<div id="fragment-${selectedFragment}"></div>
<script type="module">
  // Copy the fragment code from fragments-lab/src/sketches/${selectedFragment}.ts
  // and include Three.js WebGPU dependencies
  // Visit https://your-domain.vercel.app/sketches/${selectedFragment} for the live version
</script>

<!-- Or use iframe embed: -->
<iframe 
  src="https://your-domain.vercel.app/sketches/${selectedFragment}"
  width="100%" 
  height="600px"
  style="border: none;">
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
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      display: 'flex',
      flexDirection: 'column',
      background: '#000'
    }}>
      {/* Fragment Selector - Upper Left */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        minWidth: '250px'
      }}>
        <h3 style={{ 
          margin: '0 0 12px 0', 
          color: '#fff', 
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Select Fragment
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {fragments.map(fragment => (
            <button
              key={fragment.id}
              onClick={() => setSelectedFragment(fragment.id)}
              style={{
                padding: '10px 12px',
                background: selectedFragment === fragment.id 
                  ? 'rgba(100, 150, 255, 0.3)' 
                  : 'rgba(255, 255, 255, 0.05)',
                border: selectedFragment === fragment.id
                  ? '1px solid rgba(100, 150, 255, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                fontSize: '13px'
              }}
              onMouseEnter={(e) => {
                if (selectedFragment !== fragment.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedFragment !== fragment.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              <div style={{ fontWeight: 600 }}>{fragment.title}</div>
              <div style={{ 
                fontSize: '11px', 
                opacity: 0.7,
                marginTop: '2px'
              }}>
                {fragment.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Copy Embed Code Button - Bottom Left */}
      <button
        onClick={copyEmbedCode}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          zIndex: 10,
          padding: '14px 24px',
          background: copied 
            ? 'rgba(50, 200, 100, 0.3)' 
            : 'rgba(100, 150, 255, 0.3)',
          border: copied
            ? '1px solid rgba(50, 200, 100, 0.5)'
            : '1px solid rgba(100, 150, 255, 0.5)',
          borderRadius: '8px',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s ease',
          letterSpacing: '0.03em'
        }}
        onMouseEnter={(e) => {
          if (!copied) {
            e.currentTarget.style.background = 'rgba(100, 150, 255, 0.4)'
          }
        }}
        onMouseLeave={(e) => {
          if (!copied) {
            e.currentTarget.style.background = 'rgba(100, 150, 255, 0.3)'
          }
        }}
      >
        {copied ? '✓ Copied!' : '📋 Copy Embed Code'}
      </button>

      {/* Full Screen Canvas */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Suspense fallback={null}>
          <WebGPUScene
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
            }}
            eventPrefix='client'
          >
            {fragmentNode && <WebGPUSketch colorNode={fragmentNode} />}
          </WebGPUScene>
        </Suspense>
      </div>
    </div>
  )
}
