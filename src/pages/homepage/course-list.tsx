import { useAppSelector } from "@/hooks/hook";
import CourseCard from "../../components/shared/body/course-card";
import type { FC } from "react";

const CourseList: FC = function () {
  const { top8KhoaHoc } = useAppSelector((state) => state.coursesSlice);
  console.log("top8KhoaHoc:", top8KhoaHoc);

  return (
    <section className="course__list p-6 space-y-7">
      <h2 className="text-3xl font-bold text-algo-charcoal">
        Learners are viewing
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9  bg-[#fefefe]">
        {top8KhoaHoc.map((course) => (
          <CourseCard key={course.maKhoaHoc} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CourseList;
