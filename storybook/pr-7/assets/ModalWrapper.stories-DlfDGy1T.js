import{r as C,i as T,j as e,M as V,P as N,k as j,K as M,S as E,l as R,m as l,V as p,T as c}from"./iframe-Bxvz8KR7.js";import{B as H}from"./Button-B6rm7xfY.js";import{M as K}from"./ModalHeader-FXwezHNv.js";import"./preload-helper-Zf8nSx-t.js";import"./useTranslation-B4Sp_wyf.js";import"./Ionicons-CJ2q5q5c.js";function B({visible:a,onClose:t,title:o,children:n}){const s=C.useRef(new T.Value(0)).current;C.useEffect(()=>{a?T.timing(s,{toValue:1,duration:200,delay:220,useNativeDriver:!1}).start():s.setValue(0)},[a,s]);const i=s.interpolate({inputRange:[0,1],outputRange:["rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0.3)"]}),d=()=>{l.isVisible()?l.dismiss():t()},u=()=>{l.isVisible()&&l.dismiss()};return e.jsx(V,{visible:a,animationType:"slide",transparent:!0,onRequestClose:d,"aria-label":"popup",children:e.jsx(T.View,{style:{backgroundColor:i,flex:1},children:e.jsx(N,{className:"flex-1 items-center justify-end xl:justify-center",onPress:d,testID:"modal-backdrop",children:e.jsx(j,{onPress:u,testID:"modal-header-wrapper",children:e.jsxs(M,{className:"max-h-[90%] w-full cursor-default rounded-t-3xl bg-white dark:bg-gray-800 xl:max-w-2xl xl:rounded-b-3xl",behavior:R.OS==="ios"?"padding":"height",children:[e.jsx(K,{title:o,onClose:t}),e.jsx(E,{className:"native:pb-8 cursor-auto px-6 py-4",children:n})]})})})})})}B.__docgenInfo={description:"",methods:[],displayName:"ModalWrapper",props:{visible:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},title:{required:!0,tsType:{name:"TranslationKey"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const{expect:m,fn:g,screen:v,userEvent:r,within:f}=__STORYBOOK_MODULE_TEST__,D={title:"elements/ModalWrapper",component:B,tags:["autodocs"],args:{onClose:g()},parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1},{id:"aria-allowed-attr",enabled:!1}]}}},render:a=>{const[t,o]=C.useState(a.visible);return e.jsxs(p,{className:"flex-1 items-start",children:[e.jsx(H,{onPress:()=>o(!0),type:"primary",t:"todos.add"}),e.jsx(B,{...a,visible:t,onClose:()=>{o(!1),a.onClose()}})]})}},h={args:{title:"category.editCategory",visible:!1,children:e.jsxs(p,{className:"gap-4",children:[e.jsx(c,{className:"text-gray-900 dark:text-white",children:"This is example modal content."}),e.jsx(c,{className:"text-gray-900 dark:text-white",children:"You can put any content here, including forms, text, or other components."})]})},play:async({args:a,canvasElement:t})=>{const n=f(t).getByRole("button");await r.click(n),await new Promise(i=>setTimeout(i,300));const s=v.getAllByRole("button")[1];await r.click(s),await m(a.onClose).toHaveBeenCalledTimes(1)}},y={args:{title:"category.name",visible:!1,children:e.jsxs(p,{className:"gap-4",children:[e.jsx(c,{className:"text-gray-900 dark:text-white",children:"This modal demonstrates scrolling behavior with longer content."}),Array.from({length:20}).map((a,t)=>e.jsxs(c,{className:"text-gray-900 dark:text-white",children:["Line ",t+1,": Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."]},t))]})}},b={args:{title:"category.editCategory",visible:!0,children:e.jsx(p,{className:"gap-4",children:e.jsx(c,{className:"text-gray-900 dark:text-white",children:"This modal starts in an open state."})})}},k={args:{title:"category.editCategory",visible:!1,children:e.jsx(p,{className:"gap-4",children:e.jsx(c,{className:"text-gray-900 dark:text-white",children:"Click outside the modal (on the backdrop) to close it."})})},play:async({args:a,canvasElement:t})=>{const n=f(t).getByRole("button");await r.click(n),await new Promise(i=>setTimeout(i,300));const s=v.getByTestId("modal-backdrop");await r.click(s),await m(a.onClose).toHaveBeenCalledTimes(1)}},w={args:{title:"category.editCategory",visible:!1,children:e.jsx(p,{className:"gap-4",children:e.jsx(c,{className:"text-gray-900 dark:text-white",children:"When keyboard is visible, clicking backdrop should dismiss keyboard instead of closing modal."})})},play:async({args:a,canvasElement:t})=>{const o=f(t),n=g(()=>!0),s=g();l.isVisible=n,l.dismiss=s;const i=o.getByRole("button");await r.click(i),await new Promise(u=>setTimeout(u,300));const d=v.getByTestId("modal-backdrop");await r.click(d),await m(s).toHaveBeenCalledTimes(1),await m(a.onClose).not.toHaveBeenCalled(),n.mockReturnValue(!1),await r.click(d),await m(a.onClose).toHaveBeenCalledTimes(1)}},x={args:{title:"category.editCategory",visible:!1,children:e.jsx(p,{className:"gap-4",children:e.jsx(c,{className:"text-gray-900 dark:text-white",children:"When keyboard is visible, clicking the header should dismiss the keyboard."})})},play:async({args:a,canvasElement:t})=>{const o=g(()=>!0),n=g();l.isVisible=o,l.dismiss=n;const i=f(t).getByRole("button");await r.click(i),await new Promise(u=>setTimeout(u,300));const d=v.getByTestId("modal-header-wrapper");await r.click(d),await m(n).toHaveBeenCalledTimes(1),await m(a.onClose).not.toHaveBeenCalled()}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    title: "category.editCategory",
    visible: false,
    children: <View className="gap-4">
        <Text className="text-gray-900 dark:text-white">
          This is example modal content.
        </Text>
        <Text className="text-gray-900 dark:text-white">
          You can put any content here, including forms, text, or other
          components.
        </Text>
      </View>
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Find and click the button to open the modal
    const openButton = canvas.getByRole("button");
    await userEvent.click(openButton);

    // Wait a bit for the modal animation
    await new Promise(resolve => setTimeout(resolve, 300));

    // Find the close button (X button in header)
    const closeButton = screen.getAllByRole("button")[1]; // Second button is the close button

    // Click the close button
    await userEvent.click(closeButton);

    // Verify onClose was called
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  }
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    title: "category.name",
    visible: false,
    children: <View className="gap-4">
        <Text className="text-gray-900 dark:text-white">
          This modal demonstrates scrolling behavior with longer content.
        </Text>
        {Array.from({
        length: 20
      }).map((_, i) => <Text key={i} className="text-gray-900 dark:text-white">
            Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </Text>)}
      </View>
  }
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    title: "category.editCategory",
    visible: true,
    children: <View className="gap-4">
        <Text className="text-gray-900 dark:text-white">
          This modal starts in an open state.
        </Text>
      </View>
  }
}`,...b.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    title: "category.editCategory",
    visible: false,
    children: <View className="gap-4">
        <Text className="text-gray-900 dark:text-white">
          Click outside the modal (on the backdrop) to close it.
        </Text>
      </View>
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Open the modal
    const openButton = canvas.getByRole("button");
    await userEvent.click(openButton);

    // Wait for modal animation
    await new Promise(resolve => setTimeout(resolve, 300));

    // Find the backdrop
    const backdrop = screen.getByTestId("modal-backdrop");

    // Click the backdrop
    await userEvent.click(backdrop);

    // Verify onClose was called
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  }
}`,...k.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    title: "category.editCategory",
    visible: false,
    children: <View className="gap-4">
        <Text className="text-gray-900 dark:text-white">
          When keyboard is visible, clicking backdrop should dismiss keyboard
          instead of closing modal.
        </Text>
      </View>
  },
  play: async ({
    args,
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // Mock Keyboard.isVisible to return true
    const isVisibleMock = fn(() => true);
    const dismissMock = fn();
    Keyboard.isVisible = isVisibleMock;
    Keyboard.dismiss = dismissMock;

    // Open the modal
    const openButton = canvas.getByRole("button");
    await userEvent.click(openButton);

    // Wait for modal animation
    await new Promise(resolve => setTimeout(resolve, 300));

    // Find the backdrop
    const backdrop = screen.getByTestId("modal-backdrop");

    // Click the backdrop (should dismiss keyboard, not close modal)
    await userEvent.click(backdrop);

    // Verify Keyboard.dismiss was called
    await expect(dismissMock).toHaveBeenCalledTimes(1);

    // Verify onClose was NOT called (keyboard was dismissed instead)
    await expect(args.onClose).not.toHaveBeenCalled();

    // Now mock keyboard as hidden
    isVisibleMock.mockReturnValue(false);

    // Click backdrop again (should close modal now)
    await userEvent.click(backdrop);

    // Verify onClose was called
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  }
}`,...w.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    title: "category.editCategory",
    visible: false,
    children: <View className="gap-4">
        <Text className="text-gray-900 dark:text-white">
          When keyboard is visible, clicking the header should dismiss the
          keyboard.
        </Text>
      </View>
  },
  play: async ({
    args,
    canvasElement
  }) => {
    // Mock Keyboard API
    const isVisibleMock = fn(() => true);
    const dismissMock = fn();
    Keyboard.isVisible = isVisibleMock;
    Keyboard.dismiss = dismissMock;
    const canvas = within(canvasElement);

    // Open the modal
    const openButton = canvas.getByRole("button");
    await userEvent.click(openButton);

    // Wait for modal animation
    await new Promise(resolve => setTimeout(resolve, 300));

    // Find the header area (testID added to modal header wrapper)
    const header = screen.getByTestId("modal-header-wrapper");

    // Click the header (should dismiss keyboard)
    await userEvent.click(header);

    // Verify Keyboard.dismiss was called
    await expect(dismissMock).toHaveBeenCalledTimes(1);

    // Verify onClose was NOT called
    await expect(args.onClose).not.toHaveBeenCalled();
  }
}`,...x.parameters?.docs?.source}}};const A=["Default","WithLongContent","InitiallyOpen","BackdropClose","KeyboardDismissOnBackdrop","KeyboardDismissOnHeader"];export{k as BackdropClose,h as Default,b as InitiallyOpen,w as KeyboardDismissOnBackdrop,x as KeyboardDismissOnHeader,y as WithLongContent,A as __namedExportsOrder,D as default};
