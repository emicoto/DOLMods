# InvUtil Documentation

`InvUtil` 是一个包含多个功能的 JavaScript 库，用于管理物品属性、堆叠操作、库存组织等功能。下面是每个函数的详细说明。

## Function List

### 1. `getPalam(param, value)`
- **Description**: 更新某个物品属性。
- **Parameters**:
  - `param` (String): 属性名。
  - `value` (Number): 需要应用的数值变化。
- **Returns**: 返回最终的属性名，若属性为 `'aphrod'` 则返回 `'drugged'`，若为 `'drunk'` 则返回 `'alcohol'`。

### 2. `getPalamV(param, value)`
- **Description**: 更新指定属性的数值。
- **Parameters**:
  - `param` (String): 属性名。
  - `value` (Number): 需要增加或减少的数值。
- **Returns**: 无返回值，但直接修改全局对象 `V` 中对应属性的值。

### 3. `printPalam(param, value)`
- **Description**: 根据属性和变化量生成变化的描述。
- **Parameters**:
  - `param` (String): 属性名。
  - `value` (Number): 属性变化的数值。
- **Returns**: 返回描述变化的字符串格式，例如 `<<gpalam>>`。

### 4. `getMaxSize(itemId, mode)`
- **Description**: 获取物品的最大堆叠大小。
- **Parameters**:
  - `itemId` (String): 物品 ID。
  - `mode` (String, Optional): 模式，默认为 `'inv'`，如果为 `'raw'` 则返回物品原始大小。
- **Returns**: 返回物品最大堆叠数量。

### 5. `organizeInv(Inv)`
- **Description**: 对库存进行整理，合并可以堆叠的物品并移除数量为零的物品。
- **Parameters**:
  - `Inv` (Object): 代表库存的对象。
- **Returns**: 无返回值，直接操作库存对象。

### 6. `sanityCheck(Inv, stack)`
- **Description**: 检查并修正库存或堆叠对象，确保它们是对应的类实例。
- **Parameters**:
  - `Inv` (Object): 库存对象。
  - `stack` (Object, Optional): 堆叠对象。
- **Returns**: 返回 `[Inv, stack]`，经过检查后的库存和堆叠对象。

### 7. `mergeStack(Inv, stack)`
- **Description**: 将堆叠对象合并到库存中已有的相同物品堆叠中。
- **Parameters**:
  - `Inv` (Object): 库存对象。
  - `stack` (Object): 堆叠对象。
- **Returns**: 返回 `[Inv, stack]`，更新后的库存和堆叠对象。

### 8. `splitStack(stack)`
- **Description**: 将一个大堆叠拆分成多个小堆叠。
- **Parameters**:
  - `stack` (Object): 堆叠对象。
- **Returns**: 返回一个数组，包含多个拆分后的堆叠对象。

### 9. `addStack(Inv, stack)`
- **Description**: 尝试将堆叠对象添加到库存中。
- **Parameters**:
  - `Inv` (Object): 库存对象。
  - `stack` (Object): 堆叠对象。
- **Returns**: 如果添加成功，返回 `true`，否则返回未添加的部分。

### 10. `mergeCheck(Inv, stack)`
- **Description**: 检查库存是否有足够空间来合并指定的堆叠对象。
- **Parameters**:
  - `Inv` (Object): 库存对象。
  - `stack` (Object): 堆叠对象。
- **Returns**: 返回 `true` 表示可以合并，`false` 表示无法合并。

### 11. `addBunchItems(Inv, itemStacks)`
- **Description**: 尝试将多个堆叠对象添加到库存中。
- **Parameters**:
  - `Inv` (Object): 库存对象。
  - `itemStacks` (Array): 需要添加的堆叠对象数组。
- **Returns**: 如果全部添加成功，返回 `true`，否则返回未添加的部分。

