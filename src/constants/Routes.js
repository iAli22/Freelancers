export const ROUTE = {
  HOME: "/:lang/home/:categoryId?",
  SEARCH: "/:lang/search",
  PROFILE: "/:lang/profile",

  // Offers
  SUBMIT_PROPOSAL: "/:lang/submit-proposal/:id/:actionType?",
  SHOW_PROPOSAL: "/:lang/show-proposal/:id",
  VIEW_INVOICE: "/:lang/view-invoice/:id",
  CONTRACT_DETAILS: "/:lang/contract-details/:id",
  CONTRACTS: "/:lang/contracts/:tab?",
  PROPOSALS: "/:lang/proposals/:tab?",
  NOTIFICATIONS: "/:lang/notifications",

  // Jobs
  JOBS_DETAILS: "/:lang/job-details/:id",
  FAVORITES_JOBS: "/:lang/favorites-job",

  //Settings
  SECURITY_SETTINGS: "/:lang/settings/security-settings",
  PAYMENT_SETTINGS: "/:lang/settings/payment-settings",
  DISPUTES_SETTINGS: "/:lang/settings/disputes/:tab?",

  // Auth
  LOGIN: "/:lang/login",
  OTP_VERFICATION: "/:lang/otp-verfication",
  QUESTION_VERFICATION: "/:lang/question-verfication",
  OTP_QUESTION_VERFICATION: "/:lang/otp-question-verfication",
  FORGET_PASSWORD: "/:lang/forget-password",
  RESET_PASSWORD_OTP: "/:lang/reset-password-otp",
  RESET_PASSWORD: "/:lang/reset-password",
};
