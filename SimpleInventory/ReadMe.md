### 库存系统文档

本说明文档概述了由多个组件组成的 JavaScript 库存管理系统。该系统涉及管理游戏中的物品、它们的属性，以及在游戏库存中的交互。下面我们概述主要模块、它们的功能和交互，以便提供全面的理解。

#### **1. 模块概述**

该库存系统由以下 JavaScript 模块组成：

1. **InvUI.js**：负责管理库存的用户界面交互，包括物品的可视化。
2. **InvUtil.js**：提供与库存操作相关的实用函数，例如管理物品参数、组织堆叠以及处理物品的添加。
3. **SFInvMain.js**：代表主要的库存逻辑和配置，包括定义库存规则和设置。
4. **SFItem.js**：管理物品数据，包括添加、检索和根据不同参数进行物品搜索。
5. **SFStorage.js**：定义库存存储结构，包括物品堆叠和库存管理的类。

#### **2. 文件描述**

##### **2.1. InvUI.js**

该模块负责处理库存物品的可视化表示，提供了库存数据和用户界面之间的交互层。主要功能包括：

- **_emptyItem()**：返回一个代表空库存槽的对象，具有默认的 ID、名称、图片和数量等属性。
- **_resolveImg(item)**：确定要显示的物品图像，考虑物品数据，例如类型、差异标记和堆叠精灵。
- **_displayItemIcon(itemId, diff)**：为物品图标创建 HTML，包括带有相应工具提示的图像，以便在 UI 中显示。

##### **2.2. InvUtil.js**

该模块提供的实用函数对于维持库存行为的各个方面至关重要，例如物品参数和堆叠管理。

- **_getPalam(param, value)**：将各种状态效果（例如春药、酒精）映射到库存效果。
- **_getMaxSize(itemId, mode)**：根据物品 ID 和其他配置因素确定物品堆叠的最大允许大小。
- **_organizeInv(Inv)**：通过合并可堆叠物品和移除空堆叠来优化库存结构。
- **_addBunchItems(Inv, itemStacks)**：向库存中添加多个物品，确保它们适当合并或堆叠。

##### **2.3. SFInvMain.js**

该文件定义了主要的库存结构，包括全局配置和库存规则。

- **_config**：定义了可配置参数，如最大库存大小、是否禁用堆叠以及增益大小因素。
- **_options**：存储选项，例如根图像路径和库存物品类型。
- **InventoryRules 类**：用于管理库存槽的规则，包括库存初始化和槽位分配。
- **_getMaxSize(size)**：用于确定特定物品类别的大小配置的实用函数，例如药丸、瓶子或更大的容器。

##### **2.4. SFItem.js**

该文件管理核心的物品数据结构，包括添加新物品、检索物品和处理搜索。

- **_items (Map)**：维护所有可用物品的集合。
- **_addItem(id, obj)**：将新物品添加到物品注册表中。
- **_searchByType(type)**, **_searchByTag(...tags)**：提供基于物品类型或相关标签的搜索功能。
- **_create(id, obj)**：创建一个物品实例并附加诸如状态效果应用之类的功能。

##### **2.5. SFStorage.js**

该文件处理底层的库存存储机制，定义了代表物品堆叠和整个库存的类。

- **iStack 类**：代表一堆物品，具有诸如 ID、数量等属性，并包括 **add(num)** 和 **take(num)** 这样的堆叠管理方法。
  - **data**：检索与堆叠相关联的物品数据。
  - **canStack()**：检查是否可以根据当前大小向堆叠中添加更多物品。
- **Inventory 类**：代表整个库存结构，具有用于添加、移除和管理物品堆叠的方法。
  - **remain()**：返回库存的剩余容量。
  - **sort()**：按类型和 ID 对库存物品进行排序。
  - **display()**：返回当前库存的 HTML 表示，以便显示。

#### **3. 交互和流程**

- 物品使用 **SFItem.js** 模块创建并存储在全局集合中。然后可以将它们添加到由 **SFStorage.js** 中的 **Inventory** 类实例表示的库存中。
- **InvUtil.js** 辅助管理物品效果、库存限制和堆叠操作，而 **SFInvMain.js** 提供配置和初始设置。
- **InvUI.js** 负责创建库存物品的可视化表示，利用数据和辅助函数向玩家显示正确的图像和详细信息。

#### **4. 关键特性**

- **堆叠管理**：物品可以分组为堆叠，以有效管理库存空间。系统支持拆分、合并和溢出处理。
- **物品效果和参数**：通过 **InvUtil.js** 和 **SFItem.js**，物品可以对玩家的状态产生不同影响，例如药物或食物对角色参数的影响。
- **动态库存规则**：库存容量、堆叠规则和物品限制可通过配置文件和实用函数进行调整，允许灵活的库存行为。

