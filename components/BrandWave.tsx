/**
 * Ilustración decorativa de marca (cinta de líneas fluidas naranja → rosa →
 * morado → azul), inspirada en el mockup "Aplicación en portal web" de la
 * guía de marca. Puramente decorativa (aria-hidden): no aporta información,
 * solo acompaña visualmente el hero de la página de inicio para que no se
 * sienta plano.
 */
export default function BrandWave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 520"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0" y1="0" x2="640" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF7A00" />
          <stop offset="35%" stopColor="#FF2D7A" />
          <stop offset="70%" stopColor="#8B2DFF" />
          <stop offset="100%" stopColor="#0066FF" />
        </linearGradient>
      </defs>
      <path d="M10.0,60.0 C150.0,70.0 160.0,190.0 220.0,230.0 C300.0,260.0 340.0,420.0 400.0,420.0 C470.0,460.0 540.0,480.0 630.0,480.0" stroke="url(#waveGradient)" strokeWidth="2.05" fill="none" opacity="0.35" strokeLinecap="round" />
      <path d="M10.0,66.0 C150.0,69.8 160.0,205.2 220.0,239.0 C300.0,265.3 340.0,418.5 400.0,416.0 C470.0,456.0 540.0,476.0 630.0,477.0" stroke="url(#waveGradient)" strokeWidth="2.34" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M10.0,72.0 C150.0,70.2 160.0,219.8 220.0,248.0 C300.0,270.9 340.0,416.7 400.0,412.0 C470.0,452.0 540.0,472.0 630.0,474.0" stroke="url(#waveGradient)" strokeWidth="2.62" fill="none" opacity="0.55" strokeLinecap="round" />
      <path d="M10.0,78.0 C150.0,71.8 160.0,233.2 220.0,257.0 C300.0,277.3 340.0,414.5 400.0,408.0 C470.0,448.0 540.0,468.0 630.0,471.0" stroke="url(#waveGradient)" strokeWidth="2.91" fill="none" opacity="0.65" strokeLinecap="round" />
      <path d="M10.0,84.0 C150.0,75.0 160.0,245.0 220.0,266.0 C300.0,284.6 340.0,411.6 400.0,404.0 C470.0,444.0 540.0,464.0 630.0,468.0" stroke="url(#waveGradient)" strokeWidth="3.2" fill="none" opacity="0.75" strokeLinecap="round" />
      <path d="M10.0,90.0 C150.0,80.0 160.0,255.0 220.0,275.0 C300.0,293.0 340.0,408.0 400.0,400.0 C470.0,440.0 540.0,460.0 630.0,465.0" stroke="url(#waveGradient)" strokeWidth="2.91" fill="none" opacity="0.85" strokeLinecap="round" />
      <path d="M10.0,96.0 C150.0,87.0 160.0,263.0 220.0,284.0 C300.0,302.6 340.0,403.6 400.0,396.0 C470.0,436.0 540.0,456.0 630.0,462.0" stroke="url(#waveGradient)" strokeWidth="2.62" fill="none" opacity="0.75" strokeLinecap="round" />
      <path d="M10.0,102.0 C150.0,95.8 160.0,269.2 220.0,293.0 C300.0,313.3 340.0,398.5 400.0,392.0 C470.0,432.0 540.0,452.0 630.0,459.0" stroke="url(#waveGradient)" strokeWidth="2.34" fill="none" opacity="0.65" strokeLinecap="round" />
      <path d="M10.0,108.0 C150.0,106.2 160.0,273.8 220.0,302.0 C300.0,324.9 340.0,392.7 400.0,388.0 C470.0,428.0 540.0,448.0 630.0,456.0" stroke="url(#waveGradient)" strokeWidth="2.05" fill="none" opacity="0.55" strokeLinecap="round" />
      <path d="M10.0,114.0 C150.0,117.8 160.0,277.2 220.0,311.0 C300.0,337.3 340.0,386.5 400.0,384.0 C470.0,424.0 540.0,444.0 630.0,453.0" stroke="url(#waveGradient)" strokeWidth="1.76" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M10.0,120.0 C150.0,130.0 160.0,280.0 220.0,320.0 C300.0,350.0 340.0,380.0 400.0,380.0 C470.0,420.0 540.0,440.0 630.0,450.0" stroke="url(#waveGradient)" strokeWidth="1.47" fill="none" opacity="0.35" strokeLinecap="round" />
    </svg>
  );
}
