import{j as i,r as S,V as C}from"./iframe-fGE7bhSr.js";import{t as E}from"./translation-keys-CxBWU0_T.js";import{F as d,a as o}from"./CategoryFormModal-DQPc9DLa.js";import"./preload-helper-Zf8nSx-t.js";import"./Button-DVVGHrjb.js";import"./useTranslation-DRRr6pl-.js";import"./index-CJvzUFfm.js";import"./Divider-Bn1PjVDb.js";import"./ErrorMessage-ChX1nAWv.js";import"./FormTextInput-CP96vLBX.js";import"./Ionicons-CWp-mmjn.js";import"./createIconSet-DR4lRBL8.js";const{expect:l,fn:u,userEvent:m,within:p}=__STORYBOOK_MODULE_TEST__,h={title:"todos/FormColorSelector",component:d,tags:["autodocs"],args:{onSelectColor:u()},argTypes:{label:E},render:e=>{const[t,c]=S.useState(e.selectedColor);return i.jsx(d,{...e,selectedColor:t,onSelectColor:a=>{c(a),e.onSelectColor(a)}})}},r={args:{label:"category.color",colors:o,selectedColor:o[0]},play:async({args:e,canvasElement:t})=>{const a=p(t).getAllByRole("radio");await m.click(a[1]),await l(e.onSelectColor).toHaveBeenCalledTimes(1),await l(e.onSelectColor).toHaveBeenCalledWith(o[1])}},n={args:{label:"category.color",colors:o,selectedColor:o[1],disabled:!0},play:async({args:e,canvasElement:t})=>{const a=p(t).getAllByRole("radio");await l(async()=>{await m.click(a[2])}).rejects.toThrow("pointer-events: none"),await l(e.onSelectColor).not.toHaveBeenCalled()}},s={args:{label:"category.color",colors:o,selectedColor:o[1]},decorators:[e=>i.jsx(C,{className:"max-w-xs",children:i.jsx(e,{})})]};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
