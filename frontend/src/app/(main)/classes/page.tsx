"use client";

import CourseBlob from "@/components/courses/course-blob";
import HeadTitle from "@/components/main/head-title";
import Profile from "@/components/main/profile";
import SearchSection from "@/components/main/search-section";
import { useUserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const softwareCourses1 = [
  {
    courseName: "Artifical Intelligence",
    courseCode: "COSC 423",
  },
  {
    courseName: "Software Project Management",
    courseCode: "SENG 405",
  },
  {
    courseName: "Network Security and Software",
    courseCode: "SENG 409",
  },
  {
    courseName: "Software Project Management",
    courseCode: "SENG 413",
  },
  {
    courseName: "Introduction to Entrepreneurial Skills",
    courseCode: "GEDS 400",
  },
  {
    courseName: "Database Admin Workshop",
    courseCode: "COSC 409",
  },
  {
    courseName: "Citizenship Orientation",
    courseCode: "GEDS 001",
  },
  {
    courseName: "Mobile Applications Design",
    courseCode: "SENG 401",
  },
  {
    courseName: "Open Source Systems Development",
    courseCode: "SENG 411",
  },
] as const;

const softwareCourses2 = [
  {
    courseName: "Formal Methods and specifications in software engineering",
    courseCode: "SENG 406",
  },
  {
    courseName: "Software Quality",
    courseCode: "SENG 402",
  },
  {
    courseName: "Internet technologies and web application Development",
    courseCode: "SENG 412",
  },
  {
    courseName: "Hands-on-Java Training",
    courseCode: "COSC 430",
  },
  {
    courseName: "Modelling and simulations",
    courseCode: "COSC 408",
  },
  {
    courseName: "Research project",
    courseCode: "SENG 490",
  },
  {
    courseName: "Human computing interaction and emerging technologies",
    courseCode: "SENG 404",
  },
  {
    courseName: "Biblical principles in personal and proffesional life",
    courseCode: "GEDS 420",
  },
] as const;

const computerScience1 = [
  {
    courseName: "Introduction to Entrepeneurial Skills",
    courseCode: "GEDS 400",
  },
  {
    courseName: "Compiler Construction",
    courseCode: "COSC 401",
  },
  {
    courseName: "Artificial intelligence and applications",
    courseCode: "COSC 423",
  },
  {
    courseName: "Database System Design Implementation and Management",
    courseCode: "COSC 333",
  },
  {
    courseName: "Computer Organization and Architecture",
    courseCode: "COSC 425",
  },
  {
    courseName: "Web Design and Development",
    courseCode: "ITGY 401",
  },
  {
    courseName: "Principles of Software Engineering",
    courseCode: "SENG 400",
  },
] as const;

const computerScience2 = [
  {
    courseName: "Biblical principles in personal and proffesional life",
    courseCode: "GEDS 420",
  },
  {
    courseName: "Information Theory and Data communication systems",
    courseCode: "COSC 402",
  },
  {
    courseName: "Object-Oriented Programming Techniques",
    courseCode: "COSC 424",
  },
  {
    courseName: "Research Project",
    courseCode: "COSC 490",
  },
  {
    courseName: "Internet Technologies and Web Application Development",
    courseCode: "SENG 412",
  },
  {
    courseName: "Modelling and Simulation",
    courseCode: "COSC 408",
  },
  {
    courseName: "Hands-on-Java Training",
    courseCode: "COSC 430",
  },
] as const;

type TSoftware1 = (typeof softwareCourses1)[number];
type TSoftware2 = (typeof softwareCourses2)[number];
type TComputer1 = (typeof computerScience1)[number];
type TComputer2 = (typeof computerScience2)[number];

export type TCourse = TSoftware1 | TSoftware2 | TComputer1 | TComputer2;

const Classes = () => {
  const { user } = useUserContext();

  const router = useRouter();

  const [courses, setCourses] = useState<TCourse[]>([]);

  useEffect(() => {
    if (
      user?.user.course === "SOFTWARE_ENGINEERING" &&
      user.user.semester === "FIRST"
    )
      //@ts-ignore
      return setCourses(softwareCourses1);

    if (
      user?.user.course === "SOFTWARE_ENGINEERING" &&
      user.user.semester === "SECOND"
    )
      //@ts-ignore
      return setCourses(softwareCourses2);

    if (
      user?.user.course === "COMPUTER_SCIENCE" &&
      user.user.semester === "FIRST"
    )
      //@ts-ignore
      return setCourses(computerScience1);

    if (
      user?.user.course === "COMPUTER_SCIENCE" &&
      user.user.semester === "SECOND"
    )
      //@ts-ignore
      return setCourses(computerScience2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return router.push("/auth");

  return (
    <div className="flex justify-between ml-[26px]">
      <section className="w-2/3 mt-[44px] mb-[46px] h-screen ">
        <SearchSection />
        <HeadTitle title="Courses" />
        <div className="grid grid-cols-3 gap-x-6 gap-y-5">
          {courses.map((course, index: number) => (
            <CourseBlob
              key={index}
              coursename={course.courseName}
              coursecode={course.courseCode}
            />
          ))}
        </div>
      </section>

      <section className="mt-[15px]">
        <Profile />
      </section>
    </div>
  );
};

export default Classes;
