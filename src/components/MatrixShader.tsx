'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Fondo animado: lluvia de caracteres que se deforma alrededor del cursor.
 *
 * El lienzo es el fondo real del sitio, no una capa encima: el shader parte del
 * color `ink` de la marca y le suma la lluvia, así que no hace falta transparencia
 * ni un color de respaldo que cuadre con él. `html` lleva ese mismo ink por CSS
 * para cubrir el instante previo a que WebGL arranque, y por si no hay WebGL.
 *
 * Cuatro frenos, porque esto corre a pantalla completa y de forma continua:
 *   · se detiene con la pestaña en segundo plano
 *   · el pixel ratio se limita a 1.5 (en Retina, 2 significa 4x de píxeles)
 *   · con `prefers-reduced-motion` pinta un solo fotograma y para
 *   · si no hay WebGL, se retira y deja el fondo CSS
 */

const VERTEX_SHADER = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec2 iMouse;

  // Base más oscura que el ink de marca (#051A24) para que el fondo no se lea
  // azuloso. html en globals.css usa este mismo tono para el arranque.
  const vec3 BASE = vec3(0.0118, 0.0549, 0.0784); // ~#030E14

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
    vec2 mouse = (iMouse * 2.0 - iResolution) / iResolution.y;

    float dist = length(uv - mouse);
    float warp = smoothstep(0.5, 0.0, dist);
    uv += normalize(uv - mouse) * warp * 0.2;

    float gridSize = 30.0;
    vec2 gridUv = fract(uv * gridSize);
    vec2 gridId = floor(uv * gridSize);

    float t = iTime * 2.0;
    float fall = fract(gridId.y * 0.1 - t * 0.5 + random(gridId.xx) * 2.0);

    float character = random(gridId + floor(t * 5.0 * random(gridId.yx)));
    character = step(0.95, character);

    float glow = 1.0 - smoothstep(0.0, 0.8, gridUv.y);
    float intensity = character * glow * fall;

    // Menos azul: color1 tira a turquesa en vez de azul puro
    vec3 color1 = vec3(0.12, 0.32, 0.6);
    vec3 color2 = vec3(0.1, 0.8, 0.5);
    vec3 rain = mix(color1, color2, random(gridId)) * intensity;
    rain *= (1.0 - random(gridId + t) * 0.2);

    // Muy atenuado: la lluvia es un detalle, no el protagonista. El texto va
    // encima y tiene que ganar siempre.
    gl_FragColor = vec4(BASE + rain * 0.28, 1.0);
  }
`

export default function MatrixShader() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true })
    } catch (err) {
      // Sin WebGL el fondo CSS de `html` ya deja el sitio legible
      console.error('WebGL no disponible:', err)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const clock = new THREE.Clock()

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      // Arranca en el centro; en (0,0) la deformación se pega a una esquina
      iMouse: { value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) },
    }

    const geometry = new THREE.PlaneGeometry(2, 2)
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
    })
    scene.add(new THREE.Mesh(geometry, material))

    const onResize = () => {
      const { clientWidth: w, clientHeight: h } = container
      renderer.setSize(w, h)
      uniforms.iResolution.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio())
    }
    onResize()

    const onPointerMove = (e: PointerEvent) => {
      const ratio = renderer.getPixelRatio()
      // Y invertida: en WebGL el origen está abajo a la izquierda
      uniforms.iMouse.value.set(e.clientX * ratio, (container.clientHeight - e.clientY) * ratio)
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const start = () => {
      if (reduceMotion.matches) {
        renderer.render(scene, camera) // un fotograma y nada más
        return
      }
      renderer.setAnimationLoop(() => {
        uniforms.iTime.value = clock.getElapsedTime()
        renderer.render(scene, camera)
      })
    }
    const stop = () => renderer.setAnimationLoop(null)

    // En segundo plano no se ve nada: no tiene sentido seguir gastando GPU
    const onVisibility = () => (document.hidden ? stop() : start())

    start()
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove)
    document.addEventListener('visibilitychange', onVisibility)
    reduceMotion.addEventListener('change', () => {
      stop()
      start()
    })

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
      stop()
      renderer.domElement.parentNode?.removeChild(renderer.domElement)
      material.dispose()
      geometry.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="fixed inset-0 -z-10 h-screen w-screen pointer-events-none"
    />
  )
}
