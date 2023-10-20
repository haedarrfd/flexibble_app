"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteProject, fetchToken } from "@/lib/actions";

type ProjectActionsProps = {
  projectId: string;
};

const ProjectActions = ({ projectId }: ProjectActionsProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteProject = async () => {
    setIsDeleting(true);

    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);

      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      // For stop loading
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flex_center edit_action_btn"
      >
        <Image src="/pencil.svg" alt="edit" width={15} height={15} />
      </Link>

      <button
        type="button"
        disabled={isDeleting}
        className={`flex_center delete_action_btn ${
          isDeleting ? "bg-gray" : "bg-red-600"
        }`}
        onClick={handleDeleteProject}
      >
        <Image src="/trash.svg" alt="delete" width={15} height={15} />
      </button>
    </>
  );
};

export default ProjectActions;
