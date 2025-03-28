"use client"

import { useEffect, useRef } from "react"

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // Star object
    interface Star {
      x: number
      y: number
      size: number
      opacity: number
      speed: number
      depth: number
      twinkleSpeed: number
      twinkleOffset: number
    }

    // Shooting star object
    interface ShootingStar {
      x: number
      y: number
      length: number
      speed: number
      angle: number
      opacity: number
      trail: { x: number; y: number }[]
      active: boolean
      size: number
    }

    // Initialize arrays
    let stars: Star[] = []
    let shootingStars: ShootingStar[] = []

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    // Initialize stars
    function initStars() {
      stars = []
      const starCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 2000))

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.05 + 0.01,
          depth: Math.random() * 3 + 1,
          twinkleSpeed: Math.random() * 5 + 1,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    // Create a new shooting star
    function createShootingStar() {
      // Small angle variation around horizontal (0 degrees)
      const angle = (Math.random() * Math.PI) / 12 - Math.PI / 24 // Small variation around 0 radians
      const speed = Math.random() * 5 + 10
      const size = Math.random() * 2 + 1

      return {
        x: 0, // Start at the left edge
        y: Math.random() * (canvas.height * 0.7) + canvas.height * 0.15, // Random height but not too close to edges
        length: Math.random() * 80 + 50,
        speed: speed,
        angle: angle,
        opacity: 1,
        trail: [],
        active: true,
        size: size,
      }
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Draw space background
    function drawSpace() {
      time += 0.005

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0f1016")
      gradient.addColorStop(1, "#1a1b26")

      // Fill background
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle nebula
      drawNebula()

      // Draw stars with enhanced twinkling
      drawStars()

      // Update and draw shooting stars
      updateShootingStars()
      drawShootingStars()

      // Randomly create new shooting stars
      if (Math.random() < 0.01 && shootingStars.length < 3) {
        shootingStars.push(createShootingStar())
      }
    }

    // Draw subtle nebula
    function drawNebula() {
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time * 0.1) * canvas.width * 0.1,
        canvas.height * 0.5 + Math.cos(time * 0.1) * canvas.height * 0.1,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8,
      )

      nebulaGradient.addColorStop(0, "rgba(63, 81, 181, 0.03)")
      nebulaGradient.addColorStop(0.5, "rgba(103, 58, 183, 0.02)")
      nebulaGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = nebulaGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Draw stars with enhanced twinkling
    function drawStars() {
      stars.forEach((star) => {
        // Move star
        star.y += star.speed * star.depth

        // Reset star position if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        // Enhanced twinkle effect - more pronounced and varied
        const twinkle = 0.3 + Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.7
        const finalOpacity = star.opacity * twinkle

        // Draw star with slight color variation for some stars
        let starColor = `rgba(255, 255, 255, ${finalOpacity})`

        // Add slight color tint to some stars
        if (star.size > 1.2 && Math.random() < 0.3) {
          const hue = (time * 10 + star.x * 0.1) % 360
          starColor = `hsla(${hue}, 50%, 80%, ${finalOpacity})`
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * (star.depth / 3), 0, Math.PI * 2)
        ctx.fillStyle = starColor
        ctx.fill()

        // Add subtle glow to brighter stars
        if (star.size > 1 && twinkle > 0.7) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3 * (star.depth / 3), 0, Math.PI * 2)
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3 * (star.depth / 3))
          glow.addColorStop(0, `rgba(255, 255, 255, ${finalOpacity * 0.5})`)
          glow.addColorStop(1, "rgba(255, 255, 255, 0)")
          ctx.fillStyle = glow
          ctx.fill()
        }
      })
    }

    // Update shooting stars
    function updateShootingStars() {
      shootingStars.forEach((star) => {
        if (!star.active) return

        // Move shooting star
        const dx = Math.cos(star.angle) * star.speed
        const dy = Math.sin(star.angle) * star.speed

        star.x += dx
        star.y += dy

        // Add current position to trail
        star.trail.push({ x: star.x, y: star.y })

        // Limit trail length
        if (star.trail.length > 20) {
          star.trail.shift()
        }

        // Deactivate if off screen (right side)
        if (star.x > canvas.width) {
          star.active = false
        }
      })

      // Remove inactive shooting stars
      shootingStars = shootingStars.filter((star) => star.active)
    }

    // Draw shooting stars
    function drawShootingStars() {
      shootingStars.forEach((star) => {
        if (!star.active || star.trail.length < 2) return

        // Draw trail
        ctx.beginPath()
        ctx.moveTo(star.trail[0].x, star.trail[0].y)

        for (let i = 1; i < star.trail.length; i++) {
          ctx.lineTo(star.trail[i].x, star.trail[i].y)
        }

        // Create gradient for trail
        const gradient = ctx.createLinearGradient(
          star.trail[0].x,
          star.trail[0].y,
          star.trail[star.trail.length - 1].x,
          star.trail[star.trail.length - 1].y,
        )

        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
        gradient.addColorStop(0.3, `rgba(255, 255, 255, 0.3)`)
        gradient.addColorStop(1, `rgba(255, 255, 255, 0.8)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = star.size
        ctx.lineCap = "round"
        ctx.stroke()

        // Draw bright head
        const head = star.trail[star.trail.length - 1]
        ctx.beginPath()
        ctx.arc(head.x, head.y, star.size * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.fill()

        // Add glow to head
        ctx.beginPath()
        ctx.arc(head.x, head.y, star.size * 4, 0, Math.PI * 2)
        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, star.size * 4)
        glow.addColorStop(0, "rgba(255, 255, 255, 0.4)")
        glow.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = glow
        ctx.fill()
      })
    }

    // Animation loop
    function animate() {
      try {
        drawSpace()
        animationFrameId = requestAnimationFrame(animate)
      } catch (error) {
        console.error("Animation error:", error)
        cancelAnimationFrame(animationFrameId)
        time = 0
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

