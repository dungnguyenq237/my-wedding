interface SectionHeadingProps {
  eyebrow: string
  title: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, align = 'left' }: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </header>
  )
}
