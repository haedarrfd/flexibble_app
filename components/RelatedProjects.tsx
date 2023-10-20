import Link from "next/link";
import { getUserProjects } from "@/lib/actions";
import { ProjectInterface, UserProfile } from "@/common.types";
import Image from "next/image";

type RelatedProjectsProps = {
  userId: string;
  projectId: string;
};

const RelatedProjects = async ({ userId, projectId }: RelatedProjectsProps) => {
  const result = (await getUserProjects(userId)) as { user?: UserProfile };

  const filteredProjects = result?.user?.projects?.edges?.filter(
    ({ node }: { node: ProjectInterface }) => node?.id !== projectId
  );

  if (filteredProjects?.length === 0) return null;

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flex_between">
        <p className="text-base font-bold">More by {result?.user?.name}</p>

        <Link
          href={`/profile/${result?.user?.id}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="related_projects_grid">
        {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
          <div className="flex_center related_project_card drop-shadow-card">
            <Link
              href={`/project/${node?.id}`}
              className="flex_center group relative w-full h-full"
            >
              <Image
                src={node?.image}
                alt="Project Image"
                width={415}
                height={315}
                className="w-full h-full object-cover rounded-2xl"
              />

              <div className="hidden transition-all group-hover:flex related_project_card_title">
                <p className="w-full">{node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
