"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { useMemo, useRef, useEffect } from "react"

function WaveField() {
    const groupRef = useRef<THREE.Group>(null)
    const pointsRef = useRef<THREE.Points>(null)
    const scrollRef = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const { scrollY, innerHeight } = window
            const docHeight = document.documentElement.scrollHeight
            const maxScroll = docHeight - innerHeight || 1
            const t = Math.min(Math.max(scrollY / maxScroll, 0), 1)
            scrollRef.current = t
        }
        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const { positions, colors } = useMemo(() => {
        const cols = 220
        const rows = 85
        const total = cols * rows

        const pos = new Float32Array(total * 3)
        const col = new Float32Array(total * 3)

        const colorLow = new THREE.Color("#020817")   
        const colorMid = new THREE.Color("#4f46e5")   
        const colorHigh = new THREE.Color("#a855f7")  

        const width = 90
        const depth = 90

        let i = 0
        for (let zi = 0; zi < rows; zi++) {
            for (let xi = 0; xi < cols; xi++) {
                const i3 = i * 3

                const u = (xi / (cols - 1)) * 2 - 1
                const v = (zi / (rows - 1)) * 2 - 1

                const baseX = u * width * 0.5
                const baseZ = v * depth * 0.5

                const jitterScaleX = 0.8
                const jitterScaleZ = 0.8
                const px = baseX + (Math.random() - 0.5) * jitterScaleX
                const pz = baseZ + (Math.random() - 0.5) * jitterScaleZ

                pos[i3 + 0] = px
                pos[i3 + 1] = 0
                pos[i3 + 2] = pz

                const t = (v + 1) / 2 
                const grad = colorLow
                    .clone()
                    .lerp(colorMid, t * 1.1)
                    .lerp(colorHigh, t * 0.8)

                const brightness = 1.1 + Math.random() * 0.6

                col[i3 + 0] = grad.r * brightness
                col[i3 + 1] = grad.g * brightness
                col[i3 + 2] = grad.b * brightness

                i++
            }
        }

        return { positions: pos, colors: col }
    }, [])

    useFrame((state, delta) => {
        const pts = pointsRef.current
        const t = scrollRef.current
        const time = state.clock.getElapsedTime()

        if (pts) {
            const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute

            for (let i = 0; i < posAttr.count; i++) {
                const x = posAttr.getX(i)
                const z = posAttr.getZ(i)

                const nx = x * 0.12
                const nz = z * 0.12

                const wave =
                    Math.sin(nx + time * 1.0) +
                    Math.cos(nz * 1.4 - time * 0.8) +
                    Math.sin((nx * nx + nz * nz) * 0.25 + time * 0.6)

                const y = wave * 2.8

                posAttr.setY(i, y)
            }

            posAttr.needsUpdate = true
        }

        const g = groupRef.current
        if (g) {
            g.rotation.x = -0.9
            const baseSpin = 0.14
            const minSpin = 0.05
            const spin = baseSpin - (baseSpin - minSpin) * t
            g.rotation.y += spin * delta
            g.rotation.z = Math.sin(time * 0.12) * 0.05
        }

        const cam = state.camera

        const start = {
            x: -18,
            y: 22,
            z: 46, 
        }

        const end = {
            x: 0,
            y: 10,
            z: 24,
        }

        cam.position.x =
            start.x + (end.x - start.x) * t + Math.sin(time * 0.1) * (2 * (1 - t))
        cam.position.y = start.y + (end.y - start.y) * t
        cam.position.z = start.z + (end.z - start.z) * t

        cam.lookAt(0, 0, 0)
    })

    return (
        <group ref={groupRef}>
            <Points
                ref={pointsRef}
                positions={positions}
                colors={colors}
                stride={3}
            >
                <PointMaterial
                    transparent
                    vertexColors
                    size={0.09}               
                    sizeAttenuation              
                    depthWrite={false}
                    opacity={0.95}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    )
}

export default function InteractiveBackground() {
    return (
        <div className="pointer-events-none fixed inset-0 -z-10">
            <Canvas
                className="w-full h-full"
                camera={{ fov: 60, position: [-18, 22, 46] }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <color attach="background" args={["#020817"]} />
                <WaveField />
            </Canvas>
        </div>
    )
}
