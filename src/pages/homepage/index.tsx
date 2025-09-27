import Banner from "./banner";
import CourseList from "./course-list";
import { useTop8Course } from "@/hooks/hook-coursesList";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch } from "@/hooks/hook";
import { useEffect } from "react";
import { setTop8KhoaHoc } from "@/store/slices/courses";

export default function HomePage() {
  const { data, isLoading, isError } = useTop8Course();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setTop8KhoaHoc(data));
    }
  }, [dispatch, isLoading, data]);

  if (isError) return <div>Fail loading the courses list...</div>;

  return (
    <div className="container mx-auto space-y-20">
      {isLoading && (
        <div className="flex flex-col">
          <Skeleton className="w-full h-96" />
          <Skeleton className="w-full " />
        </div>
      )}
      {!isLoading && data && (
        <>
          <Banner />
          <CourseList />
        </>
      )}
    </div>
  );
}
