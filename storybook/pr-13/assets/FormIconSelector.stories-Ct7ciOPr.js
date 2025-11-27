import{j as i,r as S,V as I}from"./iframe-Be_WPwCk.js";import{t as E}from"./translation-keys-BZXpeWd8.js";import{b as d,P as n}from"./CategoryFormModal-CPznShQu.js";import"./preload-helper-Zf8nSx-t.js";import"./Button-CEL3oYu7.js";import"./useTranslation-BBl3ZU3Q.js";import"./index-B6vRVC2k.js";import"./Divider-BOQn1E8-.js";import"./ErrorMessage-B2bGI6CL.js";import"./FormTextInput-ft8gbT3R.js";import"./Ionicons-CHRpMELc.js";import"./createIconSet-C-zfi05Y.js";const{expect:r,fn:u,userEvent:m,within:p}=__STORYBOOK_MODULE_TEST__,N={title:"todos/FormIconSelector",component:d,tags:["autodocs"],args:{onSelectIcon:u()},argTypes:{label:E},render:e=>{const[o,l]=S.useState(e.selectedIcon);return i.jsx(d,{...e,selectedIcon:o,onSelectIcon:a=>{l(a),e.onSelectIcon(a)}})}},t={args:{label:"category.icon",icons:n,selectedIcon:n[0]},play:async({args:e,canvasElement:o})=>{const a=p(o).getAllByRole("radio");await m.click(a[1]),await r(e.onSelectIcon).toHaveBeenCalledTimes(1),await r(e.onSelectIcon).toHaveBeenCalledWith(n[1])}},c={args:{label:"category.icon",icons:n,selectedIcon:n[1],disabled:!0},play:async({args:e,canvasElement:o})=>{const a=p(o).getAllByRole("radio");await r(async()=>{await m.click(a[2])}).rejects.toThrow("pointer-events: none"),await r(e.onSelectIcon).not.toHaveBeenCalled()}},s={args:{label:"category.icon",icons:n,selectedIcon:n[1]},decorators:[e=>i.jsx(I,{className:"max-w-xs",children:i.jsx(e,{})})]};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: "category.icon",
    icons: PRESET_ICONS,
    selectedIcon: PRESET_ICONS[0]
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const iconButtons = canvas.getAllByRole("radio");
    await userEvent.click(iconButtons[1]);
    await expect(args.onSelectIcon).toHaveBeenCalledTimes(1);
    await expect(args.onSelectIcon).toHaveBeenCalledWith(PRESET_ICONS[1]);
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: "category.icon",
    icons: PRESET_ICONS,
    selectedIcon: PRESET_ICONS[1],
    disabled: true
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const iconButtons = canvas.getAllByRole("radio");
    await expect(async () => {
      await userEvent.click(iconButtons[2]);
    }).rejects.toThrow("pointer-events: none");
    await expect(args.onSelectIcon).not.toHaveBeenCalled();
  }
}`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: "category.icon",
    icons: PRESET_ICONS,
    selectedIcon: PRESET_ICONS[1]
  },
  decorators: [Story => <View className="max-w-xs">
        <Story />
      </View>]
}`,...s.parameters?.docs?.source}}};const P=["Default","Disabled","InSmallWindow"];export{t as Default,c as Disabled,s as InSmallWindow,P as __namedExportsOrder,N as default};
