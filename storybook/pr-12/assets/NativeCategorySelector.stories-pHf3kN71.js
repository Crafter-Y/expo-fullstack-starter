import{j as a,V as v,S as T,P as x,T as S,r as f}from"./iframe-B0nMjfsK.js";import{C as m}from"./CategorySelectorBadge-BwCYlADl.js";import{u as E}from"./useTranslation-Bonhuhg_.js";import"./preload-helper-Zf8nSx-t.js";function C({allTodosCount:e,uncategorizedTodosCount:s,categories:o,selectedCategoryId:t,onSelectCategory:n,onAddCategory:p,onEditCategory:g}){const{t:i}=E();return a.jsx(v,{className:"border-b border-gray-200 bg-white py-3 dark:border-gray-700 dark:bg-gray-800",children:a.jsxs(T,{horizontal:!0,showsHorizontalScrollIndicator:!1,className:"px-4",contentContainerClassName:"gap-2",children:[a.jsx(m,{type:"base",testID:"category-badge-all",category:{id:"all",name:i("todos.all"),color:null,icon:null,_count:{todos:e}},selectedCategory:t,setSelectedCategory:()=>n("all")}),a.jsx(m,{type:"base",testID:"category-badge-uncategorized",category:{id:"uncategorized",name:i("todos.uncategorized"),color:null,icon:null,_count:{todos:s}},selectedCategory:t,setSelectedCategory:()=>n("uncategorized")}),o?.map(d=>a.jsx(m,{type:"base",testID:`category-badge-${d.id}`,category:d,selectedCategory:t,setSelectedCategory:()=>n(d.id),onLongPress:g?()=>g(d):void 0},d.id)),a.jsx(x,{onPress:p,testID:"add-category-button",className:"mr-8 rounded-full border border-dashed border-gray-400 bg-white px-4 py-2 dark:border-gray-500 dark:bg-gray-700",children:a.jsx(S,{className:"text-sm font-medium text-gray-600 dark:text-gray-300",children:i("todos.add")})})]})})}C.__docgenInfo={description:"",methods:[],displayName:"NativeCategorySelector",props:{allTodosCount:{required:!0,tsType:{name:"number"},description:""},uncategorizedTodosCount:{required:!0,tsType:{name:"number"},description:""},categories:{required:!1,tsType:{name:'RouterOutput["category"]["getAll"]',raw:'RouterOutput["category"]["getAll"]'},description:""},selectedCategoryId:{required:!0,tsType:{name:"CategoryFiler"},description:""},onSelectCategory:{required:!0,tsType:{name:"signature",type:"function",raw:"(categoryId: CategoryFiler) => void",signature:{arguments:[{type:{name:"CategoryFiler"},name:"categoryId"}],return:{name:"void"}}},description:""},onAddCategory:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onEditCategory:{required:!1,tsType:{name:"signature",type:"function",raw:'(category: RouterOutput["category"]["getAll"][number]) => void',signature:{arguments:[{type:{name:'RouterOutput["category"]["getAll"][number]',raw:'RouterOutput["category"]["getAll"][number]'},name:"category"}],return:{name:"void"}}},description:""}}};const{expect:c,fn:w,userEvent:r,within:B}=__STORYBOOK_MODULE_TEST__,b=[{id:"1",name:"Personal",color:"#D00000",icon:"👤",_count:{todos:5}},{id:"2",name:"Work",color:"#0000D0",icon:"💼",_count:{todos:3}},{id:"3",name:"Shopping",color:"#008000",icon:"🛒",_count:{todos:2}}],z={title:"todos/NativeCategorySelector",component:C,tags:["autodocs"],args:{allTodosCount:10,uncategorizedTodosCount:2,categories:b,selectedCategoryId:"all",onAddCategory:w(),onSelectCategory:w()},render:e=>{const[s,o]=f.useState(e.selectedCategoryId);return a.jsx(C,{...e,selectedCategoryId:s,onSelectCategory:t=>{o(t),e.onSelectCategory(t)}})}},l={args:{onEditCategory:w()},play:async({args:e,canvasElement:s})=>{const o=B(s),t=o.getByTestId("category-badge-uncategorized");await r.click(t),await c(e.onSelectCategory).toHaveBeenCalledWith("uncategorized");const n=o.getByTestId("category-badge-1");await r.click(n),await c(e.onSelectCategory).toHaveBeenCalledWith("1");const p=o.getByTestId("category-badge-all");await r.click(p),await c(e.onSelectCategory).toHaveBeenCalledWith("all");const g=o.getByTestId("add-category-button");await r.click(g),await c(e.onAddCategory).toHaveBeenCalled(),await r.pointer({keys:"[MouseLeft>]",target:n}),await new Promise(i=>setTimeout(i,600)),await r.pointer({keys:"[/MouseLeft]",target:n}),await c(e.onEditCategory).toHaveBeenCalledWith(c.objectContaining({id:"1"}))}},u={args:{categories:[...b,...["4","5","6","7","8","9","10"].map(e=>({id:e,name:"Category",color:"#008000",icon:"🛒",_count:{todos:2}}))]},decorators:[e=>a.jsx(v,{className:"w-full max-w-md",children:a.jsx(e,{})})],play:async({args:e,canvasElement:s})=>{const t=B(s).getByTestId("category-badge-1");await r.pointer({keys:"[MouseLeft>]",target:t}),await new Promise(n=>setTimeout(n,600)),await r.pointer({keys:"[/MouseLeft]",target:t}),await c(e.onEditCategory).toBeUndefined()}},y={args:{categories:[],allTodosCount:0,uncategorizedTodosCount:0}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    onEditCategory: fn()
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Select Uncategorized
    const uncategorizedButton = canvas.getByTestId("category-badge-uncategorized");
    await userEvent.click(uncategorizedButton);
    await expect(args.onSelectCategory).toHaveBeenCalledWith("uncategorized");

    // Select Category 1
    const categoryButton = canvas.getByTestId("category-badge-1");
    await userEvent.click(categoryButton);
    await expect(args.onSelectCategory).toHaveBeenCalledWith("1");

    // Select All
    const allButton = canvas.getByTestId("category-badge-all");
    await userEvent.click(allButton);
    await expect(args.onSelectCategory).toHaveBeenCalledWith("all");

    // Click Add
    const addButton = canvas.getByTestId("add-category-button");
    await userEvent.click(addButton);
    await expect(args.onAddCategory).toHaveBeenCalled();

    // Long press Category 1
    await userEvent.pointer({
      keys: "[MouseLeft>]",
      target: categoryButton
    });
    await new Promise(resolve => setTimeout(resolve, 600)); // Wait for long press
    await userEvent.pointer({
      keys: "[/MouseLeft]",
      target: categoryButton
    });
    await expect(args.onEditCategory).toHaveBeenCalledWith(expect.objectContaining({
      id: "1"
    }));
  }
}`,...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    categories: [...MOCK_CATEGORIES, ...["4", "5", "6", "7", "8", "9", "10"].map(el => {
      return {
        id: el,
        name: "Category",
        color: "#008000",
        icon: "🛒",
        _count: {
          todos: 2
        }
      };
    })]
  },
  decorators: [Story => <View className="w-full max-w-md">
        <Story />
      </View>],
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const categoryButton = canvas.getByTestId("category-badge-1");

    // Long press Category 1
    await userEvent.pointer({
      keys: "[MouseLeft>]",
      target: categoryButton
    });
    await new Promise(resolve => setTimeout(resolve, 600)); // Wait for long press
    await userEvent.pointer({
      keys: "[/MouseLeft]",
      target: categoryButton
    });
    await expect(args.onEditCategory).toBeUndefined();
  }
}`,...u.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    categories: [],
    allTodosCount: 0,
    uncategorizedTodosCount: 0
  }
}`,...y.parameters?.docs?.source}}};const j=["Default","LongFixedWidth","Empty"];export{l as Default,y as Empty,u as LongFixedWidth,j as __namedExportsOrder,z as default};
