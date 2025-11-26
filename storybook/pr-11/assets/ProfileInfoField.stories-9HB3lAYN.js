import{j as o,V as t}from"./iframe-CvIt9pIp.js";import{t as i}from"./translation-keys-DZpkbaA8.js";import{P as c}from"./ProfileInfoField-CLQ4bcwd.js";import"./preload-helper-Zf8nSx-t.js";import"./useTranslation-B035vhT4.js";const{expect:m,fn:p,userEvent:d,within:u}=__STORYBOOK_MODULE_TEST__,w={title:"profile/ProfileInfoField",component:c,tags:["autodocs"],decorators:[n=>o.jsx(t,{className:"w-full max-w-md flex-1",children:o.jsx(n,{})})],args:{onPress:p()},argTypes:{label:i}},e={args:{label:"profile.name",value:"John Doe"},play:async({args:n,canvasElement:r})=>{const l=u(r).getByRole("button");await d.click(l),await m(n.onPress).toHaveBeenCalledTimes(1)}},a={args:{label:"profile.email",value:"Not set"}},s={args:{label:"profile.email",value:"very.long.email.address@example.subdomain.company.com"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};const E=["Default","NotSet","LongValue"];export{e as Default,s as LongValue,a as NotSet,E as __namedExportsOrder,w as default};
