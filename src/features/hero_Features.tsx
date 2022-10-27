import { ReactNode, Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame,  } from '@react-three/fiber';
import { Torus, RoundedBox, useHelper, Text3D, useProgress, Html, useGLTF, useScroll, ScrollControls, Image, Stars, Environment, Text, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import {IModelParams, IComponentsParams, ISquareParams, ITitleParams, IRectParams, ISunParams} from '@/types/index'



/**
 * Loader
 */
 function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}


/**
 * StationMesh
 */
function StationMesh() {
  const grpRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)  
  const apesanteurRef = useRef<THREE.Group>(null!)  
  const scroll = useScroll()
    // GuiSettings_Basic(refGui)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    grpRef.current.position.y =  scroll.offset * 32
    grpRef.current.rotation.y = - scroll.offset * 4.6
    meshRef.current.rotation.y += delta / 100
    apesanteurRef.current.rotation.x = -Math.PI / 12.75 + Math.cos(t / 4) / 18
    apesanteurRef.current.rotation.y = Math.sin(t / 4) / 12
    apesanteurRef.current.rotation.z = (1 + Math.sin(t / 3.5)) / 20
    apesanteurRef.current.position.y = (1 + Math.sin(t / 1.5)) / 20
  })

  return (
    <group ref={grpRef}>
      <Model name="mesh_0" position={[0, -2, 0]} rotation={[0, 0, 0]} meshColor={[8, 58, 89]} rectColor={"#6DB4F2"}/>
      <Model name="mesh_1" position={[0, -12.5, 0]} rotation={[0, Math.PI / 2, 0]} meshColor={[87, 14, 230]} rectColor={"#570EE6"}/>
      <Model name="mesh_1" position={[0, -23, 0]} rotation={[0, -Math.PI / 1, 0]}/>
      <Model name="mesh_1" position={[0, -33.5, 0]} rotation={[0, -Math.PI / 2, 0]}/>

      <Square name="SPACEFOLIO v1" position={[0, -2, 0]} >
        <group position={[0, 2.5, 0]}>
          <Component meshRef={apesanteurRef} name="mesh_2" mR={0} mM={1} />
        </group>
        <Component name="mesh_3" mR={0} mM={1} grpPos={[0, 0, 0]}/>
        <Component name="mesh_17" mR={1} mM={0} />
        <group position={[-4.18, 2.5, 2.1]} rotation={[0, Math.PI / 2, 0]}>
          <Text position={[0, 0, .20]} fontSize={0.58} color="#fff" fillOpacity={2} letterSpacing={.2} outlineOffsetX={0} > {'NAVARRO'} </Text>
          <Text position={[0, -.5, .20]} fontSize={0.58} color="#fff" fillOpacity={2} letterSpacing={.2} outlineOffsetX={0} > {'BENJAMIN'} </Text>
        </group>
      </Square>
      <Square name="COMPETENCES" position={[0, -12.5, 0]} rotation={[0, Math.PI / 2, 0]} >
        <Component name="mesh_4" mR={.5} mM={0.5} />
        <Component name="mesh_5" mR={.5} mM={0.5} />
        <group name='robot'>
          <Component name="mesh_6" mR={.5}  mM={1}  />
          <Component name="mesh_7" mR={0} mM={0} />
          <Component name="mesh_8" mR={0} mM={0} />
        </group>
          <Component name="mesh_9" mR={0} mM={1} />
          <Component name="mesh_10" mR={0} mM={1} />
          <Component name="mesh_11" mR={0} mM={1} />
          <Component name="mesh_12" mR={0} mM={1} />
          <Component name="mesh_13" mR={0} mM={1} />
          <Component name="mesh_14" mR={0} mM={1} />
          <Component meshRef={meshRef} name="mesh_15" mR={0} mM={1} meshPos={[0, 0, 0]} grpPos={[0 , -2.7, 0]} />
      </Square>
      <Square name="" position={[0, -23, 0]} rotation={[0, Math.PI, 0]} >
        <Component name="mesh_16" mR={0} mM={1} meshPos={[0, 0, 0]} />
        <group position={[1, 2.5, 1]} rotation={[0, Math.PI / 2, 0]}>
          <Text position={[0, -.5, .20]} fontSize={0.5} color="#fff" fillOpacity={2} letterSpacing={.2} outlineOffsetX={0} > {'EN CONSTRUCTION'} </Text>
        </group>
      </Square>
      <Square name="" position={[0, -33.5, 0]} rotation={[0, -Math.PI / 2, 0]} >
        <group position={[1, 2.5, 1]} rotation={[0, 0, 0]}>
          <Text position={[0, -.5, .20]} fontSize={0.5} color="#fff" fillOpacity={2} letterSpacing={.2} outlineOffsetX={0} > {'EN CONSTRUCTION'} </Text>
        </group>
      </Square>
    </group>
  )
}

