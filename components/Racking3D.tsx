import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AlertTriangle } from 'lucide-react';

const Racking3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError, setWebglError] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer | null = null;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    try {
      renderer = new THREE.WebGLRenderer({ 
        antialias: window.devicePixelRatio < 2, 
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      try {
        renderer = new THREE.WebGLRenderer({ 
          antialias: false, 
          alpha: true 
        });
      } catch (e2) {
        console.error("Racking3D: WebGL initialization failed", e2);
        setWebglError(true);
        return;
      }
    }

    if (!renderer) return;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xA3E635, 2, 50);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create Racking Grid
    const railMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
    const palletMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const rackingGroup = new THREE.Group();

    for (let x = -3; x <= 3; x++) {
      for (let z = -3; z <= 3; z++) {
        // Vertical beams
        const beam = new THREE.Mesh(new THREE.BoxGeometry(0.1, 8, 0.1), railMat);
        beam.position.set(x * 2, 0, z * 2);
        rackingGroup.add(beam);

        // Horizontal rails
        if (x < 3) {
          const rail = new THREE.Mesh(new THREE.BoxGeometry(2, 0.05, 0.05), railMat);
          rail.position.set(x * 2 + 1, 0, z * 2);
          rackingGroup.add(rail);
        }

        // Dummy Pallets
        if (Math.random() > 0.3) {
          const pallet = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 0.8), palletMat);
          pallet.position.set(x * 2, (Math.floor(Math.random() * 4) - 2) * 2, z * 2);
          rackingGroup.add(pallet);
        }
      }
    }
    scene.add(rackingGroup);

    // Animated Shuttle (The Taxi)
    const shuttle = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.3, 1), new THREE.MeshStandardMaterial({ color: 0xA3E635, emissive: 0xA3E635, emissiveIntensity: 0.5 }));
    scene.add(shuttle);

    camera.position.set(15, 10, 15);
    camera.lookAt(0, 0, 0);

    let time = 0;
    let animationId: number;
    const animate = () => {
      if (!renderer) return;
      animationId = requestAnimationFrame(animate);
      time += 0.01;
      shuttle.position.x = Math.sin(time) * 5;
      shuttle.position.z = Math.cos(time * 0.5) * 5;
      shuttle.position.y = Math.sin(time * 0.2) * 2;
      
      rackingGroup.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !renderer) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && containerRef.current?.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  if (webglError) {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-900/50 rounded-3xl border border-white/5 p-8 text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-brandRed opacity-50" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Visualization Engine Offline</p>
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full" style={{ minHeight: '500px' }} />;
};

export default Racking3D;