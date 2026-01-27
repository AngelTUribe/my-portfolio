"use client"

import { useEffect, useRef } from "react"

type Dot = {
  x: number
  y: number
  originX: number
  originY: number
  vx: number
  vy: number
  delay: number
  phase: number
}

export default function NameParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const dotsRef = useRef<Dot[]>([])
  const pointerRef = useRef<{ x: number; y: number; down: boolean }>({
    x: -9999,
    y: -9999,
    down: false,
  })
  const animationRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const isMobileLike =
      typeof window !== "undefined" &&
      window.matchMedia &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches)

    const MAX_DOTS = 1400

    const createDotsFromText = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (!width || !height) return

      canvas.width = width
      canvas.height = height

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const text = "ANGEL URIBE"
      const fontSize = Math.min(width * 0.14, height * 0.5)
      ctx.font = `700 ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont`

      ctx.fillText(text, width / 2, height / 2)

      const imageData = ctx.getImageData(0, 0, width, height).data

      const rawDots: Dot[] = []
      const gap = Math.max(4, Math.floor(width / 260))

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const idx = (y * width + x) * 4
          const alpha = imageData[idx + 3]
          if (alpha > 80) {
            rawDots.push({
              x,
              y,
              originX: x,
              originY: y,
              vx: 0,
              vy: 0,
              delay: Math.random() * 0.55,
              phase: Math.random() * Math.PI * 2,
            })
          }
        }
      }

      let dots: Dot[]
      if (rawDots.length > MAX_DOTS) {
        const step = Math.ceil(rawDots.length / MAX_DOTS)
        dots = []
        for (let i = 0; i < rawDots.length; i += step) dots.push(rawDots[i])
      } else {
        dots = rawDots
      }

      dotsRef.current = dots
      ctx.clearRect(0, 0, width, height)
      startRef.current = null
    }

    const drawFullyStaticOnce = () => {
      const width = canvas.width
      const height = canvas.height
      const dots = dotsRef.current

      ctx.clearRect(0, 0, width, height)

      const maxDist = 30

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        ctx.beginPath()
        ctx.arc(d.originX, d.originY, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(199,210,254,0.75)"
        ctx.fill()
      }

      for (let i = 0; i < dots.length; i++) {
        const d1 = dots[i]
        let connections = 0

        for (let j = i + 1; j < dots.length && connections < 5; j++) {
          const d2 = dots[j]
          const dx = d1.originX - d2.originX
          const dy = d1.originY - d2.originY
          const distSq = dx * dx + dy * dy

          if (distSq < maxDist * maxDist) {
            connections++
            const alpha = 0.12 * (1 - distSq / (maxDist * maxDist))
            ctx.beginPath()
            ctx.moveTo(d1.originX, d1.originY)
            ctx.lineTo(d2.originX, d2.originY)
            ctx.strokeStyle = `rgba(129,140,248,${alpha})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      }
    }

    const renderInteractive = () => {
      const width = canvas.width
      const height = canvas.height
      const dots = dotsRef.current
      const pointer = pointerRef.current

      if (!startRef.current) startRef.current = performance.now() / 1000
      const now = performance.now() / 1000
      const t = now - startRef.current

      ctx.clearRect(0, 0, width, height)

      const repelRadius = 110
      const dragRadius = 80
      const maxDist = 30

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]

        const dx = d.x - pointer.x
        const dy = d.y - pointer.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1

        if (dist < repelRadius) {
          const force = (repelRadius - dist) / repelRadius
          const nx = dx / dist
          const ny = dy / dist
          d.vx += nx * force * 1.1
          d.vy += ny * force * 1.1
        }

        if (pointer.down && dist < dragRadius) {
          const pull = (dragRadius - dist) / dragRadius
          d.vx -= (dx / dist) * pull * 1.4
          d.vy -= (dy / dist) * pull * 1.4
        }

        const ox = d.originX - d.x
        const oy = d.originY - d.y
        d.vx += ox * 0.018
        d.vy += oy * 0.018

        d.vx *= 0.9
        d.vy *= 0.9

        d.x += d.vx
        d.y += d.vy
      }

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        const fade = t <= d.delay ? 0 : Math.min(1, (t - d.delay) / 0.5)
        if (fade <= 0) continue

        const breath = 0.85 + 0.25 * Math.sin((t + d.phase) * 2.2)
        const alpha = 0.25 + 0.55 * fade * breath

        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(199,210,254,${alpha})`
        ctx.fill()
      }

      for (let i = 0; i < dots.length; i++) {
        const d1 = dots[i]
        const fade1 = t <= d1.delay ? 0 : Math.min(1, (t - d1.delay) / 0.5)
        if (fade1 <= 0.4) continue

        let connections = 0
        for (let j = i + 1; j < dots.length && connections < 5; j++) {
          const d2 = dots[j]
          const dx = d1.x - d2.x
          const dy = d1.y - d2.y
          const distSq = dx * dx + dy * dy

          if (distSq < maxDist * maxDist) {
            connections++
            const alpha = 0.12 * (1 - distSq / (maxDist * maxDist)) * fade1
            ctx.beginPath()
            ctx.moveTo(d1.x, d1.y)
            ctx.lineTo(d2.x, d2.y)
            ctx.strokeStyle = `rgba(129,140,248,${alpha})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      }

      animationRef.current = requestAnimationFrame(renderInteractive)
    }

    const updatePointerFromEvent = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect()
      pointerRef.current.x = clientX - rect.left
      pointerRef.current.y = clientY - rect.top
    }

    const handlePointerMove = (e: PointerEvent) => {
      updatePointerFromEvent(e.clientX, e.clientY)
    }

    const handlePointerLeave = () => {
      pointerRef.current.x = -9999
      pointerRef.current.y = -9999
      pointerRef.current.down = false
    }

    const handlePointerDown = (e: PointerEvent) => {
      updatePointerFromEvent(e.clientX, e.clientY)
      pointerRef.current.down = true
    }

    const handlePointerUp = () => {
      pointerRef.current.down = false
    }

    let lastW = 0
    let lastH = 0

    const rebuildIfSizeChanged = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return
      if (w === lastW && h === lastH) return
      lastW = w
      lastH = h

      createDotsFromText()

      if (isMobileLike) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
        animationRef.current = null
        drawFullyStaticOnce()
      }
    }

    window.addEventListener("resize", rebuildIfSizeChanged)

    rebuildIfSizeChanged()

    if (isMobileLike) {
      return () => {
        window.removeEventListener("resize", rebuildIfSizeChanged)
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
      }
    }

    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerleave", handlePointerLeave)
    canvas.addEventListener("pointerdown", handlePointerDown)
    window.addEventListener("pointerup", handlePointerUp)

    renderInteractive()

    return () => {
      window.removeEventListener("resize", rebuildIfSizeChanged)
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerleave", handlePointerLeave)
      canvas.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("pointerup", handlePointerUp)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-[260px] sm:h-[300px] lg:h-[340px]"
      />
    </div>
  )
}
