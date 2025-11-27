import{r as B,j as c,V as m,P as X,T as w,c as x}from"./iframe-Be_WPwCk.js";import{B as Y}from"./Button-CEL3oYu7.js";import{E as it}from"./ErrorMessage-B2bGI6CL.js";import{F as Z}from"./FormTextInput-ft8gbT3R.js";import{C as st}from"./CategorySelectorBadge-DMjUicQK.js";import{u as ct}from"./useTranslation-BBl3ZU3Q.js";import{M as rt}from"./MaterialIcons-6JoPWMwo.js";import"./preload-helper-Zf8nSx-t.js";import"./index-B6vRVC2k.js";import"./createIconSet-C-zfi05Y.js";function z({todo:t,categories:n,onToggleComplete:e,onUpdateTodo:o,onOpenDeleteModal:s}){const{t:r}=ct(),[d,g]=B.useState(!1),[I,E]=B.useState(null),[v,$]=B.useState(!1),[y,q]=B.useState(!1),[K,f]=B.useState(t.title),[Q,k]=B.useState(t.description??""),[G,h]=B.useState(t.categoryId??void 0);B.useEffect(()=>{y||(f(t.title),k(t.description??""),h(t.categoryId??void 0))},[y,t.description,t.title,t.categoryId]);const J=()=>{f(t.title),k(t.description??""),h(t.categoryId??void 0),E(null),q(!0)},et=async()=>{$(!0),E(null);try{await o(t.id,K,Q,G||null),q(!1)}catch(p){E(p instanceof Error?p.message:r("errors.unexpectedError"))}finally{$(!1)}},nt=()=>{s(t.id,t.title)},at=()=>{q(!1),E(null),f(t.title),k(t.description??""),h(t.categoryId??void 0)},ot=p=>{h(G===p?void 0:p)};return c.jsx(m,{onPointerEnter:()=>g(!0),onPointerLeave:()=>g(!1),children:c.jsxs(X,{className:`mb-1 flex-row rounded-lg border border-transparent p-3 pt-1 hover:border-gray-200 dark:hover:border-gray-700 ${y?"":" active:bg-gray-50  dark:active:bg-gray-700"}`,onPress:()=>{y||e(t.id)},onLongPress:()=>x.OS!=="web"&&!y?J():{},children:[c.jsxs(m,{className:"flex-1",children:[y&&c.jsxs(m,{className:"my-2 flex-row gap-2",children:[c.jsx(Y,{t:"todos.update",type:"primary",size:"small",onPress:et,className:"px-4",disabled:v,testID:"todo-item-save-button"}),c.jsx(Y,{t:"todos.cancel",type:"ghost",size:"small",onPress:at,className:"px-4",disabled:v,testID:"todo-item-cancel-button"}),c.jsx(Y,{t:"todos.delete",type:"destructive",size:"small",onPress:nt,disabled:v,testID:"todo-item-delete-button"})]}),t.category&&!y&&c.jsxs(m,{className:"-mb-3 ml-6 flex-row items-center px-2 py-1",children:[t.category.icon?c.jsx(w,{className:"mr-1 text-xs",children:t.category.icon}):null,c.jsxs(w,{className:"text-xs font-medium",style:t.category.color?{color:t.category.color}:void 0,children:[t.category.name," ",c.jsx(w,{className:"color-gray-400",children:"/"})]})]}),c.jsxs(m,{className:"mt-2 flex-row",children:[!y&&c.jsx(m,{className:`mr-3 mt-1 h-5 w-5 rounded border-2 ${t.completed?"border-blue-600 bg-blue-600":"border-gray-300 dark:border-gray-600"}`,children:t.completed&&c.jsx(w,{className:"text-center text-xs leading-4 text-white",children:"✓"})}),c.jsx(m,{className:"flex-1",children:y?c.jsxs(m,{className:"gap-2",children:[c.jsx(Z,{type:"text",placeholder:"todos.title",value:K,onChangeText:p=>f(p),className:"px-3 py-2 text-base",editable:!v,maxLength:220,testID:"todo-item-title-input"}),c.jsx(Z,{type:"text",placeholder:"todos.addDetails",value:Q,onChangeText:p=>k(p),className:" px-3 py-2 text-sm",editable:!v,multiline:!0,numberOfLines:4,textAlignVertical:"top",testID:"todo-item-description-input"}),n&&n.length>0&&c.jsx(m,{className:"flex-row flex-wrap gap-2",children:n.map(p=>c.jsx(st,{type:"ghost",category:p,selectedCategory:G,setSelectedCategory:ot,disabled:v},p.id))}),c.jsx(it,{error:I})]}):c.jsxs(c.Fragment,{children:[c.jsx(w,{className:`mt-0.5 text-base font-semibold ${t.completed?"text-gray-500 line-through dark:text-gray-400":"text-gray-900 dark:text-white"}`,children:t.title}),t.description&&c.jsx(w,{className:`mt-1 text-sm ${t.completed?"text-gray-400 dark:text-gray-500":"text-gray-600 dark:text-gray-300"}`,children:t.description})]})})]})]}),!y&&x.OS==="web"&&c.jsx(m,{className:"max-w-10 flex-1 items-center justify-center pt-2",children:c.jsx(X,{onPress:p=>{p.stopPropagation(),J()},className:"h-6 w-6 items-center justify-center rounded hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-500",style:{opacity:d?1:0},testID:"todo-item-edit-button",children:c.jsx(rt,{name:"edit",size:18,color:"#6b7280"})})})]})})}z.__docgenInfo={description:"",methods:[],displayName:"TodoItem",props:{todo:{required:!0,tsType:{name:'RouterOutput["todo"]["getAll"][number]',raw:'RouterOutput["todo"]["getAll"][number]'},description:""},categories:{required:!1,tsType:{name:'RouterOutput["category"]["getAll"]',raw:'RouterOutput["category"]["getAll"]'},description:""},onToggleComplete:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onUpdateTodo:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string, title: string, description: string, categoryId?: string | null) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"string"},name:"title"},{type:{name:"string"},name:"description"},{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"categoryId"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onOpenDeleteModal:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string, title: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"string"},name:"title"}],return:{name:"void"}}},description:""}}};const{expect:a,fn:R,userEvent:i,waitFor:l,within:u}=__STORYBOOK_MODULE_TEST__,T={id:"cat-1",name:"Work",color:"#2563EB",icon:"💼",_count:{todos:3}},V={id:"cat-2",name:"Personal",color:"#DC2626",icon:null,_count:{todos:5}},dt=[T,V,{id:"cat-3",name:"Errands",color:"#047857",icon:"🛒",_count:{todos:2}}],lt={id:"todo-1",title:"Buy groceries",description:"Milk, eggs, and bread",completed:!1,categoryId:"cat-1",category:{name:T.name,color:T.color,icon:T.icon}},tt={id:"todo-2",title:"Call mom",description:null,completed:!1,categoryId:null,category:null},ut={id:"todo-3",title:"Finish report",description:"Q4 Financial Summary",completed:!0,categoryId:"cat-1",category:{name:T.name,color:T.color,icon:T.icon}},pt={id:"todo-4",title:"Read a book",description:"At least 30 pages",completed:!1,categoryId:"cat-2",category:{name:V.name,color:V.color,icon:V.icon}},Et={title:"todos/TodoItem",component:z,tags:["autodocs"],args:{todo:lt,categories:dt,onToggleComplete:R(),onUpdateTodo:R(async(t,n,e,o)=>{}),onOpenDeleteModal:R()},decorators:[t=>c.jsx(m,{className:"w-full max-w-md",children:c.jsx(t,{})})]},b={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onToggleComplete.mockClear();const o=e.getByText("Buy groceries");await a(o).toBeInTheDocument();const s=e.getByText("Milk, eggs, and bread");await a(s).toBeInTheDocument();const r=e.getByText(/Work/);await a(r).toBeInTheDocument(),await i.click(o),await a(t.onToggleComplete).toHaveBeenCalledTimes(1),await a(t.onToggleComplete).toHaveBeenCalledWith("todo-1")}},C={args:{todo:ut},play:async({canvasElement:t})=>{const n=u(t),e=n.getByText("Finish report");await a(e).toBeInTheDocument();const o=n.getByText("✓");await a(o).toBeInTheDocument()}},D={args:{todo:tt},play:async({canvasElement:t})=>{const n=u(t),e=n.getByText("Call mom");await a(e).toBeInTheDocument();const o=n.queryByText("Milk, eggs, and bread");await a(o).toBeNull()}},M={args:{todo:tt},play:async({canvasElement:t})=>{const e=u(t).queryByText(/Work/);await a(e).toBeNull()}},S={args:{todo:pt},play:async({canvasElement:t})=>{const e=u(t).getByText(/Personal/);await a(e).toBeInTheDocument()}},O={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear(),t.onOpenDeleteModal.mockClear();const o=e.getByTestId("todo-item-edit-button");await i.click(o),await l(()=>{const g=e.getByTestId("todo-item-title-input");a(g).toBeInTheDocument()});const s=e.getByTestId("todo-item-title-input"),r=e.getByTestId("todo-item-description-input");await i.clear(s),await i.type(s,"Updated title"),await i.clear(r),await i.type(r,"Updated description");const d=e.getByTestId("todo-item-save-button");await i.click(d),await l(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-1","Updated title","Updated description","cat-1")})}},N={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear();const o=e.getByTestId("todo-item-edit-button");await i.click(o),await l(()=>{const d=e.getByTestId("todo-item-title-input");a(d).toBeInTheDocument()});const s=e.getByTestId("todo-item-title-input");await i.clear(s),await i.type(s,"Modified title");const r=e.getByTestId("todo-item-cancel-button");await i.click(r),await l(()=>{const d=e.getByText("Buy groceries");a(d).toBeInTheDocument()}),await a(t.onUpdateTodo).not.toHaveBeenCalled()}},_={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onOpenDeleteModal.mockClear();const o=e.getByTestId("todo-item-edit-button");await i.click(o),await l(()=>{const r=e.getByTestId("todo-item-delete-button");a(r).toBeInTheDocument()});const s=e.getByTestId("todo-item-delete-button");await i.click(s),await a(t.onOpenDeleteModal).toHaveBeenCalledWith("todo-1","Buy groceries")}},F={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear();const o=e.getByTestId("todo-item-edit-button");await i.click(o),await l(()=>{const d=e.getByTestId("todo-item-title-input");a(d).toBeInTheDocument()});const s=e.getAllByRole("radio");await a(s.length).toBe(3),await i.click(s[1]);const r=e.getByTestId("todo-item-save-button");await i.click(r),await l(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-1","Buy groceries","Milk, eggs, and bread","cat-2")})}},U={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear();const o=e.getByTestId("todo-item-edit-button");await i.click(o),await l(()=>{const d=e.getByTestId("todo-item-title-input");a(d).toBeInTheDocument()});const s=e.getAllByRole("radio");await i.click(s[0]);const r=e.getByTestId("todo-item-save-button");await i.click(r),await l(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-1","Buy groceries","Milk, eggs, and bread",null)})}},W={args:{onUpdateTodo:R(async(t,n,e,o)=>{throw new Error("Failed to update todo")})},play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear();const o=e.getByTestId("todo-item-edit-button");await i.click(o),await l(()=>{const d=e.getByTestId("todo-item-save-button");a(d).toBeInTheDocument()});const s=e.getByTestId("todo-item-save-button");await i.click(s),await l(()=>{const d=e.getByText("Failed to update todo");a(d).toBeInTheDocument()});const r=e.getByTestId("todo-item-title-input");await a(r).toBeInTheDocument()}},P={args:{categories:[]},play:async({canvasElement:t})=>{const n=u(t),e=n.getByTestId("todo-item-edit-button");await i.click(e),await l(()=>{const s=n.getByTestId("todo-item-title-input");a(s).toBeInTheDocument()});const o=n.queryAllByRole("radio");await a(o.length).toBe(0)}},j={render:t=>{const[n,e]=B.useState(t.todo);return c.jsx(z,{...t,todo:n,onUpdateTodo:async(o,s,r,d)=>{e({...n,title:s,description:r,categoryId:d??null}),await t.onUpdateTodo(o,s,r,d)}})},play:async({args:t,canvasElement:n})=>{const e=u(n);t.onUpdateTodo.mockClear();const o=e.getByText("Buy groceries");await a(o).toBeInTheDocument();const s=e.getByTestId("todo-item-edit-button");await i.click(s),await l(()=>{const g=e.getByTestId("todo-item-title-input");a(g).toBeInTheDocument()});const r=e.getByTestId("todo-item-title-input");await i.clear(r),await i.type(r,"Modified in edit mode");const d=e.getByTestId("todo-item-save-button");await i.click(d),await l(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-1","Modified in edit mode","Milk, eggs, and bread","cat-1")}),await l(()=>{const g=e.getByText("Modified in edit mode");a(g).toBeInTheDocument()})}},A={play:async({canvasElement:t})=>{const n=u(t),e=n.getByTestId("todo-item-edit-button");await i.click(e),await l(()=>{const I=n.getByTestId("todo-item-title-input");a(I).toBeInTheDocument()});const o=n.getByTestId("todo-item-title-input"),s=n.getByTestId("todo-item-description-input");await i.clear(o),await i.type(o,"Modified title"),await i.clear(s),await i.type(s,"Modified description");const r=n.getAllByRole("radio");await i.click(r[1]),await a(o.value).toBe("Modified title"),await a(s.value).toBe("Modified description");const d=n.getByTestId("todo-item-cancel-button");await i.click(d),await l(()=>{const I=n.getByText("Buy groceries");a(I).toBeInTheDocument()});const g=n.getByText("Milk, eggs, and bread");await a(g).toBeInTheDocument()}},H={play:async({args:t,canvasElement:n})=>{const e=u(n);t.onToggleComplete.mockClear();const o=e.getByTestId("todo-item-edit-button");await i.click(o),await l(()=>{const r=e.getByTestId("todo-item-title-input");a(r).toBeInTheDocument()});const s=e.getByTestId("todo-item-title-input");await i.click(s),await a(t.onToggleComplete).not.toHaveBeenCalled()}},L={decorators:[t=>{const n=x.OS;return x.OS="ios",B.useEffect(()=>()=>{x.OS=n},[n]),c.jsx(m,{className:"w-full max-w-md",children:c.jsx(t,{})})}],play:async({args:t,canvasElement:n})=>{const e=u(n);t.onToggleComplete.mockClear();const o=e.queryByTestId("todo-item-edit-button");await a(o).toBeNull();const s=e.getByText("Buy groceries");await a(s).toBeInTheDocument(),await i.click(s),await a(t.onToggleComplete).toHaveBeenCalledTimes(1),await a(t.onToggleComplete).toHaveBeenCalledWith("todo-1")}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onToggleComplete.mockClear();

    // Enter edit mode first
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.click(editButton);

    // Wait for edit mode
    await waitFor(() => {
      const titleInput = canvas.getByTestId("todo-item-title-input");
      expect(titleInput).toBeInTheDocument();
    });

    // Try to click on the pressable area (should not trigger toggle in edit mode)
    const titleInput = canvas.getByTestId("todo-item-title-input");
    await userEvent.click(titleInput);

    // Verify onToggleComplete was NOT called
    await expect(args.onToggleComplete).not.toHaveBeenCalled();
  }
}`,...H.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  decorators: [Story => {
    // Mock Platform.OS to be 'ios' for this story
    const originalOS = Platform.OS;
    Platform.OS = "ios";

    // Use useEffect for proper cleanup when component unmounts
    useEffect(() => {
      return () => {
        Platform.OS = originalOS;
      };
    }, [originalOS]);
    return <View className="w-full max-w-md">
          <Story />
        </View>;
  }],
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onToggleComplete.mockClear();

    // On mobile (iOS), the edit button should NOT be visible
    const editButton = canvas.queryByTestId("todo-item-edit-button");
    await expect(editButton).toBeNull();

    // Find the todo title
    const title = canvas.getByText("Buy groceries");
    await expect(title).toBeInTheDocument();

    // A regular click should still trigger toggle (not edit mode)
    await userEvent.click(title);

    // Verify toggle was called
    await expect(args.onToggleComplete).toHaveBeenCalledTimes(1);
    await expect(args.onToggleComplete).toHaveBeenCalledWith("todo-1");

    // useEffect cleanup in decorator will restore Platform.OS
  }
}`,...L.parameters?.docs?.source}}};const ft=["Default","Completed","WithoutDescription","WithoutCategory","CategoryWithoutIcon","EditMode","EditModeCancel","EditModeDelete","EditModeCategorySelection","EditModeCategoryDeselection","EditModeWithError","WithoutCategories","UseEffectSyncsStateWhenTodoChanges","UseEffectResetsStateOnCancel","ClickDoesNotToggleInEditMode","MobileLongPressToEdit"];export{S as CategoryWithoutIcon,H as ClickDoesNotToggleInEditMode,C as Completed,b as Default,O as EditMode,N as EditModeCancel,U as EditModeCategoryDeselection,F as EditModeCategorySelection,_ as EditModeDelete,W as EditModeWithError,L as MobileLongPressToEdit,A as UseEffectResetsStateOnCancel,j as UseEffectSyncsStateWhenTodoChanges,P as WithoutCategories,M as WithoutCategory,D as WithoutDescription,ft as __namedExportsOrder,Et as default};
