import{j as i,r as S,V as C}from"./iframe-WWK3Gj28.js";import{t as E}from"./translation-keys-B3hhcdol.js";import{F as d,a as o}from"./CategoryFormModal-CsvOu-ha.js";import"./preload-helper-Zf8nSx-t.js";import"./Button-6UjaK1rt.js";import"./useTranslation-BpQ4WMie.js";import"./index-BwjMLDF7.js";import"./Divider-BM7t9E0T.js";import"./ErrorMessage-CDu4UP5P.js";import"./FormTextInput-E_zG1qFi.js";import"./Ionicons-BcwLYT17.js";import"./createIconSet-BSIZzTr_.js";const{expect:l,fn:u,userEvent:m,within:p}=__STORYBOOK_MODULE_TEST__,h={title:"todos/FormColorSelector",component:d,tags:["autodocs"],args:{onSelectColor:u()},argTypes:{label:E},render:e=>{const[t,c]=S.useState(e.selectedColor);return i.jsx(d,{...e,selectedColor:t,onSelectColor:a=>{c(a),e.onSelectColor(a)}})}},r={args:{label:"category.color",colors:o,selectedColor:o[0]},play:async({args:e,canvasElement:t})=>{const a=p(t).getAllByRole("radio");await m.click(a[1]),await l(e.onSelectColor).toHaveBeenCalledTimes(1),await l(e.onSelectColor).toHaveBeenCalledWith(o[1])}},n={args:{label:"category.color",colors:o,selectedColor:o[1],disabled:!0},play:async({args:e,canvasElement:t})=>{const a=p(t).getAllByRole("radio");await l(async()=>{await m.click(a[2])}).rejects.toThrow("pointer-events: none"),await l(e.onSelectColor).not.toHaveBeenCalled()}},s={args:{label:"category.color",colors:o,selectedColor:o[1]},decorators:[e=>i.jsx(C,{className:"max-w-xs",children:i.jsx(e,{})})]};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: "category.color",
    colors: PRESET_COLORS,
    selectedColor: PRESET_COLORS[0]
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const colorButtons = canvas.getAllByRole("radio");
    await userEvent.click(colorButtons[1]);
    await expect(args.onSelectColor).toHaveBeenCalledTimes(1);
    await expect(args.onSelectColor).toHaveBeenCalledWith(PRESET_COLORS[1]);
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: "category.color",
    colors: PRESET_COLORS,
    selectedColor: PRESET_COLORS[1],
    disabled: true
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const colorButtons = canvas.getAllByRole("radio");
    await expect(async () => {
      await userEvent.click(colorButtons[2]);
    }).rejects.toThrow("pointer-events: none");
    await expect(args.onSelectColor).not.toHaveBeenCalled();
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: "category.color",
    colors: PRESET_COLORS,
    selectedColor: PRESET_COLORS[1]
  },
  decorators: [Story => <View className="max-w-xs">
        <Story />
      </View>]
}`,...s.parameters?.docs?.source}}};const P=["Default","Disabled","InSmallWindow"];export{r as Default,n as Disabled,s as InSmallWindow,P as __namedExportsOrder,h as default};
