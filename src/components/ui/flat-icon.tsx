interface FlatIconProps {
  /** Tên file trong /public/icons (không cần đuôi .png). */
  name: string
  className?: string
}

/**
 * Icon Flaticon (free — ghi attribution ở footer) rendered qua CSS mask,
 * tint theo currentColor nên hòa vào hệ màu gradient/glass của web
 * y như lucide trước đây, nhưng nét vẽ chuyên nghiệp hơn.
 */
export function FlatIcon({ name, className }: FlatIconProps) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: 'inline-block',
        backgroundColor: 'currentColor',
        WebkitMaskImage: `url(/icons/${name}.png)`,
        maskImage: `url(/icons/${name}.png)`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}