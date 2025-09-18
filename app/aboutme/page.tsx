import IconNavbar from '@/components/Navbar';
import PixelBlast from '@/components/PixelBlast/PixelBlast';
import ScrambledText from '@/components/ScrambledText';

export default function Demo() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* PixelBlast as animated background with a dark overlay for contrast */}
      <div className="absolute inset-0 z-0">
        <PixelBlast />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-white">
        <IconNavbar />

        <ScrambledText
          className="scrambled-text-demo leading-relaxed max-w-3xl"
          radius={100}
          duration={1.2}
          speed={0.5}
          scrambleChars="031"
        >
          <h1 className="text-2xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-purple-900">
            Hi! Im <span className="text-purple-400">Saran&nbsp;Srini</span>
          </h1>

          <p className="text-lg md:text-xl  text-gray-200">
            As a 4th-year Computer Science student, I love crafting responsive
            web apps in React and exploring mobile development with React Native
            and Expo.
          </p>

          {/* Optional call-to-action button */}
        </ScrambledText>
      </div>
    </div>
  );
}
