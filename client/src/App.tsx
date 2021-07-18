import React, { useEffect, Suspense, useState } from "react";
import {
    Route,
    RouteComponentProps,
    Switch,
    withRouter
} from "react-router-dom";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

import { History } from "history";
import Layout from "./models/ui/Layout/layout";
import { getIsTokenSet, getLanguage } from "./store/selectors";
import { LoginCheck, checkLanguage } from "./store/general/index";

const Clients = React.lazy(() => {
    return import("./containers/users/clients.components");
});

const Users = React.lazy(() => {
    return import("./containers/users/users.components");
});

const Emails = React.lazy(() => {
    return import("./containers/users/emails.components");
});

const Payments = React.lazy(() => {
    return import("./containers/users/payments.components");
});
const Comment = React.lazy(() => {
    return import("./containers/users/components/comment/App");
});

const BusinessLogin = React.lazy(() => {
    return import("./containers/auth/login/login");
});

const BusinessLogout = React.lazy(() => {
    return import("./containers/auth/shared/logout");
});

interface DispatchProps {
    signInCheck: typeof LoginCheck;
    checkLanguages: typeof checkLanguage;
}

interface StateProps {
    isTokenSet: boolean;
    language: number;
}

interface Params extends RouteComponentProps<any> {
    history: History;
}
type Props = DispatchProps & StateProps & Params;
const App: React.FC<Props> = (props) => {
    const { signInCheck, isTokenSet, language } = props;
    const [routes, setRoutes] = useState<any>(
        <Switch>
            <Route
                path="/"
                render={() => <BusinessLogin loginComponent={true} />}
            />
        </Switch>
    );

    useEffect(() => {
        signInCheck();
    }, [isTokenSet]);

    useEffect(() => {
        props.checkLanguages();

        setRoutes(
            isTokenSet ? (
                <Switch>
                    <Route path="/email" render={() => <Emails />} />
                    <Route path="/logout" render={() => <BusinessLogout />} />
                    <Route path="/client" render={() => <Clients />} />
                    <Route path="/comment" render={() => <Comment />} />
                    <Route path="/payments" render={() => <Payments />} />

                    <Route path="/" render={() => <Users />} />
                </Switch>
            ) : (
                <Switch>
                    <Route
                        path="/agre"
                        render={() => <BusinessLogin loginComponent={false} />}
                    />

                    <Route
                        path="/"
                        render={() => <BusinessLogin loginComponent={true} />}
                    />
                </Switch>
            )
        );
    }, [isTokenSet]);

    return (
        <div>
            <Layout isLogin={true} isAdmin={true}>
                <Suspense
                    fallback={
                        <ReactLoading
                            type="bars"
                            color="#7467ef"
                            height={100}
                            width={100}
                        />
                    }
                >
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    isTokenSet: getIsTokenSet(state),
    language: getLanguage(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    signInCheck: () => dispatch(LoginCheck()),
    checkLanguages: () => dispatch(checkLanguage())
});

export default connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));
