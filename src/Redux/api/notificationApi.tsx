import { baseApi } from "@/Redux/api/baseApi";

export const notificationApi: any = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    getNotifications: build.query({
      query: () => ({
        url: `/notification`,
        method: "GET",
      }),
      // Modify the transformResponse to only return 'data' from the response object
      transformResponse: (response: any) => {
        // Ensure you only return the 'data' from the response
        if (response && response.data) {
          return response.data;
        }
        return []; // Return an empty array if no data is found
      },
      providesTags: ["notification"],
    }),

    updateNotifications: build.mutation({
      query: (id: string) => ({
        url: `/notification/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),

    createProductInquiryNotification: build.mutation({
      query: (data: any) => ({
        url: `/notification/product-inquiry`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["notification"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetNotificationsQuery,
  useUpdateNotificationsMutation,
  useCreateProductInquiryNotificationMutation,
} = notificationApi;
