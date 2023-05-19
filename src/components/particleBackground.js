import { useCallback } from 'react';
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';
import ParticlesConfig from './config-particle/particles-config'

const ParticleBackground = () => {
	const particlesInit = useCallback(async engine => {
		console.log(engine);
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async container => {
		await console.log(container);
	}, []);
	return (
		<div className='particle-background'>
			<Particles id='tsparticles' particlesLoaded='particlesLoaded' init={particlesInit} loaded={particlesLoaded} options={ParticlesConfig} height='100vh' width='100vw'></Particles>
		</div>
	);
};

export default ParticleBackground;
