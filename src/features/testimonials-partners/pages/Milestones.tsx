import { useSearchParams } from "react-router-dom";

import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, Flag, Plus, Trophy } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatsCard from "../components/StatsCard";
import TableToolbar from "../components/TableToolbar";
import MilestoneGrid from "../components/MilestoneGrid";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import DeleteModal from "../components/DeleteModal";
import MilestoneForm from "../components/MilestoneForm";
import { useMilestones } from "../hooks/useMilestones";
import type { Milestone, MilestoneFormValues, MilestoneStatus } from "../types/milestone";

export default function MilestonesPage() {
  const { milestones, isLoading, addMilestone, editMilestone, removeMilestone } = useMilestones();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<MilestoneStatus | "All">("All");
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [milestoneToDelete, setMilestoneToDelete] = useState<Milestone | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
  setCurrentPage(1);
}, [search, pageSize, statusFilter]);

const location = useLocation();
const navigate = useNavigate();
useEffect(() => {
  if (location.pathname.endsWith("/add-milestone")) {
    setEditingMilestone(null);
    setIsFormOpen(true);
  }
}, [location.pathname]);

const [searchParams, setSearchParams] = useSearchParams();
useEffect(() => {
  if (searchParams.get("action") === "add") {
    setEditingMilestone(null);
    setIsFormOpen(true);
    setSearchParams({}, { replace: true });
  }
}, [searchParams]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return milestones.filter((m) => {
      const matchesTerm = !term || m.title.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "All" || m.status === statusFilter;
      return matchesTerm && matchesStatus;
    });
  }, [milestones, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const stats = useMemo(() => {
    const visible = milestones.filter((m) => m.status === "Visible").length;
    const highest = milestones.reduce(
      (max, m) => (!max || m.value > max.value ? m : max),
      undefined as Milestone | undefined
    );
    return {
      total: milestones.length,
      visible,
      hidden: milestones.length - visible,
      highest,
    };
  }, [milestones]);

  const openAddForm = () => {
    setEditingMilestone(null);
    setIsFormOpen(true);
  };

  const openEditForm = (milestone: Milestone) => {
    setEditingMilestone(milestone);
    setIsFormOpen(true);
  };

  const handleSubmit = async (values: MilestoneFormValues) => {
    setIsSaving(true);
    try {
      if (editingMilestone) {
        await editMilestone(editingMilestone.id, values);
      } else {
        await addMilestone(values);
      }
      setIsFormOpen(false);
      setEditingMilestone(null);
      navigate("/milestones/all-milestones");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!milestoneToDelete) return;
    setIsDeleting(true);
    try {
      await removeMilestone(milestoneToDelete.id);
      setMilestoneToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Milestones"
        subtitle="Manage company achievements and statistics."
        breadcrumbs={[{ label: "Dashboard", to: "/" }, { label: "Milestones" }]}
        action={
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add Milestone
          </button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard label="Total Milestones" value={stats.total} icon={<Flag className="h-5 w-5" />} accent="blue" />
        <StatsCard label="Visible" value={stats.visible} icon={<Eye className="h-5 w-5" />} accent="green" />
        <StatsCard label="Hidden" value={stats.hidden} icon={<EyeOff className="h-5 w-5" />} accent="slate" />
        <StatsCard
          label="Highest Achievement"
          value={stats.highest ? `${stats.highest.value.toLocaleString()}${stats.highest.suffix}` : "—"}
          icon={<Trophy className="h-5 w-5" />}
          accent="amber"
          hint={stats.highest?.title}
        />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white shadow-card">
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search milestones..."
          entriesValue={pageSize}
          onEntriesChange={setPageSize}
          filterValue={statusFilter}
          onFilterChange={(v) => setStatusFilter(v as MilestoneStatus | "All")}
          filterOptions={[
            { label: "All Statuses", value: "All" },
            { label: "Visible", value: "Visible" },
            { label: "Hidden", value: "Hidden" },
          ]}
        />

        <MilestoneGrid
          milestones={paginated}
          isLoading={isLoading}
          onEdit={openEditForm}
          onDelete={setMilestoneToDelete}
        />

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal
        isOpen={isFormOpen}
        title={editingMilestone ? "Edit Milestone" : "Add Milestone"}
        subtitle={editingMilestone ? "Update this achievement or statistic." : "Create a new company achievement or statistic."}
        onClose={() => {setIsFormOpen(false);
  navigate("/milestones/all-milestones");
}}
      >
        <MilestoneForm
          initialValues={editingMilestone ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
          isSaving={isSaving}
          submitLabel={editingMilestone ? "Save Changes" : "Add Milestone"}
        />
      </Modal>

      <DeleteModal
        isOpen={!!milestoneToDelete}
        itemName={milestoneToDelete?.title ?? ""}
        onCancel={() => {setIsFormOpen(false);
  navigate("/milestones/all-milestones");
}}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
