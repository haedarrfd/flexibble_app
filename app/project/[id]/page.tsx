import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { getProjectDetails } from "@/lib/actions";
import Modal from "@/components/Modal";
import ProjectActions from "@/components/ProjectActions";
import RelatedProjects from "@/components/RelatedProjects";
import { ProjectInterface } from "@/common.types";

const Project = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  if (!result?.project)
    return <p className="no_result_text">Failed to fetch project info</p>;

  const projectDetails = result?.project;

  const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`;

  return (
    <Modal>
      <section className="flex_between gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={projectDetails?.createdBy?.avatarUrl}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flex_start flex-col gap-1">
            <p className="self-start text-lg font-semibold">
              {projectDetails?.title}
            </p>

            <div className="user_info">
              <Link href={renderLink()}>{projectDetails?.createdBy?.name}</Link>

              <Image src="/dot.svg" alt="dot" width={5} height={5} />

              <Link
                href={`/?category=${projectDetails.category}`}
                className="text-primary-purple font-semibold"
              >
                {projectDetails?.category}
              </Link>
            </div>
          </div>
        </div>

        {session?.user?.email === projectDetails?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions projectId={projectDetails?.id} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Image
          src={`${projectDetails?.image}`}
          alt="Poster Image"
          width={1064}
          height={798}
          className="object-cover rounded-2xl"
        />
      </section>

      <section className="flex_center flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">
          {projectDetails?.description}
        </p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link
            href={projectDetails?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex_center gap-2 tex-sm font-medium text-primary-purple transition-colors hover:text-purple-700"
          >
            🖥 <span className="underline">Github</span>
          </Link>

          <Image src="/dot.svg" width={5} height={5} alt="dot" />

          <Link
            href={projectDetails?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flex_center gap-2 tex-sm font-medium text-primary-purple transition-colors hover:text-purple-700"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flex_center w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />

        <Link href={renderLink()} className="min-w-[82px] h-[82px]">
          <Image
            src={projectDetails?.createdBy?.avatarUrl}
            alt="profile image"
            width={82}
            height={82}
            className="rounded-full"
          />
        </Link>

        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects
        userId={projectDetails?.createdBy?.id}
        projectId={projectDetails?.id}
      />
    </Modal>
  );
};

export default Project;
