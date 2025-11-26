import{r as w,j as t,T as y,V as b,P as L}from"./iframe-CrNh7Vw0.js";import{B as k}from"./Button-xgSVZToW.js";import{E as S}from"./ErrorMessage-nTH1HQW2.js";import{F as h}from"./FormTextInput-CB3S6fmW.js";import{u as j}from"./useTranslation-BSjrQqM7.js";import"./preload-helper-Zf8nSx-t.js";import"./index-C2PlCmcY.js";function T({error:e,loading:a,onLogin:n,register:r}){const{t:o}=j(),[l,E]=w.useState(""),[I,f]=w.useState(""),v=w.useRef(null),x=()=>{n(l,I)};return t.jsxs(t.Fragment,{children:[t.jsx(y,{className:"mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white",children:o("auth.welcomeBack")}),t.jsx(S,{error:e}),t.jsx(h,{type:"email",onChangeText:E,editable:!a,onSubmitEditing:()=>v.current?.focus(),submitBehavior:"submit",returnKeyType:"next",placeholder:"auth.emailPlaceholder",label:"auth.email",containerClassName:"mb-4",testID:"login-email"}),t.jsx(h,{ref:v,type:"password",onChangeText:f,editable:!a,onSubmitEditing:x,returnKeyType:"done",placeholder:"auth.passwordPlaceholder",label:"auth.password",containerClassName:"mb-4",testID:"login-password"}),t.jsx(k,{className:"mb-4",type:"primary",onPress:x,disabled:a,t:a?"auth.signingIn":"auth.signIn"}),t.jsxs(b,{className:"flex-row justify-center",children:[t.jsxs(y,{className:"text-gray-600 dark:text-gray-400",children:[o("auth.dontHaveAccount")," "]}),t.jsx(L,{onPress:r,role:"button",children:t.jsx(y,{className:"font-semibold text-blue-600 dark:text-blue-400",children:o("auth.signUp")})})]})]})}T.__docgenInfo={description:"",methods:[],displayName:"LoginScreen",props:{error:{required:!0,tsType:{name:"ErrorState"},description:""},loading:{required:!0,tsType:{name:"boolean"},description:""},onLogin:{required:!0,tsType:{name:"signature",type:"function",raw:"(email: string, password: string) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"email"},{type:{name:"string"},name:"password"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},register:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const{expect:s,fn:B,userEvent:i,within:g}=__STORYBOOK_MODULE_TEST__,V={title:"auth/LoginScreen",component:T,tags:["autodocs"],args:{onLogin:B(),register:B()},decorators:[e=>t.jsx(b,{className:"max-w-md p-4",children:t.jsx(e,{})})]},c={args:{error:null,loading:!1},play:async({args:e,canvasElement:a})=>{const n=g(a),r=n.getByTestId("login-email"),o=n.getByTestId("login-password");await i.type(r,"test@example.com"),await i.type(o,"password123");const l=n.getAllByRole("button")[0];await i.click(l),await s(e.onLogin).toHaveBeenCalledTimes(1),await s(e.onLogin).toHaveBeenCalledWith("test@example.com","password123")}},d={args:{error:"Invalid email or password",loading:!1}},p={args:{error:null,loading:!0},play:async({args:e,canvasElement:a})=>{const n=g(a),r=n.getByTestId("login-email"),o=n.getByTestId("login-password");await s(r.disabled).toBe(!0),await s(o.disabled).toBe(!0);const l=n.getAllByRole("button")[0];await s(l.disabled).toBe(!0),await s(async()=>{await i.click(l)}).rejects.toThrow("pointer-events: none"),await s(e.onLogin).not.toHaveBeenCalled()}},u={args:{error:null,loading:!1},play:async({args:e,canvasElement:a})=>{const r=g(a).getAllByRole("button")[1];await i.click(r),await s(e.register).toHaveBeenCalledTimes(1)}},m={args:{error:null,loading:!1},play:async({args:e,canvasElement:a})=>{const n=g(a),r=n.getByTestId("login-email"),o=n.getByTestId("login-password");await i.type(r,"test@example.com"),await i.keyboard("{Enter}"),await s(document.activeElement).toBe(o),await i.type(o,"password123"),await i.keyboard("{Enter}"),await s(e.onLogin).toHaveBeenCalledTimes(1),await s(e.onLogin).toHaveBeenCalledWith("test@example.com","password123")}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    error: null,
    loading: false
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the email and password inputs
    const emailInput = canvas.getByTestId("login-email");
    const passwordInput = canvas.getByTestId("login-password");

    // Type in credentials
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    // Find and click the login button
    const loginButton = canvas.getAllByRole("button")[0];
    await userEvent.click(loginButton);

    // Verify onLogin was called once with the correct values
    await expect(args.onLogin).toHaveBeenCalledTimes(1);
    await expect(args.onLogin).toHaveBeenCalledWith("test@example.com", "password123");
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    error: "Invalid email or password",
    loading: false
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    error: null,
    loading: true
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find inputs
    const emailInput = canvas.getByTestId("login-email") as HTMLInputElement;
    const passwordInput = canvas.getByTestId("login-password") as HTMLInputElement;

    // Verify inputs are disabled
    await expect(emailInput.disabled).toBe(true);
    await expect(passwordInput.disabled).toBe(true);

    // Find the login button (should show "Signing in...")
    const loginButton = canvas.getAllByRole("button")[0] as HTMLButtonElement;

    // Verify button is disabled
    await expect(loginButton.disabled).toBe(true);

    // Try to click the button - should fail due to pointer-events: none
    await expect(async () => {
      await userEvent.click(loginButton);
    }).rejects.toThrow("pointer-events: none");

    // Verify onLogin was NOT called
    await expect(args.onLogin).not.toHaveBeenCalled();
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    error: null,
    loading: false
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the "Sign Up" link text
    const signUpLink = canvas.getAllByRole("button")[1];

    // Click the sign up link
    await userEvent.click(signUpLink);

    // Verify register was called
    await expect(args.register).toHaveBeenCalledTimes(1);
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    error: null,
    loading: false
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the input fields
    const emailInput = canvas.getByTestId("login-email");
    const passwordInput = canvas.getByTestId("login-password");

    // Type in email and press Enter
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.keyboard("{Enter}");

    // Verify focus moved to password field
    await expect(document.activeElement).toBe(passwordInput);

    // Type in password and press Enter to submit
    await userEvent.type(passwordInput, "password123");
    await userEvent.keyboard("{Enter}");

    // Verify onLogin was called with correct values
    await expect(args.onLogin).toHaveBeenCalledTimes(1);
    await expect(args.onLogin).toHaveBeenCalledWith("test@example.com", "password123");
  }
}`,...m.parameters?.docs?.source}}};const A=["Default","WithError","Loading","RegisterNavigation","KeyboardSubmit"];export{c as Default,m as KeyboardSubmit,p as Loading,u as RegisterNavigation,d as WithError,A as __namedExportsOrder,V as default};
