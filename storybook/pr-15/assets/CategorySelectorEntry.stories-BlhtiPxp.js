import{j as d,r as m,e as E,V as w}from"./iframe-CrGDRyrd.js";import{C}from"./CategorySelectorEntry-DLFsydPR.js";import"./preload-helper-Zf8nSx-t.js";import"./MaterialIcons-DH771Etc.js";import"./createIconSet-DVEaOL4a.js";const{expect:t,fn:g,userEvent:s,within:p}=__STORYBOOK_MODULE_TEST__,o={id:"1",name:"Work",color:"#2563EB",icon:"💼",_count:{todos:3}},h={title:"todos/CategorySelectorEntry",component:C,tags:["autodocs"],args:{category:o,selectedCategory:"",isDark:!1,showActions:!1,onSelectCategory:g(),onEditCategory:g()},decorators:[e=>d.jsx(w,{className:"items-start",children:d.jsx(e,{})})],render:e=>{const[c,a]=m.useState(e.selectedCategory),{colorScheme:n}=E.useColorScheme(),y=n==="dark";return d.jsx(C,{...e,selectedCategory:c,isDark:y,onSelectCategory:r=>{a(r),e.onSelectCategory(r)}})}},i={play:async({args:e,canvasElement:c})=>{const a=p(c);e.onSelectCategory.mockClear();const n=a.getByTestId(`category-selector-entry-${o.id}`);await s.click(n),await t(e.onSelectCategory).toHaveBeenCalledTimes(1),await t(e.onSelectCategory).toHaveBeenCalledWith(o.id)}},l={args:{showActions:!0,selectedCategory:""},play:async({args:e,canvasElement:c})=>{const a=p(c);e.onSelectCategory.mockClear(),e.onEditCategory?.mockClear();const n=a.getByTestId(`category-selector-entry-wrapper-${o.id}`),y=a.getByTestId(`category-selector-entry-${o.id}`),r=a.getByTestId(`category-selector-entry-action-${o.id}`);await s.hover(n),await t(r.style.opacity).toBe("1"),await s.unhover(n),await t(r.style.opacity).toBe("0"),await s.click(r),await t(e.onEditCategory).toHaveBeenCalledTimes(1),await t(e.onEditCategory).toHaveBeenCalledWith(o),await t(e.onSelectCategory).not.toHaveBeenCalled(),await s.click(y),await t(e.onSelectCategory).toHaveBeenCalledTimes(1)}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onSelectCategory.mockClear();
    const entryButton = canvas.getByTestId(\`category-selector-entry-\${SAMPLE_CATEGORY.id}\`);
    await userEvent.click(entryButton);
    await expect(args.onSelectCategory).toHaveBeenCalledTimes(1);
    await expect(args.onSelectCategory).toHaveBeenCalledWith(SAMPLE_CATEGORY.id);
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    showActions: true,
    selectedCategory: ""
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onSelectCategory.mockClear();
    args.onEditCategory?.mockClear();
    const wrapper = canvas.getByTestId(\`category-selector-entry-wrapper-\${SAMPLE_CATEGORY.id}\`);
    const entryButton = canvas.getByTestId(\`category-selector-entry-\${SAMPLE_CATEGORY.id}\`);
    const actionButton = canvas.getByTestId(\`category-selector-entry-action-\${SAMPLE_CATEGORY.id}\`);
    await userEvent.hover(wrapper);
    await expect(actionButton.style.opacity).toBe("1");
    await userEvent.unhover(wrapper);
    await expect(actionButton.style.opacity).toBe("0");
    await userEvent.click(actionButton);
    await expect(args.onEditCategory).toHaveBeenCalledTimes(1);
    await expect(args.onEditCategory).toHaveBeenCalledWith(SAMPLE_CATEGORY);
    await expect(args.onSelectCategory).not.toHaveBeenCalled();
    await userEvent.click(entryButton);
    await expect(args.onSelectCategory).toHaveBeenCalledTimes(1);
  }
}`,...l.parameters?.docs?.source}}};const A=["Default","WithActions"];export{i as Default,l as WithActions,A as __namedExportsOrder,h as default};
