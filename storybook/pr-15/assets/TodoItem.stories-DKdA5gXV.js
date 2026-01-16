import{r as g,j as n,V as p,P as Y,T as w,c as j}from"./iframe-BqiDvFzp.js";import{B as H}from"./Button-Cvq6aFLY.js";import{E as tt}from"./ErrorMessage-BUpz5qqp.js";import{F as z}from"./FormTextInput-B1ZPGBMv.js";import{C as et}from"./CategorySelectorBadge-CcRq7vF3.js";import{M as nt}from"./MaterialIcons-Coblg3nu.js";import"./preload-helper-Zf8nSx-t.js";import"./useTranslation-COVtSUta.js";import"./index-zW4MhASt.js";import"./createIconSet-CRQygp9b.js";function F({todo:t,categories:i,onToggleComplete:e,onUpdateTodo:s,onOpenDeleteModal:r}){const[d,c]=g.useState(!1),[I,B]=g.useState(null),[T,R]=g.useState(!1),[m,N]=g.useState(!1),[V,A]=g.useState(t.title),[q,L]=g.useState(t.description??""),[W,h]=g.useState(t.categoryId??void 0);g.useEffect(()=>{m||(A(t.title),L(t.description??""),h(t.categoryId??void 0))},[m,t.description,t.title,t.categoryId]);const G=()=>{A(t.title),L(t.description??""),h(t.categoryId??void 0),B(null),N(!0)},Q=async()=>{R(!0),B(null);try{await s(t.id,V,q,W||null),N(!1)}catch(l){B(l.message)}finally{R(!1)}},J=()=>{r(t.id,t.title)},X=()=>{N(!1)},Z=l=>{h(W===l?void 0:l)};return n.jsx(p,{onPointerEnter:()=>c(!0),onPointerLeave:()=>c(!1),children:n.jsxs(Y,{className:`mb-1 flex-row rounded-lg border border-transparent p-3 pt-1 hover:border-gray-200 dark:hover:border-gray-700 ${m?"":"active:bg-gray-50 dark:active:bg-gray-700"}`,onPress:()=>{m||e(t.id)},onLongPress:()=>{j.OS!=="web"&&!m&&G()},children:[n.jsxs(p,{className:"flex-1",children:[m&&n.jsxs(p,{className:"my-2 flex-row gap-2",children:[n.jsx(H,{t:"todos.update",type:"primary",size:"small",onPress:Q,className:"px-4",disabled:T,testID:"todo-item-save-button"}),n.jsx(H,{t:"todos.cancel",type:"ghost",size:"small",onPress:X,className:"px-4",disabled:T,testID:"todo-item-cancel-button"}),n.jsx(H,{t:"todos.delete",type:"destructive",size:"small",onPress:J,disabled:T,testID:"todo-item-delete-button"})]}),t.category&&!m&&n.jsxs(p,{className:"-mb-3 ml-6 flex-row items-center px-2 py-1",children:[t.category.icon?n.jsx(w,{className:"mr-1 text-xs",children:t.category.icon}):null,n.jsxs(w,{className:"text-xs font-medium",style:{color:t.category.color||void 0},children:[t.category.name," ",n.jsx(w,{className:"color-gray-400",children:"/"})]})]}),n.jsxs(p,{className:"mt-2 flex-row",children:[!m&&n.jsx(p,{className:`mr-3 mt-1 h-5 w-5 rounded border-2 ${t.completed?"border-blue-600 bg-blue-600":"border-gray-300 dark:border-gray-600"}`,children:t.completed&&n.jsx(w,{className:"text-center text-xs leading-4 text-white",children:"✓"})}),n.jsx(p,{className:"flex-1",children:m?n.jsxs(p,{className:"gap-2",children:[n.jsx(z,{type:"text",placeholder:"todos.title",value:V,onChangeText:l=>A(l),className:"px-3 py-2 text-base",editable:!T,maxLength:220,testID:"todo-item-title-input"}),n.jsx(z,{type:"text",placeholder:"todos.addDetails",value:q,onChangeText:l=>L(l),className:"px-3 py-2 text-sm",editable:!T,multiline:!0,numberOfLines:4,textAlignVertical:"top",testID:"todo-item-description-input"}),i&&i.length>0&&n.jsx(p,{className:"flex-row flex-wrap gap-2",children:i.map(l=>n.jsx(et,{type:"ghost",category:l,selectedCategory:W,setSelectedCategory:Z,disabled:T},l.id))}),n.jsx(tt,{error:I})]}):n.jsxs(n.Fragment,{children:[n.jsx(w,{className:`mt-0.5 text-base font-semibold ${t.completed?"text-gray-500 line-through dark:text-gray-400":"text-gray-900 dark:text-white"}`,children:t.title}),t.description&&n.jsx(w,{className:`mt-1 text-sm ${t.completed?"text-gray-500 dark:text-gray-500":"text-gray-600 dark:text-gray-300"}`,children:t.description})]})})]})]}),!m&&j.OS==="web"&&n.jsx(p,{className:"max-w-10 flex-1 items-center justify-center pt-2",children:n.jsx(Y,{onPress:l=>{l.stopPropagation(),G()},className:"h-6 w-6 items-center justify-center rounded hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-500",style:{opacity:d?1:0},testID:"todo-item-edit-button",children:n.jsx(nt,{name:"edit",size:18,color:"#6b7280"})})})]})})}F.__docgenInfo={description:"",methods:[],displayName:"TodoItem",props:{todo:{required:!0,tsType:{name:'RouterOutput["todo"]["getAll"][number]',raw:'RouterOutput["todo"]["getAll"][number]'},description:""},categories:{required:!1,tsType:{name:'RouterOutput["category"]["getAll"]',raw:'RouterOutput["category"]["getAll"]'},description:""},onToggleComplete:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"}],return:{name:"void"}}},description:""},onUpdateTodo:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string, title: string, description: string, categoryId?: string | null) => Promise<void>",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"string"},name:"title"},{type:{name:"string"},name:"description"},{type:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}]},name:"categoryId"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},onOpenDeleteModal:{required:!0,tsType:{name:"signature",type:"function",raw:"(id: string, title: string) => void",signature:{arguments:[{type:{name:"string"},name:"id"},{type:{name:"string"},name:"title"}],return:{name:"void"}}},description:""}}};const{expect:a,fn:P,userEvent:o,waitFor:u,within:y}=__STORYBOOK_MODULE_TEST__,v={id:"cat-1",name:"Work",color:"#2563EB",icon:"💼",_count:{todos:3}},U={id:"cat-2",name:"Personal",color:"#DC2626",icon:null,_count:{todos:5}},ot=[v,U,{id:"cat-3",name:"Errands",color:"#047857",icon:"🛒",_count:{todos:2}}],at={id:"todo-1",title:"Buy groceries",description:"Milk, eggs, and bread",completed:!1,categoryId:"cat-1",category:{name:v.name,color:v.color,icon:v.icon}},K={id:"todo-2",title:"Call mom",description:null,completed:!1,categoryId:null,category:null},$={id:"todo-3",title:"Finish report",description:"Q4 Financial Summary",completed:!0,categoryId:"cat-1",category:{name:v.name,color:v.color,icon:v.icon}},it={id:"todo-4",title:"Read a book",description:"At least 30 pages",completed:!1,categoryId:"cat-2",category:{name:U.name,color:U.color,icon:U.icon}},Bt={title:"todos/TodoItem",component:F,tags:["autodocs"],args:{todo:at,categories:ot,onToggleComplete:P(),onUpdateTodo:P(async(t,i,e,s)=>{}),onOpenDeleteModal:P()},decorators:[t=>n.jsx(p,{className:"w-full max-w-md",children:n.jsx(t,{})})],render:t=>{const[i,e]=g.useState(t.todo);return n.jsx(F,{...t,todo:i,onToggleComplete:s=>{e({...i,completed:!i.completed}),t.onToggleComplete(s)}})}},x={play:async({args:t,canvasElement:i})=>{const e=y(i);t.onToggleComplete.mockClear();const s=e.getByText("Buy groceries");await a(s).toBeInTheDocument();const r=e.getByTestId("todo-item-edit-button");await o.hover(s),await a(r.style.opacity).toBe("1"),await o.unhover(s),await a(r.style.opacity).toBe("0");const d=e.getByText("Milk, eggs, and bread");await a(d).toBeInTheDocument();const c=e.getByText(/Work/);await a(c).toBeInTheDocument(),await o.click(s),await a(t.onToggleComplete).toHaveBeenCalledTimes(1),await a(t.onToggleComplete).toHaveBeenCalledWith("todo-1")}},b={args:{todo:{...$,category:{...$.category,color:null}}}},E={args:{todo:K}},f={args:{todo:it}},C={play:async({args:t,canvasElement:i})=>{const e=y(i);t.onUpdateTodo.mockClear(),t.onOpenDeleteModal.mockClear();const s=e.getByTestId("todo-item-edit-button");await o.click(s),await u(()=>{const I=e.getByTestId("todo-item-title-input");a(I).toBeInTheDocument()});const r=e.getByTestId("todo-item-title-input"),d=e.getByTestId("todo-item-description-input");await o.clear(r),await o.type(r,"Updated title"),await o.clear(d),await o.type(d,"Updated description");const c=e.getByTestId("todo-item-save-button");await o.click(c),await u(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-1","Updated title","Updated description","cat-1")})}},k={play:async({args:t,canvasElement:i})=>{const e=y(i);t.onUpdateTodo.mockClear();const s=e.getByTestId("todo-item-edit-button");await o.click(s),await u(()=>{const c=e.getByTestId("todo-item-title-input");a(c).toBeInTheDocument()});const r=e.getByTestId("todo-item-title-input");await o.clear(r),await o.type(r,"Modified title");const d=e.getByTestId("todo-item-cancel-button");await o.click(d),await u(()=>{const c=e.getByText("Buy groceries");a(c).toBeInTheDocument()}),await a(t.onUpdateTodo).not.toHaveBeenCalled()}},D={play:async({args:t,canvasElement:i})=>{const e=y(i);t.onOpenDeleteModal.mockClear();const s=e.getByTestId("todo-item-edit-button");await o.click(s),await u(()=>{const d=e.getByTestId("todo-item-delete-button");a(d).toBeInTheDocument()});const r=e.getByTestId("todo-item-delete-button");await o.click(r),await a(t.onOpenDeleteModal).toHaveBeenCalledWith("todo-1","Buy groceries")}},O={play:async({args:t,canvasElement:i})=>{const e=y(i);t.onUpdateTodo.mockClear();const s=e.getByTestId("todo-item-edit-button");await o.click(s),await u(()=>{const c=e.getByTestId("todo-item-title-input");a(c).toBeInTheDocument()});const r=e.getAllByRole("radio");await a(r.length).toBe(3),await o.click(r[1]);const d=e.getByTestId("todo-item-save-button");await o.click(d),await u(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-1","Buy groceries","Milk, eggs, and bread","cat-2")})}},M={play:async({args:t,canvasElement:i})=>{const e=y(i);t.onUpdateTodo.mockClear();const s=e.getByTestId("todo-item-edit-button");await o.click(s),await u(()=>{const c=e.getByTestId("todo-item-title-input");a(c).toBeInTheDocument()});const r=e.getAllByRole("radio");await o.click(r[0]);const d=e.getByTestId("todo-item-save-button");await o.click(d),await u(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-1","Buy groceries","Milk, eggs, and bread",null)})}},S={args:{onUpdateTodo:P(async(t,i,e,s)=>{throw new Error("Failed to update todo")})},play:async({args:t,canvasElement:i})=>{const e=y(i);t.onUpdateTodo.mockClear();const s=e.getByTestId("todo-item-edit-button");await o.click(s),await u(()=>{const c=e.getByTestId("todo-item-save-button");a(c).toBeInTheDocument()});const r=e.getByTestId("todo-item-save-button");await o.click(r),await u(()=>{const c=e.getByText("Failed to update todo");a(c).toBeInTheDocument()});const d=e.getByTestId("todo-item-title-input");await a(d).toBeInTheDocument()}},_={args:{todo:K},render:t=>(Object.defineProperty(j,"OS",{value:"ios",writable:!0,configurable:!0}),n.jsx(p,{children:n.jsx(F,{...t})})),play:async({args:t,canvasElement:i})=>{const e=y(i);try{t.onToggleComplete.mockClear(),t.onUpdateTodo.mockClear();const s=e.queryByTestId("todo-item-edit-button");await a(s).toBeNull();const r=e.getByText("Call mom");await a(r).toBeInTheDocument(),await o.pointer({keys:"[MouseLeft>]",target:r}),await new Promise(B=>setTimeout(B,500)),await o.pointer({keys:"[/MouseLeft]"}),await u(()=>{const B=e.getByTestId("todo-item-title-input");a(B).toBeInTheDocument()});const d=e.getByTestId("todo-item-title-input"),c=e.getByTestId("todo-item-description-input");await a(d.value).toBe("Call mom"),await a(c.value).toBe(""),await o.clear(d),await o.type(d,"Updated via long press"),await o.clear(c),await o.type(c,"Updated description");const I=e.getByTestId("todo-item-save-button");await o.click(I),await u(()=>{a(t.onUpdateTodo).toHaveBeenCalledWith("todo-2","Updated via long press","Updated description",null)})}finally{Object.defineProperty(j,"OS",{value:"web",writable:!0,configurable:!0})}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onToggleComplete.mockClear();

    // Find the todo title
    const title = canvas.getByText("Buy groceries");
    await expect(title).toBeInTheDocument();
    const editButton = canvas.getByTestId("todo-item-edit-button");
    await userEvent.hover(title);
    await expect(editButton.style.opacity).toBe("1");
    await userEvent.unhover(title);
    await expect(editButton.style.opacity).toBe("0");

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
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    todo: {
      ...SAMPLE_TODO_COMPLETED,
      category: {
        ...SAMPLE_TODO_COMPLETED.category!,
        color: null
      }
    }
  }
}`,...b.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    todo: SAMPLE_TODO_NO_DESCRIPTION
  }
}`,...E.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    todo: SAMPLE_TODO_CATEGORY_NO_ICON
  }
}`,...f.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}};const vt=["Default","Completed","WithoutDescriptionAndCategory","WithoutCategoryIcon","EditMode","EditModeCancel","EditModeDelete","EditModeCategorySelection","EditModeCategoryDeselection","EditModeWithError","MobileLongPressToEdit"];export{b as Completed,x as Default,C as EditMode,k as EditModeCancel,M as EditModeCategoryDeselection,O as EditModeCategorySelection,D as EditModeDelete,S as EditModeWithError,_ as MobileLongPressToEdit,f as WithoutCategoryIcon,E as WithoutDescriptionAndCategory,vt as __namedExportsOrder,Bt as default};
