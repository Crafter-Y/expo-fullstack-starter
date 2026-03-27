import{j as n,T as E,V as w}from"./iframe-WWK3Gj28.js";import{B as O}from"./Button-6UjaK1rt.js";import{D as B}from"./Divider-BM7t9E0T.js";import{P as r}from"./ProfileInfoField-ve-QCFNd.js";import{u as L}from"./useTranslation-BpQ4WMie.js";import"./preload-helper-Zf8nSx-t.js";import"./index-BwjMLDF7.js";function v({userName:e,userEmail:a,theme:l,language:t,loggingOut:s,onCycleTheme:T,onToggleLanguage:x,onLogout:b}){const{t:f}=L();return n.jsxs(n.Fragment,{children:[n.jsx(r,{label:"profile.name",value:e||f("profile.notSet"),className:"mb-4"}),n.jsx(r,{label:"profile.email",value:a||f("profile.notSet"),className:"mb-4"}),n.jsx(E,{className:"mb-3 mt-6 text-sm font-semibold uppercase text-gray-500 dark:text-gray-400",children:f("profile.settings")}),n.jsx(r,{label:"profile.theme",value:l,onPress:T,className:"mb-4"}),n.jsx(r,{label:"profile.language",value:t,onPress:x}),n.jsx(B,{className:"my-4"}),n.jsx(O,{type:"ghost",t:s?"profile.signingOut":"profile.signOut",onPress:b,disabled:s,textClassName:"text-red-600 dark:text-red-400",testID:"profile-sign-out"})]})}v.__docgenInfo={description:"",methods:[],displayName:"ProfileScreen",props:{userName:{required:!1,tsType:{name:"string"},description:""},userEmail:{required:!1,tsType:{name:"string"},description:""},theme:{required:!0,tsType:{name:"string"},description:""},language:{required:!0,tsType:{name:"string"},description:""},loggingOut:{required:!0,tsType:{name:"boolean"},description:""},onCycleTheme:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onToggleLanguage:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onLogout:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const{expect:o,fn:y,userEvent:p,within:h}=__STORYBOOK_MODULE_TEST__,J={title:"profile/ProfileScreen",component:v,tags:["autodocs"],args:{onCycleTheme:y(),onToggleLanguage:y(),onLogout:y()},decorators:[e=>n.jsx(w,{className:"w-full max-w-md flex-1",children:n.jsx(e,{})})]},i={args:{userName:"John Doe",userEmail:"john@example.com",theme:"Light",language:"English",loggingOut:!1}},g={args:{theme:"Dark",language:"Deutsch",loggingOut:!1}},u={args:{userName:"John Doe",userEmail:"john@example.com",theme:"Light",language:"English",loggingOut:!0},play:async({args:e,canvasElement:a})=>{const t=h(a).getByTestId("profile-sign-out");await o(t.disabled).toBe(!0),await o(async()=>{await p.click(t)}).rejects.toThrow("pointer-events: none"),await o(e.onLogout).not.toHaveBeenCalled()}},c={args:{userName:"John Doe",userEmail:"john@example.com",theme:"Light",language:"English",loggingOut:!1},play:async({args:e,canvasElement:a})=>{const s=h(a).getAllByRole("button")[0];await p.click(s),await o(e.onCycleTheme).toHaveBeenCalledTimes(1)}},m={args:{userName:"John Doe",userEmail:"john@example.com",theme:"Dark",language:"English",loggingOut:!1},play:async({args:e,canvasElement:a})=>{const s=h(a).getAllByRole("button")[1];await p.click(s),await o(e.onToggleLanguage).toHaveBeenCalledTimes(1)}},d={args:{userName:"John Doe",userEmail:"john@example.com",theme:"Light",language:"English",loggingOut:!1},play:async({args:e,canvasElement:a})=>{const t=h(a).getAllByRole("button"),s=t[t.length-1];await p.click(s),await o(e.onLogout).toHaveBeenCalledTimes(1)}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    userName: "John Doe",
    userEmail: "john@example.com",
    theme: "Light",
    language: "English",
    loggingOut: false
  }
}`,...i.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    theme: "Dark",
    language: "Deutsch",
    loggingOut: false
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    userName: "John Doe",
    userEmail: "john@example.com",
    theme: "Light",
    language: "English",
    loggingOut: true
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the sign out button
    const signOutButton = canvas.getByTestId("profile-sign-out") as HTMLButtonElement;

    // Verify button is disabled
    await expect(signOutButton.disabled).toBe(true);

    // Try to click the button - should fail due to disabled state
    await expect(async () => {
      await userEvent.click(signOutButton);
    }).rejects.toThrow("pointer-events: none");

    // Verify onLogout was NOT called
    await expect(args.onLogout).not.toHaveBeenCalled();
  }
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    userName: "John Doe",
    userEmail: "john@example.com",
    theme: "Light",
    language: "English",
    loggingOut: false
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find all pressable fields (theme and language are pressable)
    const fields = canvas.getAllByRole("button");

    // First pressable field should be theme
    const themeField = fields[0];

    // Click the theme field
    await userEvent.click(themeField);

    // Verify onCycleTheme was called
    await expect(args.onCycleTheme).toHaveBeenCalledTimes(1);
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    userName: "John Doe",
    userEmail: "john@example.com",
    theme: "Dark",
    language: "English",
    loggingOut: false
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find all pressable fields
    const fields = canvas.getAllByRole("button");

    // Second pressable field should be language
    const languageField = fields[1];

    // Click the language field
    await userEvent.click(languageField);

    // Verify onToggleLanguage was called
    await expect(args.onToggleLanguage).toHaveBeenCalledTimes(1);
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    userName: "John Doe",
    userEmail: "john@example.com",
    theme: "Light",
    language: "English",
    loggingOut: false
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find all buttons (theme, language, sign out)
    const buttons = canvas.getAllByRole("button");

    // Last button should be sign out
    const signOutButton = buttons[buttons.length - 1];

    // Click the sign out button
    await userEvent.click(signOutButton);

    // Verify onLogout was called
    await expect(args.onLogout).toHaveBeenCalledTimes(1);
  }
}`,...d.parameters?.docs?.source}}};const _=["Default","WithoutUser","LoggingOut","ThemeCycling","LanguageToggling","SignOut"];export{i as Default,m as LanguageToggling,u as LoggingOut,d as SignOut,c as ThemeCycling,g as WithoutUser,_ as __namedExportsOrder,J as default};
