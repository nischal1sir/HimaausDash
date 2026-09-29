import { useState, useMemo, useEffect } from 'react'

/* ───────── Types ───────── */
import type { Applicant, Status } from './types'

/* ───────── Shared Mock Data & Helpers ───────── */
import { initialApplicants, createApplicantFromForm, initials } from './data'
import apiClient from '../../services/apiClient'

/* ───────── Child Components ───────── */
import StatCards from './components/StatCards'
import FilterBar from './components/FilterBar'
import AppointmentTable from './components/AppointmentTable'
import AppointmentModal from './components/AppointmentModal'
import ViewModal from './components/ViewModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'

const ITEMS_PER_PAGE = 6
const APPOINTMENTS_STORAGE_KEY = 'himaaus-appointments'

function normalizeApplicant(item: any, index: number): Applicant {
  return {
    id: typeof item.id === 'number' ? item.id : index + 1,
    name: item.name || item.studentName || item.fullName || 'Applicant',
    email: item.email || '',
    avatar: initials(item.name || item.studentName || 'Applicant'),
    program: item.program || item.course || 'Undergraduate',
    degree: item.degree || item.highestQualification || "Bachelor's",
    destination: item.destination || item.destinationCountry || 'Australia',
    destinationFlag: item.destinationFlag || '🇦🇺',
    testType: item.testType || item.englishTest || 'IELTS',
    testScore: item.testScore || item.englishScore || '6.5',
    status: (item.status as Status) || 'Pending',
    additionalMessage: item.additionalMessage || item.message || '',
  }
}

export default function AppointmentsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(() => {
    try {
      const stored = localStorage.getItem(APPOINTMENTS_STORAGE_KEY)
      return stored ? JSON.parse(stored) : initialApplicants
    } catch {
      return initialApplicants
    }
  })

  useEffect(() => {
    async function loadAppointments() {
      try {
        const data = await apiClient.get<any[]>('/appointments')
        if (Array.isArray(data) && data.length > 0) {
          const list = data.map((item, idx) => normalizeApplicant(item, idx))
          setApplicants(list)
          localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(list))
        }
      } catch (err) {
        console.error('Failed to fetch appointments from API:', err)
      }
    }
    loadAppointments()
  }, [])

  useEffect(() => {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(applicants))
  }, [applicants])

  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [selectedCountry, setSelectedCountry] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)

  // View modal state
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [viewApplicant, setViewApplicant] = useState<Applicant | null>(null)

  // Add/edit form modal state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingApplicant, setEditingApplicant] = useState<Applicant | null>(null)

  // Delete confirmation modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deletingApplicant, setDeletingApplicant] = useState<Applicant | null>(null)

  /* Derived data */
  const totalBookings = applicants.length
  const pendingReview = applicants.filter((a) => a.status === 'Pending').length
  const confirmedToday = applicants.filter((a) => a.status === 'Confirmed').length

  const filtered = useMemo(() => {
    return applicants.filter((a) => {
      const matchStatus = activeFilter === 'All' || a.status === activeFilter
      const matchCountry = selectedCountry === 'All' || a.destination === selectedCountry
      return matchStatus && matchCountry
    })
  }, [applicants, activeFilter, selectedCountry])

  const pageItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleFilterChange = (f: string) => {
    setActiveFilter(f)
    setCurrentPage(1)
  }

  const handleCountryChange = (c: string) => {
    setSelectedCountry(c)
    setCurrentPage(1)
  }

  const handleView = (a: Applicant) => {
    setViewApplicant(a)
    setIsViewOpen(true)
  }

  const handleEdit = (a: Applicant) => {
    setEditingApplicant(a)
    setIsFormOpen(true)
  }

  const handleDeletePrompt = (a: Applicant) => {
    setDeletingApplicant(a)
    setIsDeleteOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deletingApplicant) {
      setApplicants((prev) => prev.filter((a) => a.id !== deletingApplicant.id))
      setIsDeleteOpen(false)
      setDeletingApplicant(null)
      // reset pagination page if the active page becomes out of bounds
      const nextTotal = filtered.length - 1
      const maxPages = Math.ceil(nextTotal / ITEMS_PER_PAGE)
      if (currentPage > maxPages && maxPages > 0) {
        setCurrentPage(maxPages)
      }
    }
  }

  const handleSave = (formData: Omit<Applicant, 'id' | 'avatar' | 'destinationFlag'>) => {
    if (editingApplicant) {
      // Edit Mode
      setApplicants((prev) =>
        prev.map((a) =>
          a.id === editingApplicant.id
            ? {
                ...a,
                ...formData,
                avatar: a.name !== formData.name ? initials(formData.name) : a.avatar,
              }
            : a
        )
      )
    } else {
      // Add Mode
      const nextId = applicants.length > 0 ? Math.max(...applicants.map((a) => a.id)) + 1 : 1
      const newApplicant = createApplicantFromForm(formData as any, nextId)
      setApplicants((prev) => [newApplicant, ...prev])
    }
    setIsFormOpen(false)
    setEditingApplicant(null)
  }

  const handleStatusChangeInline = (id: number, status: Status) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-5">
      {/* Stat Cards */}
      <StatCards
        total={totalBookings}
        pending={pendingReview}
        confirmed={confirmedToday}
      />

      {/* Filter and Actions Bar */}
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        selectedCountry={selectedCountry}
        onCountryChange={handleCountryChange}
        onAddNew={() => {
          setEditingApplicant(null)
          setIsFormOpen(true)
        }}
      />

      {/* Table view */}
      <AppointmentTable
        items={pageItems}
        currentPage={currentPage}
        totalItems={filtered.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeletePrompt}
        onStatusChange={handleStatusChangeInline}
      />

      {/* View Details modal */}
      <ViewModal
        open={isViewOpen}
        onClose={() => {
          setIsViewOpen(false)
          setViewApplicant(null)
        }}
        applicant={viewApplicant}
      />

      {/* Add / Edit modal form */}
      <AppointmentModal
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingApplicant(null)
        }}
        onSave={handleSave}
        initial={editingApplicant}
      />

      {/* Delete confirmation modal */}
      <DeleteConfirmModal
        open={isDeleteOpen}
        name={deletingApplicant?.name || ''}
        onClose={() => {
          setIsDeleteOpen(false)
          setDeletingApplicant(null)
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
