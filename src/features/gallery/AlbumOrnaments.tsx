export function Flourish({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 38" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="0.8">
        <path d="M100 19C78 0 56 4 45 15S15 30 4 17M100 19C122 0 144 4 155 15S185 30 196 17M100 19C76 35 54 32 48 22M100 19C124 35 146 32 152 22" />
        <path d="M10 19C30 22 42 1 53 9C62 16 45 26 37 18M190 19C170 22 158 1 147 9C138 16 155 26 163 18M65 17L87 19M113 19L135 17" />
        <path d="M100 8L107 19L100 30L93 19Z" fill="currentColor" fillOpacity=".18" />
      </g>
      <circle cx="100" cy="19" r="2" fill="currentColor" />
    </svg>
  )
}

export function Corner({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="0.9">
        <path d="M6 95V6H95M13 81V13H81M22 69C43 57 27 45 21 52C12 63 54 65 53 38C53 20 35 20 36 31C37 43 74 31 80 20" />
        <path d="M22 69C26 46 47 25 80 20M25 55C18 33 21 19 35 22C45 25 34 42 25 35M46 34C40 16 66 16 70 21" />
        <path d="M17 18L23 23M30 12L35 16M12 30L16 35" />
      </g>
    </svg>
  )
}

export function Botanical({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 240" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M40 228C72 186 62 145 97 99C111 81 132 64 149 29M64 173C40 156 26 137 21 110M74 145C110 139 137 122 155 100M90 111C71 84 70 58 79 29" />
        <g fill="currentColor" fillOpacity=".10">
          <path d="M60 187C29 189 20 171 16 160C44 157 57 169 60 187ZM65 165C81 142 97 145 113 147C106 165 90 174 65 165ZM79 128C47 124 40 107 38 93C63 94 76 109 79 128ZM102 94C120 93 131 84 135 69C114 65 104 75 102 94ZM126 70C108 51 113 29 119 21C135 41 136 54 126 70ZM142 45C151 42 167 23 166 11C145 14 138 27 142 45ZM71 89C50 79 53 60 56 52C72 62 77 74 71 89ZM130 121C136 140 151 135 165 128C154 115 143 114 130 121ZM34 143C14 144 8 133 6 123C24 120 30 131 34 143Z" />
        </g>
      </g>
      <g transform="translate(86 51)" stroke="currentColor" strokeWidth=".8" fill="#fffaf0">
        <path d="M0-22C12-39 27-24 17-12C39-14 42 8 20 10C35 26 15 39 4 21C-1 43-25 32-17 13C-39 22-43-4-21-6C-33-23-11-36 0-22Z" />
        <path d="M0-13C10-23 22-10 12-3C25 6 12 21 4 12C-6 25-21 10-12 2C-24-9-9-23 0-13Z" />
        <circle r="5" fill="#d7b873" />
        <path d="M-3-8L0-3M9-3L4 0M4 8L2 4M-8 4L-4 2" />
      </g>
    </svg>
  )
}
