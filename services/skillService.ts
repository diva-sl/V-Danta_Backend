import { SkillCourse } from "../models/SkillCourse";
import { SkillVideo } from "../models/SkillVideo";

export const getCourseVideos = async (courseId: number) => {
  return SkillVideo.findAll({
    where: { course_id: courseId },
    order: [["order_no", "ASC"]],
  });
};

export const getAllCourses = async () => {
  return SkillCourse.findAll({
    order: [["id", "ASC"]],
  });
};
