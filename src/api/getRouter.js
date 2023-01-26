import request from "@/utils/request";

export const getAllRoles = () => {
  return request({
    method: "get",
    url: "/routers/getRoles",
  });
};
