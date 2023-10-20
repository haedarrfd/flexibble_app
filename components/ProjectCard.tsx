"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ProjectCardProps = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

const ProjectCard = ({
  id,
  image,
  title,
  name,
  avatarUrl,
  userId,
}: ProjectCardProps) => {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
    );
  }, []);

  return (
    <div className="flex_center flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flex_center group relative w-full h-full"
      >
        <Image
          src={image}
          alt="Project Image"
          width={415}
          height={315}
          className="w-full h-full object-cover rounded-2xl"
        />

        <div className="hidden group-hover:flex profile_card_title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flex_between w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flex_center gap-3">
            <Image
              src={avatarUrl}
              alt="profile image"
              width={25}
              height={25}
              className="rounded-full"
            />

            <p>{name}</p>
          </div>
        </Link>

        <div className="flex_center gap-3">
          <div className="flex_center gap-2">
            <Image src="/heart.svg" alt="heart" width={13} height={13} />

            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className="flex_center gap-2">
            <Image src="/eye.svg" alt="eye" width={12} height={10} />

            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
