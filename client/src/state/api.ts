import { BaseQueryApi, FetchArgs, } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);
    if (result.data){
      result.data = result.data.data;
    }

    return result;
  } catch (error: unknown){
    const errorMessage = error instanceof Error ? error.message : "unknown error";
    return { error: {status: "FETCH_ERROR", error: errorMessage}};
  }
}

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Courses"],
  endpoints: (build) => ({
    getCourses: build.query<Course[], {category?: string}>({
      query: ({ category}) =>({
        url: "courses",
        params: {category}
      }),
      providesTags: ["Courses"],
    }),
    getCourse: build.query<Course, string>({
    query: (id) => `courses/${id}`,
    providesTags: (result, error, id) => (result ? [{ type: "Courses", id }] : []),
    })
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery
} = api;