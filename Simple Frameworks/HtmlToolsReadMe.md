### 简介

`htmlTools` 是一个为网页游戏的 Mod 制作提供支持的小工具集，适合那些没有太多编程知识但希望自定义网页游戏内容的 Mod 爱好者。通过这些工具，你可以轻松地在游戏页面中插入、替换或修改特定内容，增强游戏体验，而无需深入学习复杂的 JavaScript 代码。

### 功能说明

1. **`appendPatch(pos, ...args)`**

   - **描述**：在指定位置插入新的 `div` 元素。你可以选择将这个 `div` 插入到页面中第一个图像或链接之前，或者在内容末尾添加它。
   - **参数**：
     - `pos`：插入位置，可以是 'before'（在第一个图像或链接前）或者 'after'（在内容末尾）。
     - `args`：可选的额外参数，用于设置新 `div` 的 id 和内容。
   - **范例**：
     ```js
     htmlTools.appendPatch('before', 'myContent', '<<widget>>');
     // 在第一个链接或图像前插入一个 id 为 "myContent" 的新 div，并填入内容 <<widget>>。

     htmlTools.appendPatch('after');
     // 在内容末尾添加一个 id 为 "extraContent" 的新 div。
     ```

2. **`append(pos, eId)`**

   - **描述**：在指定位置添加新的 `div` 元素。
   - **参数**：
     - `pos`：插入位置，可以是 'before' 或 'after'，或者在整个主要内容之前或之后插入 ('beforemain' 或 'aftermain')。
     - `eId`：新 `div` 元素的 id。
   - **范例**：
     ```js
     htmlTools.append('aftermain', 'newDiv');
     // 在主要内容末尾添加一个 id 为 "newDiv" 的新 div。

     htmlTools.append('before', 'headerDiv');
     // 在主要内容前插入一个 id 为 "headerDiv" 的新 div。
     ```

3. **`replaceLink(oldlink, newlink)`**

   - **描述**：替换页面中的指定链接文本为新的链接。
   - **参数**：
     - `oldlink`：要替换的链接文本，可以是字符串或对象（支持多语言）。
     - `newlink`：新链接的内容。
   - **范例**：
     ```js
     htmlTools.replaceLink('oldlink', '<<link newlink>><</link>>');
     // 将页面中的 "oldlink" 替换为新链接。

     htmlTools.replaceLink({CN: '旧链接', EN: 'oldlink'}, '<<link newlink>><</link>>');
     // 将页面中的多语言链接 "旧链接" 或 "oldlink" 替换为新链接。
     ```

4. **`createDiv(eId)`**

   - **描述**：创建一个新的 `div` 元素。
   - **参数**：
     - `eId`：要创建的 `div` 的 id，默认为 "patchContent"。
   - **范例**：
     ```js
     const newElement = htmlTools.createDiv('myDiv');
     // 创建一个 id 为 "myDiv" 的新 div 元素。

     const defaultElement = htmlTools.createDiv();
     // 创建一个默认 id 为 "patchContent" 的新 div 元素。
     ```

5. **`appendTo(tag, txt, content, divId)`**

   - **描述**：在特定元素后添加内容。
   - **参数**：
     - `tag`：要操作的元素类型，例如 'text'、'link'、'div' 等。
     - `txt`：要定位的文本或链接。
     - `content`：要添加的内容。
     - `divId`：新 `div` 的 id（可选）。
   - **范例**：
     ```js
     htmlTools.appendTo('link', 'ENLinkText', '<<widget>>');
     // 在特定链接后插入内容 "<<widget>>"。

     htmlTools.appendTo('text', 'Hello World', '<<newContent>>', 'additionalDiv');
     // 在包含文本 "Hello World" 的元素后插入内容 "<<newContent>>"，并设置新 div 的 id 为 "additionalDiv"。
     ```

### 可能的应用场景

- **网页游戏 Mod 制作**：Mod 制作爱好者可以使用这些工具修改网页游戏中的元素，例如在页面中插入自定义内容，替换某些链接，或者添加新的功能区域，从而个性化游戏体验。
- **动态网页内容更新**：你可以通过这些函数，在网页中动态插入、替换或修改内容，而无需了解复杂的 JavaScript 代码。例如，可以使用 `appendPatch` 在游戏进行过程中插入新的提示信息，或者使用 `replaceLink` 更换页面中的链接内容。
- **互动网页应用**：在需要与用户交互的游戏场景中，可以使用这些工具动态地修改页面。例如，当玩家完成特定任务后，使用 `append` 在页面上插入一条奖励信息，或使用 `replaceText` 来更新任务描述。
- **快速内容修改**：这些工具可以让你在没有编程基础的情况下快速更改页面内容，例如通过 `createDiv` 方法在页面中创建新的自定义区域，或使用 `replaceLink` 替换过时的链接。

### 具体应用范例

假设你正在为一款互动式的网页文字冒险游戏制作 Mod，并且希望在玩家完成某个场景时，增加新的互动选项，例如新的链接让玩家选择不同的路线。

1. **添加新的互动内容**：
   当玩家在某个场景中完成任务后，你可以使用 `appendTo` 在现有的文本后添加新的选择。例如，玩家找到一个隐藏的宝藏后，你想给他们增加一个新的选择“调查宝藏”链接：
   ```js
   htmlTools.appendTo('text', '你发现了一个隐藏的宝藏。', '<<link "调查宝藏">><<set $hasInvestigated to true>><</link>>', 'treasureOption');
   // 在描述宝藏的文本后插入一个新的互动链接，玩家可以选择调查宝藏。
   ```

2. **修改现有的互动链接**：
   假设游戏中有一个互动链接“继续前进”，但你希望玩家在满足某些条件时，这个链接指向一个新的方向，例如指向一个隐藏的房间。你可以使用 `replaceLink` 来替换原有的链接：
   ```js
   htmlTools.replaceLink('继续前进', '<<link "进入隐藏房间">><<set $enteredHiddenRoom to true>><</link>>');
   // 将页面中原本的“继续前进”链接替换为“进入隐藏房间”，让玩家有新的选择。
   ```

通过这些简单的工具，你可以轻松地为网页游戏添加新的内容或修改现有的互动，使游戏体验更加丰富和个性化。

### 使用建议

- 使用这些工具时，可以结合浏览器的开发者工具 (F12) 来观察每一个操作如何影响页面内容。例如，使用 `appendPatch` 插入元素后，打开开发者工具查看新插入的 `div` 及其位置，以理解页面的实际变化。
- 通过小范围的测试逐步理解每个函数的用法，尤其是它们对页面布局的影响。例如，可以在简单的游戏页面中多次使用 `appendTo` 函数，观察其如何添加新内容，以及这些内容在页面中的位置。

### 注意事项

- 使用 `appendPatch` 或 `appendTo` 时，确保页面中有明确的插入点（例如，id 为 `passage-content` 的容器），以避免找不到目标元素的错误。建议在插入前检查目标元素是否存在。
- 在进行替换操作时，确认旧链接或文本是否确实存在，否则可能导致替换失败。在复杂页面中，可以通过浏览器的调试工具查找对应的元素，确保替换操作能成功执行。
- 在涉及多语言文本时，可以利用 `replaceLink` 和 `replaceText` 的多语言支持功能，根据用户的语言偏好来动态调整页面内容，以提供更好的用户体验。
