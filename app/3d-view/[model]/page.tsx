'use client'

import { useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function ThreeDView() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { model } = useParams()

    useEffect(() => {
        if (!containerRef.current) return

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer()

        renderer.setSize(window.innerWidth, window.innerHeight)
        containerRef.current.appendChild(renderer.domElement)

        const loader = new GLTFLoader()
        loader.load(
            `/models/${model}.glb`,
            (gltf) => {
                scene.add(gltf.scene)
            },
            undefined,
            (error) => {
                console.error('An error happened', error)
            }
        )

        camera.position.z = 5

        const animate = () => {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }

        animate()

        return () => {
            containerRef.current?.removeChild(renderer.domElement)
        }
    }, [model])

    return <div ref={containerRef} />
}
