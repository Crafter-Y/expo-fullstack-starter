import{j as v,V as E}from"./iframe-B0nMjfsK.js";import{C as T,P as c,a as y}from"./CategoryFormModal-CIXSL8vX.js";import"./preload-helper-Zf8nSx-t.js";import"./Button-B1TbDlPu.js";import"./useTranslation-Bonhuhg_.js";import"./Divider-CUCaJlWh.js";import"./ErrorMessage-5DXdUw6T.js";import"./FormTextInput-GbZuF7DR.js";import"./Ionicons-D8frA7XV.js";const{expect:e,fn:B,userEvent:a,within:w}=__STORYBOOK_MODULE_TEST__,p={id:"1",name:"Work",color:y[1],icon:c[2],_count:{todos:3}},O={title:"todos/CategoryFormModal",component:T,tags:["autodocs"],args:{visible:!0,error:null,isPending:!1,onSubmit:B(),onCancel:B()},decorators:[t=>v.jsx(E,{className:"max-w-md p-4",children:v.jsx(t,{})})]},u={play:async({args:t,canvasElement:i})=>{const n=w(i);t.onSubmit.mockClear(),t.onCancel.mockClear();const o=n.getByTestId("category-name-input"),s=n.getAllByRole("radio"),r=s.slice(0,c.length),l=s.slice(c.length);await a.type(o,"Chores"),await a.click(r[3]),await a.click(l[4]);const g=n.getByTestId("category-submit-button");await a.click(g),await e(t.onSubmit).toHaveBeenCalledTimes(1),await e(t.onSubmit).toHaveBeenCalledWith("Chores",y[4],c[3]),await e(t.onCancel).not.toHaveBeenCalled()}},m={args:{category:p,onDelete:B()},play:async({args:t,canvasElement:i})=>{const n=w(i),o=n.getByTestId("category-name-input");await e(o).toHaveValue(p.name);const s=n.getAllByRole("radio"),r=s.slice(0,c.length),l=s.slice(c.length);await a.clear(o),await a.type(o,"Updated Work"),await a.click(r[1]),await a.click(l[0]);const g=n.getByTestId("category-submit-button");await a.click(g),await e(t.onSubmit).toHaveBeenCalledTimes(1),await e(t.onSubmit).toHaveBeenCalledWith("Updated Work",y[0],c[1]);const C=n.getByTestId("category-delete-button");await a.click(C),await e(t.onDelete).toHaveBeenCalledTimes(1)}},d={args:{category:p,isPending:!0,onDelete:B()},play:async({args:t,canvasElement:i})=>{const n=w(i),o=n.getByTestId("category-name-input");await e(o).toHaveAttribute("aria-disabled","true");const s=n.getByTestId("category-submit-button"),r=n.getByTestId("category-cancel-button"),l=n.getAllByRole("radio");await e(async()=>{await a.click(l[0])}).rejects.toThrow("pointer-events: none"),await e(async()=>{await a.click(s)}).rejects.toThrow(),await e(async()=>{await a.click(r)}).rejects.toThrow(),await e(t.onSubmit).not.toHaveBeenCalled(),await e(t.onDelete).not.toHaveBeenCalled(),await e(t.onCancel).not.toHaveBeenCalled()}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    category: SAMPLE_CATEGORY,
    onDelete: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
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
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const P=["CreateCategory","EditCategory","PendingState"];export{u as CreateCategory,m as EditCategory,d as PendingState,P as __namedExportsOrder,O as default};
