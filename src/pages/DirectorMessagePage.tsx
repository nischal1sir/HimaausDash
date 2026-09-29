import { useState, useEffect, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import type { DirectorMessage } from '../types'
import { directorMessages as initialDirectorMessages } from '../data'
import apiClient from '../services/apiClient'

type FormState = {
  name: string
  designation: string
  message: string
}

const EMPTY_FORM: FormState = { name: '', designation: '', message: '' }

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

export default function DirectorMessagePage() {
  const [messages, setMessages] = useState<DirectorMessage[]>(initialDirectorMessages)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadMessage() {
      try {
        const data = await apiClient.get<any>('/director-message')
        if (data) {
          const list = Array.isArray(data) ? data : [data]
          setMessages(
            list.map((m: any) => ({
              id: m._id || m.id || 'dm-1',
              name: m.name || m.directorName || 'Director',
              designation: m.designation || m.title || 'Managing Director',
              message: m.message || m.content || '',
              updatedAt: m.updatedAt?.slice(0, 10) || new Date().toISOString().slice(0, 10),
            }))
          )
        }
      } catch (err) {
        console.error('Failed to load director message from API:', err)
      } finally {
        setLoading(false)
      }
    }
    loadMessage()
  }, [])

  function openAddModal() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  function openEditModal(msg: DirectorMessage) {
    setEditingId(msg.id)
    setForm({ name: msg.name, designation: msg.designation, message: msg.message })
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const today = new Date().toISOString().slice(0, 10)

    try {
      await apiClient.put('/director-message', form)
    } catch (err) {
      console.error('API call failed, updating local state:', err)
    }

    if (editingId) {
      setMessages((prev) =>
        prev.map((m) => (m.id === editingId ? { ...m, ...form, updatedAt: today } : m))
      )
    } else {
      const newMessage: DirectorMessage = {
        id: `dm-${Date.now()}`,
        ...form,
        updatedAt: today,
      }
      setMessages((prev) => [newMessage, ...prev])
    }
    setModalOpen(false)
  }

  async function confirmDelete() {
    if (deleteId) {
      try {
        await apiClient.delete(`/director-message/${deleteId}`)
      } catch (err) {
        console.error('Delete via API failed:', err)
      }
      setMessages((prev) => prev.filter((m) => m.id !== deleteId))
      setDeleteId(null)
    }
  }

  const isFormValid = form.name.trim() && form.designation.trim() && form.message.trim()


  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[1000px] flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-brand-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-surface-heading sm:text-base">
            Director Messages
          </h2>
          <p className="mt-0.5 text-[12.5px] text-surface-muted">
            Manage the message(s) shown from your institution's leadership.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          <Plus size={16} />
          Add Message
        </button>
      </div>

      {/* List */}
      {messages.length === 0 ? (
        <div className="rounded-xl2 border border-dashed border-surface-border bg-white p-10 text-center">
          <p className="text-[13.5px] font-medium text-surface-heading">No messages yet</p>
          <p className="mt-1 text-[12.5px] text-surface-muted">
            Add a message from a director to display it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {messages.map((msg) => {
            const initial = msg.name.charAt(0).toUpperCase()
            return (
              <div
                key={msg.id}
                className="rounded-xl2 border border-surface-border bg-white p-4 shadow-card sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-[14px] font-bold text-white">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[14px] font-bold text-surface-heading">
                        {msg.name}
                      </p>
                      <p className="truncate text-[12.5px] text-brand-600">{msg.designation}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(msg)}
                      className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                      aria-label="Edit message"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteId(msg.id)}
                      className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                      aria-label="Delete message"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <p className="mt-3 whitespace-pre-line text-[13px] leading-relaxed text-slate-600">
                  {msg.message}
                </p>
                <p className="mt-3 text-[11.5px] text-surface-muted">
                  Last updated {formatDate(msg.updatedAt)}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* Add / Edit modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl2 border border-surface-border bg-white shadow-lg"
          >
            <div className="flex items-center justify-between border-b border-surface-border px-5 py-4">
              <h3 className="text-[14.5px] font-bold text-surface-heading">
                {editingId ? 'Edit Message' : 'Add Message'}
              </h3>
              <button
                onClick={closeModal}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
                  Name
                </span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Rajesh Sharma"
                  className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
                  Designation
                </span>
                <input
                  type="text"
                  required
                  value={form.designation}
                  onChange={(e) => setForm((f) => ({ ...f, designation: e.target.value }))}
                  placeholder="e.g. Founding Director"
                  className="w-full rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[13px] font-semibold text-surface-heading">
                  Message
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Write the director's message..."
                  className="w-full resize-none rounded-lg border border-surface-border bg-slate-50/70 px-3 py-2 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
                />
              </label>

              <div className="flex justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-surface-border px-3.5 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="rounded-lg bg-brand-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {editingId ? 'Save Changes' : 'Add Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]"
          onClick={() => setDeleteId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl2 border border-surface-border bg-white p-5 shadow-lg"
          >
            <h3 className="text-[14.5px] font-bold text-surface-heading">Delete this message?</h3>
            <p className="mt-1.5 text-[13px] text-surface-muted">
              This can't be undone. The message will be permanently removed.
            </p>
            <div className="mt-4 flex justify-end gap-2.5">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-surface-border px-3.5 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-lg bg-rose-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
