export type WeddingEventType = 'vu-quy' | 'thanh-hon' | 'tiec-cuoi'

export interface WeddingEvent {
  id: WeddingEventType
  label: string
  title: string
  dateLabel: string
  time: string
  venue: string
  address: string
  mapUrl: string
}

export interface GalleryImage {
  src: string
  alt: string
  caption: string
  position: string
}

export interface StoryBeat {
  year: string
  title: string
  body: string
}

export interface InvitationContent {
  greeting: string
  title: string
  parents: [string, string]
  request: string
}

export interface WeddingContent {
  couple: { bride: string; groom: string; initials: string }
  dateLabel: string
  countdownTarget: string
  heroImage: GalleryImage
  story: StoryBeat[]
  gallery: GalleryImage[]
  events: WeddingEvent[]
  invitation: InvitationContent
  qrImage: string | null
}

const mockImages = {
  hero: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1600&q=88',
  walk: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=88',
  flowers: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=88',
  laughter: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=88',
  table: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=88',
} as const

export const wedding: WeddingContent = {
  couple: {
    bride: 'Ngọc An',
    groom: 'Minh Khang',
    initials: 'A + K',
  },
  dateLabel: 'Thứ Bảy, 24.10.2026',
  countdownTarget: '2026-10-24T18:00:00+07:00',
  heroImage: {
    src: mockImages.hero,
    alt: 'Cặp đôi đứng bên nhau trong ánh nắng chiều',
    caption: 'save the date',
    position: 'center',
  },
  story: [
    { year: '2021', title: 'Lần đầu gặp gỡ', body: 'Một buổi chiều tình cờ, một ly cà phê và cuộc trò chuyện kéo dài hơn dự tính.' },
    { year: '2023', title: 'Đi qua những ngày thường', body: 'Từ những chuyến đi nhỏ đến những buổi tối rất bình yên, tụi mình chọn đồng hành cùng nhau.' },
    { year: '2026', title: 'Một lời hẹn trọn đời', body: 'Và giờ đây, tụi mình muốn mời bạn đến chia sẻ khoảnh khắc thật đặc biệt này.' },
  ],
  gallery: [
    { src: mockImages.walk, alt: 'Cặp đôi nắm tay dạo bước', caption: 'những ngày rất thương', position: 'center' },
    { src: mockImages.flowers, alt: 'Bó hoa cưới trắng', caption: 'một chút dịu dàng', position: 'center' },
    { src: mockImages.laughter, alt: 'Cặp đôi cười cạnh nhau', caption: 'và thật nhiều tiếng cười', position: 'center' },
    { src: mockImages.table, alt: 'Không gian tiệc cưới ấm áp', caption: 'hẹn nhau vào ngày đẹp nhất', position: 'center' },
  ],
  events: [
    {
      id: 'vu-quy',
      label: 'Lễ Vu Quy',
      title: 'Nhà gái',
      dateLabel: 'Thứ Bảy, 24.10.2026',
      time: '10:00',
      venue: 'Tư gia nhà gái',
      address: '123 Đường Hoa Nắng, P. Bến Thành, Quận 1, TP. Hồ Chí Minh',
      mapUrl: 'https://maps.google.com/?q=Ho+Chi+Minh+City',
    },
    {
      id: 'thanh-hon',
      label: 'Lễ Thành Hôn',
      title: 'Nhà trai',
      dateLabel: 'Thứ Bảy, 24.10.2026',
      time: '11:30',
      venue: 'Tư gia nhà trai',
      address: '68 Đường Bình Minh, P. Đa Kao, Quận 1, TP. Hồ Chí Minh',
      mapUrl: 'https://maps.google.com/?q=Ho+Chi+Minh+City',
    },
    {
      id: 'tiec-cuoi',
      label: 'Tiệc Cưới',
      title: 'Cùng chung vui',
      dateLabel: 'Thứ Bảy, 24.10.2026',
      time: '18:00',
      venue: 'The Reverie Saigon',
      address: '22-36 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh',
      mapUrl: 'https://maps.google.com/?q=The+Reverie+Saigon',
    },
  ],
  invitation: {
    greeting: 'Trân trọng kính mời',
    title: 'Lễ Thành Hôn',
    parents: ['Ông Bà Nguyễn Văn An', 'Ông Bà Trần Minh Khang'],
    request: 'Đến chung vui và chứng kiến khoảnh khắc hạnh phúc của chúng mình.',
  },
  qrImage: null,
}
