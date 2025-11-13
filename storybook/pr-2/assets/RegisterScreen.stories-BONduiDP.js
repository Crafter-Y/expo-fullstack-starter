import{r as d,j as t,T as f,V as T,P as H}from"./iframe-DomvRT6K.js";import{B as D}from"./Button-BeOGm5Jr.js";import{E as N}from"./ErrorMessage-CHla1l3g.js";import{F as m}from"./FormTextInput-m3AzBxvq.js";import{u as L}from"./useTranslation-BtKoIQtd.js";import"./preload-helper-Zf8nSx-t.js";function R({error:r,loading:s,onRegister:e,login:i}){const{t:o}=L(),[c,l]=d.useState(""),[p,P]=d.useState(""),[j,k]=d.useState(""),[C,S]=d.useState(""),I=d.useRef(null),B=d.useRef(null),b=d.useRef(null),x=()=>{e(c,p,j,C)};return t.jsxs(t.Fragment,{children:[t.jsx(f,{className:"mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white",children:o("auth.createAccount")}),t.jsx(N,{error:r}),t.jsx(m,{type:"name",onChangeText:l,editable:!s,onSubmitEditing:()=>I.current?.focus(),submitBehavior:"submit",returnKeyType:"next",placeholder:"auth.namePlaceholder",label:"auth.name",containerClassName:"mb-4",testID:"register-name"}),t.jsx(m,{ref:I,type:"email",onChangeText:P,editable:!s,onSubmitEditing:()=>B.current?.focus(),submitBehavior:"submit",returnKeyType:"next",placeholder:"auth.emailPlaceholder",label:"auth.email",containerClassName:"mb-4",testID:"register-email"}),t.jsx(m,{ref:B,type:"new-password",onChangeText:k,editable:!s,onSubmitEditing:()=>b.current?.focus(),submitBehavior:"submit",returnKeyType:"next",placeholder:"auth.passwordPlaceholder",label:"auth.password",containerClassName:"mb-4",testID:"register-password"}),t.jsx(m,{ref:b,type:"new-password",onChangeText:S,editable:!s,onSubmitEditing:x,returnKeyType:"done",placeholder:"auth.passwordPlaceholder",label:"auth.confirmPassword",containerClassName:"mb-4",testID:"register-confirm-password"}),t.jsx(D,{className:"mb-4",type:"primary",onPress:x,disabled:s,t:s?"auth.creatingAccount":"auth.signUp"}),t.jsxs(T,{className:"flex-row justify-center",children:[t.jsxs(f,{className:"text-gray-600 dark:text-gray-400",children:[o("auth.alreadyHaveAccount")," "]}),t.jsx(H,{onPress:i,role:"button",children:t.jsx(f,{className:"font-semibold text-blue-600 dark:text-blue-400",selectable:!1,children:o("auth.signIn")})})]})]})}R.__docgenInfo={description:"",methods:[],displayName:"RegisterScreen",props:{error:{required:!0,tsType:{name:"ErrorState"},description:""},loading:{required:!0,tsType:{name:"boolean"},description:""},onRegister:{required:!0,tsType:{name:"signature",type:"function",raw:"(name: string, email: string, password: string, confirmPassword: string) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"name"},{type:{name:"string"},name:"email"},{type:{name:"string"},name:"password"},{type:{name:"string"},name:"confirmPassword"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},login:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const{expect:a,fn:E,userEvent:n,within:h}=__STORYBOOK_MODULE_TEST__,K={title:"auth/RegisterScreen",component:R,tags:["autodocs"],args:{onRegister:E(),login:E()},decorators:[r=>t.jsx(T,{className:"max-w-md p-4",children:t.jsx(r,{})})]},u={args:{error:null,loading:!1},play:async({args:r,canvasElement:s})=>{const e=h(s),i=e.getByTestId("register-name"),o=e.getByTestId("register-email"),c=e.getByTestId("register-password"),l=e.getByTestId("register-confirm-password");await n.type(i,"John Doe"),await n.type(o,"john@example.com"),await n.type(c,"password123"),await n.type(l,"password123");const p=e.getAllByRole("button")[0];await n.click(p),await a(r.onRegister).toHaveBeenCalledTimes(1),await a(r.onRegister).toHaveBeenCalledWith("John Doe","john@example.com","password123","password123")}},g={args:{error:"Passwords do not match",loading:!1}},w={args:{error:null,loading:!0},play:async({args:r,canvasElement:s})=>{const e=h(s),i=e.getByTestId("register-name"),o=e.getByTestId("register-email"),c=e.getByTestId("register-password"),l=e.getByTestId("register-confirm-password");await a(i.disabled).toBe(!0),await a(o.disabled).toBe(!0),await a(c.disabled).toBe(!0),await a(l.disabled).toBe(!0);const p=e.getAllByRole("button")[0];await a(p.disabled).toBe(!0),await a(async()=>{await n.click(p)}).rejects.toThrow("pointer-events: none"),await a(r.onRegister).not.toHaveBeenCalled()}},y={args:{error:null,loading:!1},play:async({args:r,canvasElement:s})=>{const i=h(s).getAllByRole("button")[1];await n.click(i),await a(r.login).toHaveBeenCalledTimes(1)}},v={args:{error:null,loading:!1},play:async({args:r,canvasElement:s})=>{const e=h(s),i=e.getByTestId("register-name"),o=e.getByTestId("register-email"),c=e.getByTestId("register-password"),l=e.getByTestId("register-confirm-password");await n.type(i,"John Doe"),await n.keyboard("{Enter}"),await a(document.activeElement).toBe(o),await n.type(o,"john@example.com"),await n.keyboard("{Enter}"),await a(document.activeElement).toBe(c),await n.type(c,"password123"),await n.keyboard("{Enter}"),await a(document.activeElement).toBe(l),await n.type(l,"password123"),await n.keyboard("{Enter}"),await a(r.onRegister).toHaveBeenCalledTimes(1),await a(r.onRegister).toHaveBeenCalledWith("John Doe","john@example.com","password123","password123")}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    error: null,
    loading: false
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the input fields using testIDs
    const nameInput = canvas.getByTestId("register-name");
    const emailInput = canvas.getByTestId("register-email");
    const passwordInput = canvas.getByTestId("register-password");
    const confirmPasswordInput = canvas.getByTestId("register-confirm-password");

    // Type in registration details
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "password123");

    // Find and click the sign up button
    const signUpButton = canvas.getAllByRole("button")[0];
    await userEvent.click(signUpButton);

    // Verify onRegister was called once with the correct values
    await expect(args.onRegister).toHaveBeenCalledTimes(1);
    await expect(args.onRegister).toHaveBeenCalledWith("John Doe", "john@example.com", "password123", "password123");
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    error: "Passwords do not match",
    loading: false
  }
}`,...g.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
    const nameInput = canvas.getByTestId("register-name") as HTMLInputElement;
    const emailInput = canvas.getByTestId("register-email") as HTMLInputElement;
    const passwordInput = canvas.getByTestId("register-password") as HTMLInputElement;
    const confirmPasswordInput = canvas.getByTestId("register-confirm-password") as HTMLInputElement;

    // Verify all inputs are disabled
    await expect(nameInput.disabled).toBe(true);
    await expect(emailInput.disabled).toBe(true);
    await expect(passwordInput.disabled).toBe(true);
    await expect(confirmPasswordInput.disabled).toBe(true);

    // Find the sign up button (should show "Creating account...")
    const signUpButton = canvas.getAllByRole("button")[0] as HTMLButtonElement;

    // Verify button is disabled
    await expect(signUpButton.disabled).toBe(true);

    // Try to click the button - should fail due to pointer-events: none
    await expect(async () => {
      await userEvent.click(signUpButton);
    }).rejects.toThrow("pointer-events: none");

    // Verify onRegister was NOT called
    await expect(args.onRegister).not.toHaveBeenCalled();
  }
}`,...w.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    error: null,
    loading: false
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the "Sign In" link (second button)
    const signInLink = canvas.getAllByRole("button")[1];

    // Click the sign in link
    await userEvent.click(signInLink);

    // Verify login was called
    await expect(args.login).toHaveBeenCalledTimes(1);
  }
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
    const nameInput = canvas.getByTestId("register-name");
    const emailInput = canvas.getByTestId("register-email");
    const passwordInput = canvas.getByTestId("register-password");
    const confirmPasswordInput = canvas.getByTestId("register-confirm-password");

    // Type in first field and press Enter
    await userEvent.type(nameInput, "John Doe");
    await userEvent.keyboard("{Enter}");

    // Verify focus moved to email (in web, we can check document.activeElement)
    await expect(document.activeElement).toBe(emailInput);

    // Type in email and press Enter
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.keyboard("{Enter}");

    // Verify focus moved to password
    await expect(document.activeElement).toBe(passwordInput);

    // Type in password and press Enter
    await userEvent.type(passwordInput, "password123");
    await userEvent.keyboard("{Enter}");

    // Verify focus moved to confirm password
    await expect(document.activeElement).toBe(confirmPasswordInput);

    // Type in confirm password and press Enter to submit
    await userEvent.type(confirmPasswordInput, "password123");
    await userEvent.keyboard("{Enter}");

    // Verify onRegister was called with correct values
    await expect(args.onRegister).toHaveBeenCalledTimes(1);
    await expect(args.onRegister).toHaveBeenCalledWith("John Doe", "john@example.com", "password123", "password123");
  }
}`,...v.parameters?.docs?.source}}};const M=["Default","WithError","Loading","LoginNavigation","KeyboardSubmit"];export{u as Default,v as KeyboardSubmit,w as Loading,y as LoginNavigation,g as WithError,M as __namedExportsOrder,K as default};
