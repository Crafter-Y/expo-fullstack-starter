import{j as s,V as c}from"./iframe-CrNh7Vw0.js";import{t as i}from"./translation-keys-DrPrquSJ.js";import{M as l}from"./ModalHeader-NXgDeEyT.js";import"./preload-helper-Zf8nSx-t.js";import"./useTranslation-BSjrQqM7.js";import"./index-C2PlCmcY.js";import"./Ionicons-DPx2UHhk.js";const{expect:m,fn:d,userEvent:p,within:g}=__STORYBOOK_MODULE_TEST__,B={title:"elements/ModalHeader",component:l,tags:["autodocs"],args:{onClose:d()},argTypes:{title:i},parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}}},e={args:{title:"category.editCategory"},play:async({args:o,canvasElement:n})=>{const r=g(n).getByRole("button");await p.click(r),await m(o.onClose).toHaveBeenCalledTimes(1)}},t={args:{title:"todos.deleteConfirmation"}},a={args:{title:"todos.deleteConfirmation"},decorators:[o=>s.jsx(c,{className:"max-w-sm",children:s.jsx(o,{})})]};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: "todos.deleteConfirmation"
  },
  decorators: [Story => <View className="max-w-sm">
        <Story />
      </View>]
}`,...a.parameters?.docs?.source}}};const E=["Default","LongTitle","LongTitleMaxWidth"];export{e as Default,t as LongTitle,a as LongTitleMaxWidth,E as __namedExportsOrder,B as default};
