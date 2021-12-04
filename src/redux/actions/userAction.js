import { axiosInstance } from "../../api/baseUrl";
import { errorToast } from "../../helper/toastMessage";
import {
  GET_FREELANCER_STATICS,
  GET_USER_PROFILE,
  LOGOUT_SUCCESS,
  // USER_LOADED,
  USER_LOADING,
  NOT_LOADING,
  GET_NOTIFICATION,
  GET_All_NOTIFICATION,
  RESET_All_NOTIFICATION,
} from "./actionTypes";

export const SignIn = (data) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });

  return await axiosInstance.post(`login/${data.userType}`, data);
};

export const LoginOTP = (data) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });

  return await axiosInstance.post("freelancer/two_step_verification", data);
};

export const ForgetEmailPassword = (data) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });

  return await axiosInstance.post("reset_password/send_otp", data);
};

export const ForgetPasswordOtp = (data) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });

  return await axiosInstance.post("/reset_password/check_otp", data);
};
export const CreateNewPassword = (data) => async (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });

  return await axiosInstance.post("/reset_password/set_password", data);
};

export const signOut = () => async (dispatch) => {
  try {
    await axiosInstance.get("logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    errorToast(error.message);
  }
};

export const getUserProfile = () => async (dispatch) => {
  const response = await axiosInstance.get("freelancer/profile");
  dispatch({ type: GET_USER_PROFILE, payload: response.data.data });
};

export const GetFreelancerStatics = () => async (dispatch) => {
  const response = await axiosInstance.get("freelancer/statics");
  dispatch({ type: GET_FREELANCER_STATICS, payload: response.data.data });
};

export const saveJob = (jobId, type) => async (dispatch) => {
  return await axiosInstance.post(`/freelancer/jobs/${jobId}/${type}`);
};

export const getPevSearch = () => async (dispatch) => {
  return await axiosInstance.get(`/freelancer/save/search`);
};
export const getRelatedCategories = () => async (dispatch) => {
  return await axiosInstance.get(`/freelancer/skills/categories`);
};

export const postPevSearch = (data) => async (dispatch) => {
  return await axiosInstance.post(`/freelancer/save/search`, data);
};

export const createProposal = (jobId, data) => async (dispatch) => {
  return await axiosInstance.post(
    `/freelancer/jobs/${jobId}/proposal/create`,
    data
  );
};

export const submitForPayment = (id, data) => async (dispatch) => {
  return await axiosInstance.post(
    `/freelancer/contracts/${id}/request_payment_for_milestone`,
    data
  );
};

export const updateProposal = (jobId, data) => async (dispatch) => {
  return await axiosInstance.post(`/freelancer/proposal/${jobId}/update`, data);
};

export const proposalDetails = (proposalId) => async (dispatch) => {
  return await axiosInstance.get(`freelancer/proposals/${proposalId}/show`);
};

export const contractDetails = (contractId) => async (dispatch) => {
  return await axiosInstance.get(`freelancer/contracts/${contractId}/show`);
};

export const jobDetails = (jobId) => async (dispatch) => {
  return await axiosInstance.get(`freelancer/jobs/${jobId}/show`);
};

export const getContracts = (data) => async (dispatch) => {
  return await axiosInstance.get(
    `freelancer/contracts?type=${data.type}&search=${data.search}&page=${data.page}&sort_by=${data.sortBy}`
  );
};
export const getProposals = (data) => async (dispatch) => {
  return await axiosInstance.get(
    `freelancer/${data.requestType}?type=${data.type}&search=${data.search}&page=${data.page}&sort_by=${data.sortBy}`
  );
};

export const getDisputes = (data) => async (dispatch) => {
  return await axiosInstance.get(
    `freelancer/disputes?type=all&page=${data.page}&dispute_type=${data.type}`
  );
};

// Settings
export const getSettings = () => async (dispatch) => {
  return await axiosInstance.get(`freelancer/settings`);
};
export const updateSettings = (data) => async (dispatch) => {
  return await axiosInstance.post(`freelancer/settings/update`, data);
};

// Change Password
export const changePassword = (data) => async (dispatch) => {
  return await axiosInstance.post(`password/change`, data);
};

// Payment options
export const getPaymentSettings = () => async (dispatch) => {
  return await axiosInstance.get(`freelancer/beneficiary/get`);
};

export const addPaymentMethod = (data) => async (dispatch) => {
  return await axiosInstance.post(`freelancer/beneficiary/create`, data);
};

export const makeDefaultPayment = (id) => async (dispatch) => {
  return await axiosInstance.post(`freelancer/beneficiary/${id}/make_default`);
};

export const deletePayment = (id) => async (dispatch) => {
  return await axiosInstance.delete(`freelancer/beneficiary/${id}/delete`);
};

export const updatePayment = (id, data) => async (dispatch) => {
  return await axiosInstance.post(`freelancer/beneficiary/${id}/update`, data);
};

// Notification
export const getNotification = (data) => async (dispatch) => {
  const response = await axiosInstance.get(
    `freelancer/notifications?page=${data.page}`
  );
  dispatch({ type: GET_NOTIFICATION, payload: response.data.data });
};
export const getAllNotification = (data) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  const response = await axiosInstance.get(
    `freelancer/notifications?page=${data.page}`
  );
  dispatch({ type: GET_All_NOTIFICATION, payload: response.data.data });
  dispatch({ type: NOT_LOADING });
};
export const resetAllNotification = (data) => async (dispatch) => {
  dispatch({ type: RESET_All_NOTIFICATION });
};
export const readNotifications = (data) => async (dispatch) => {
  await axiosInstance.post(`freelancer/notifications/mark_as_read`);
};

/**
 * ? freelancer/contracts?type=active&search=&page=active // active ,completed: closed, disputed
 * * freelancer/proposals?type=published&search=&page=published // (published: submitted) ,active,invitation,(pending : offer), draft
 */
