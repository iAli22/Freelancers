import { ROUTE } from "../constants/Routes";
import {
  Home,
  Search,
  Profile,
  ShowProposal,
  SubmitProposal,
  ContractDetails,
  ViewInvoice,
  Contracts,
  SecuritySettings,
  DisputesSettings,
  PaymentSettings,
  Jobs,
  FavoritesJobs,
  Proposals,
  Notifications,
} from "../views";
const routes = [
  {
    path: ROUTE.HOME,
    exact: true,
    component: Home,
  },
  {
    path: ROUTE.SEARCH,
    exact: true,
    component: Search,
  },
  {
    path: ROUTE.PROFILE,
    exact: true,
    component: Profile,
  },
  {
    path: ROUTE.SUBMIT_PROPOSAL,
    exact: true,
    component: SubmitProposal,
  },
  {
    path: ROUTE.SHOW_PROPOSAL,
    exact: true,
    component: ShowProposal,
  },
  {
    path: ROUTE.CONTRACT_DETAILS,
    exact: true,
    component: ContractDetails,
  },
  {
    path: ROUTE.CONTRACTS,
    exact: true,
    component: Contracts,
  },
  {
    path: ROUTE.PROPOSALS,
    exact: true,
    component: Proposals,
  },
  {
    path: ROUTE.VIEW_INVOICE,
    exact: true,
    component: ViewInvoice,
  },
  {
    path: ROUTE.SECURITY_SETTINGS,
    exact: true,
    component: SecuritySettings,
  },
  {
    path: ROUTE.DISPUTES_SETTINGS,
    exact: true,
    component: DisputesSettings,
  },
  {
    path: ROUTE.PAYMENT_SETTINGS,
    exact: true,
    component: PaymentSettings,
  },
  {
    path: ROUTE.JOBS_DETAILS,
    exact: true,
    component: Jobs,
  },
  {
    path: ROUTE.FAVORITES_JOBS,
    exact: true,
    component: FavoritesJobs,
  },
  {
    path: ROUTE.NOTIFICATIONS,
    exact: true,
    component: Notifications,
  },
];
export default routes;
