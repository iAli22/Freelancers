import { axiosInstance } from "../../api/baseUrl";
import {
  GET_MAIN_CATEGORIES,
  GET_All_CATEGORIES,
  GET_JOBS,
  GET_NEWEST_JOBS,
  RESET_JOBS,
  GET_FREELANCERS,
  GET_FREELANCER,
  RESET_FREELANCERS,
  RESET_FREELANCER,
  GET_NEWEST_FREELANCERS,
  GET_TREE_CATEGORIES,
  LOADING,
  GET_PREVIOUS_SEARCH_VAlUE,
  TIME_LINE_ITEMS,
  GET_PROPOSAL_LIST,
  GET_FAVORITES_JOBS,
  RESET_FAVORITES_JOBS,
} from "./actionTypes";
import { proposalList } from "../../helper/proposalList";
export const getMainCategories = () => async (dispatch) => {
  const response = await axiosInstance.get("categories/main?job_count=true");
  dispatch({ type: GET_MAIN_CATEGORIES, payload: response.data.data });
};
export const getTreeCategories = () => async (dispatch) => {
  const response = await axiosInstance.get("categories_tree?job_count=true");
  dispatch({ type: GET_TREE_CATEGORIES, payload: response.data.data });
};
export const getAllCategories = () => async (dispatch) => {
  const response = await axiosInstance.get("categories/all?job_count=true");
  dispatch({ type: GET_All_CATEGORIES, payload: response.data.data });
};
export const getJobs = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  const response = await axiosInstance.get(
    `freelancer/jobs?sort_by=${data.sortBy}&search=${data.search}&budget=${data.budget}&project_timeline=${data.timeline}&proposal_count=${data.proposal}&categories_id=${data.categoryId}&page=${data.page}`
  );
  dispatch({ type: GET_JOBS, payload: response.data.data });
};

export const getFavoritesJobs = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });
  const response = await axiosInstance.get(
    `freelancer/jobs/saved?page=${data.page}`
  );
  dispatch({ type: GET_FAVORITES_JOBS, payload: response.data.data });
};

export const getNewestJobs = () => async (dispatch) => {
  const response = await axiosInstance.get(`freelancer/jobs?sort_by=newest`);
  dispatch({ type: GET_NEWEST_JOBS, payload: response.data.data });
};
export const resetJobs = () => async (dispatch) => {
  dispatch({ type: RESET_JOBS });
};
export const resetFavoritesJobs = () => async (dispatch) => {
  dispatch({ type: RESET_FAVORITES_JOBS });
};
export const getFreeLancers = (data) => async (dispatch) => {
  dispatch({ type: LOADING, payload: true });

  const response = await axiosInstance.get(
    `/employer/browse/freelancers?search=${data.search}&location_country_ids=${data.locationCountry}&ratings=${data.ratings}&order_by=${data.sortBy}&page=${data.page}&language=${data.language}&category_ids=${data.categoryId}&skills=${data.skills}`
  );

  dispatch({
    type: GET_FREELANCERS,
    payload: response.data.data,
  });
};
export const getNewestFreelancers = () => async (dispatch) => {
  const response = await axiosInstance.get(
    `/employer/browse/freelancers?order_by=relevance`
  );

  dispatch({
    type: GET_NEWEST_FREELANCERS,
    payload: response.data.data,
  });
};
export const getFreeLancer = (id) => async (dispatch) => {
  const response = await axiosInstance.get(
    `/employer/browse/freelancer/${id}/show`
  );

  dispatch({
    type: GET_FREELANCER,
    payload: response.data.data.profile,
  });
};
export const resetFreelancers = () => async (dispatch) => {
  dispatch({ type: RESET_FREELANCERS });
};
export const resetFreelancer = () => async (dispatch) => {
  dispatch({ type: RESET_FREELANCER });
};
export const getTimeLineItems = () => async (dispatch) => {
  const payload = await axiosInstance.get("data/project_timelines");
  dispatch({
    type: TIME_LINE_ITEMS,
    payload: payload.data.data.project_timelines,
  });
};
export const getCountry = () => async (dispatch) => {
  return await axiosInstance.get("data/country_list");
};
export const getSkills = (search) => async (dispatch) => {
  return await axiosInstance.get(`/data/skills?search=${search}`);
};

export const previousSearchValue = (data) => (dispatch) => {
  dispatch({
    type: GET_PREVIOUS_SEARCH_VAlUE,
    payload: data,
  });
};

export const getProposalList = () => (dispatch) => {
  dispatch({
    type: GET_PROPOSAL_LIST,
    payload: proposalList,
  });
};
