export type WeddingEventType = 'nha-gai' | 'nha-trai'

export interface WeddingCeremony {
  id: string
  title: string
  dateLabel: string
  time: string
  venue: string
  address: string
  mapUrl: string
}

export interface WeddingEvent {
  id: WeddingEventType
  title: string
  ceremonies: WeddingCeremony[]
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

export type WeddingAudience = 'bride' | 'groom'

export interface HeroSchedule {
  dateLabel: string
  targetIso: string
}

export interface WeddingContent {
  couple: { bride: string; groom: string; initials: string }
  heroSchedule: Record<WeddingAudience, HeroSchedule>
  heroImage: GalleryImage
  heroImages: GalleryImage[]
  story: StoryBeat[]
  gallery: GalleryImage[]
  events: WeddingEvent[]
  invitation: InvitationContent
  qrImage: string | null
}

const weddingImages = {
  hero: new URL('../styles/images/hoa.jpg', import.meta.url).href,
  one: new URL('../styles/images/1.jpg', import.meta.url).href,
  two: new URL('../styles/images/2.jpg', import.meta.url).href,
  three: new URL('../styles/images/3.jpg', import.meta.url).href,
  four: new URL('../styles/images/4.jpg', import.meta.url).href,
  five: new URL('../styles/images/5.jpg', import.meta.url).href,
  six: new URL('../styles/images/6.jpg', import.meta.url).href,
  seven: new URL('../styles/images/7.jpg', import.meta.url).href,
  eight: new URL('../styles/images/8.jpg', import.meta.url).href,
} as const

export const wedding: WeddingContent = {
  couple: {
    bride: 'Thanh Thủy',
    groom: 'Quốc Dũng',
    initials: 'D + T',
  },
  heroSchedule: {
    bride: {
      dateLabel: 'Thứ Bảy · 10 tháng 10, 2026',
      targetIso: '2026-10-10T15:00:00+07:00',
    },
    groom: {
      dateLabel: 'Thứ Bảy · 24 tháng 10, 2026',
      targetIso: '2026-10-24T18:00:00+07:00',
    },
  },
  heroImage: {
    src: weddingImages.hero,
    alt: 'Cặp đôi đứng bên nhau trong ánh nắng chiều',
    caption: 'save the date',
    position: 'center',
  },
  heroImages: [
    { src: weddingImages.two, alt: 'Cặp đôi đúng bên nhau trong ánh nắng chiều', caption: 'save the date', position: 'center' },
    { src: weddingImages.one, alt: 'Cặp đôi đúng bên nhau trong ánh nắng chiều', caption: 'save the date', position: 'center' },
    { src: weddingImages.seven, alt: 'Cặp đôi đúng bên nhau trong ánh nắng chiều', caption: 'save the date', position: 'center' },
    { src: weddingImages.eight, alt: 'Cặp đôi đúng bên nhau trong ánh nắng chiều', caption: 'save the date', position: 'center' },
  ],
  story: [
    { year: '04.2020', title: 'Lần đầu gặp gỡ', body: 'Một buổi chiều tình cờ, một ly cà phê và cuộc trò chuyện kéo dài hơn dự tính.' },
    { year: '07.2023', title: 'Ngày anh cầu hôn em', body: 'Từ những chuyến đi nhỏ đến những buổi tối rất bình yên, tụi mình đã chọn sẽ đồng hành cùng nhau.' },
    { year: '10.2026', title: 'Một lời hẹn trọn đời', body: 'Và giờ đây, tụi mình muốn mời bạn đến chia sẻ khoảnh khắc thật đặc biệt này.' },
  ],
  gallery: [
    { src: weddingImages.six, alt: 'Khoảnh khắc của cặp đôi', caption: 'những ngày rất thương', position: 'center' },
    { src: weddingImages.three, alt: 'Khoảnh khắc của cặp đôi', caption: 'một chút dịu dàng', position: 'center' },
    { src: weddingImages.four, alt: 'Khoảnh khắc của cặp đôi', caption: 'và thật nhiều tiếng cười', position: 'center' },
    { src: weddingImages.five, alt: 'Khoảnh khắc của cặp đôi', caption: 'hẹn nhau vào ngày đẹp nhất', position: 'center' },
  ],
  events: [
    {
      id: 'nha-gai',
      title: 'Nhà Gái',
      ceremonies: [
        {
          id: 'thanh-le-hon-phoi',
          title: 'Thánh Lễ Hôn Phối',
          dateLabel: 'Thứ Bảy, 10.10.2026',
          time: '15:00',
          venue: 'Thánh đường Nhà thờ giáo xứ Tân Lập',
          address: '460 Đường số 24, P. Bình Trưng, TP. Hồ Chí Minh',
          mapUrl: 'https://maps.app.goo.gl/6TsqAe5QexX3Wxzi6',
        },
        {
          id: 'tiec-vu-quy',
          title: 'Tiệc Vu Quy',
          dateLabel: 'Thứ Bảy, 10.10.2026',
          time: '18:00',
          venue: 'Khuôn viên Nhà thờ giáo xứ Tân Lập',
          address: '460 Đường số 24, P. Bình Trưng, TP. Hồ Chí Minh',
          mapUrl: 'https://maps.app.goo.gl/6TsqAe5QexX3Wxzi6',
        },
      ],
    },
    {
      id: 'nha-trai',
      title: 'Nhà Trai',
      ceremonies: [
        {
          id: 'le-gia-tien',
          title: 'Lễ Gia Tiên',
          dateLabel: 'Thứ Bảy, 24.10.2026',
          time: '11:00',
          venue: 'Tư gia nhà trai',
          address: '82A Đường số 11, P. Tam Bình, TP. Hồ Chí Minh',
          mapUrl: 'https://maps.app.goo.gl/STM7tRoJx2hW76Ft9',
        },
        {
          id: 'tiec-tan-hon',
          title: 'Tiệc Tân Hôn',
          dateLabel: 'Thứ Bảy, 24.10.2026',
          time: '18:00',
          venue: 'Trung tâm hội nghị tiệc cưới Aqua Jardin',
          address: '307 Nơ Trang Long, P. Bình Lợi Trung, TP. Hồ Chí Minh',
          mapUrl: 'https://maps.app.goo.gl/yc9G4n5VFkheuaDg9',
        },
      ],
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
