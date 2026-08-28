import type { Contact, ContactFormData } from './types'

export function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export const initialContacts: Contact[] = [
  {
    id: 1,
    name: 'Nischal Rai',
    email: 'nischal.rai@outlook.com',
    phone: '+977 9841234567',
    location: 'Kathmandu, Nepal',
    subject: 'Visa Processing',
    subjectDetail: 'Visa Consulting & Document Review',
    message:
      'Hello, I am reaching out regarding my Tier 4 Visa application for the UK. I\'ve received my CAS from the University of Manchester, but I am slightly confused about the financial evidence requirements. Specifically, whether my joint account with my spouse can be used or if I need to transfer funds to a personal account 28 days prior.\n\nWould appreciate a quick document audit before I submit. Thanks!',
    createdAt: '2m ago',
    isArchived: false,
    isRead: false,
  },
  {
    id: 2,
    name: 'Suman Thapa',
    email: 'suman.thapa@gmail.com',
    phone: '+977 9851098765',
    location: 'Pokhara, Nepal',
    subject: 'Test Preparation',
    subjectDetail: 'Test Prep (IELTS)',
    message:
      'Wanted to inquire about the next intensive batch for IELTS preparation. I am targeting a band score of 7.5 overall, with a minimum of 7 in each module. Could you share the schedule, fees, and any practice test resources included in the program?',
    createdAt: '1hr ago',
    isArchived: false,
    isRead: true,
  },
  {
    id: 3,
    name: 'Aayush Karki',
    email: 'aayush.karki@edu.np',
    phone: '+977 9801234567',
    location: 'Lalitpur, Nepal',
    subject: 'Financial Advice',
    subjectDetail: 'Scholarship Aid',
    message:
      'Are there any specific grants for engineering students applying to universities in Australia? I have a strong academic profile (GPA 3.8) and relevant work experience. Looking for both merit-based and need-based scholarship options.',
    createdAt: '3h ago',
    isArchived: false,
    isRead: false,
  },
  {
    id: 4,
    name: 'Prabin Gurung',
    email: 'prabin.gurung@university.de',
    phone: '+977 9812345678',
    location: 'Chitwan, Nepal',
    subject: 'University Admission',
    subjectDetail: 'Admissions',
    message:
      'Applying for the Fall 2024 semester at Munich. I want to understand the entry requirements for M.Sc. Computer Science, including GRE scores, statement of purpose guidelines, and application deadlines.',
    createdAt: '5h ago',
    isArchived: false,
    isRead: false,
  },
  {
    id: 5,
    name: 'Bibek Shrestha',
    email: 'bibek.shrestha@mail.np',
    phone: '+977 9845678901',
    location: 'Bhaktapur, Nepal',
    subject: 'Visa Processing',
    subjectDetail: 'Visa Consulting',
    message:
      'Document checklist confirmation request. I have been accepted to study in Ireland and need guidance on gathering all the required documents for my student visa. Specifically, I need help with proof of accommodation, insurance, and financial statements.',
    createdAt: 'Yesterday',
    isArchived: false,
    isRead: true,
  },
  {
    id: 6,
    name: 'Roshan Tamang',
    email: 'roshan.tamang@test.in',
    phone: '+977 9867890123',
    location: 'Dharan, Nepal',
    subject: 'Mock Test',
    subjectDetail: 'PTE Mock Test',
    message:
      'I would like to register for PTE mock tests. Can you share the available dates and whether the mock tests simulate the exact exam conditions? Also interested in receiving a score breakdown and improvement feedback.',
    createdAt: '2 days ago',
    isArchived: false,
    isRead: false,
  },
  {
    id: 7,
    name: 'Anish Adhikari',
    email: 'anish.adhikari@edu.np',
    phone: '+977 9808901234',
    location: 'Butwal, Nepal',
    subject: 'University Admission',
    subjectDetail: 'Admissions Counseling',
    message:
      'Need guidance on university shortlisting for Masters in Public Health in the UK. My undergraduate was in Biochemistry and I have 2 years of NGO experience in health sector. Please advise on suitable universities.',
    createdAt: '3 days ago',
    isArchived: false,
    isRead: true,
  },
  {
    id: 8,
    name: 'Sandesh Magar',
    email: 'sandesh.magar@gmail.com',
    phone: '+977 9819012345',
    location: 'Itahari, Nepal',
    subject: 'Test Preparation',
    subjectDetail: 'Test Prep (TOEFL)',
    message:
      'I am planning to take TOEFL next month and need information regarding online mock tests and coaching classes.',
    createdAt: '4 days ago',
    isArchived: false,
    isRead: true,
  },
  {
    id: 9,
    name: 'Sujan Poudel',
    email: 'sujan.poudel@outlook.com',
    phone: '+977 9820123456',
    location: 'Biratnagar, Nepal',
    subject: 'Financial Advice',
    subjectDetail: 'Education Loan Guide',
    message:
      'Could you provide details on documentation required for education loans when applying for UK universities?',
    createdAt: '5 days ago',
    isArchived: false,
    isRead: false,
  },
  {
    id: 10,
    name: 'Milan Limbu',
    email: 'milan.limbu@gmail.com',
    phone: '+977 9831234567',
    location: 'Damak, Nepal',
    subject: 'University Admission',
    subjectDetail: 'Course Selection',
    message:
      'I am looking for guidance on choosing between Data Analytics and Software Engineering programs in Canada.',
    createdAt: '6 days ago',
    isArchived: false,
    isRead: true,
  },
  {
    id: 11,
    name: 'Rojina Lama',
    email: 'rojina.lama@gmail.com',
    phone: '+977 9842345678',
    location: 'Hetauda, Nepal',
    subject: 'Visa Processing',
    subjectDetail: 'Sponsorship Inquiry',
    message:
      'I need advice regarding financial sponsorship requirements for Australian student visa subclass 500.',
    createdAt: '1 week ago',
    isArchived: false,
    isRead: false,
  },
  {
    id: 12,
    name: 'Srijana Bhandari',
    email: 'srijana.bhandari@gmail.com',
    phone: '+977 9853456789',
    location: 'Pokhara, Nepal',
    subject: 'Mock Test',
    subjectDetail: 'IELTS Mock Test',
    message:
      'I want to enroll in the weekend IELTS full mock test series. Please let me know the timing and registration process.',
    createdAt: '1 week ago',
    isArchived: false,
    isRead: true,
  },
]

export function createContactFromForm(
  form: ContactFormData,
  id: number
): Contact {
  return {
    id,
    name: form.name,
    email: form.email,
    phone: form.phone,
    location: form.location,
    subject: form.subject,
    subjectDetail: form.subjectDetail,
    message: form.message,
    createdAt: 'Just now',
    isArchived: false,
    isRead: false,
  }
}

/** Maps subject to its CSS class suffix */
export function subjectClassName(subject: string): string {
  return subject.toLowerCase().replace(/\s+/g, '-')
}
