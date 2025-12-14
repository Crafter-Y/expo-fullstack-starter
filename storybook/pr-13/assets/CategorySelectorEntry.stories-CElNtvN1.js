import{r as E,j as t,V as g,P as p,T as C,e as T}from"./iframe-B5wNKgXi.js";import{M as v}from"./MaterialIcons-DqK2_1SZ.js";import"./preload-helper-Zf8nSx-t.js";import"./createIconSet-DiGDsuh_.js";function u({category:e,selectedCategory:s,isDark:a,showActions:r=!1,onSelectCategory:i,onEditCategory:o}){const S=s===e.id,[h,m]=E.useState(!1);return t.jsxs(g,{className:"mb-2 flex-row items-center",testID:`category-selector-entry-wrapper-${e.id}`,onPointerEnter:()=>m(!0),onPointerLeave:()=>m(!1),children:[t.jsx(g,{className:"w-4 items-center justify-center",children:S&&t.jsx(g,{testID:"category-selector-entry-check",children:t.jsx(v,{name:"check",size:16,color:a?"#60a5fa":"#2563eb",className:"-ml-1"})})}),t.jsxs(p,{onPress:()=>i(e.id),accessibilityRole:"button",className:"flex-1 flex-row items-center rounded-lg px-3 py-2 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-700 dark:active:bg-gray-600",testID:`category-selector-entry-${e.id}`,children:[e.icon&&t.jsx(C,{className:"w-6 text-sm",testID:"category-selector-entry-icon",children:e.icon}),t.jsx(C,{className:"flex-1 text-sm font-medium",style:{color:e.color||(a?"#d1d5db":"#374151")},testID:"category-selector-entry-name",children:e.name})]}),r&&o&&t.jsx(p,{onPress:x=>{x.stopPropagation(),o(e)},className:"ml-2 h-6 w-6 items-center justify-center rounded hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-500",style:{opacity:h?1:0},accessibilityRole:"button",testID:`category-selector-entry-action-${e.id}`,children:t.jsx(v,{name:"more-vert",size:16,color:a?"#9ca3af":"#6b7280"})})]})}u.__docgenInfo={description:"",methods:[],displayName:"CategorySelectorEntry",props:{category:{required:!0,tsType:{name:'RouterOutput["category"]["getAll"][number]',raw:'RouterOutput["category"]["getAll"][number]'},description:""},selectedCategory:{required:!1,tsType:{name:"CategoryFiler"},description:""},isDark:{required:!0,tsType:{name:"boolean"},description:""},showActions:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},onSelectCategory:{required:!0,tsType:{name:"signature",type:"function",raw:"(categoryId: CategoryFiler) => void",signature:{arguments:[{type:{name:"CategoryFiler"},name:"categoryId"}],return:{name:"void"}}},description:""},onEditCategory:{required:!1,tsType:{name:"signature",type:"function",raw:'(category: RouterOutput["category"]["getAll"][number]) => void',signature:{arguments:[{type:{name:'RouterOutput["category"]["getAll"][number]',raw:'RouterOutput["category"]["getAll"][number]'},name:"category"}],return:{name:"void"}}},description:""}}};const{expect:n,fn:w,userEvent:l,within:B}=__STORYBOOK_MODULE_TEST__,c={id:"1",name:"Work",color:"#2563EB",icon:"💼",_count:{todos:3}},I={title:"todos/CategorySelectorEntry",component:u,tags:["autodocs"],args:{category:c,selectedCategory:"",isDark:!1,showActions:!1,onSelectCategory:w(),onEditCategory:w()},decorators:[e=>t.jsx(g,{className:"items-start",children:t.jsx(e,{})})],render:e=>{const[s,a]=E.useState(e.selectedCategory),{colorScheme:r}=T.useColorScheme(),i=r==="dark";return t.jsx(u,{...e,selectedCategory:s,isDark:i,onSelectCategory:o=>{a(o),e.onSelectCategory(o)}})}},y={play:async({args:e,canvasElement:s})=>{const a=B(s);e.onSelectCategory.mockClear();const r=a.getByTestId(`category-selector-entry-${c.id}`);await l.click(r),await n(e.onSelectCategory).toHaveBeenCalledTimes(1),await n(e.onSelectCategory).toHaveBeenCalledWith(c.id)}},d={args:{showActions:!0,selectedCategory:""},play:async({args:e,canvasElement:s})=>{const a=B(s);e.onSelectCategory.mockClear(),e.onEditCategory?.mockClear();const r=a.getByTestId(`category-selector-entry-wrapper-${c.id}`),i=a.getByTestId(`category-selector-entry-${c.id}`),o=a.getByTestId(`category-selector-entry-action-${c.id}`);await l.hover(r),await n(o.style.opacity).toBe("1"),await l.unhover(r),await n(o.style.opacity).toBe("0"),await l.click(o),await n(e.onEditCategory).toHaveBeenCalledTimes(1),await n(e.onEditCategory).toHaveBeenCalledWith(c),await n(e.onSelectCategory).not.toHaveBeenCalled(),await l.click(i),await n(e.onSelectCategory).toHaveBeenCalledTimes(1)}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const _=["Default","WithActions"];export{y as Default,d as WithActions,_ as __namedExportsOrder,I as default};
