import{j as p,V as d}from"./iframe-C1YLhEZi.js";import{t as y}from"./translation-keys-Dpj7BitC.js";import{B as g}from"./Button-C4yKxfL_.js";import"./preload-helper-Zf8nSx-t.js";import"./useTranslation-Dm8a-IwT.js";import"./index-BXa_WnS3.js";const{expect:i,fn:v,userEvent:m,within:l}=__STORYBOOK_MODULE_TEST__,E={title:"elements/Button",component:g,argTypes:{t:y},decorators:[e=>p.jsx(d,{className:"flex-1 items-start",children:p.jsx(e,{})})],tags:["autodocs"],args:{onPress:v()}},t={args:{type:"primary",t:"auth.signIn"},play:async({args:e,canvasElement:o})=>{const c=l(o).getByRole("button");await m.click(c),await i(e.onPress).toHaveBeenCalledTimes(1)}},a={args:{type:"ghost",t:"todos.cancel"}},s={args:{type:"destructive",t:"todos.delete"}},n={args:{type:"primary",t:"auth.signIn",size:"small"}},r={args:{type:"primary",t:"auth.signIn",disabled:!0},play:async({args:e,canvasElement:o})=>{const c=l(o).getByRole("button");await i(async()=>{await m.click(c)}).rejects.toThrow("pointer-events: none"),await i(e.onPress).not.toHaveBeenCalled()}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    type: "primary",
    t: "auth.signIn"
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    type: "ghost",
    t: "todos.cancel"
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: "destructive",
    t: "todos.delete"
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    type: "primary",
    t: "auth.signIn",
    size: "small"
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: "primary",
    t: "auth.signIn",
    disabled: true
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    // Try to click - this should throw because pointer-events: none
    await expect(async () => {
      await userEvent.click(button);
    }).rejects.toThrow("pointer-events: none");

    // Verify onPress was never called
    await expect(args.onPress).not.toHaveBeenCalled();
  }
}`,...r.parameters?.docs?.source}}};const T=["Primary","Ghost","Destructive","PrimarySmall","PrimaryDisabled"];export{s as Destructive,a as Ghost,t as Primary,r as PrimaryDisabled,n as PrimarySmall,T as __namedExportsOrder,E as default};
