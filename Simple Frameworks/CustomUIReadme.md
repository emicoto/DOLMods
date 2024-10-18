# CustomPopup 使用说明与示例

## 概述

`CustomPopup` 是一个用于帮助 Mod 制作者在游戏中创建自定义弹窗的工具类。通过使用这个工具，您可以轻松地创建和管理弹窗，使它们显示所需的信息或 UI 元素。`CustomPopup` 提供了创建弹窗、设置弹窗大小、更新内容、显示和关闭弹窗等功能，并支持自定义 CSS 样式以调整弹窗的外观。

本文档将按代码初学者也能理解的标准，详细解释 `CustomPopup` 的功能及其具体运用案例，包括如何使用默认的 CSS 以及如何自定义弹窗的样式。

## 主要功能说明

### 1. 创建弹窗

#### `drawPopup(title, content, style, noBtn)`

**说明**：绘制一个带有标题和内容的弹窗。

- **参数**：
  - `title` (string)：弹窗的标题。
  - `content` (string)：弹窗的内容，可以是 HTML 字符串。
  - `style` (string)：自定义的样式类名称，默认是 `'custom-popup'`。
  - `noBtn` (boolean)：是否不显示关闭按钮，默认为 `false`（显示关闭按钮）。
- **示例**：

```javascript
CustomPopup.draw('欢迎', '欢迎来到游戏世界！'); // 创建一个标题为“欢迎”的弹窗
CustomPopup.draw('提示', '你已完成任务！', 'custom-style'); // 使用自定义样式类名绘制弹窗
CustomPopup.draw('注意', '不可关闭的消息', '', true); // 创建一个没有关闭按钮的弹窗
```

### 2. 设置弹窗大小

#### `setSize(width, height)`

**说明**：设置弹窗的宽度和高度。

- **参数**：
  - `width` (string)：弹窗的宽度，例如 `'400px'`。
  - `height` (string)：弹窗的高度，例如 `'300px'`。
- **示例**：

```javascript
CustomPopup.setSize('400px', '300px'); // 将弹窗的大小设置为 400x300 像素
```

### 3. 显示和隐藏弹窗

#### `showPopup()`

**说明**：显示弹窗。

- **示例**：

```javascript
CustomPopup.show(); // 显示弹窗
```

#### `hidePopup()`

**说明**：隐藏弹窗。

- **示例**：

```javascript
CustomPopup.hide(); // 隐藏弹窗
```

### 4. 设置弹窗内容

#### `setContent(content)`

**说明**：更新弹窗中的内容。

- **参数**：
  - `content` (string)：要更新的内容，可以是 HTML 字符串。
- **示例**：

```javascript
CustomPopup.setContent('<p>任务更新：找到隐藏的宝藏！</p>'); // 更新弹窗内容
```

### 5. 销毁弹窗

#### `destroyPopup()`

**说明**：销毁弹窗，删除弹窗和背景遮罩。

- **示例**：

```javascript
CustomPopup.close(); // 销毁弹窗
```

### 6. 创建并显示弹窗

#### `createPopup(options)`

**说明**：根据提供的选项创建并显示弹窗。

- **参数**：
  - `options` (object)：包含以下可选属性的对象：
    - `title` (string)：弹窗的标题。
    - `content` (string)：弹窗的内容。
    - `noBtn` (boolean)：是否不显示关闭按钮。
    - `width` (string)：弹窗的宽度。
    - `height` (string)：弹窗的高度。
- **示例**：

```javascript
CustomPopup.create({
  title: '欢迎',
  content: '<p>欢迎来到游戏世界！请享受旅程。</p>',
  width: '400px',
  height: '300px'
}); // 创建并显示一个自定义大小的弹窗
```

## 默认的 CSS 样式说明

在 `general.css` 文件中，`CustomPopup` 相关的默认样式定义如下：

- **背景遮罩样式 (`#customPopupBG`)**：

  - 使整个屏幕变暗以突出弹窗。
  - 属性包括全屏固定定位，半透明背景色，以及轻微的模糊效果。

  ```css
  #customPopupBG {
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgb(41 41 41 / 50%);
      z-index: 1000;
      left: 0;
      top: 0;
      backdrop-filter: blur(2px);
  }
  ```

- **弹窗容器样式 (`#customPopup`)**：

  - 弹窗为固定定位，居中显示，具有阴影效果。

  ```css
  #customPopup {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 30%;
      z-index: 1001;
  }
  ```

- **默认弹窗样式 (`.custom-popup`)**：

  - 使用半透明的深色背景，带有边框和阴影，最小宽度和高度为 250x180 像素。

  ```css
  .custom-popup {
      background-color: rgba(80, 80, 80, 0.9);
      border: 1px solid rgb(120, 120, 120);
      min-width: 250px;
      min-height: 180px;
      box-shadow: 6px 10px 8px 3px rgb(0 0 0 / 60%);
      backdrop-filter: blur(6px);
  }
  ```

- **标题栏样式 (`#PopupBanner`)**：

  - 弹窗顶部的标题栏，包含标题和关闭按钮。

  ```css
  #PopupBanner {
      width: 100%;
      display: flex;
      height: 24px;
  }
  .popup-title {
      flex: 1;
      text-align: center;
      color: #cbffff;
      background: rgb(89 101 104 / 50%);
  }
  #PopupBanner .closeBtn {
      background-color: rgb(50, 50, 50);
      color: cyan;
      border: none;
      width: 24px;
      height: 24px;
  }
  ```

## 自定义弹窗的 CSS

如果您希望自定义弹窗的样式，可以通过以下步骤实现：

1. **创建自定义样式类**

   - 在 CSS 文件中定义一个新的样式类，例如：

   ```css
   .my-custom-popup {
       background-color: rgba(0, 0, 128, 0.8);
       border: 2px solid #ffcc00;
       box-shadow: 4px 8px 6px 2px rgba(0, 0, 0, 0.5);
       border-radius: 10px;
   }
   ```

2. **在创建弹窗时应用自定义样式**

   - 使用 `drawPopup` 或 `createPopup` 方法，并传递自定义的样式类名称：

   ```javascript
   CustomPopup.create({
     title: '自定义样式弹窗',
     content: '<p>这是一个使用自定义样式的弹窗。</p>',
     width: '350px',
     height: '250px'
   });
   const popup = document.getElementById('customPopup');
   popup.classList.add('my-custom-popup'); // 应用自定义样式
   ```

## 具体运用案例

1. **欢迎弹窗**：在游戏开始时显示欢迎信息。

   ```javascript
   CustomPopup.create({
     title: '欢迎来到冒险世界',
     content: '<p>勇敢的冒险者，准备好开始您的旅程了吗？</p>',
     width: '400px',
     height: '200px'
   });
   ```

2. **任务完成提示**：玩家完成任务时显示奖励信息。

   ```javascript
   CustomPopup.create({
     title: '任务完成！',
     content: '<p>恭喜你完成了任务，获得了 500 金币！</p>',
     width: '300px',
     height: '180px'
   });
   ```

3. **警告消息**：在某些重要情节中，提示玩家不能执行某个动作。

   ```javascript
   CustomPopup.create({
     title: '警告',
     content: '<p>你不能进入这个区域，危险正在逼近！</p>',
     noBtn: true,
     width: '350px',
     height: '150px'
   });
   ```

通过以上这些功能和样式自定义选项，您可以为您的 Mod 创建独特的 UI 体验，使游戏中的信息更加丰富和引人注目。
