import { cn } from '@/lib/utils'

interface FullPageLoaderProps {
  message?: string
  fullHeight?: boolean
  className?: string
}

export const FullPageLoader = ({
  message = 'Cargando...',
  fullHeight = true,
  className,
}: FullPageLoaderProps) => {
  const heightClass = fullHeight ? 'min-h-screen' : 'min-h-[200px]'
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center bg-black text-white',
        heightClass,
        className,
      )}
    >
      <div className="flex flex-col items-center space-y-4">
        <img
          src="/loading.gif"
          alt="Animación de carga"
          className="h-32 w-32 object-contain"
        />
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </div>
  )
}
