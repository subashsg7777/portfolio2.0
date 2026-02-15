import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FaArrowDown } from 'react-icons/fa';

const FuturisticHero = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a0e27);
    scene.fog = new THREE.Fog(0x0a0e27, 100, 1000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 100);
    pointLight.position.set(30, 30, 30);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff00ff, 80);
    pointLight2.position.set(-30, -30, 20);
    scene.add(pointLight2);

    // Create Cyber Tech Mesh Network 3D Model
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    // Central rotating mesh sphere (data network visualization)
    const meshGeometry = new THREE.IcosahedronGeometry(12, 5);
    const meshMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0x00aaff,
      emissiveIntensity: 0.8,
      wireframe: true
    });
    const meshSphere = new THREE.Mesh(meshGeometry, meshMaterial);
    meshSphere.castShadow = true;
    meshGroup.add(meshSphere);

    // Solid mesh interior (holographic effect)
    const innerMeshGeometry = new THREE.IcosahedronGeometry(11.5, 5);
    const innerMeshMaterial = new THREE.MeshStandardMaterial({
      color: 0x0088ff,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0055ff,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.3
    });
    const innerMesh = new THREE.Mesh(innerMeshGeometry, innerMeshMaterial);
    meshGroup.add(innerMesh);

    // Orbiting data nodes (particles in circular paths)
    const nodeCount = 12;
    const nodeRadius = 25;
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.8, 8, 8);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x00ffff,
      emissiveIntensity: 1
    });

    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const angle = (i / nodeCount) * Math.PI * 2;
      node.position.x = Math.cos(angle) * nodeRadius;
      node.position.z = Math.sin(angle) * nodeRadius;
      node.position.y = Math.sin(angle * 2) * 8;
      nodes.push({
        mesh: node,
        angle: angle,
        speed: 0.002 + i * 0.0001
      });
      meshGroup.add(node);
    }

    // Connecting lines between nodes (network visualization)
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.3,
      linewidth: 1
    });

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (j - i <= 2 || (nodeCount - j + i) <= 2) {
          const lineGeometry = new THREE.BufferGeometry();
          const positions = new Float32Array([
            nodes[i].mesh.position.x, nodes[i].mesh.position.y, nodes[i].mesh.position.z,
            nodes[j].mesh.position.x, nodes[j].mesh.position.y, nodes[j].mesh.position.z
          ]);
          lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          const line = new THREE.Line(lineGeometry, connectionMaterial);
          meshGroup.add(line);
        }
      }
    }

    // Store for animation
    const meshData = { nodes, meshSphere, innerMesh };

    // Floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positionArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 200;
      positionArray[i + 1] = (Math.random() - 0.5) * 200;
      positionArray[i + 2] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      color: 0x00d4ff,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate cyber mesh network
      meshSphere.rotation.x += 0.002;
      meshSphere.rotation.y += 0.004;
      meshSphere.rotation.z += 0.001;

      innerMesh.rotation.x -= 0.001;
      innerMesh.rotation.y -= 0.003;

      // Animate orbiting nodes
      nodes.forEach((node, i) => {
        node.angle += node.speed;
        node.mesh.position.x = Math.cos(node.angle) * nodeRadius;
        node.mesh.position.z = Math.sin(node.angle) * nodeRadius;
        node.mesh.position.y = Math.sin(node.angle * 2) * 8;
        
        // Node rotation
        node.mesh.rotation.x += 0.01;
        node.mesh.rotation.y += 0.015;
      });

      // Rotate entire mesh group
      meshGroup.rotation.z += 0.0001;

      // Animate particles
      particles.rotation.x += 0.00005;
      particles.rotation.y += 0.0001;

      // Mouse interaction
      meshGroup.rotation.x += (mousePos.y * 0.0001 - meshGroup.rotation.x * 0.05) * 0.01;
      meshGroup.rotation.y += (mousePos.x * 0.0001 - meshGroup.rotation.y * 0.05) * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Mouse move handler
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center z-10 pointer-events-none"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-block px-6 py-2 bg-gradient-to-r from-pink-500/20 to-magenta-500/20 border border-pink-500/50 rounded-full backdrop-blur-sm"
          >
            <span className="font-mono text-pink-400 text-sm tracking-widest" style={{ textShadow: '0 0 10px rgba(236, 72, 153, 1), 0 0 20px rgba(236, 72, 153, 0.7)' }}>
              &gt; WELCOME_TO_MY_PORTFOLIO
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl mb-4 font-mono font-bold tracking-wider"
            style={{
              color: '#ffffff',
              textShadow: '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3), 0 0 30px rgba(59, 130, 246, 0.2)',
              letterSpacing: '0.15em',
              fontFamily: 'Courier New, monospace'
            }}
          >
            SUBASH
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-3xl mb-2 tracking-widest font-mono"
            style={{
              color: '#00ff88',
              textShadow: '0 0 10px rgba(0, 255, 136, 0.8), 0 0 20px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 255, 136, 0.4)',
              letterSpacing: '0.1em'
            }}
          >
            FULL_STACK_DEVELOPER | REACT_SPECIALIST
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="text-cyan-400/60 text-lg font-light tracking-widest mb-12"
          >
            Building the Future, One Code at a Time
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center pointer-events-auto"
          >
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-cyan-500/50"
            >
              Explore Project
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 font-bold rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <FaArrowDown className="text-cyan-400 text-2xl" />
      </motion.div>
    </section>
  );
};

export default FuturisticHero;
