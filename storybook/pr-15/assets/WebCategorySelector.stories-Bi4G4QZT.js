import{j as a,V as w,T as C,P as v,r as S,e as x}from"./iframe-B9uuOGA6.js";import{C as u}from"./CategorySelectorEntry-CJDYul3u.js";import{u as T}from"./useTranslation-CKsYuO2D.js";import"./preload-helper-Zf8nSx-t.js";import"./MaterialIcons-BSlagecs.js";import"./createIconSet-BR1XLBi8.js";import"./index-D5Vn3TLA.js";function p({categories:e,selectedCategory:o,isDark:t,onSelectCategory:r,onAddCategory:d,onEditCategory:c}){const{t:s}=T();return a.jsxs(w,{className:"pr-4",testID:"web-category-selector",children:[a.jsx(C,{className:"mb-3 pl-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400",children:s("todos.categories")}),a.jsx(u,{category:{id:"all",name:s("todos.all"),icon:null,color:null,_count:{todos:0}},selectedCategory:o,isDark:t,onSelectCategory:r}),a.jsx(u,{category:{id:"uncategorized",name:s("todos.uncategorized"),icon:null,color:null,_count:{todos:0}},selectedCategory:o,isDark:t,onSelectCategory:r}),e?.map(y=>a.jsx(u,{category:y,selectedCategory:o,isDark:t,showActions:!0,onSelectCategory:r,onEditCategory:c},y.id)),a.jsx(v,{onPress:d,accessibilityRole:"button",className:"ml-4 mt-2 flex-row items-center rounded-lg border border-dashed border-gray-400 px-3 py-2 hover:bg-gray-50 active:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-800 dark:active:bg-gray-700",testID:"category-add-button",children:a.jsx(C,{className:"text-sm font-medium text-gray-600 dark:text-gray-400",children:s("todos.add")})})]})}p.__docgenInfo={description:"",methods:[],displayName:"WebCategorySelector",props:{categories:{required:!1,tsType:{name:'RouterOutput["category"]["getAll"]',raw:'RouterOutput["category"]["getAll"]'},description:""},selectedCategory:{required:!1,tsType:{name:"CategoryFiler"},description:""},isDark:{required:!0,tsType:{name:"boolean"},description:""},onSelectCategory:{required:!0,tsType:{name:"signature",type:"function",raw:"(categoryId: CategoryFiler) => void",signature:{arguments:[{type:{name:"CategoryFiler"},name:"categoryId"}],return:{name:"void"}}},description:""},onAddCategory:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onEditCategory:{required:!1,tsType:{name:"signature",type:"function",raw:'(category: RouterOutput["category"]["getAll"][number]) => void',signature:{arguments:[{type:{name:'RouterOutput["category"]["getAll"][number]',raw:'RouterOutput["category"]["getAll"][number]'},name:"category"}],return:{name:"void"}}},description:""}}};const{expect:n,fn:m,userEvent:i,within:k}=__STORYBOOK_MODULE_TEST__,l=[{id:"work",name:"Work",color:"#2563EB",icon:"🏠",_count:{todos:3}},{id:"personal",name:"Personal",color:"#DC2626",icon:null,_count:{todos:5}}],O={title:"todos/WebCategorySelector",component:p,tags:["autodocs"],args:{categories:l,selectedCategory:"all",isDark:!1,onSelectCategory:m(),onAddCategory:m(),onEditCategory:m()},decorators:[e=>a.jsx(w,{className:"max-w-xs p-4",children:a.jsx(e,{})})],render:e=>{const[o,t]=S.useState(e.selectedCategory),{colorScheme:r}=x.useColorScheme(),d=r==="dark";return a.jsx(p,{...e,selectedCategory:o,onSelectCategory:c=>{t(c),e.onSelectCategory(c)},isDark:d})}},g={play:async({args:e,canvasElement:o})=>{const t=k(o);e.onSelectCategory.mockClear(),e.onAddCategory.mockClear(),e.onEditCategory?.mockClear();const r=t.getByTestId("category-selector-entry-all"),d=t.getByTestId("category-selector-entry-uncategorized"),c=t.getByTestId(`category-selector-entry-${l[0].id}`),s=t.getByTestId(`category-selector-entry-wrapper-${l[0].id}`),y=t.getByTestId(`category-selector-entry-action-${l[0].id}`),E=t.getByTestId("category-add-button");await i.click(c),await i.click(d),await i.click(r),await n(e.onSelectCategory).toHaveBeenCalledTimes(3),await n(e.onSelectCategory).toHaveBeenNthCalledWith(1,l[0].id),await n(e.onSelectCategory).toHaveBeenNthCalledWith(2,"uncategorized"),await n(e.onSelectCategory).toHaveBeenNthCalledWith(3,"all"),await i.hover(s),await i.click(y),await n(e.onEditCategory).toHaveBeenCalledWith(l[0]),await n(e.onSelectCategory).toHaveBeenCalledTimes(3),await i.click(E),await n(e.onAddCategory).toHaveBeenCalledTimes(1)}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onSelectCategory.mockClear();
    args.onAddCategory.mockClear();
    args.onEditCategory?.mockClear();
    const allEntry = canvas.getByTestId("category-selector-entry-all");
    const uncategorizedEntry = canvas.getByTestId("category-selector-entry-uncategorized");
    const workEntry = canvas.getByTestId(\`category-selector-entry-\${SAMPLE_CATEGORIES[0].id}\`);
    const workWrapper = canvas.getByTestId(\`category-selector-entry-wrapper-\${SAMPLE_CATEGORIES[0].id}\`);
    const workAction = canvas.getByTestId(\`category-selector-entry-action-\${SAMPLE_CATEGORIES[0].id}\`);
    const addButton = canvas.getByTestId("category-add-button");
    await userEvent.click(workEntry);
    await userEvent.click(uncategorizedEntry);
    await userEvent.click(allEntry);
    await expect(args.onSelectCategory).toHaveBeenCalledTimes(3);
    await expect(args.onSelectCategory).toHaveBeenNthCalledWith(1, SAMPLE_CATEGORIES[0].id);
    await expect(args.onSelectCategory).toHaveBeenNthCalledWith(2, "uncategorized");
    await expect(args.onSelectCategory).toHaveBeenNthCalledWith(3, "all");
    await userEvent.hover(workWrapper);
    await userEvent.click(workAction);
    await expect(args.onEditCategory).toHaveBeenCalledWith(SAMPLE_CATEGORIES[0]);
    await expect(args.onSelectCategory).toHaveBeenCalledTimes(3);
    await userEvent.click(addButton);
    await expect(args.onAddCategory).toHaveBeenCalledTimes(1);
  }
}`,...g.parameters?.docs?.source}}};const W=["Default"];export{g as Default,W as __namedExportsOrder,O as default};