#### **5. 使用示例**

##### **5.1 添加物品到库存**

1. **创建物品实例**：使用 **SFItem.js** 中的 **_getItem(id)** 创建或检索一个物品。
   ```javascript
   const healthPotion = Items.get('potion_health');
   ```
   此操作将获取物品 `potion_health` 的数据实例。

2. **创建物品堆叠**：使用 **SFStorage.js** 中的 **iStack** 类创建该物品的堆叠。
   ```javascript
   const stack = new iStack('potion_health', 5);
   ```
   此代码将创建一个包含 5 个 `potion_health` 的堆叠。

3. **添加堆叠到库存**：使用 **InvUtil.js** 中的 **addStack()** 方法将堆叠添加到库存中。
   ```javascript
   InvUtil.addStack(playerInventory, stack);
   ```
   这将把物品堆叠添加到指定的玩家库存中。

#### **6. 给 MODDER 的说明**

##### **6.1 如何在这套系统中新建一个物品**

1. **创建物品数据**：在 **SFItem.js** 中使用 **_addItem(id, obj)** 方法创建一个新物品，其中 `id` 是物品的唯一标识符，`obj` 包括物品的属性（如名称、类型、效果等）。
   ```javascript
   Items.add('potion_health', {
       name: 'Health Potion',
       type: 'potion',
       effects: [{ param: 'health', method: 'gain', value: 50 }]
   });
   ```
   此代码将名为 `Health Potion` 的物品添加到物品列表中。

2. **创建物品实例**：使用 **_create(id, obj)** 方法生成物品实例并添加所需的功能，例如应用状态效果。
   ```javascript
   const healthPotion = Items.create('potion_health', {
       effects: [{ param: 'health', method: 'gain', value: 50 }]
   });
   ```
   这将创建并配置物品的具体实例。

3. **物品图像**：在 **InvUI.js** 中确保有与物品对应的图像路径设置，通过 **_resolveImg(item)** 来生成正确的物品图标。
   ```javascript
   const imgPath = InvUI.resolveImg(healthPotion);
   ```
   该函数会根据物品的数据返回正确的图像路径。

##### **6.2 如何在这套系统中新建一个库存**

1. **创建库存实例**：使用 **SFStorage.js** 中的 **Inventory** 类创建一个新的库存实例。
   ```javascript
   const playerInventory = new Inventory('player', 'backpack', 20);
   ```
   其中 `type` 为库存类型（例如玩家、NPC），`slot` 为库存槽位的标识符，`size` 为库存的最大容量。

2. **初始化库存规则**：在 **SFInvMain.js** 中，可以使用 **InventoryRules** 类来定义新的库存规则，例如为特定角色或场景设置特定的库存限制。
   ```javascript
   const backpackRules = new InventoryRules('backpack', 'player', 'backpack', 20);
   backpackRules.init();
   ```
   这样可以确保背包的容量和规则根据需要正确初始化。

##### **6.3 如何管理和处理库存**

1. **添加物品到库存**：使用 **InvUtil.js** 中的 **addStack()** 方法将物品堆叠添加到库存中。
   ```javascript
   const stack = new iStack('potion_health', 5);
   InvUtil.addStack(playerInventory, stack);
   ```
   该代码将 5 个 `potion_health` 的堆叠添加到玩家的背包中。

2. **合并和拆分堆叠**：可以使用 **InvUtil.js** 中的 **mergeStack()** 和 **splitStack()** 函数管理物品堆叠。
   ```javascript
   InvUtil.mergeStack(playerInventory, stack);
   const splitStacks = InvUtil.splitStack(stack);
   ```
   这里的 **mergeStack()** 会将同类型的物品合并，而 **splitStack()** 会将大的堆叠拆分为多个较小的堆叠。

3. **移除物品**：通过 **SFStorage.js** 中 **Inventory** 类的 **take()** 或 **tackPart()** 方法，可以从库存中移除整个堆叠或部分堆叠。
   ```javascript
   playerInventory.take(0); // 移除位置 0 的堆叠
   playerInventory.tackPart(1, 2); // 从位置 1 的堆叠中移除 2 个物品
   ```

4. **检查库存容量**：使用 **remain()** 方法检查库存中剩余的可用空间，以确保在添加物品前有足够的空间。
   ```javascript
   const remainingCapacity = playerInventory.remain();
   if (remainingCapacity > 0) {
       console.log('还有空间可以添加物品');
   }
   ```
   这样可以确保玩家在添加新物品之前不会超出库存容量。

#### **7. 结论**

该库存系统提供了一种稳健的结构，用于处理各种物品类型、效果和库存限制。通过将关注点分离到多个模块中，它允许易于维护和扩展的解决方案。视觉组件、实用函数和数据管理的结合确保了玩家在库存展示上的无缝体验。

