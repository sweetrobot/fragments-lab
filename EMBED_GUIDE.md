# Fragments Lab - Embed Guide

Welcome to your fragments collection! This project is built using the fragments.supply boilerplate and makes it easy to add and embed beautiful WebGPU shader fragments.

## Quick Start

### View Your Fragments

1. **Development Server**: Already running at http://localhost:5173/
2. **View mesh5**: Navigate to http://localhost:5173/sketches/mesh5

### How to Embed

Each fragment automatically gets its own URL that you can embed in Elementor or any website:

#### Method 1: Direct Iframe Embed (Simplest)

```html
<!-- Embed mesh5 -->
<iframe 
  src="http://localhost:5173/sketches/mesh5"
  width="100%" 
  height="600px"
  frameborder="0"
  style="border: none; display: block;">
</iframe>
```

#### Method 2: Responsive Embed

```html
<div style="position: relative; width: 100%; padding-bottom: 56.25%; /* 16:9 aspect ratio */">
  <iframe 
    src="http://localhost:5173/sketches/mesh5"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;">
  </iframe>
</div>
```

#### Method 3: Full Screen Background

```html
<iframe 
  src="http://localhost:5173/sketches/mesh5"
  style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; border: none; z-index: -1;">
</iframe>
```

## Adding More Fragments

### From fragments.supply

1. Visit https://www.fragments.supply/sketches
2. Find a fragment you like (e.g., mesh-6, mesh-7, etc.)
3. Copy the sketch code
4. Create a new file: `src/sketches/your-fragment-name.ts`
5. Paste and adapt the code (use mesh5.ts as a reference)
6. It automatically becomes available at `/sketches/your-fragment-name`

### Example: Add Mesh 6

```typescript
// src/sketches/mesh6.ts
import { Fn, vec3, uv } from 'three/tsl'

const mesh6 = Fn(() => {
  const _uv = uv()
  // Your shader code here
  return vec3(_uv, 0.5)
})

export default mesh6
```

That's it! Now visit: http://localhost:5173/sketches/mesh6

## Organizing Fragments

You can organize fragments in folders:

```
src/sketches/
├── mesh5.ts                    → /sketches/mesh5
├── gradients/
│   ├── mesh6.ts               → /sketches/gradients/mesh6
│   └── mesh7.ts               → /sketches/gradients/mesh7
└── particles/
    └── flocks.ts              → /sketches/particles/flocks
```

## Customizing Fragments

### Change Colors

```typescript
const colors = uniformArray([
  new Color('#your-color-1'),
  new Color('#your-color-2'),
  new Color('#your-color-3'),
  new Color('#your-color-4'),
])
```

### Adjust Animation Speed

```typescript
const _time = time.mul(0.5)  // Slower
const _time = time.mul(2.0)  // Faster
```

### Modify Patterns

Edit the loop iterations, mathematical functions, or add new effects. Check the TSL utilities in `src/tsl/` for available functions.

## Deployment

### Deploy to Vercel

1. Push to GitHub:
```bash
git add .
git commit -m "Add fragments"
git push origin main
```

2. Connect to Vercel:
   - Go to https://vercel.com
   - Import your repository
   - Deploy

3. Your fragments will be available at:
   - `https://your-project.vercel.app/sketches/mesh5`
   - `https://your-project.vercel.app/sketches/mesh6`
   - etc.

### Update Embed Codes

After deployment, update your iframe src to use your Vercel URL:

```html
<iframe 
  src="https://your-project.vercel.app/sketches/mesh5"
  width="100%" 
  height="600px">
</iframe>
```

## Available Fragments

Currently available:
- **mesh5** - Animated mesh gradient with color blending
- **flare-1** - Gradient sketch with fractionated coordinates (example)
- **dawn-1** - (in nested folder - example)

## TSL Utilities Available

Your fragments can use these built-in utilities from `src/tsl/`:

### Noise
- `turbulence` - Layered noise
- `simplexNoise3d` - 3D simplex noise
- `perlinNoise3d` - 3D perlin noise
- `curlNoise3d` - 3D curl noise
- `fbm` - Fractional brownian motion

### Post Processing
- `grainTextureEffect` - Film grain effect
- `lcdEffect` - LCD screen effect

### Color
- `cosinePalette` - Cosine-based color palettes
- `tonemapping` - HDR tonemapping functions

### Math & SDF
- Complex number operations
- 2D/3D shapes and operations
- Domain repetition functions

## Tips

1. **Always use `export default`** for your fragment function
2. **TypeScript warnings are normal** with TSL - they don't affect runtime
3. **Test locally first** before deploying
4. **Keep fragments simple** - complex shaders may slow down on mobile
5. **Attribution matters** - Credit the original creator when adapting

## Support

- **Boilerplate docs**: https://github.com/phobon/fragments-boilerplate
- **fragments.supply**: https://fragments.supply
- **Three.js TSL**: https://threejs.org/docs/#api/en/nodes/Nodes

## License

Fragments are licensed under CC BY-NC-SA 4.0:
- ✅ Share and adapt freely
- ✅ Use modified versions commercially
- ❌ Don't sell original unmodified sketches
- ✅ Attribute original creators
- ✅ Share modifications under same license
