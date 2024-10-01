'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Glasses, Palmtree, Mountain, TreePine, Brain, Camera } from 'lucide-react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as faceapi from 'face-api.js'

// 3D Model component
function Model({ url }) {
    const gltf = useLoader(GLTFLoader, url)
    return <primitive object={gltf.scene} scale={[0.01, 0.01, 0.01]} />
}

// Environment component
function SceneEnvironment({ name }) {
    return <Environment preset={name} background />
}

// Main XR Experience component
export default function XRExperience() {
    const [currentScene, setCurrentScene] = useState(null)
    const [aiRecommendation, setAiRecommendation] = useState(null)
    const [mood, setMood] = useState(null)
    const videoRef = useRef()
    const canvasRef = useRef()

    const scenes = [
        { name: 'Beach', icon: Palmtree, environment: 'sunset', model: '/assets/3d/beach_chair.glb' },
        { name: 'Mountain', icon: Mountain, environment: 'dawn', model: '/assets/3d/mountain.glb' },
        { name: 'Forest', icon: TreePine, environment: 'forest', model: '/assets/3d/tree.glb' },
    ]

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
            await faceapi.nets.faceExpressionNet.loadFromUri('/models')
        }
        loadModels()
    }, [])

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: {} })
            .then((stream) => {
                videoRef.current.srcObject = stream
            })
            .catch((err) => console.error(err))
    }

    const handleVideoPlay = () => {
        setInterval(async () => {
            if (videoRef.current) {
                const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                    .withFaceExpressions()

                if (detections) {
                    const dominantMood = Object.keys(detections.expressions).reduce((a, b) =>
                        detections.expressions[a] > detections.expressions[b] ? a : b
                    )
                    setMood(dominantMood)
                }
            }
        }, 1000)
    }

    const getAiRecommendation = () => {
        const recommendations = [
            "Based on your travel history and current mood, we recommend the Beach scene to help you relax before your upcoming flight.",
            "Your recent search for ski resorts and excited mood suggests you might enjoy our Mountain XR experience.",
            "To prepare for your upcoming trip to the Amazon and calm your nerves, try our immersive Forest experience.",
        ]
        setAiRecommendation(recommendations[Math.floor(Math.random() * recommendations.length)])
    }

    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight mb-6">XR Experience</h2>
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Mood Detection</CardTitle>
                        <CardDescription>We'll analyze your mood to enhance your XR experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video bg-muted rounded-md overflow-hidden">
                            <video ref={videoRef} onPlay={handleVideoPlay} autoPlay muted />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={startVideo} className="w-full">
                            <Camera className="mr-2 h-4 w-4" />
                            Start Mood Detection
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>AI Recommendation</CardTitle>
                        <CardDescription>Get a personalized XR experience recommendation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {mood && (
                            <Alert className="mb-4">
                                <Brain className="h-4 w-4" />
                                <AlertTitle>Detected Mood</AlertTitle>
                                <AlertDescription>You seem to be feeling {mood}</AlertDescription>
                            </Alert>
                        )}
                        {aiRecommendation && (
                            <Alert>
                                <Brain className="h-4 w-4" />
                                <AlertTitle>AI Recommendation</AlertTitle>
                                <AlertDescription>{aiRecommendation}</AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                    <CardFooter>
                        <Button onClick={getAiRecommendation} className="w-full">Get AI Recommendation</Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-3 mt-6">
                {scenes.map((scene) => (
                    <Card key={scene.name}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <scene.icon className="h-5 w-5" />
                                {scene.name}
                            </CardTitle>
                            <CardDescription>Experience a virtual {scene.name.toLowerCase()} environment</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                <Glasses className="h-12 w-12 text-muted-foreground" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={() => setCurrentScene(scene)} className="w-full">
                                Enter {scene.name}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {currentScene && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <Card className="w-full max-w-4xl h-[600px]">
                        <CardHeader>
                            <CardTitle>Immersive {currentScene.name} Experience</CardTitle>
                            <CardDescription>You are now in a virtual {currentScene.name.toLowerCase()} environment.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[450px]">
                            <Canvas>
                                <OrbitControls />
                                <SceneEnvironment name={currentScene.environment} />
                                <Model url={currentScene.model} />
                            </Canvas>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={() => setCurrentScene(null)}>Exit</Button>
                            <Button>Interact</Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    )
}