import { trpc } from "@/lib/trpc-client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function useCreateCategory() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<ErrorState>(null);
  const utils = trpc.useUtils();

  const createCategoryMutation = trpc.category.create.useMutation({
    onSuccess: () => {
      utils.category.getAll.invalidate();
      closeModal();
    },
    onError: (err) => {
      setError(err.message || t("errors.createCategoryFailed"));
    },
  });

  const handleCreateCategory = (name: string, color: string, icon: string) => {
    if (!name.trim()) {
      setError(t("errors.nameRequired"));
      return;
    }

    if (name.length > 100) {
      setError(t("errors.nameTooLong"));
      return;
    }

    setError(null);

    createCategoryMutation.mutate({
      name: name.trim(),
      color,
      icon,
    });
  };

  const openModal = () => {
    setShowModal(true);
    setError(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null);
  };

  return {
    showModal,
    error,
    isPending: createCategoryMutation.isPending,
    openModal,
    closeModal,
    handleCreateCategory,
  };
}
