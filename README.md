# Fragments Lab

Your personal collection of WebGPU shader fragments, built on the [fragments.supply boilerplate](https://github.com/phobon/fragments-boilerplate).

## 🚀 Quick Start

The dev server is already running! Visit:

**http://localhost:5173/sketches/mesh5**

## 📦 What's Included

- ✅ **mesh5** - Animated mesh gradient (your first fragment!)
- ✅ **flare-1** - Example gradient sketch
- ✅ **dawn-1** - Example nested sketch
- ✅ All TSL utilities (noise, color, post-processing, etc.)
- ✅ Auto-routing for all fragments
- ✅ Debug controls (Leva)

## 🎨 Add More Fragments

Just drop a `.ts` file in `src/sketches/` and it's instantly available!

```bash
# Example: Add mesh6
# 1. Create: src/sketches/mesh6.ts
# 2. Visit: http://localhost:5173/sketches/mesh6
```

**Check EMBED_GUIDE.md for complete instructions!**

## 🌐 Embed in Elementor/WordPress

```html
<iframe 
  src="http://localhost:5173/sketches/mesh5"
  width="100%" 
  height="600px"
  style="border: none;">
</iframe>
```

After deploying to Vercel, change `localhost:5173` to your Vercel URL.

## 📖 Documentation

- **[EMBED_GUIDE.md](./EMBED_GUIDE.md)** - Complete embed & customization guide
- **[fragments.supply](https://fragments.supply)** - Browse 100+ fragments to add
- **[Boilerplate Docs](https://github.com/phobon/fragments-boilerplate)** - Technical docs

## 🚢 Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "My fragments collection"
git push

# 2. Connect on Vercel.com
# 3. Done! Your fragments are live at:
#    https://your-project.vercel.app/sketches/mesh5
```

## 💡 Tips

- Visit any fragment at `/sketches/[name]`
- Organize in folders: `/sketches/gradients/mesh6`
- Copy fragments from fragments.supply
- Customize colors, speeds, and patterns
- All TSL utilities available in `src/tsl/`

## 📝 License

CC BY-NC-SA 4.0 - Attribute creators, share modifications under same license

---

**Ready to add more?** Check [EMBED_GUIDE.md](./EMBED_GUIDE.md) for step-by-step instructions!
