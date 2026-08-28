import type { Applicant } from './types'

export const DESTINATIONS: Record<string, string> = {
  'United Kingdom': '🇬🇧',
  Germany: '🇩🇪',
  Australia: '🇦🇺',
  USA: '🇺🇸',
  Canada: '🇨🇦',
  Ireland: '🇮🇪',
  Japan: '🇯🇵',
  Spain: '🇪🇸',
  France: '🇫🇷',
  Netherlands: '🇳🇱',
  Nepal: '🇳🇵',
}

export const TEST_TYPES = ['IELTS', 'TOEFL', 'PTE', 'None'] as const

export function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const initialApplicants: Applicant[] = [
  {
    id: 1,
    name: 'Nischal Rai',
    email: 'nischal.rai@example.com',
    avatar: 'NR',
    program: 'Data Science',
    degree: 'Masters of Science',
    destination: 'United Kingdom',
    destinationFlag: '🇬🇧',
    testType: 'IELTS',
    testScore: '8.0',
    status: 'Confirmed',
    additionalMessage: 'Hi, I need assistance in university shortlisting and visa processing for UK masters programs starting September.',
  },
  {
    id: 2,
    name: 'Suman Thapa',
    email: 'suman.thapa@edu.com',
    avatar: 'ST',
    program: 'Mechanical Eng.',
    degree: "Bachelor's Degree",
    destination: 'Germany',
    destinationFlag: '🇩🇪',
    testType: 'TOEFL',
    testScore: '102',
    status: 'Pending',
    additionalMessage: 'Interested in tuition-free public universities in Germany. I have a B1 German certificate.',
  },
  {
    id: 3,
    name: 'Aayush Karki',
    email: 'aayush.karki@test.net',
    avatar: 'AK',
    program: 'Architecture',
    degree: 'B.Arch Honors',
    destination: 'Australia',
    destinationFlag: '🇦🇺',
    testType: 'IELTS',
    testScore: '7.5',
    status: 'Confirmed',
    additionalMessage: 'Please guide me on the regional study pathway options in Australia.',
  },
  {
    id: 4,
    name: 'Prabin Gurung',
    email: 'prabin.gurung@global.edu',
    avatar: 'PG',
    program: 'Computer Science',
    degree: 'M.Sc. Software Eng.',
    destination: 'USA',
    destinationFlag: '🇺🇸',
    testType: 'None',
    testScore: '',
    status: 'Confirmed',
    additionalMessage: 'Looking for scholarship opportunities in US universities for Software Engineering.',
  },
  {
    id: 5,
    name: 'Bibek Shrestha',
    email: 'bibek.shrestha@test.com',
    avatar: 'BS',
    program: 'Civil Engineering',
    degree: 'M.Eng. Structural',
    destination: 'Canada',
    destinationFlag: '🇨🇦',
    testType: 'IELTS',
    testScore: '7.0',
    status: 'Pending',
    additionalMessage: 'Looking to apply for post-graduation work permit (PGWP) eligible courses in Canada.',
  },
  {
    id: 6,
    name: 'Roshan Tamang',
    email: 'roshan.tamang@edu.org',
    avatar: 'RT',
    program: 'Psychology',
    degree: 'B.A. Clinical',
    destination: 'Ireland',
    destinationFlag: '🇮🇪',
    testType: 'TOEFL',
    testScore: '105',
    status: 'Confirmed',
    additionalMessage: 'I would like to explore Clinical Psychology courses in Dublin.',
  },
  {
    id: 7,
    name: 'Anish Adhikari',
    email: 'anish.adhikari@student.io',
    avatar: 'AA',
    program: 'Business Admin',
    degree: 'MBA',
    destination: 'USA',
    destinationFlag: '🇺🇸',
    testType: 'PTE',
    testScore: '79',
    status: 'Confirmed',
    additionalMessage: 'I have 3 years of work experience and want to apply for top-tier MBA programs.',
  },
  {
    id: 8,
    name: 'Sandesh Magar',
    email: 'sandesh.magar@univ.jp',
    avatar: 'SM',
    program: 'Biomedical Eng.',
    degree: 'Ph.D.',
    destination: 'Japan',
    destinationFlag: '🇯🇵',
    testType: 'IELTS',
    testScore: '8.5',
    status: 'Cancelled',
    additionalMessage: 'Need information about Ph.D. research fellowships like MEXT in Japan.',
  },
  {
    id: 9,
    name: 'Sujan Poudel',
    email: 'sujan.poudel@mail.com',
    avatar: 'SP',
    program: 'Medicine',
    degree: 'MBBS',
    destination: 'United Kingdom',
    destinationFlag: '🇬🇧',
    testType: 'IELTS',
    testScore: '7.5',
    status: 'Pending',
    additionalMessage: 'I am looking for MBBS programs list and eligibility criteria for UK entry.',
  },
  {
    id: 10,
    name: 'Milan Limbu',
    email: 'milan.limbu@uni.es',
    avatar: 'ML',
    program: 'Economics',
    degree: "Bachelor's",
    destination: 'Spain',
    destinationFlag: '🇪🇸',
    testType: 'None',
    testScore: '',
    status: 'Confirmed',
    additionalMessage: 'I am interested in studying Economics in Spain, please send me details.',
  },
  {
    id: 11,
    name: 'Rojina Lama',
    email: 'rojina.lama@test.com',
    avatar: 'RL',
    program: 'Public Health',
    degree: 'Master of Public Health',
    destination: 'Australia',
    destinationFlag: '🇦🇺',
    testType: 'PTE',
    testScore: '72',
    status: 'Pending',
    additionalMessage: 'Seeking guidance for public health programs and scholarship availability in Sydney.',
  },
  {
    id: 12,
    name: 'Srijana Bhandari',
    email: 'srijana.bhandari@global.org',
    avatar: 'SB',
    program: 'Information Technology',
    degree: 'B.Sc. Cybersecurity',
    destination: 'Canada',
    destinationFlag: '🇨🇦',
    testType: 'IELTS',
    testScore: '7.5',
    status: 'Confirmed',
    additionalMessage: 'Need advice on Cybersecurity undergraduate options and intake schedules in Canada.',
  },
]


export function createApplicantFromForm(
  form: {
    name: string
    email: string
    program: string
    degree: string
    destination: string
    testType: string
    testScore: string
    status: string
    additionalMessage?: string
  },
  id: number
): Applicant {
  return {
    id,
    name: form.name,
    email: form.email,
    avatar: initials(form.name),
    program: form.program,
    degree: form.degree,
    destination: form.destination,
    destinationFlag: DESTINATIONS[form.destination] || '🌍',
    testType: form.testType,
    testScore: form.testScore,
    status: form.status as Applicant['status'],
    additionalMessage: form.additionalMessage,
  }
}

