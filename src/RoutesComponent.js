import {FourOhFour} from "./ReactUtils.js"
import {Route, Routes} from "react-router-dom"
import {
    CharitiesRoute,
    CharityRoute,
    CreateCharityRoute,
    CreateEventRoute,
    EventRoute,
    EventsRoute,
    RoleRoute,
    RolesRoute,
    CreateRoleRoute,
    OpportunitiesRoute,
    OpportunityRoute,
    CreateOpportunityRoute,
    UserRoute,
    LoginWithEmailRoute,
} from "./Routes.js"

const RoutesComponent = () => {
    const c = "charities"
    const cc = "charities/:charityId"
    const cce = "charities/:charityId/events"
    const ccee = "charities/:charityId/events/:eventId"
    const ccr = "charities/:charityId/roles"
    const ccrr = "charities/:charityId/roles/:roleId"
    const u = "users"

    return(
        <Routes>
            <Route path="events" element={<EventsRoute />} />
            <Route path={c} element={<CharitiesRoute />} />
            <Route path={`${c}/create`} element={<CreateCharityRoute />} />
            <Route path={cc} element={<CharityRoute />} />
            <Route path={cce} element={<EventsRoute />} />
            <Route path={`${cce}/create`} element={<CreateEventRoute />} />
            <Route path={ccee} element={<EventRoute />} />
            <Route path={`${ccee}/opportunities`} element={<OpportunitiesRoute />} />
            <Route path={`${ccee}/opportunities/:opportunityId`} element={<OpportunityRoute />} />
            <Route path={`${ccee}/opportunities/create`} element={<CreateOpportunityRoute />} />
            <Route path={ccr} element={<RolesRoute />} />
            <Route path={`${ccr}/create`} element={<CreateRoleRoute />} />
            <Route path={ccrr} element={<RoleRoute />} />
            <Route path={u} element={<UserRoute />} />
            {/* SPECIAL CASES */}
            <Route path="/" element={<CharitiesRoute />} />
            <Route path="*" element={<FourOhFour />} />
            <Route path="loginWithEmail" element={<LoginWithEmailRoute />} />
        </Routes>
    )
}

export default RoutesComponent