function Model({ name, position, rotation, meshColor, rectColor }: IModelParams) {
  const { nodes }: any = useGLTF('/Basic.glb')
  const pointLightRef = useRef(null)
  // useHelper(pointLightRef, THREE.PointLightHelper, 1, 'yellow')
  return (
    <group position={position} rotation={rotation}>
        <HaloRect rectW={3}  rectH={.5} rectI={35} boxArgs={[.1, .5, 3]} meshColor={meshColor} rectColor={rectColor} position={[-3.9, 4.5, 0]} rotation={[0, 0, 0]}/>
        <HaloRect rectW={3}  rectH={.5} rectI={35} boxArgs={[.1, .5, 3]} meshColor={meshColor} rectColor={rectColor} position={[0, 4.5, -3.9]} rotation={[0, -Math.PI / 2, 0]}/>
        <HaloTorus rectW={2} rectH={2}  rectI={10} boxArgs={[1.4, 0.01, 5, 8]} meshColor={meshColor} rectColor={rectColor} position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}/>
        <pointLight ref={pointLightRef} castShadow position={[0, .6, 0]} color={rectColor} distance={5} intensity={10} decay={2} shadow-mapSize={[1024, 1024]} />
        <pointLight ref={pointLightRef} castShadow position={[0, 4, -4]} color={rectColor} distance={6} intensity={5} decay={2} shadow-mapSize={[1024, 1024]} />
        <pointLight ref={pointLightRef} castShadow position={[-4, 4, 0]} color={rectColor} distance={6} intensity={5} decay={2} shadow-mapSize={[1024, 1024]} />
      <mesh geometry={nodes[name].geometry}  material={nodes[name].material}  castShadow receiveShadow
        material-roughness={.5} material-metaness={.5}/>
    </group>
  )
}

function Component({ refGui, meshRef, name, grpPos, meshPos, mR, mM, ...props}: IComponentsParams) {
  const { nodes }: any = useGLTF('/Basic.glb')
  return (
    <group position={grpPos}>
        <mesh ref={meshRef} position={meshPos} geometry={nodes[name].geometry}  material={nodes[name].material} castShadow receiveShadow
          {...props}/>
    </group>
  )
}

const Square = ({ name, children, ...props }: ISquareParams) => {
  return (
    <group {...props}>
      <Title str={name} setColor={[8, 58, 89]} position={[-2.8, 3.7, 3.60]} rotation={[0, 0.98, 0]}/>
      {children}
    </group>
)}

function Title({refGui, str, setColor, ...props}: ITitleParams) {
  const rectAreaLightRef = useRef(null)
  // useHelper(rectAreaLightRef, RectAreaLightHelper, '#6DB4F2' )
  return (
    <group ref={refGui} {...props}>
      <rectAreaLight ref={rectAreaLightRef} rotation={[0, Math.PI, 0]} width={2.8} height={0.9} intensity={20} color={"#6DB4F2"}  />
      <RoundedBox args={[2.8, 0.9, 0.2]} radius={0} smoothness={1}>
        <meshBasicMaterial color={setColor} transparent opacity={0.007} toneMapped={false} />
      </RoundedBox>
      <Text3D position={[-1.35, -0.15, 0]}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.01}
        bevelThickness={0.02}
        height={0.03}
        lineHeight={0.3}
        letterSpacing={0.01}
        size={0.27}
        font="/fonts/Poppins Light_Regular.json">
          {str}
        <meshStandardMaterial />
      </Text3D>
    </group>
  )
}
function HaloRect({refGui, rectW, rectH, rectI, boxArgs, position, rotation, rectColor, meshColor}: IRectParams) {
  const rectAreaLightRef = useRef(null)
  // useHelper(rectAreaLightRef, RectAreaLightHelper, '#6DB4F2' )
  return (
    <group ref={refGui} position={position} rotation={rotation}>
      <rectAreaLight ref={rectAreaLightRef} rotation={[0, -Math.PI / 2, 0]} width={rectW} height={rectH} intensity={rectI} color={rectColor} />
      <RoundedBox args={boxArgs} radius={0.05} smoothness={1}>
        <meshBasicMaterial color={meshColor} transparent opacity={.05} toneMapped={false} />
      </RoundedBox>
    </group>
  )
}
function HaloTorus({rectW, rectH, rectI, boxArgs, position, rotation, rectColor, meshColor}: IRectParams) {
  const rectAreaLightRef = useRef(null)
  // useHelper(rectAreaLightRef, RectAreaLightHelper, color )
  return (
    <group position={position} rotation={rotation}>
      <rectAreaLight ref={rectAreaLightRef} position={[0, 0, -2]} rotation={[Math.PI, 0, 0]} width={rectW} height={rectH} intensity={rectI} color={rectColor} />
      <Torus args={boxArgs}>
        <meshBasicMaterial color={meshColor} transparent opacity={0.05} toneMapped={false} />
      </Torus>
    </group>
  )
}
function Sun({refGui, position}: ISunParams) {
  const pointLightRef = useRef(null)
  // useHelper(pointLightRef, THREE.PointLightHelper, 2, 'pink')
  return (
    <group ref={refGui} position={position}>
      <pointLight ref={pointLightRef} position={[-100, 0, 100]} distance={10} intensity={1.5} decay={0} />
      <RoundedBox position={[-200, 0, 200]} args={[1, 1, 1]} radius={1} smoothness={10}>
        <meshBasicMaterial color={[242, 242, 242]} transparent opacity={.05} toneMapped={false} />
      </RoundedBox>
    </group>
  )
}


const Station = ()  => {
  return (
    <>
    <Canvas linear id='root' gl={{ antialias: false }} dpr={[1, 1.5]} shadows camera={{ position: [3, 3, 15], fov: 30, zoom:1}}>
      <color attach="background" args={['#141A26']} />
      <ambientLight intensity={.3}/>
      <Stars radius={50} depth={110} count={1000} factor={2} />
      <Sun position={[0, 0, 0]} rotation={[0, 0, 0]}/>

      <Suspense fallback={<Loader />}>
        <ScrollControls pages={4} distance={1}>
          <StationMesh />
        </ScrollControls>
      </Suspense>

      <OrbitControls makeDefault enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2}  minPolarAngle={1} maxAzimuthAngle={Math.PI / 1.5} minAzimuthAngle={-0.5} />

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={.7} />
      </EffectComposer>
    </Canvas>
    </>
  )
}
export { Station }