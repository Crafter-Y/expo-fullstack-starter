import{j as n,V as t}from"./iframe-BtBhSJXg.js";import{t as i}from"./translation-keys-DdjpFjOM.js";import{P as c}from"./ProfileInfoField-CmisVGN0.js";import"./preload-helper-Zf8nSx-t.js";import"./useTranslation-x4qJLAOj.js";import"./index-D3XHVbDV.js";const{expect:m,fn:p,userEvent:d,within:u}=__STORYBOOK_MODULE_TEST__,E={title:"profile/ProfileInfoField",component:c,tags:["autodocs"],decorators:[o=>n.jsx(t,{className:"w-full max-w-md flex-1",children:n.jsx(o,{})})],args:{onPress:p()},argTypes:{label:i}},e={args:{label:"profile.name",value:"John Doe"},play:async({args:o,canvasElement:r})=>{const l=u(r).getByRole("button");await d.click(l),await m(o.onPress).toHaveBeenCalledTimes(1)}},a={args:{label:"profile.email",value:"Not set"}},s={args:{label:"profile.email",value:"very.long.email.address@example.subdomain.company.com"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: "profile.name",
    value: "John Doe"
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the pressable field
    const field = canvas.getByRole("button");

    // Click the field
    await userEvent.click(field);

    // Verify onPress was called
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: "profile.email",
    value: "Not set"
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: "profile.email",
    value: "very.long.email.address@example.subdomain.company.com"
  }
}`,...s.parameters?.docs?.source}}};const _=["Default","NotSet","LongValue"];export{e as Default,s as LongValue,a as NotSet,_ as __namedExportsOrder,E as default};
