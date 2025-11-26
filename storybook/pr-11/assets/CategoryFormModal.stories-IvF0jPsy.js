import{j as w,V as E}from"./iframe-BtBhSJXg.js";import{C as S,P as s,a as y}from"./CategoryFormModal-U1tNAR4o.js";import"./preload-helper-Zf8nSx-t.js";import"./Button--ib91N1l.js";import"./useTranslation-x4qJLAOj.js";import"./index-D3XHVbDV.js";import"./Divider-DIBtnIs4.js";import"./ErrorMessage-CwVgA9mz.js";import"./FormTextInput-CmmbMP_w.js";import"./Ionicons-DeJ_OOpC.js";import"./createIconSet-CSIO9742.js";const{expect:e,fn:u,userEvent:a,within:C}=__STORYBOOK_MODULE_TEST__,g={id:"1",name:"Work",color:y[1],icon:s[2],_count:{todos:3}},A={title:"todos/CategoryFormModal",component:S,tags:["autodocs"],args:{visible:!0,error:null,isPending:!1,onSubmit:u(),onCancel:u(),onDelete:u()},decorators:[t=>w.jsx(E,{className:"max-w-md p-4",children:w.jsx(t,{})})]},m={play:async({args:t,canvasElement:i})=>{const n=C(i);t.onSubmit.mockClear(),t.onCancel.mockClear();const o=n.getByTestId("category-name-input"),c=n.getAllByRole("radio"),r=c.slice(0,s.length),l=c.slice(s.length);await a.type(o,"Chores"),await a.click(r[3]),await a.click(l[4]);const p=n.getByTestId("category-submit-button");await a.click(p),await e(t.onSubmit).toHaveBeenCalledTimes(1),await e(t.onSubmit).toHaveBeenCalledWith("Chores",y[4],s[3]),await e(t.onCancel).not.toHaveBeenCalled()}},d={args:{category:g,onDelete:u()},play:async({args:t,canvasElement:i})=>{const n=C(i);t.onSubmit.mockClear(),t.onDelete?.mockClear();const o=n.getByTestId("category-name-input");await e(o).toHaveValue(g.name);const c=n.getAllByRole("radio"),r=c.slice(0,s.length),l=c.slice(s.length);await a.clear(o),await a.type(o,"Updated Work"),await a.click(r[1]),await a.click(l[0]);const p=n.getByTestId("category-submit-button");await a.click(p),await e(t.onSubmit).toHaveBeenCalledTimes(1),await e(t.onSubmit).toHaveBeenCalledWith("Updated Work",y[0],s[1]);const v=n.getByTestId("category-delete-button");await a.click(v),await e(t.onDelete).toHaveBeenCalledTimes(1)}},B={args:{category:g,isPending:!0,onDelete:u()},play:async({args:t,canvasElement:i})=>{const n=C(i);t.onSubmit?.mockClear(),t.onDelete?.mockClear(),t.onCancel?.mockClear();const o=n.getByTestId("category-name-input");await e(o).toHaveAttribute("aria-disabled","true");const c=n.getByTestId("category-submit-button"),r=n.getByTestId("category-cancel-button"),l=n.getAllByRole("radio");await e(async()=>{await a.click(l[0])}).rejects.toThrow("pointer-events: none"),await e(async()=>{await a.click(c)}).rejects.toThrow(),await e(async()=>{await a.click(r)}).rejects.toThrow(),await e(t.onSubmit).not.toHaveBeenCalled(),await e(t.onDelete).not.toHaveBeenCalled(),await e(t.onCancel).not.toHaveBeenCalled()}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onSubmit.mockClear();
    args.onCancel.mockClear();
    const nameInput = canvas.getByTestId("category-name-input") as HTMLInputElement;
    const radioButtons = canvas.getAllByRole("radio");
    const iconButtons = radioButtons.slice(0, PRESET_ICONS.length);
    const colorButtons = radioButtons.slice(PRESET_ICONS.length);
    await userEvent.type(nameInput, "Chores");
    await userEvent.click(iconButtons[3]);
    await userEvent.click(colorButtons[4]);
    const submitButton = canvas.getByTestId("category-submit-button");
    await userEvent.click(submitButton);
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    await expect(args.onSubmit).toHaveBeenCalledWith("Chores", PRESET_COLORS[4], PRESET_ICONS[3]);
    await expect(args.onCancel).not.toHaveBeenCalled();
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    category: SAMPLE_CATEGORY,
    onDelete: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onSubmit.mockClear();
    args.onDelete?.mockClear();
    const nameInput = canvas.getByTestId("category-name-input") as HTMLInputElement;
    await expect(nameInput).toHaveValue(SAMPLE_CATEGORY.name);
    const radioButtons = canvas.getAllByRole("radio");
    const iconButtons = radioButtons.slice(0, PRESET_ICONS.length);
    const colorButtons = radioButtons.slice(PRESET_ICONS.length);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Updated Work");
    await userEvent.click(iconButtons[1]);
    await userEvent.click(colorButtons[0]);
    const submitButton = canvas.getByTestId("category-submit-button");
    await userEvent.click(submitButton);
    await expect(args.onSubmit).toHaveBeenCalledTimes(1);
    await expect(args.onSubmit).toHaveBeenCalledWith("Updated Work", PRESET_COLORS[0], PRESET_ICONS[1]);
    const deleteButton = canvas.getByTestId("category-delete-button");
    await userEvent.click(deleteButton);
    await expect(args.onDelete).toHaveBeenCalledTimes(1);
  }
}`,...d.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    category: SAMPLE_CATEGORY,
    isPending: true,
    onDelete: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onSubmit?.mockClear();
    args.onDelete?.mockClear();
    args.onCancel?.mockClear();
    const nameInput = canvas.getByTestId("category-name-input");
    await expect(nameInput).toHaveAttribute("aria-disabled", "true");
    const submitButton = canvas.getByTestId("category-submit-button");
    const cancelButton = canvas.getByTestId("category-cancel-button");
    const radioButtons = canvas.getAllByRole("radio");
    await expect(async () => {
      await userEvent.click(radioButtons[0]);
    }).rejects.toThrow("pointer-events: none");
    await expect(async () => {
      await userEvent.click(submitButton);
    }).rejects.toThrow();
    await expect(async () => {
      await userEvent.click(cancelButton);
    }).rejects.toThrow();
    await expect(args.onSubmit).not.toHaveBeenCalled();
    await expect(args.onDelete).not.toHaveBeenCalled();
    await expect(args.onCancel).not.toHaveBeenCalled();
  }
}`,...B.parameters?.docs?.source}}};const D=["CreateCategory","EditCategory","PendingState"];export{m as CreateCategory,d as EditCategory,B as PendingState,D as __namedExportsOrder,A as default};
