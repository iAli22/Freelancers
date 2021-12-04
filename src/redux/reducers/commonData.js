import {
  GET_All_CATEGORIES,
  GET_MAIN_CATEGORIES,
  GET_JOBS,
  GET_NEWEST_JOBS,
  RESET_JOBS,
  GET_FREELANCERS,
  GET_NEWEST_FREELANCERS,
  RESET_FREELANCERS,
  GET_FREELANCER,
  RESET_FREELANCER,
  GET_TREE_CATEGORIES,
  LOADING,
  GET_PREVIOUS_SEARCH_VAlUE,
  TIME_LINE_ITEMS,
  GET_PROPOSAL_LIST,
  GET_FAVORITES_JOBS,
  RESET_FAVORITES_JOBS,
} from "../actions/actionTypes";

const initialState = {
  allCategories: [],
  mainCategories: [],
  treeCategories: [],
  freelancers: { data: [] },
  jobs: { data: [] },
  newestJobs: [],
  newestFreelancers: [],
  freelancer: [],
  loading: false,
  previousSearch: {},
  timelineItems: [],
  proposalList: [],
  favoritesJobs: { data: [] },
};

const commonDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN_CATEGORIES:
      return { ...state, mainCategories: action.payload.categories.data };
    case LOADING:
      return { ...state, loading: action.payload };
    case GET_TREE_CATEGORIES:
      return { ...state, treeCategories: action.payload.categories };
    case GET_All_CATEGORIES:
      return { ...state, allCategories: action.payload.categories.data };
    case GET_JOBS:
      return {
        ...state,
        jobs: {
          ...action.payload.jobs,
          data: [...state.jobs.data, ...action.payload.jobs.data],
        },
        loading: false,
      };
    case GET_FAVORITES_JOBS:
      return {
        ...state,
        favoritesJobs: {
          ...action.payload.jobs,
          data: [...state.favoritesJobs.data, ...action.payload.jobs.data],
        },
        loading: false,
      };
    case GET_NEWEST_JOBS:
      return {
        ...state,
        newestJobs: action.payload.jobs.data,
      };
    case GET_NEWEST_FREELANCERS:
      return {
        ...state,
        newestFreelancers: action.payload.freelancers.data,
      };
    case GET_PREVIOUS_SEARCH_VAlUE:
      return {
        ...state,
        previousSearch: action.payload,
      };
    case TIME_LINE_ITEMS:
      return {
        ...state,
        timelineItems: action.payload,
      };
    case GET_PROPOSAL_LIST:
      return {
        ...state,
        proposalList: action.payload,
      };
    case RESET_JOBS:
      return {
        ...state,
        jobs: initialState.jobs,
      };
    case RESET_FAVORITES_JOBS:
      return {
        ...state,
        favoritesJobs: initialState.favoritesJobs,
      };
    case GET_FREELANCERS:
      return {
        ...state,
        freelancers: {
          ...action.payload.freelancers,
          data: [...state.freelancers.data, ...action.payload.freelancers.data],
        },
        loading: false,
      };
    case GET_FREELANCER:
      return {
        ...state,
        freelancer: action.payload,
      };

    case RESET_FREELANCERS:
      return {
        ...state,
        freelancers: initialState.freelancers,
      };
    case RESET_FREELANCER:
      return {
        ...state,
        freelancer: initialState.freelancer,
      };
    default:
      return state;
  }
};
export default commonDataReducer;
