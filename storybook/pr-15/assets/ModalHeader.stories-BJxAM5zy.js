import{j as s,V as c}from"./iframe-CrGDRyrd.js";import{t as i}from"./translation-keys-B0uewGkx.js";import{M as l}from"./ModalHeader-xCsow2on.js";import"./preload-helper-Zf8nSx-t.js";import"./useTranslation-BDTWTWvE.js";import"./index-Ce3MlN9B.js";import"./Ionicons-D-yw--aS.js";import"./createIconSet-DVEaOL4a.js";const{expect:m,fn:d,userEvent:p,within:g}=__STORYBOOK_MODULE_TEST__,E={title:"elements/ModalHeader",component:l,tags:["autodocs"],args:{onClose:d()},argTypes:{title:i},parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},e={args:{title:"category.editCategory"},play:async({args:a,canvasElement:n})=>{const r=g(n).getByRole("button");await p.click(r),await m(a.onClose).toHaveBeenCalledTimes(1)}},t={args:{title:"todos.deleteConfirmation"}},o={args:{title:"todos.deleteConfirmation"},decorators:[a=>s.jsx(c,{className:"max-w-sm",children:s.jsx(a,{})})]};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    title: "category.editCategory"
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the close button
    const closeButton = canvas.getByRole("button");

    // Click the close button
    await userEvent.click(closeButton);

    // Verify onClose was called
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    title: "todos.deleteConfirmation"
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: "todos.deleteConfirmation"
  },
  decorators: [Story => <View className="max-w-sm">
        <Story />
      </View>]
}`,...o.parameters?.docs?.source}}};const _=["Default","LongTitle","LongTitleMaxWidth"];export{e as Default,t as LongTitle,o as LongTitleMaxWidth,_ as __namedExportsOrder,E as default};
