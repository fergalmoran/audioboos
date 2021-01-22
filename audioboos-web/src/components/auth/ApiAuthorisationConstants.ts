export const ApplicationName = "audioboos.web";

export const QueryParameterNames = {
    ReturnUrl: "returnUrl",
    Message: "message",
};

export const LogoutActions = {
    LogoutCallback: "logout-callback",
    Logout: "logout",
    LoggedOut: "logged-out",
};

export const LoginActions = {
    Login: "login",
    LoginCallback: "login-callback",
    LoginFailed: "login-failed",
    Profile: "profile",
    Register: "register",
};

const prefix = `/authentication`;
const authServer = process.env.REACT_APP_API_URL;

export const ApplicationPaths = {
    Login: `/${LoginActions.Login}`,
    LoginFailed: `${LoginActions.LoginFailed}`,
    LoginCallback: `${LoginActions.LoginCallback}`,
    Register: `/${LoginActions.Register}`,

    DefaultLoginRedirectPath: "/",
    ApiAuthorisationClientConfigurationUrl: `${authServer}/_configuration/${ApplicationName}`,
    ApiAuthorisationPrefix: prefix,
    // Login: `${prefix}/${LoginActions.Login}`,
    // LoginFailed: `${prefix}/${LoginActions.LoginFailed}`,
    // LoginCallback: `${prefix}/${LoginActions.LoginCallback}`,
    // Register: `${prefix}/${LoginActions.Register}`,
    Profile: `${prefix}/${LoginActions.Profile}`,
    LogOut: `${prefix}/${LogoutActions.Logout}`,
    LoggedOut: `${prefix}/${LogoutActions.LoggedOut}`,
    LogOutCallback: `${prefix}/${LogoutActions.LogoutCallback}`,
    IdentityRegisterPath: `${authServer}/Identity/Account/Register`,
    IdentityManagePath: `${authServer}/Identity/Account/Manage`,
};
