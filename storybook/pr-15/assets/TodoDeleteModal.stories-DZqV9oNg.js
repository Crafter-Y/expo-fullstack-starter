import{j as o,V as d,T as g}from"./iframe-CrGDRyrd.js";import{B as w}from"./Button-8AjbrOTs.js";import{E as B}from"./ErrorMessage-B3MR1tuS.js";import{u as T}from"./useTranslation-BDTWTWvE.js";import"./preload-helper-Zf8nSx-t.js";import"./index-Ce3MlN9B.js";function y({todoTitle:e,error:a,isPending:t,onConfirm:r,onCancel:s}){const{t:u}=T();return o.jsxs(d,{className:"gap-4",testID:"todo-delete-modal",children:[o.jsx(g,{className:"text-base text-gray-900 dark:text-white",children:u("todos.deleteConfirmation")}),o.jsx(d,{className:"rounded-lg bg-gray-100 p-3 dark:bg-gray-800",children:o.jsx(g,{className:"font-semibold text-gray-900 dark:text-white",children:e})}),o.jsx(B,{error:a,testID:"todo-delete-error"}),o.jsxs(d,{className:"flex-row gap-3",children:[o.jsx(w,{type:"ghost",t:"todos.cancel",onPress:s,disabled:t,className:"flex-1",testID:"todo-delete-cancel-button"}),o.jsx(w,{type:"destructive",t:"todos.confirmDelete",onPress:r,disabled:t,className:"flex-1",testID:"todo-delete-confirm-button"})]})]})}y.__docgenInfo={description:"",methods:[],displayName:"TodoDeleteModal",props:{todoTitle:{required:!0,tsType:{name:"string"},description:""},error:{required:!0,tsType:{name:"ErrorState"},description:""},isPending:{required:!0,tsType:{name:"boolean"},description:""},onConfirm:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onCancel:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const{expect:n,fn:v,userEvent:m,within:p}=__STORYBOOK_MODULE_TEST__,E={title:"todos/TodoDeleteModal",component:y,tags:["autodocs"],args:{todoTitle:"Buy groceries",error:null,isPending:!1,onConfirm:v(),onCancel:v()},decorators:[e=>o.jsx(d,{className:"max-w-md p-4",children:o.jsx(e,{})})]},c={play:async({args:e,canvasElement:a})=>{const t=p(a);e.onConfirm.mockClear(),e.onCancel.mockClear();const r=t.getByTestId("todo-delete-modal");await n(r).toBeInTheDocument();const s=t.getByTestId("todo-delete-confirm-button"),u=t.getByTestId("todo-delete-cancel-button");await m.click(s),await n(e.onConfirm).toHaveBeenCalledTimes(1),await m.click(u),await n(e.onCancel).toHaveBeenCalledTimes(1)}},i={args:{error:"Unable to delete this todo right now"},play:async({canvasElement:e})=>{const t=p(e).getByTestId("todo-delete-error");await n(t).toBeInTheDocument(),await n(t).toHaveTextContent("Unable to delete this todo right now")}},l={args:{isPending:!0},play:async({args:e,canvasElement:a})=>{const t=p(a);e.onConfirm.mockClear(),e.onCancel.mockClear();const r=t.getByTestId("todo-delete-confirm-button"),s=t.getByTestId("todo-delete-cancel-button");await n(r).toHaveAttribute("aria-disabled","true"),await n(s).toHaveAttribute("aria-disabled","true"),await n(async()=>{await m.click(r)}).rejects.toThrow("pointer-events: none"),await n(async()=>{await m.click(s)}).rejects.toThrow("pointer-events: none"),await n(e.onConfirm).not.toHaveBeenCalled(),await n(e.onCancel).not.toHaveBeenCalled()}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onConfirm.mockClear();
    args.onCancel.mockClear();
    const modal = canvas.getByTestId("todo-delete-modal");
    await expect(modal).toBeInTheDocument();
    const confirmButton = canvas.getByTestId("todo-delete-confirm-button");
    const cancelButton = canvas.getByTestId("todo-delete-cancel-button");
    await userEvent.click(confirmButton);
    await expect(args.onConfirm).toHaveBeenCalledTimes(1);
    await userEvent.click(cancelButton);
    await expect(args.onCancel).toHaveBeenCalledTimes(1);
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    error: "Unable to delete this todo right now"
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByTestId("todo-delete-error");
    await expect(errorMessage).toBeInTheDocument();
    await expect(errorMessage).toHaveTextContent("Unable to delete this todo right now");
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    isPending: true
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    args.onConfirm.mockClear();
    args.onCancel.mockClear();
    const confirmButton = canvas.getByTestId("todo-delete-confirm-button");
    const cancelButton = canvas.getByTestId("todo-delete-cancel-button");
    await expect(confirmButton).toHaveAttribute("aria-disabled", "true");
    await expect(cancelButton).toHaveAttribute("aria-disabled", "true");
    await expect(async () => {
      await userEvent.click(confirmButton);
    }).rejects.toThrow("pointer-events: none");
    await expect(async () => {
      await userEvent.click(cancelButton);
    }).rejects.toThrow("pointer-events: none");
    await expect(args.onConfirm).not.toHaveBeenCalled();
    await expect(args.onCancel).not.toHaveBeenCalled();
  }
}`,...l.parameters?.docs?.source}}};const k=["Default","WithError","Pending"];export{c as Default,l as Pending,i as WithError,k as __namedExportsOrder,E as default};
