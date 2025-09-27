import fetcher from "../fetcher"
import type { FormAddCourse } from "@/pages/dashboard/quan-ly-khoa-hoc/add-course-modal"


const themKhoaHocApi = async function (data: FormAddCourse){
try{
 const response = await fetcher.post("/QuanLyKhoaHoc/ThemKhoaHoc", data)
 console.log("response data them KH",response.data)
 return response.data

} catch(error){
  console.log("error them khoa hoc:", error)
  throw error
}
} 

export default themKhoaHocApi