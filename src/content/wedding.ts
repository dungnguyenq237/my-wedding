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
  parents: {
    bride: { father: string; mother: string }
    groom: { father: string; mother: string }
  }
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
    bride: 'Thanh Thủy',
    groom: 'Quốc Dũng',
    initials: 'D + T',
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
    { year: '04.2020', title: 'Lần đầu gặp gỡ', body: 'Một buổi chiều tình cờ, một ly cà phê và cuộc trò chuyện kéo dài hơn dự tính.' },
    { year: '07.2023', title: 'Ngày anh cầu hôn em', body: 'Từ những chuyến đi nhỏ đến những buổi tối rất bình yên, tụi mình đã chọn sẽ đồng hành cùng nhau.' },
    { year: '10.2026', title: 'Một lời hẹn trọn đời', body: 'Và giờ đây, tụi mình muốn mời bạn đến chia sẻ khoảnh khắc thật đặc biệt này.' },
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
      dateLabel: 'Thứ Bảy, 10.10.2026',
      time: '15:00',
      venue: 'Thánh đường Nhà thờ giáo xứ Tân Lập',
      address: ' 460 Đường số 24, P. Bình Trưng, TP. Hồ Chí Minh',
      mapUrl: 'https://maps.app.goo.gl/6TsqAe5QexX3Wxzi6',
    },
    {
      id: 'thanh-hon',
      label: 'Lễ Tân Hôn',
      title: 'Nhà trai',
      dateLabel: 'Thứ Bảy, 24.10.2026',
      time: '11:00',
      venue: 'Tư gia nhà trai',
      address: '82A Đường số 11, P. Tam Bình, TP. Hồ Chí Minh',
      mapUrl: 'https://maps.app.goo.gl/STM7tRoJx2hW76Ft9',
    },
    {
      id: 'tiec-cuoi',
      label: 'Tiệc Cưới',
      title: 'Cùng chung vui',
      dateLabel: 'Thứ Bảy, 24.10.2026',
      time: '18:00',
      venue: 'Aqua Jardin',
      address: '307 Nơ Trang Long, P. Bình Lợi Trung, TP. Hồ Chí Minh',
      mapUrl: 'https://maps.app.goo.gl/yc9G4n5VFkheuaDg9',
    },
  ],
  invitation: {
    greeting: 'Trân trọng kính mời',
    title: 'Lễ Tân Hôn',
    parents: {
      bride: { father: 'Ông Lương Mai Châu', mother: 'Bà Nguyễn Thị Châu' },
      groom: { father: 'Ông Nguyễn Tấn Tài', mother: 'Bà Cao Thị Hương' },
    },
    request: 'Đến chung vui và chứng kiến khoảnh khắc hạnh phúc của chúng mình.',
  },
  qrImage: null,
}
