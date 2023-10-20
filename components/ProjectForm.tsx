"use client";

import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "./FormField";
import Button from "./Button";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constants";
import { FormState, ProjectInterface, SessionInterface } from "@/common.types";
import { createNewProject, fetchToken, updateProject } from "@/lib/actions";

type ProjectFormProps = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: ProjectFormProps) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image file");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token);

        router.push("/");
      }

      if (type === "edit") {
        await updateProject(form, project?.id as string, token);

        router.push("/");
      }
    } catch (error) {
      alert(
        `Failed to ${
          type === "create" ? "Create" : "Edit"
        } a project. Try again!`
      );
    } finally {
      // for stop loading
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex_start form">
      <div className="flex_start form_image_container">
        <label htmlFor="poster" className="flex_center form_image_label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          className="form_image_input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            alt="Image Poster"
            className="sm:p-10 object-contain z-20"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        setState={(value) => handleStateChange("title", value)}
        placeholder="Flexibble"
      />

      <FormField
        title="Description"
        state={form.description}
        isTextArea
        setState={(value) => handleStateChange("description", value)}
        placeholder="Showcase and discover remarkable developer projects."
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        setState={(value) => handleStateChange("liveSiteUrl", value)}
        placeholder="https://dribble.com"
      />

      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        setState={(value) => handleStateChange("githubUrl", value)}
        placeholder="https://github.com/haedarrfd"
      />

      {/* Custom Input Category */}
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flex_start w-full">
        <Button
          title={
            submitting
              ? `${type === "create" ? "Creating.." : "Editing.."}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={submitting ? "" : "/plus.svg"}
          submitting={submitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
