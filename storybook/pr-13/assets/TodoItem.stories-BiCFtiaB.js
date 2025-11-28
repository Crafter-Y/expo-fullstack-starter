import{r as B,j as s,V as g,P as X,T as I,c as L}from"./iframe-fGE7bhSr.js";import{B as Y}from"./Button-DVVGHrjb.js";import{E as ot}from"./ErrorMessage-ChX1nAWv.js";import{F as Z}from"./FormTextInput-CP96vLBX.js";import{C as it}from"./CategorySelectorBadge-BrhA1ih4.js";import{u as st}from"./useTranslation-DRRr6pl-.js";import{M as ct}from"./MaterialIcons-1PAbE-vH.js";import"./preload-helper-Zf8nSx-t.js";import"./index-CJvzUFfm.js";import"./createIconSet-DR4lRBL8.js";function h({todo:t,categories:n,onToggleComplete:e,onUpdateTodo:i,onOpenDeleteModal:c}){const{t:r}=st(),[d,m]=B.useState(!1),[v,H]=B.useState(null),[w,$]=B.useState(!1),[y,R]=B.useState(!1),[K,V]=B.useState(t.title),[Q,q]=B.useState(t.description??""),[G,x]=B.useState(t.categoryId??void 0);B.useEffect(()=>{y||(V(t.title),q(t.description??""),x(t.categoryId??void 0))},[y,t.description,t.title,t.categoryId]);const J=()=>{V(t.title),q(t.description??""),x(t.categoryId??void 0),H(null),R(!0)},tt=async()=>{$(!0),H(null);try{await i(t.id,K,Q,G||null),R(!1)}catch(p){H(p instanceof Error?p.message:r("errors.unexpectedError"))}finally{$(!1)}},et=()=>{c(t.id,t.title)},nt=()=>{R(!1)},at=p=>{x(G===p?void 0:p)};return s.jsx(g,{onPointerEnter:()=>m(!0),onPointerLeave:()=>m(!1),children:s.jsxs(X,{className:`mb-1 flex-row rounded-lg border border-transparent p-3 pt-1 hover:border-gray-200 dark:hover:border-gray-700 ${y?"":" active:bg-gray-50  dark:active:bg-gray-700"}`,onPress:()=>{y||e(t.id)},onLongPress:()=>L.OS!=="web"&&!y?J():{},children:[s.jsxs(g,{className:"flex-1",children:[y&&s.jsxs(g,{className:"my-2 flex-row gap-2",children:[s.jsx(Y,{t:"todos.update",type:"primary",size:"small",onPress:tt,className:"px-4",disabled:w,testID:"todo-item-save-button"}),s.jsx(Y,{t:"todos.cancel",type:"ghost",size:"small",onPress:nt,className:"px-4",disabled:w,testID:"todo-item-cancel-button"}),s.jsx(Y,{t:"todos.delete",type:"destructive",size:"small",onPress:et,disabled:w,testID:"todo-item-delete-button"})]}),t.category&&!y&&s.jsxs(g,{className:"-mb-3 ml-6 flex-row items-center px-2 py-1",children:[t.category.icon?s.jsx(I,{className:"mr-1 text-xs",children:t.category.icon}):null,s.jsxs(I,{className:"text-xs font-medium",style:t.category.color?{color:t.category.color}:void 0,children:[t.category.name," ",s.jsx(I,{className:"color-gray-400",children:"/"})]})]}),s.jsxs(g,{className:"mt-2 flex-row",children:[!y&&s.jsx(g,{className:`mr-3 mt-1 h-5 w-5 rounded border-2 ${t.completed?"border-blue-600 bg-blue-600":"border-gray-300 dark:border-gray-600"}`,children:t.completed&&s.jsx(I,{className:"text-center text-xs leading-4 text-white",children:"✓"})}),s.jsx(g,{className:"flex-1",children:y?s.jsxs(g,{className:"gap-2",children:[s.jsx(Z,{type:"text",placeholder:"todos.title",value:K,onChangeText:p=>V(p),className:"px-3 py-2 text-base",editable:!w,maxLength:220,testID:"todo-item-title-input"}),s.jsx(Z,{type:"text",placeholder:"todos.addDetails",value:Q,onChangeText:p=>q(p),className:" px-3 py-2 text-sm",editable:!w,multiline:!0,numberOfLines:4,textAlignVertical:"top",testID:"todo-item-description-input"}),n&&n.length>0&&s.jsx(g,{className:"flex-row flex-wrap gap-2",children:n.map(p=>s.jsx(it,{type:"ghost",category:p,selectedCategory:G,setSelectedCategory:at,disabled:w},p.id))}),s.jsx(ot,{error:v})]}):s.jsxs(s.Fragment,{children:[s.jsx(I,{className:`mt-0.5 text-base font-semibold ${t.completed?"text-gray-500 line-through dark:text-gray-400":"text-gray-900 dark:text-white"}`,children:t.title}),t.description&&s.jsx(I,{className:`mt-1 text-sm ${t.completed?"text-gray-500 dark:text-gray-500":"text-gray-600 dark:text-gray-300"}`,children:t.description})]})})]})]}),!y&&L.OS==="web"&&s.jsx(g,{className:"max-w-10 flex-1 items-center justify-center pt-2",children:s.jsx(X,{onPress:p=>{p.stopPropagation(),J()},className:"h-6 w-6 items-center justify-center rounded hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-500",style:{opacity:d?1:0},testID:"todo-item-edit-button",children:s.jsx(ct,{name:"edit",size:18,color:"#6b7280"})})})]})})}h.__docgenInfo={description:"",methods:[],displayName:"TodoItem",props:{todo:{required:!0,tsType:{name:'RouterOutput["todo"]["getAll"][number]',raw:'RouterOutput["todo"]["getAll"][number]'},description:""},categories:{required:!1,tsType:{name:'RouterOutput["category"]["getAll"]',raw:'RouterOutput["category"]["getAll"]'},description:""},onToggleComplete:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onUpdateTodo:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string, title: string, description: string, categoryId?: string | null) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"string"},name:"title"},{type:{name:"string"},name:"description"},{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"categoryId"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onOpenDeleteModal:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string, title: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"string"},name:"title"}],return:{name:"void"}}},description:""}}};const{expect:a,fn:j,userEvent:o,waitFor:l,within:u}=__STORYBOOK_MODULE_TEST__,T={id:"cat-1",name:"Work",color:"#2563EB",icon:"💼",_count:{todos:3}},A={id:"cat-2",name:"Personal",color:"#DC2626",icon:null,_count:{todos:5}},rt=[T,A,{id:"cat-3",name:"Errands",color:"#047857",icon:"🛒",_count:{todos:2}}],dt={id:"todo-1",title:"Buy groceries",description:"Milk, eggs, and bread",completed:!1,categoryId:"cat-1",category:{name:T.name,color:T.color,icon:T.icon}},z={id:"todo-2",title:"Call mom",description:null,completed:!1,categoryId:null,category:null},lt={id:"todo-3",title:"Finish report",description:"Q4 Financial Summary",completed:!0,categoryId:"cat-1",category:{name:T.name,color:T.color,icon:T.icon}},ut={id:"todo-4",title:"Read a book",description:"At least 30 pages",completed:!1,categoryId:"cat-2",category:{name:A.name,color:A.color,icon:A.icon}},xt={title:"todos/TodoItem",component:h,tags:["autodocs"],args:{todo:dt,categories:rt,onToggleComplete:j(),onUpdateTodo:j(async(t,n,e,i)=>{}),onOpenDeleteModal:j()},decorators:[t=>s.jsx(g,{className:"w-full max-w-md",children:s.jsx(t,{})})],render:t=>{const[n,e]=B.useState(t.todo);return s.jsx(h,{...t,todo:n,onToggleComplete:i=>{e({...n,completed:!n.completed}),t.onToggleComplete(i)}})}},E={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onToggleComplete.mockClear();const i=e.getByText("Buy groceries");await a(i).toBeInTheDocument();const c=e.getByText("Milk, eggs, and bread");await a(c).toBeInTheDocument();const r=e.getByText(/Work/);await a(r).toBeInTheDocument(),await o.click(i),await a(t.onToggleComplete).toHaveBeenCalledTimes(1),await a(t.onToggleComplete).toHaveBeenCalledWith("todo-1")}},f={args:{todo:lt},play:async({canvasElement:t})=>{const n=u(t),e=n.getByText("Finish report");await a(e).toBeInTheDocument();const i=n.getByText("✓");await a(i).toBeInTheDocument()}},b={args:{todo:z},play:async({canvasElement:t})=>{const n=u(t),e=n.getByText("Call mom");await a(e).toBeInTheDocument();const i=n.queryByText("Milk, eggs, and bread");await a(i).toBeNull()}},k={args:{todo:z},play:async({canvasElement:t})=>{const e=u(t).queryByText(/Work/);await a(e).toBeNull()}},C={args:{todo:ut},play:async({canvasElement:t})=>{const e=u(t).getByText(/Personal/);await a(e).toBeInTheDocument()}},D={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear(),t.onOpenDeleteModal.mockClear();const i=e.getByTestId("todo-item-edit-button");await o.click(i),await l(()=>{const m=e.getByTestId("todo-item-title-input");a(m).toBeInTheDocument()});const c=e.getByTestId("todo-item-title-input"),r=e.getByTestId("todo-item-description-input");await o.clear(c),await o.type(c,"Updated title"),await o.clear(r),await o.type(r,"Updated description");const d=e.getByTestId("todo-item-save-button");await o.click(d),await l(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-1","Updated title","Updated description","cat-1")})}},M={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear();const i=e.getByTestId("todo-item-edit-button");await o.click(i),await l(()=>{const d=e.getByTestId("todo-item-title-input");a(d).toBeInTheDocument()});const c=e.getByTestId("todo-item-title-input");await o.clear(c),await o.type(c,"Modified title");const r=e.getByTestId("todo-item-cancel-button");await o.click(r),await l(()=>{const d=e.getByText("Buy groceries");a(d).toBeInTheDocument()}),await a(t.onUpdateTodo).not.toHaveBeenCalled()}},O={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onOpenDeleteModal.mockClear();const i=e.getByTestId("todo-item-edit-button");await o.click(i),await l(()=>{const r=e.getByTestId("todo-item-delete-button");a(r).toBeInTheDocument()});const c=e.getByTestId("todo-item-delete-button");await o.click(c),await a(t.onOpenDeleteModal).toHaveBeenCalledWith("todo-1","Buy groceries")}},S={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear();const i=e.getByTestId("todo-item-edit-button");await o.click(i),await l(()=>{const d=e.getByTestId("todo-item-title-input");a(d).toBeInTheDocument()});const c=e.getAllByRole("radio");await a(c.length).toBe(3),await o.click(c[1]);const r=e.getByTestId("todo-item-save-button");await o.click(r),await l(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-1","Buy groceries","Milk, eggs, and bread","cat-2")})}},U={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear();const i=e.getByTestId("todo-item-edit-button");await o.click(i),await l(()=>{const d=e.getByTestId("todo-item-title-input");a(d).toBeInTheDocument()});const c=e.getAllByRole("radio");await o.click(c[0]);const r=e.getByTestId("todo-item-save-button");await o.click(r),await l(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-1","Buy groceries","Milk, eggs, and bread",null)})}},_={args:{onUpdateTodo:j(async(t,n,e,i)=>{throw new Error("Failed to update todo")})},play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear();const i=e.getByTestId("todo-item-edit-button");await o.click(i),await l(()=>{const d=e.getByTestId("todo-item-save-button");a(d).toBeInTheDocument()});const c=e.getByTestId("todo-item-save-button");await o.click(c),await l(()=>{const d=e.getByText("Failed to update todo");a(d).toBeInTheDocument()});const r=e.getByTestId("todo-item-title-input");await a(r).toBeInTheDocument()}},F={args:{categories:[]},play:async({canvasElement:t})=>{const n=u(t),e=n.getByTestId("todo-item-edit-button");await o.click(e),await l(()=>{const c=n.getByTestId("todo-item-title-input");a(c).toBeInTheDocument()});const i=n.queryAllByRole("radio");await a(i.length).toBe(0)}},N={render:t=>{const[n,e]=B.useState(t.todo);return s.jsx(h,{...t,todo:n,onUpdateTodo:async(i,c,r,d)=>{e({...n,title:c,description:r,categoryId:d??null}),await t.onUpdateTodo(i,c,r,d)}})},play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear();const i=e.getByText("Buy groceries");await a(i).toBeInTheDocument();const c=e.getByTestId("todo-item-edit-button");await o.click(c),await l(()=>{const m=e.getByTestId("todo-item-title-input");a(m).toBeInTheDocument()});const r=e.getByTestId("todo-item-title-input");await o.clear(r),await o.type(r,"Modified in edit mode");const d=e.getByTestId("todo-item-save-button");await o.click(d),await l(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-1","Modified in edit mode","Milk, eggs, and bread","cat-1")}),await l(()=>{const m=e.getByText("Modified in edit mode");a(m).toBeInTheDocument()})}},P={play:async({canvasElement:t})=>{const n=u(t),e=n.getByTestId("todo-item-edit-button");await o.click(e),await l(()=>{const v=n.getByTestId("todo-item-title-input");a(v).toBeInTheDocument()});const i=n.getByTestId("todo-item-title-input"),c=n.getByTestId("todo-item-description-input");await o.clear(i),await o.type(i,"Modified title"),await o.clear(c),await o.type(c,"Modified description");const r=n.getAllByRole("radio");await o.click(r[1]),await a(i.value).toBe("Modified title"),await a(c.value).toBe("Modified description");const d=n.getByTestId("todo-item-cancel-button");await o.click(d),await l(()=>{const v=n.getByText("Buy groceries");a(v).toBeInTheDocument()});const m=n.getByText("Milk, eggs, and bread");await a(m).toBeInTheDocument()}},W={args:{todo:z},render:t=>(Object.defineProperty(L,"OS",{value:"ios",writable:!0,configurable:!0}),s.jsx(g,{children:s.jsx(h,{...t})})),play:async({args:t,canvasElement:n})=>{const e=u(n);try{t.onToggleComplete.mockClear(),t.onUpdateTodo.mockClear();const i=e.queryByTestId("todo-item-edit-button");await a(i).toBeNull();const c=e.getByText("Call mom");await a(c).toBeInTheDocument(),await o.pointer({keys:"[MouseLeft>]",target:c}),await new Promise(v=>setTimeout(v,500)),await o.pointer({keys:"[/MouseLeft]"}),await l(()=>{const v=e.getByTestId("todo-item-title-input");a(v).toBeInTheDocument()});const r=e.getByTestId("todo-item-title-input"),d=e.getByTestId("todo-item-description-input");await a(r.value).toBe("Call mom"),await a(d.value).toBe(""),await o.clear(r),await o.type(r,"Updated via long press"),await o.clear(d),await o.type(d,"Updated description");const m=e.getByTestId("todo-item-save-button");await o.click(m),await l(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-2","Updated via long press","Updated description",null)})}finally{Object.defineProperty(L,"OS",{value:"web",writable:!0,configurable:!0})}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onToggleComplete.mockClear();

    // Find the todo title
    const title = canvas.getByText("Buy groceries");
    await expect(title).toBeInTheDocument();

    // Find the description
    const description = canvas.getByText("Milk, eggs, and bread");
    await expect(description).toBeInTheDocument();

    // Find the category name
    const category = canvas.getByText(/Work/);
    await expect(category).toBeInTheDocument();

    // Click to toggle complete
    await userEvent.click(title);
    await expect(args.onToggleComplete).toHaveBeenCalledTimes(1);
    await expect(args.onToggleComplete).toHaveBeenCalledWith("todo-1");
  }
}`,...E.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    todo: SAMPLE_TODO_COMPLETED
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the title with strikethrough styling
    const title = canvas.getByText("Finish report");
    await expect(title).toBeInTheDocument();

    // Verify checkmark is visible
    const checkmark = canvas.getByText("✓");
    await expect(checkmark).toBeInTheDocument();
  }
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    todo: SAMPLE_TODO_NO_DESCRIPTION
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the title
    const title = canvas.getByText("Call mom");
    await expect(title).toBeInTheDocument();

    // Description should not be present
    const description = canvas.queryByText("Milk, eggs, and bread");
    await expect(description).toBeNull();
  }
}`,...b.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    todo: SAMPLE_TODO_NO_DESCRIPTION
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Category should not be displayed
    const categoryName = canvas.queryByText(/Work/);
    await expect(categoryName).toBeNull();
  }
}`,...k.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    todo: SAMPLE_TODO_CATEGORY_NO_ICON
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Category name should be displayed
    const categoryName = canvas.getByText(/Personal/);
    await expect(categoryName).toBeInTheDocument();
  }
}`,...C.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onUpdateTodo.mockClear();
    args.onOpenDeleteModal.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Find the form inputs
    const titleInput = canvas.getByTestId("todo-item-title-input") as HTMLInputElement;
    const descriptionInput = canvas.getByTestId("todo-item-description-input") as HTMLTextAreaElement;

    // Clear and type new values
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Updated title");
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, "Updated description");

    // Find and click save button
    const saveButton = canvas.getByTestId("todo-item-save-button");
    await userEvent.click(saveButton);
    await waitFor(() => {
      expect(args.onUpdateTodo).toHaveBeenCalledWith("todo-1", "Updated title", "Updated description", "cat-1");
    });
  }
}`,...D.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onUpdateTodo.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Find the form inputs
    const titleInput = canvas.getByTestId("todo-item-title-input") as HTMLInputElement;

    // Modify the title
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Modified title");

    // Click cancel button
    const cancelButton = canvas.getByTestId("todo-item-cancel-button");
    await userEvent.click(cancelButton);

    // Verify edit mode is closed (original title shows again)
    await waitFor(() => {
      const title = canvas.getByText("Buy groceries");
      expect(title).toBeInTheDocument();
    });

    // Verify onUpdateTodo was not called
    await expect(args.onUpdateTodo).not.toHaveBeenCalled();
  }
}`,...M.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onOpenDeleteModal.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const deleteButton = canvas.getByTestId("todo-item-delete-button");
      expect(deleteButton).toBeInTheDocument();
    });

    // Click delete button
    const deleteButton = canvas.getByTestId("todo-item-delete-button");
    await userEvent.click(deleteButton);
    await expect(args.onOpenDeleteModal).toHaveBeenCalledWith("todo-1", "Buy groceries");
  }
}`,...O.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onUpdateTodo.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Find category badges - they should be radio buttons
    const categoryBadges = canvas.getAllByRole("radio");
    await expect(categoryBadges.length).toBe(3);

    // Click on Personal category (second one)
    await userEvent.click(categoryBadges[1]);

    // Save the changes
    const saveButton = canvas.getByTestId("todo-item-save-button");
    await userEvent.click(saveButton);
    await waitFor(() => {
      expect(args.onUpdateTodo).toHaveBeenCalledWith("todo-1", "Buy groceries", "Milk, eggs, and bread", "cat-2");
    });
  }
}`,...S.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onUpdateTodo.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Find category badges
    const categoryBadges = canvas.getAllByRole("radio");

    // Click on the already selected Work category (first one) to deselect it
    await userEvent.click(categoryBadges[0]);

    // Save the changes
    const saveButton = canvas.getByTestId("todo-item-save-button");
    await userEvent.click(saveButton);
    await waitFor(() => {
      expect(args.onUpdateTodo).toHaveBeenCalledWith("todo-1", "Buy groceries", "Milk, eggs, and bread", null);
    });
  }
}`,...U.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    onUpdateTodo: fn(async (_id: string, _title: string, _description: string, _categoryId?: string | null) => {
      throw new Error("Failed to update todo");
    })
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onUpdateTodo.mockClear();

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const saveButton = canvas.getByTestId("todo-item-save-button");
      expect(saveButton).toBeInTheDocument();
    });

    // Click save button
    const saveButton = canvas.getByTestId("todo-item-save-button");
    await userEvent.click(saveButton);

    // Wait for error message to appear
    await waitFor(() => {
      const errorMessage = canvas.getByText("Failed to update todo");
      expect(errorMessage).toBeInTheDocument();
    });

    // Verify we are still in edit mode (title input still visible)
    const titleInput = canvas.getByTestId("todo-item-title-input");
    await expect(titleInput).toBeInTheDocument();
  }
}`,..._.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    categories: []
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find the edit button and click it
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode to appear
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Verify no category badges are displayed
    const categoryBadges = canvas.queryAllByRole("radio");
    await expect(categoryBadges.length).toBe(0);
  }
}`,...F.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [todo, setTodo] = useState(args.todo);
    return <TodoItem {...args} todo={todo} onUpdateTodo={async (id, title, description, categoryId) => {
      // After save, update the todo to simulate external change
      setTodo({
        ...todo,
        title,
        description,
        categoryId: categoryId ?? null
      });
      await args.onUpdateTodo(id, title, description, categoryId);
    }} />;
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onUpdateTodo.mockClear();

    // Verify initial title
    const title = canvas.getByText("Buy groceries");
    await expect(title).toBeInTheDocument();

    // Enter edit mode
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Modify the title
    const titleInput = canvas.getByTestId("todo-item-title-input") as HTMLInputElement;
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Modified in edit mode");

    // Save changes
    const saveButton = canvas.getByTestId("todo-item-save-button");
    await userEvent.click(saveButton);

    // Wait for save to complete and exit edit mode
    await waitFor(() => {
      expect(args.onUpdateTodo).toHaveBeenCalledWith("todo-1", "Modified in edit mode", "Milk, eggs, and bread", "cat-1");
    });

    // After exiting edit mode, verify new title is displayed
    // This tests that useEffect syncs the state when todo prop changes
    await waitFor(() => {
      const updatedTitle = canvas.getByText("Modified in edit mode");
      expect(updatedTitle).toBeInTheDocument();
    });
  }
}`,...N.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Enter edit mode
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Modify all fields
    const titleInput = canvas.getByTestId("todo-item-title-input") as HTMLInputElement;
    const descriptionInput = canvas.getByTestId("todo-item-description-input") as HTMLTextAreaElement;
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Modified title");
    await userEvent.clear(descriptionInput);
    await userEvent.type(descriptionInput, "Modified description");

    // Change category
    const categoryBadges = canvas.getAllByRole("radio");
    await userEvent.click(categoryBadges[1]); // Select second category

    // Verify the modification took effect
    await expect(titleInput.value).toBe("Modified title");
    await expect(descriptionInput.value).toBe("Modified description");

    // Cancel - this triggers handleCancel which resets state
    const cancelButton = canvas.getByTestId("todo-item-cancel-button");
    await userEvent.click(cancelButton);

    // Verify we're back to display mode with original values
    await waitFor(() => {
      const originalTitle = canvas.getByText("Buy groceries");
      expect(originalTitle).toBeInTheDocument();
    });

    // Verify the original description is also displayed
    const originalDescription = canvas.getByText("Milk, eggs, and bread");
    await expect(originalDescription).toBeInTheDocument();
  }
}`,...P.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    todo: SAMPLE_TODO_NO_DESCRIPTION
  },
  render: args => {
    // Set to iOS for this story
    Object.defineProperty(Platform, "OS", {
      value: "ios",
      writable: true,
      configurable: true
    });
    return <View>
        <TodoItem {...args} />
      </View>;
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    try {
      args.onToggleComplete.mockClear();
      args.onUpdateTodo.mockClear();

      // On mobile (iOS), the edit button should NOT be visible
      const editButton = canvas.queryByTestId("todo-item-edit-button");
      await expect(editButton).toBeNull();

      // Find the todo title
      const title = canvas.getByText("Call mom");
      await expect(title).toBeInTheDocument();

      // Simulate long press to enter edit mode on mobile
      await userEvent.pointer({
        keys: "[MouseLeft>]",
        target: title
      });
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms for long press
      await userEvent.pointer({
        keys: "[/MouseLeft]"
      });

      // Wait for edit mode to appear
      await waitFor(() => {
        const titleInput = canvas.getByTestId("todo-item-title-input");
        expect(titleInput).toBeInTheDocument();
      });

      // Find the form inputs
      const titleInput = canvas.getByTestId("todo-item-title-input") as HTMLInputElement;
      const descriptionInput = canvas.getByTestId("todo-item-description-input") as HTMLTextAreaElement;

      // Verify edit mode is active and we can modify fields
      await expect(titleInput.value).toBe("Call mom");
      await expect(descriptionInput.value).toBe("");

      // Modify the title and description
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, "Updated via long press");
      await userEvent.clear(descriptionInput);
      await userEvent.type(descriptionInput, "Updated description");

      // Save the changes
      const saveButton = canvas.getByTestId("todo-item-save-button");
      await userEvent.click(saveButton);
      await waitFor(() => {
        expect(args.onUpdateTodo).toHaveBeenCalledWith("todo-2", "Updated via long press", "Updated description", null);
      });
    } finally {
      // Reset Platform.OS after test completes
      Object.defineProperty(Platform, "OS", {
        value: "web",
        writable: true,
        configurable: true
      });
    }
  }
}`,...W.parameters?.docs?.source}}};const Et=["Default","Completed","WithoutDescription","WithoutCategory","CategoryWithoutIcon","EditMode","EditModeCancel","EditModeDelete","EditModeCategorySelection","EditModeCategoryDeselection","EditModeWithError","WithoutCategories","UseEffectSyncsStateWhenTodoChanges","UseEffectResetsStateOnCancel","MobileLongPressToEdit"];export{C as CategoryWithoutIcon,f as Completed,E as Default,D as EditMode,M as EditModeCancel,U as EditModeCategoryDeselection,S as EditModeCategorySelection,O as EditModeDelete,_ as EditModeWithError,W as MobileLongPressToEdit,P as UseEffectResetsStateOnCancel,N as UseEffectSyncsStateWhenTodoChanges,F as WithoutCategories,k as WithoutCategory,b as WithoutDescription,Et as __namedExportsOrder,xt as default};
